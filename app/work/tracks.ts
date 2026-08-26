/**
 * Tracks — the three groupings the home page highlights and `/work?domain=`
 * filter by. Kept beside the work data because both readers derive their
 * numbers from `workItems` rather than carrying their own copies: nothing
 * in this file is a typed-in count.
 */

import { workItems } from './constants';
import type { WorkItem } from './types';

export type TrackKey = NonNullable<WorkItem['track']>;
export type TrackFilterKey = 'all' | TrackKey;

export const TRACK_FILTERS: { key: TrackFilterKey; label: string }[] = [
	{ key: 'all', label: 'All' },
	{ key: 'silicon', label: 'Silicon & systems' },
	{ key: 'ai', label: 'AI programs & platforms' },
	{ key: 'ip', label: 'Patents & IP' },
];

export function isTrackFilterKey(value: string | null): value is TrackFilterKey {
	return TRACK_FILTERS.some((f) => f.key === value);
}

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

/**
 * The one line under the section. `caseStudies` counts the items carrying a
 * slug — the slug is what routes to a written-up case study, and all of them
 * resolve in data/case-studies-v2.json.
 */
export function portfolioTotals(): { caseStudies: number; projects: number } {
	return {
		caseStudies: workItems.filter((item) => item.slug).length,
		projects: workItems.length,
	};
}
