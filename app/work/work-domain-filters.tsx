'use client';

import Magnetic from '../components/Magnetic';
import { TRACK_FILTERS, type TrackFilterKey } from './tracks';

interface WorkDomainFiltersProps {
	activeTrack: TrackFilterKey;
	setActiveTrack: (track: TrackFilterKey) => void;
	/** Tracks are the sub-level of Products; the row only exists under it. */
	open: boolean;
}

/**
 * The `?domain=` sub-pills. Deep-linked from the home page's "+n more" rows,
 * so the URL is the source of truth and these only reflect it.
 *
 * The row stays in the DOM so it can reveal with a grid-template-rows
 * transition rather than appearing from nothing, and goes inert when closed
 * so its buttons leave the tab order with it.
 */
export default function WorkDomainFilters({
	activeTrack,
	setActiveTrack,
	open,
}: WorkDomainFiltersProps) {
	return (
		<div className='work-domain-reveal' data-open={open} aria-hidden={!open}>
			<div className='work-domain-reveal-inner'>
				<div className='work-domain-row' inert={!open}>
					{TRACK_FILTERS.map((filter) => (
						<Magnetic key={filter.key} strength={12}>
							<button
								type='button'
								className={`work-filter-btn work-domain-btn${
									activeTrack === filter.key ? ' active' : ''
								}`}
								onClick={() => setActiveTrack(filter.key)}
								aria-pressed={activeTrack === filter.key}
							>
								<span className='work-filter-btn-fill' />
								<span className='work-filter-btn-text'>{filter.label}</span>
							</button>
						</Magnetic>
					))}
				</div>
			</div>
		</div>
	);
}
