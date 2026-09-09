/**
 * Tracks — the two groupings the home page highlights and the `/work` filter
 * row are built from. Kept beside the work data because both readers derive
 * their numbers from `workItems` rather than carrying their own copies:
 * nothing in this file is a typed-in count. The pill labels themselves live
 * with the rest of the row, in `constants.ts`.
 */

import { workItems } from './constants';
import { filterWorkItems, sortWorkItems } from './order';
import type { WorkItem } from './types';

export type TrackKey = NonNullable<WorkItem['track']>;

/** The cards /work shows under this track's pill, in the order it shows them. */
export function shownInTrack(track: TrackKey): WorkItem[] {
	return filterWorkItems(sortWorkItems(workItems), track);
}

/**
 * The "+n more" figure: cards under this track's pill that the home page
 * is not already showing — the same list the tile links to, so the
 * number a reader clicks is the number of cards they land on. Featured
 * slugs are passed in so the count can never drift from the highlights.
 */
export function moreInTrack(track: TrackKey, featuredSlugs: string[]): number {
	const featured = new Set(featuredSlugs);
	return shownInTrack(track).filter(
		(item) => !item.slug || !featured.has(item.slug),
	).length;
}

/**
 * The first `n` cards the /work page shows under this track's pill, in
 * the order it shows them — the track's serial numbers 1..n. The home
 * page's highlights are held to exactly this list.
 */
export function leadingInTrack(track: TrackKey, n: number): WorkItem[] {
	return shownInTrack(track).slice(0, n);
}
