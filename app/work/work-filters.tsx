'use client';

import { useMemo } from 'react';
import Magnetic from '../components/Magnetic';
import { type FilterKey, filters, workItems } from './constants';

interface WorkFiltersProps {
	activeFilter: FilterKey;
	setActiveFilter: (filter: FilterKey) => void;
}

export default function WorkFilters({
	activeFilter,
	setActiveFilter,
}: WorkFiltersProps) {
	const counts = useMemo(() => {
		const c: Record<string, number> = {};
		for (const f of filters) {
			if (f.key === 'all') {
				c[f.key] = workItems.length;
			} else {
				c[f.key] = workItems.filter((w) => w.categories.includes(f.key)).length;
			}
		}
		return c;
	}, []);

	return (
		<div className='work-filters-row'>
			<div className='work-filters-toggle-row'>
				{filters
					.filter((f) => !['ai', 'hardware', 'others'].includes(f.key))
					.map((f) => (
						<Magnetic key={f.key} strength={15}>
							<button
								type='button'
								className={`work-filter-btn${activeFilter === f.key ? ' active' : ''}`}
								onClick={() => setActiveFilter(f.key)}
							>
								<span className='work-filter-btn-fill' />
								<span className='work-filter-btn-text'>
									{f.label}
									{f.key !== 'all' && counts[f.key] > 0 && (
										<span className='work-filter-count'>{counts[f.key]}</span>
									)}
								</span>
							</button>
						</Magnetic>
					))}
			</div>
		</div>
	);
}
