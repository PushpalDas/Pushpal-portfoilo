import { moreInTrack } from '../../work/tracks';
import WorkHighlights from './work-highlights';
import { workHighlights } from './workHighlights';

/**
 * Server half of the Work section: every count on the page is derived from
 * app/work/constants.ts here, at build time, and handed down as numbers.
 * Nothing downstream is allowed to carry its own copy of a figure.
 */
export default function Works() {
	const featured = workHighlights.map((highlight) => highlight.slug);

	return (
		<WorkHighlights
			moreCounts={{
				silicon: moreInTrack('silicon', featured),
				ai: moreInTrack('ai', featured),
			}}
		/>
	);
}
