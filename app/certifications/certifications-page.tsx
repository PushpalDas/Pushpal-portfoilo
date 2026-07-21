'use client';

import { useMemo, useState } from 'react';
import useBreakpoint from 'use-breakpoint';
import Contact from '../components/contact';
import { type FilterKey, certificationItems } from './constants';
import FloatingImage from './floating-image';
import type { CertificationModal } from './types';
import './certifications.css';
import CertificationsFilters from './certifications-filters';
import CertificationsGrid from './certifications-grid';
import CertificationsHeader from './certifications-header';

const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

export default function CertificationsPage() {
	const { breakpoint } = useBreakpoint(BREAKPOINTS);
	const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
	const [modal, setModal] = useState<CertificationModal>({
		active: false,
		index: 0,
	});

	const CERT_CATEGORY_ORDER = ['management', 'skills', 'achievements'];

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
				<CertificationsGrid items={filteredItems} gridColumns={4} />
			</div>
			<Contact />
		</div>
	);
}
