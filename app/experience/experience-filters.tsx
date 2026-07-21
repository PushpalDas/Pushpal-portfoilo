'use client';

import { useMemo } from 'react';
import { type FilterKey, filters, experienceItems } from './constants';

interface ExperienceFiltersProps {
	activeFilter: FilterKey;
	setActiveFilter: (filter: FilterKey) => void;
}

export default function ExperienceFilters({
	activeFilter,
	setActiveFilter,
}: ExperienceFiltersProps) {
	const counts = useMemo(() => {
		const c: Record<string, number> = {};
		for (const f of filters) {
			if (f.key === 'all') {
				// count unique companies across all items
				const companies = new Set(experienceItems.map((e) => e.company));
				c[f.key] = companies.size;
			} else {
				const companies = new Set(
					experienceItems
						.filter((e) => e.categories.includes(f.key))
						.map((e) => e.company),
				);
				c[f.key] = companies.size;
			}
		}
		return c;
	}, []);

	return (
		<div className='experience-filters-toggle-row'>
			{filters.map((f) => (
				<button
					key={f.key}
					type='button'
					className={`experience-filter-btn${activeFilter === f.key ? ' active' : ''}`}
					onClick={() => setActiveFilter(f.key)}
				>
					<span className='experience-filter-btn-fill' />
					<span className='experience-filter-btn-text'>
						{f.label}
						{f.key !== 'all' && (
							<span className='experience-filter-count'>{counts[f.key]}</span>
						)}
					</span>
				</button>
			))}
		</div>
	);
}
