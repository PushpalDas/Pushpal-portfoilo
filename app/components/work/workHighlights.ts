/**
 * Home-page work highlights — the shape of the section, and nothing else.
 *
 * Nothing on a home card is typed here. Every card is the /work card for
 * the same piece of work, built in works.tsx at build time from the work
 * item in app/work/constants.ts (title, outcome, company, domain, image,
 * status, demo link) and its case study in data/case-studies-v2.json (the
 * numbers, the summary, the role and stage). The group headings and the
 * pill row above them are the /work filter pills, by label. The home page
 * therefore cannot say anything the work page does not.
 *
 * Which cards, and in what order, is not a choice made here either: each
 * group is the first HIGHLIGHTS_PER_TRACK cards /work shows under that
 * track's pill — the track's serial numbers 1..n. The work page's `order`
 * field is the lever.
 */

export type HighlightTrack = 'silicon' | 'ai';

export type HighlightGroup = {
	/** Also the /work filter pill whose label the group is headed by. */
	track: HighlightTrack;
	/** The "+n more" row at the end of the group. `n` is computed, never typed. */
	more: { href: string };
};

/** How many of each track the home page shows: serial numbers 1..6. */
export const HIGHLIGHTS_PER_TRACK = 6;

/** How many of the case study's numbers fit on the face of a card. */
export const METRICS_PER_CARD = 3;

export const highlightGroups: HighlightGroup[] = [
	{ track: 'silicon', more: { href: '/work?filter=silicon' } },
	{ track: 'ai', more: { href: '/work?filter=ai' } },
];
