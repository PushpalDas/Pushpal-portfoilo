/**
 * Asserts the photography data holds together, before a build trusts it.
 *
 *   node scripts/verify-photos.mjs
 */

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = process.cwd();
const read = async (p) => JSON.parse(await readFile(join(ROOT, p), 'utf8'));

const files = await read('app/hobby/photo-files.json');
const manifest = await read('app/hobby/photo-manifest.json');

// photos.ts is TypeScript, so mirror its derivation here rather than
// importing it — the point is to catch the two drifting apart.
const source = await readFile(join(ROOT, 'app/hobby/photos.ts'), 'utf8');
const curatedBlock = source.slice(
	source.indexOf('const curated: Curated[] = ['),
	source.indexOf('\n];', source.indexOf('const curated: Curated[] = [')),
);
const curatedIds = [...curatedBlock.matchAll(/id: '([^']+)'/g)].map(
	(m) => m[1],
);
const titles = [...curatedBlock.matchAll(/title: '((?:[^'\\]|\\.)*)'/g)].map(
	(m) => m[1],
);
const alts = [...curatedBlock.matchAll(/alt: '((?:[^'\\]|\\.)*)'/g)].map(
	(m) => m[1],
);
const heroBlock = source.slice(
	source.indexOf('export const heroIds = {'),
	source.indexOf('} as const;'),
);
const heroIds = [...heroBlock.matchAll(/'([^']+\.jpg)'/g)].map((m) => m[1]);

const problems = [];
const check = (ok, message) => {
	if (!ok) problems.push(message);
};

check(files.length === 85, `photo-files.json has ${files.length}, want 85`);
check(
	new Set(files).size === files.length,
	'photo-files.json contains duplicates',
);
check(
	Object.keys(manifest).length === files.length,
	`manifest has ${Object.keys(manifest).length} entries, want ${files.length}`,
);
for (const f of files) {
	const m = manifest[f];
	check(Boolean(m), `manifest is missing ${f}`);
	if (m) {
		check(m.width > 0 && m.height > 0, `${f} has a zero dimension`);
		check(
			typeof m.blurDataURL === 'string' &&
				m.blurDataURL.startsWith('data:image/webp;base64,'),
			`${f} has no usable blurDataURL`,
		);
	}
}

check(curatedIds.length === 12, `curated has ${curatedIds.length}, want 12`);
check(
	new Set(curatedIds).size === curatedIds.length,
	'curated contains a duplicate id',
);
for (const id of curatedIds) {
	check(files.includes(id), `curated id ${id} is not in photo-files.json`);
}

// Numbering: curated first (01–12), archive after (13–85).
const archiveIds = files.filter((f) => !curatedIds.includes(f));
const order = [...curatedIds, ...archiveIds];
check(order.length === 85, `derived order has ${order.length}, want 85`);
curatedIds.forEach((id, i) => {
	check(order[i] === id, `frame ${i + 1} should be ${id}, got ${order[i]}`);
});
check(archiveIds.length === 73, `archive has ${archiveIds.length}, want 73`);
check(
	order.indexOf(archiveIds[0]) === 12,
	'first archive frame should be number 13',
);
check(
	order.indexOf(archiveIds[archiveIds.length - 1]) === 84,
	'last archive frame should be number 85',
);

for (const id of heroIds) {
	check(curatedIds.includes(id), `hero id ${id} is not a curated frame`);
}
check(heroIds.length === 3, `heroIds has ${heroIds.length}, want 3`);

check(titles.length === 12, `expected 12 curated titles, got ${titles.length}`);
check(alts.length === 12, `expected 12 curated alts, got ${alts.length}`);
for (const alt of alts) {
	check(
		!alt.startsWith('Archive frame'),
		`alt text still reads as a placeholder: "${alt}"`,
	);
	check(alt.length > 20, `alt text is too thin to be useful: "${alt}"`);
}
for (const title of titles) {
	check(
		!title.startsWith('Archive frame'),
		`title is still a placeholder: "${title}"`,
	);
}

if (problems.length > 0) {
	console.error('verify-photos FAILED:');
	for (const p of problems) console.error(`  · ${p}`);
	process.exit(1);
}

console.log(
	`verify-photos: ${files.length} files · 12 curated (01–12) · ` +
		`${archiveIds.length} archive (13–85) · 3 hero ids · manifest complete`,
);
