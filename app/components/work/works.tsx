import { workItems } from '../../work/constants';
import { WORK_STATUSES } from '../../work/status';
import { moreInTrack } from '../../work/tracks';
import WorkHighlights, { type Badge } from './work-highlights';
import { workHighlights } from './workHighlights';

/**
 * Server half of the Work section: every count and badge on the page is
 * derived from app/work/constants.ts here, at build time, and handed down
 * as plain values. Nothing downstream carries its own copy of a figure,
 * and the 28KB of work data never reaches the client bundle.
 */
export default function Works() {
	const featured = workHighlights.map((highlight) => highlight.slug);

	const badges: Record<string, Badge | null> = {};
	for (const highlight of workHighlights) {
		const item = workItems.find((w) => w.slug === highlight.slug);
		badges[highlight.slug] = item?.status ? WORK_STATUSES[item.status] : null;
	}

	return (
		<WorkHighlights
			moreCounts={{
				silicon: moreInTrack('silicon', featured),
				ai: moreInTrack('ai', featured),
			}}
			badges={badges}
		/>
	);
}
