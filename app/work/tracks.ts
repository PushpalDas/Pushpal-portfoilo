/**
 * Tracks — the two groupings the home page highlights and the `/work` filter
 * row are built from. Kept beside the work data because both readers derive
 * their numbers from `workItems` rather than carrying their own copies:
 * nothing in this file is a typed-in count. The pill labels themselves live
 * with the rest of the row, in `constants.ts`.
 */

import { workItems } from './constants';
import type { WorkItem } from './types';

export type TrackKey = NonNullable<WorkItem['track']>;

/** Every product entry carrying this track. */
export function productsInTrack(track: TrackKey): WorkItem[] {
	return workItems.filter(
		(item) => item.category === 'product' && item.track === track,
	);
}

/**
 * The "+n more" figure: products on this track that the home page is not
 * already showing. Featured slugs are passed in so the count can never
 * drift from the highlights list.
 */
export function moreInTrack(track: TrackKey, featuredSlugs: string[]): number {
	const featured = new Set(featuredSlugs);
	return productsInTrack(track).filter(
		(item) => !item.slug || !featured.has(item.slug),
	).length;
}
