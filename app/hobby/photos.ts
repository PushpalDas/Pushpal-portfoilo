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
 * Archive frames that carry a name.
 *
 * Every frame in the collage below is named here, so no caption on that
 * page reads as a bare number. These stay archive frames — they are not
 * promoted into the twelve, they keep their 13–85 numbering, and they
 * still appear in the contact sheet. Only the caption changes.
 *
 * Each title was written against the photograph itself, not against the
 * filename. Frames nobody has looked at are deliberately absent: an
 * unnamed frame is honest, an invented name is not.
 *
 * A name can outlive its place in the hang — 034 was dropped from the
 * collage and keeps its name here, which is still what the contact sheet
 * reads for its alt text, and is waiting if it ever goes back up.
 */
const archiveNames: Record<string, Omit<Curated, 'id'>> = {
	'fly-macro.jpg': {
		title: 'Close quarters',
		category: 'Nature',
		alt: 'A housefly in close macro on dark knitted wool, its red compound eye sharp against a green blur.',
	},
	'IMG_6201.jpg': {
		title: 'Given wings',
		category: 'Nature',
		alt: 'A winged ant on pale cloth, its shadow thrown out behind it.',
	},
	'IMG_6205.jpg': {
		title: 'Nothing but sky',
		category: 'Nature',
		alt: 'A pelican in level flight, alone against an empty blue sky.',
	},
	'IMG_6208.jpg': {
		title: 'What the seed keeps',
		category: 'Details',
		alt: 'Green seed pods lit from behind, magnified past recognition.',
	},
	'IMG_6210.jpg': {
		title: 'Cycle of life',
		category: 'People',
		alt: 'Unfinished clay figures in an idol-makers workshop, a passer-by blurred across the foreground.',
	},
	'IMG_6212.jpg': {
		title: 'Too close to name',
		category: 'Details',
		alt: 'A plant at extreme magnification, blue and green, no longer identifiable.',
	},
	'IMG_6215.jpg': {
		title: 'A footing on nothing',
		category: 'Nature',
		alt: 'A swamphen standing on floating weed, as though on the surface of the water.',
	},
	'IMG_6217.jpg': {
		title: 'The bird and its double',
		category: 'Nature',
		alt: 'A sandpiper in still water, its reflection as sharp as the bird.',
	},
	'IMG_6219.jpg': {
		title: 'A wing, held to light',
		category: 'Details',
		alt: 'A dragonfly gripping a dark rod, the veining of its wings lit from behind.',
	},
	'IMG_6221.jpg': {
		title: 'Standing very still',
		category: 'Nature',
		alt: 'A black-winged stilt on long pink legs, doubled in the water below it.',
	},
	'IMG_6224.jpg': {
		title: 'The transaction',
		category: 'Nature',
		alt: 'A honeybee working the centre of an orange chrysanthemum.',
	},
	'IMG_6223.jpg': {
		title: 'Eye level with a god',
		category: 'People',
		alt: 'A craftsman working at the face of a large unfinished clay Ganesh, lit by a single bulb.',
	},
	'IMG_6227.jpg': {
		title: 'A face that has decided',
		category: 'People',
		alt: 'An elderly woman in glasses and a dark shawl, photographed in dappled light.',
	},
	'IMG_6229.jpg': {
		title: 'He agreed to be photographed',
		category: 'People',
		alt: 'An older man sheltering under a white umbrella, smiling straight into the lens.',
	},
	'IMG_6231.jpg': {
		title: 'A country on a door',
		category: 'Details',
		alt: 'A small Indian flag angled out from a weathered blue door.',
	},
	'IMG_6233.jpg': {
		title: 'Asleep against green',
		category: 'Places',
		alt: 'A street dog curled on sacking at the foot of a flat green wall.',
	},
	'IMG_6235.jpg': {
		title: 'A hard look',
		category: 'Nature',
		alt: 'A black and white cat facing the camera, green-eyed and unmoved.',
	},
	'IMG_6237.jpg': {
		title: 'A well of light',
		category: 'Places',
		alt: 'Looking up through a courtyard lightwell at hung cloth and stacked balconies.',
	},
	'IMG_6239.jpg': {
		title: 'Borrowed daylight',
		category: 'Details',
		alt: 'Palm fronds crossing a fluorescent tube in the dark.',
	},
	'IMG_6241.jpg': {
		title: 'Almost nothing',
		category: 'Details',
		alt: 'Two lit tubes on black, the frame reduced to a broken white line.',
	},
	'IMG_6244.jpg': {
		title: 'Raichak',
		category: 'Places',
		alt: 'A single boat on a wide pale river, the far bank barely there.',
	},
	'IMG_6247.jpg': {
		title: 'Fog takes the town',
		category: 'Places',
		alt: 'A hill town losing its edges to fog, one tree and one tin roof left.',
	},
	'IMG_6248.jpg': {
		title: 'One lamp, one wall',
		category: 'Details',
		alt: 'A caged lantern burning against bare brick.',
	},
	'IMG_6249.jpg': {
		title: 'Open for the morning',
		category: 'Nature',
		alt: 'A blue morning glory open in the wet, held on a tangle of bare stems.',
	},
	'IMG_6252.jpg': {
		title: 'Varanasi, asleep',
		category: 'Places',
		alt: 'Moored boats along a Varanasi ghat at night, the far lights soft in mist.',
	},
	'IMG_6254.jpg': {
		title: 'The god on the steps',
		category: 'Details',
		alt: 'Krishna painted on a ghat wall beside the steps that pass it every day.',
	},
	'IMG_6256.jpg': {
		title: 'Fire in unison',
		category: 'People',
		alt: 'Priests raising lamps together at the evening aarti, smoke across the light.',
	},
	'IMG_6259.jpg': {
		title: 'Kullu, before the leaves',
		category: 'Places',
		alt: 'A bare apple orchard on new grass, snow on the range behind it.',
	},
	'IMG_6262.jpg': {
		title: 'The white side of the hill',
		category: 'Places',
		alt: 'A snow-covered slope above a stand of leafless poplars at Sissu.',
	},
	'IMG_6264.jpg': {
		title: 'A town under the snowline',
		category: 'Places',
		alt: 'Houses on a Himalayan hillside with the snow peaks holding the horizon.',
	},
	'IMG_6266.jpg': {
		title: 'Slate and far ranges',
		category: 'Places',
		alt: 'A slate roof in the foreground, deodars and ridge after ridge beyond it.',
	},
	'IMG_6270.jpg': {
		title: 'The rain settles in',
		category: 'Places',
		alt: 'A long row of tiled quarters under monsoon mist, the road wet end to end.',
	},
	'IMG_6272.jpg': {
		title: 'Where two roofs meet',
		category: 'Details',
		alt: 'The inside corner of two tiled roofs above a white lattice balustrade.',
	},
	'IMG_6274.jpg': {
		title: 'Seedheads, before the rain',
		category: 'Nature',
		alt: 'Grass seedheads held against a low grey sky.',
	},
	'IMG_6277.jpg': {
		title: 'The far bank',
		category: 'Places',
		alt: 'A wide river under open sky, the opposite shore a thin line of trees.',
	},
	'IMG_6278.jpg': {
		title: 'Locked, still receiving post',
		category: 'Details',
		alt: 'Padlocked blue doors with a wooden letterbox still fixed beside them.',
	},
	'IMG_6280.jpg': {
		title: 'Alleppey, doubled',
		category: 'Places',
		alt: 'A temple and its palms repeated in the still water in front of them.',
	},
	'IMG_6282.jpg': {
		title: 'Miles to go',
		category: 'Nature',
		alt: 'A half-bare tree reaching into a wide evening sky.',
	},
	'IMG_6284.jpg': {
		title: 'Mayapur, lit from inside',
		category: 'Places',
		alt: 'Arched galleries glowing against a black sky at night.',
	},
	'IMG_6286.jpg': {
		title: 'Someone at the far end',
		category: 'Places',
		alt: 'A long arched corridor lined with potted plants, one figure at the end of it.',
	},
	'IMG_6288.jpg': {
		title: 'Under the frangipani',
		category: 'Places',
		alt: 'A red pavilion behind planted beds, frangipani branching across the top of the frame.',
	},
};

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
	const curatedEntry = curatedById.get(id);
	// A named archive frame reads exactly like a curated one everywhere a
	// caption is printed; `selected` is what still separates the twelve.
	const c = curatedEntry ?? archiveNames[id];
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
		selected: Boolean(curatedEntry),
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

