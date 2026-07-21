'use client';

import { useMemo } from 'react';
import Magnetic from '../components/Magnetic';
import { type FilterKey, filters, certificationItems } from './constants';

interface CertificationsFiltersProps {
	activeFilter: FilterKey;
	setActiveFilter: (filter: FilterKey) => void;
}

export default function CertificationsFilters({
	activeFilter,
	setActiveFilter,
}: CertificationsFiltersProps) {
	const counts = useMemo(() => {
		const c: Record<string, number> = {};
		for (const f of filters) {
			if (f.key === 'all') {
				c[f.key] = certificationItems.length;
			} else {
				c[f.key] = certificationItems.filter((cert) =>
					cert.categories.includes(f.key),
				).length;
			}
		}
		return c;
	}, []);

	return (
		<div className='certifications-filters-row'>
			<div className='certifications-filters-toggle-row'>
				{filters.map((f) => (
					<Magnetic key={f.key} strength={15}>
						<button
							type='button'
							className={`certifications-filter-btn${activeFilter === f.key ? ' active' : ''}`}
							onClick={() => setActiveFilter(f.key)}
						>
							<span className='certifications-filter-btn-fill' />
							<span className='certifications-filter-btn-text'>
								{f.label}
								{f.key !== 'all' && (
									<span className='certifications-filter-count'>
										{counts[f.key]}
									</span>
								)}
							</span>
						</button>
					</Magnetic>
				))}
			</div>
		</div>
	);
}
