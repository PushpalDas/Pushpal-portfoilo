/**
 * Build-time manifest for the photography page.
 *
 * Records each photograph's intrinsic box and a 16px WebP LQIP, so every
 * wrapper on /hobby can reserve the exact aspect ratio before the file
 * loads. Run by `prebuild`, and the output is committed.
 *
 *   node scripts/photo-manifest.mjs
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const DIR = join(ROOT, 'public', 'Photography');
const LIST = join(ROOT, 'app', 'hobby', 'photo-files.json');
const OUT = join(ROOT, 'app', 'hobby', 'photo-manifest.json');

const files = JSON.parse(await readFile(LIST, 'utf8'));
const onDisk = new Set(await readdir(DIR));

if (new Set(files).size !== files.length) {
	throw new Error('photo-files.json contains duplicates');
}

const missing = files.filter((f) => !onDisk.has(f));
if (missing.length > 0) {
	throw new Error(`Missing from public/Photography: ${missing.join(', ')}`);
}

const unreferenced = [...onDisk].filter(
	(f) => /\.(jpe?g|png|webp)$/i.test(f) && !files.includes(f),
);
if (unreferenced.length > 0) {
	console.warn(
		`photo-manifest: unreferenced in photo-files.json: ${unreferenced.join(', ')}`,
	);
}

async function entry(file) {
	const buf = await readFile(join(DIR, file));
	const meta = await sharp(buf).metadata();

	// EXIF orientations 5–8 are rotated a quarter turn. Browsers and Next's
	// optimiser both display the rotated image, so the box we record has to
	// be the rotated one. No file in this set is rotated today; this keeps
	// the manifest correct if a rotated one is ever added.
	const rotated = (meta.orientation ?? 1) >= 5;
	const width = rotated ? meta.height : meta.width;
	const height = rotated ? meta.width : meta.height;

	if (!width || !height) {
		throw new Error(`Could not read dimensions for ${file}`);
	}

	const lqip = await sharp(buf)
		.rotate()
		.resize(16)
		.webp({ quality: 40 })
		.toBuffer();

	return {
		width,
		height,
		blurDataURL: `data:image/webp;base64,${lqip.toString('base64')}`,
	};
}

const manifest = {};
for (const file of files) {
	manifest[file] = await entry(file);
}

await writeFile(OUT, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`photo-manifest: ${files.length} entries → ${OUT}`);
