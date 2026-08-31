'use client';

import Magnetic from '../components/Magnetic';
import { type FilterKey, filters } from './constants';

interface WorkFiltersProps {
	activeFilter: FilterKey;
	setActiveFilter: (filter: FilterKey) => void;
}

export default function WorkFilters({
	activeFilter,
	setActiveFilter,
}: WorkFiltersProps) {
	return (
		<div className='work-filters-row'>
			<div className='work-filters-toggle-row'>
				{filters.map((f) => (
					<Magnetic key={f.key} strength={15}>
						<button
							type='button'
							className={`work-filter-btn${activeFilter === f.key ? ' active' : ''}`}
							onClick={() => setActiveFilter(f.key)}
							aria-pressed={activeFilter === f.key}
						>
							<span className='work-filter-btn-fill' />
							<span className='work-filter-btn-text'>{f.label}</span>
						</button>
					</Magnetic>
				))}
			</div>
		</div>
	);
}
