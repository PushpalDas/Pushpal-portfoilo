'use client';

import Magnetic from '../components/Magnetic';
import { type FilterKey, filters } from './constants';

interface WorkFiltersProps {
	activeFilter: FilterKey;
	setActiveFilter: (filter: FilterKey) => void;
}

/* The pills share the headline's baseline, so "From Silicon to AI" and
   the categories read as one invisible line. The below-line row is kept
   for a future catch-all; today every pill sits on the line. */
const BELOW_LINE_KEYS: string[] = [];
const LINE_FILTERS = filters.filter((f) => !BELOW_LINE_KEYS.includes(f.key));
const BELOW_LINE_FILTERS = filters.filter((f) =>
	BELOW_LINE_KEYS.includes(f.key),
);

export default function WorkFilters({
	activeFilter,
	setActiveFilter,
}: WorkFiltersProps) {
	const renderPill = (f: (typeof filters)[number]) => (
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
	);

	return (
		<div className='work-filters-row'>
			<div className='work-filters-toggle-row'>
				{LINE_FILTERS.map(renderPill)}
			</div>
			<div className='work-filters-toggle-row work-filters-below-row'>
				{BELOW_LINE_FILTERS.map(renderPill)}
			</div>
		</div>
	);
}
