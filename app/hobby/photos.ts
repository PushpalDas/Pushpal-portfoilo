/**
 * One source of truth for the photography page.
 *
 * Frame numbers are derived, never written down: the twelve curated frames
 * are 01–12 in curated order, the remaining 73 follow in file order as
 * 13–85, and the viewer index is always `number - 1`. Nothing can drift
 * out of step with anything else.
 *
 * Every photograph in this set is 1179px wide — they are phone captures,
 * not camera files. That number is the ceiling on how large any box on the
 * page may render, because §1.2 forbids upscaling past intrinsic pixels.
 */

import files from './photo-files.json';
import manifest from './photo-manifest.json';

export type Category = 'People' | 'Places' | 'Nature' | 'Details';

interface Meta {
	width: number;
	height: number;
	blurDataURL: string;
}

export interface Photo extends Meta {
	/** Filename, and the stable key for everything else. */
	id: string;
	src: string;
	/** 1–85: curated 01–12, archive 13–85. */
	number: number;
	/** '' for an archive frame nobody has named yet. */
	title: string;
	category: Category | null;
	alt: string;
	selected: boolean;
	/** Only where a frame needs its subject held off-centre. */
	objectPosition?: string;
}

interface Curated {
	id: string;
	title: string;
	category: Category;
	alt: string;
	objectPosition?: string;
}

/**
 * Curated order is frame order, 01–12.
 *
 * Two sharper titles the owner may prefer later, not applied:
 *   'A closer world'   → 'The near field'
 *   'Weather turning'  → 'The weather changing its mind'
 */
const curated: Curated[] = [
	{
		id: 'IMG_6204.jpg',
		title: 'The quiet between tasks',
		category: 'People',
		alt: 'A man absorbed in his work, caught in a pause.',
	},
	{
		id: 'IMG_6206.jpg',
		title: 'Durga in motion',
		category: 'Details',
		alt: 'A Durga idol mid-procession, blurred with movement.',
	},
	{
		id: 'IMG_6225.jpg',
		title: 'Marble after dusk',
		category: 'Places',
		alt: 'A marble building holding the last light after dusk.',
	},
	{
		id: 'IMG_6228.jpg',
		title: 'A closer world',
		category: 'Details',
		alt: 'A small detail of the world seen close up.',
	},
	{
		id: 'IMG_6230.jpg',
		title: 'Bridge in fog',
		category: 'Places',
		alt: 'A bridge dissolving into fog.',
	},
	{
		id: 'IMG_6214.jpg',
		title: 'Morning pages',
		category: 'People',
		alt: 'A person writing in the early morning.',
	},
	{
		id: 'IMG_6245.jpg',
		title: 'Tea country',
		category: 'Places',
		alt: 'Terraced tea gardens receding into hills.',
	},
	{
		id: 'IMG_6258.jpg',
		title: 'Last light',
		category: 'Nature',
		alt: 'The final light of day across an open landscape.',
	},
	{
		id: 'IMG_6260.jpg',
		title: 'Winter silence',
		category: 'Places',
		alt: 'A still, cold place under winter light.',
	},
	{
		id: 'IMG_6268.jpg',
		title: 'Threshold',
		category: 'Places',
		alt: 'A doorway between one space and another.',
	},
	{
		id: 'IMG_6281.jpg',
		title: 'Weather turning',
		category: 'Nature',
		alt: 'A landscape caught as the weather turns.',
	},
	{
		id: 'IMG_6289.jpg',
		title: 'The traveller',
		category: 'People',
		alt: 'A traveller in transit, framed against the world.',
		objectPosition: 'center 30%',
	},
];

/**
 * Names the owner may want for archive frames, when he gets to them:
 * Waiting room light · The commuter's hour · Salt and shadow · A god in
 * the crowd · Rooftop monsoon · The barber's mirror · Low tide, low sun ·
 * Marketplace geometry · The long platform · Dust and departure · A
 * window's arithmetic · Evening, unhurried · The kindness of strangers ·
 * Paper boats · The last ferry.
 */

/** Hero panels by id, never by index. */
export const heroIds = {
	centre: 'IMG_6204.jpg',
	left: 'IMG_6214.jpg',
	right: 'IMG_6289.jpg',
} as const;

const list = files as string[];

const metaOf = (id: string): Meta => {
	const m = (manifest as Record<string, Meta>)[id];
	if (!m) throw new Error(`photo-manifest.json has no entry for ${id}`);
	return m;
};

// The page is static, so every check below fails the build rather than
// the browser — which is the point of running them here.
if (curated.length !== 12) {
	throw new Error(`Expected 12 curated frames, got ${curated.length}`);
}
if (new Set(list).size !== list.length) {
	throw new Error('photo-files.json contains duplicates');
}
for (const c of curated) {
	if (!list.includes(c.id)) {
		throw new Error(`Curated id ${c.id} is not in photo-files.json`);
	}
}
if (new Set(curated.map((c) => c.id)).size !== curated.length) {
	throw new Error('Curated frames contain a duplicate id');
}
for (const id of list) metaOf(id);

const curatedById = new Map(curated.map((c) => [c.id, c]));
const archiveIds = list.filter((id) => !curatedById.has(id));
const total = list.length;

const build = (id: string, i: number): Photo => {
	const c = curatedById.get(id);
	return {
		...metaOf(id),
		id,
		src: `/Photography/${id}`,
		number: i + 1,
		title: c?.title ?? '',
		category: c?.category ?? null,
		alt:
			c?.alt ??
			`Photograph ${i + 1} of ${total} from Pushpal Das's personal archive.`,
		selected: Boolean(c),
		objectPosition: c?.objectPosition,
	};
};

export const all: Photo[] = [...curated.map((c) => c.id), ...archiveIds].map(
	build,
);

export const selected = all.filter((p) => p.selected);
export const archive = all.filter((p) => !p.selected);
export const count = all.length;

const byId = new Map(all.map((p) => [p.id, p]));

export const photo = (id: string): Photo => {
	const p = byId.get(id);
	if (!p) throw new Error(`Unknown photograph ${id}`);
	return p;
};

export const viewerIndex = (id: string): number => photo(id).number - 1;

export const hero = {
	centre: photo(heroIds.centre),
	left: photo(heroIds.left),
	right: photo(heroIds.right),
};

/** Frame number as it is printed everywhere: 01, 07, 013, 085. */
export const frameNumber = (n: number): string =>
	String(n).padStart(n > 12 ? 3 : 2, '0');
