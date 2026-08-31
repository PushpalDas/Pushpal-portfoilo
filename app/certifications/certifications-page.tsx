'use client';

import { useMemo, useState } from 'react';
import Contact from '../components/contact';
import CertificationsFilters from './certifications-filters';
import CertificationsGrid from './certifications-grid';
import CertificationsHeader from './certifications-header';
import { certificationItems, type FilterKey } from './constants';
import './certifications.css';

const CERT_CATEGORY_ORDER = ['management', 'skills', 'achievements'];

export default function CertificationsPage() {
	const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

	const filteredItems = useMemo(() => {
		if (activeFilter !== 'all') {
			return certificationItems.filter((c) =>
				c.categories.includes(activeFilter),
			);
		}
		// Sort by category priority: management → skills → achievements
		return [...certificationItems].sort((a, b) => {
			const aPriority = CERT_CATEGORY_ORDER.findIndex((cat) =>
				a.categories.some((c: string) => c.toLowerCase() === cat),
			);
			const bPriority = CERT_CATEGORY_ORDER.findIndex((cat) =>
				b.categories.some((c: string) => c.toLowerCase() === cat),
			);
			const aIdx = aPriority === -1 ? CERT_CATEGORY_ORDER.length : aPriority;
			const bIdx = bPriority === -1 ? CERT_CATEGORY_ORDER.length : bPriority;
			return aIdx - bIdx;
		});
	}, [activeFilter]);

	return (
		<div className='certifications-page'>
			<CertificationsHeader
				filters={
					<CertificationsFilters
						activeFilter={activeFilter}
						setActiveFilter={setActiveFilter}
					/>
				}
			/>
			<div className='certifications-content-wrap'>
				{/* Each tile navigates to /certifications/<slug>. Nothing opens over
				    this page any more, so the filter no longer has to close anything
				    on its way through. */}
				<CertificationsGrid items={filteredItems} gridColumns={4} />
			</div>
			<Contact />
		</div>
	);
}