/**
 * The hang: fifty frames, in the order they should be met.
 *
 * Not curated-then-archive, and not by frame number — ordered by how much
 * each photograph earns a second look, strongest first, so that whatever a
 * visitor sees before they decide to keep scrolling is the best of it. The
 * opening dozen deliberately alternates subject: a workshop, an animal, a
 * river, a bird, a building, a face. One kind of picture twelve times
 * running reads as a set; six kinds reads as an eye.
 *
 * Frame 013 sits last by request.
 *
 * Worth knowing before reordering: `.hoobie-collage` is CSS multi-column,
 * which fills column-major. Item 1 is top-left, but items 2 onward run
 * *down* the first column — the visible top row is roughly items 1, 14, 27
 * and 39, and exactly which depends on how the browser balances the
 * heights. That is why quality is front-loaded across the whole first half
 * rather than into the first four slots.
 */
const HANG = [
	// Openers — the ones that stop you.
	'IMG_6254.jpg', // 055 The god on the steps
	'IMG_6245.jpg', // 07 Tea country
	'IMG_6230.jpg', // 05 Bridge in fog
	'IMG_6205.jpg', // 015 Nothing but sky
	'IMG_6225.jpg', // 03 Marble after dusk
	'IMG_6214.jpg', // 06 Morning pages
	'IMG_6217.jpg', // 025 The bird and its double
	'IMG_6268.jpg', // 10 Threshold
	'IMG_6227.jpg', // 032 A face that has decided
	'IMG_6289.jpg', // 12 The traveller
	'IMG_6229.jpg', // 033 He agreed to be photographed
	'IMG_6221.jpg', // 028 Standing very still
	'IMG_6228.jpg', // 04 A closer world
	'fly-macro.jpg', // 086 Close quarters
	// Strong.
	'IMG_6244.jpg', // 046 Raichak
	'IMG_6210.jpg', // 019 Cycle of life
	'IMG_6224.jpg', // 030 The transaction
	'IMG_6252.jpg', // 053 Varanasi, asleep
	'IMG_6233.jpg', // 036 Asleep against green
	'IMG_6219.jpg', // 026 A wing, held to light
	'IMG_6256.jpg', // 057 Fire in unison
	'IMG_6223.jpg', // 029 Eye level with a god
	'IMG_6280.jpg', // 077 Alleppey, doubled
	'IMG_6215.jpg', // 023 A footing on nothing
	'IMG_6278.jpg', // 075 Locked, still receiving post
	'IMG_6260.jpg', // 09 Winter silence
	'IMG_6281.jpg', // 11 Weather turning
	'IMG_6249.jpg', // 050 Open for the morning
	// Good.
	'IMG_6247.jpg', // 048 Fog takes the town
	'IMG_6266.jpg', // 065 Slate and far ranges
	'IMG_6237.jpg', // 040 A well of light
	'IMG_6235.jpg', // 038 A hard look
	'IMG_6270.jpg', // 067 The rain settles in
	'IMG_6284.jpg', // 080 Mayapur, lit from inside
	'IMG_6258.jpg', // 08 Last light
	'IMG_6264.jpg', // 063 A town under the snowline
	'IMG_6259.jpg', // 059 Kullu, before the leaves
	'IMG_6274.jpg', // 071 Seedheads, before the rain
	'IMG_6286.jpg', // 082 Someone at the far end
	'IMG_6262.jpg', // 061 The white side of the hill
	'IMG_6204.jpg', // 01 The quiet between tasks
	// Quieter — the ones that reward a reader rather than a scanner.
	'IMG_6206.jpg', // 02 Durga in motion
	'IMG_6272.jpg', // 069 Where two roofs meet
	'IMG_6277.jpg', // 074 The far bank
	'IMG_6288.jpg', // 084 Under the frangipani
	'IMG_6282.jpg', // 078 Miles to go
	'IMG_6239.jpg', // 042 Borrowed daylight
	'IMG_6208.jpg', // 017 What the seed keeps
	'IMG_6248.jpg', // 049 One lamp, one wall
	'IMG_6212.jpg', // 021 Too close to name
	'IMG_6241.jpg', // 044 Almost nothing
	'IMG_6201.jpg', // 013 Given wings — last, by request
];

if (new Set(HANG).size !== HANG.length) {
	throw new Error('The hang lists the same frame twice');
}
for (const c of curated) {
	if (!HANG.includes(c.id)) {
		throw new Error(`${c.id} is one of the twelve but is not in the hang`);
	}
}
for (const id of HANG) {
	if (!curatedById.has(id) && !archiveNames[id]) {
		throw new Error(`${id} is in the hang with no name in archiveNames`);
	}
}

export const hang: Photo[] = HANG.map(photo);

/** Frame number as it is printed everywhere: 01, 07, 013, 085. */
export const frameNumber = (n: number): string =>
	String(n).padStart(n > 12 ? 3 : 2, '0');
