'use client';

import Magnetic from '../components/Magnetic';
import { TRACK_FILTERS, type TrackFilterKey } from './tracks';

interface WorkDomainFiltersProps {
	activeTrack: TrackFilterKey;
	setActiveTrack: (track: TrackFilterKey) => void;
}

/**
 * The `?domain=` pill row. Deep-linked from the home page's "+n more" rows,
 * so the URL is the source of truth and these pills only reflect it.
 */
export default function WorkDomainFilters({
	activeTrack,
	setActiveTrack,
}: WorkDomainFiltersProps) {
	return (
		<div className='work-domain-row'>
			{TRACK_FILTERS.map((filter) => (
				<Magnetic key={filter.key} strength={15}>
					<button
						type='button'
						className={`work-filter-btn${activeTrack === filter.key ? ' active' : ''}`}
						onClick={() => setActiveTrack(filter.key)}
						aria-pressed={activeTrack === filter.key}
					>
						<span className='work-filter-btn-fill' />
						<span className='work-filter-btn-text'>{filter.label}</span>
					</button>
				</Magnetic>
			))}
		</div>
	);
}
