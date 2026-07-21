'use client';

import { useMemo, useState } from 'react';
import useBreakpoint from 'use-breakpoint';
import Contact from '../components/contact';
import { type FilterKey, workItems } from './constants';
import FloatingImage from './floating-image';
import type { WorkModal } from './types';
import './work.css';
import WorkFilters from './work-filters';
import WorkGrid from './work-grid';
import WorkHeader from './work-header';

const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

export default function WorkPage() {
	const { breakpoint } = useBreakpoint(BREAKPOINTS);
	const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
	const [modal, setModal] = useState<WorkModal>({ active: false, index: 0 });

	const WORK_CATEGORY_ORDER = ['products', 'core'];

	// main filtered items based on primary filter
	const filteredItems = useMemo(() => {
		if (activeFilter !== 'all') {
			return workItems.filter((w) => w.categories.includes(activeFilter));
		}
		// Sort by category priority: products → core
		return [...workItems].sort((a, b) => {
			const aPriority = WORK_CATEGORY_ORDER.findIndex((cat) =>
				a.categories.some((c) => c.toLowerCase() === cat),
			);
			const bPriority = WORK_CATEGORY_ORDER.findIndex((cat) =>
				b.categories.some((c) => c.toLowerCase() === cat),
			);
			const aIdx = aPriority === -1 ? WORK_CATEGORY_ORDER.length : aPriority;
			const bIdx = bPriority === -1 ? WORK_CATEGORY_ORDER.length : bPriority;
			return aIdx - bIdx;
		});
	}, [activeFilter]);

	return (
		<div className='work-page'>
			<WorkHeader
				filters={
					<WorkFilters
						activeFilter={activeFilter}
						setActiveFilter={setActiveFilter}
					/>
				}
			/>
			<div className='work-content-wrap'>
				<WorkGrid items={filteredItems} gridColumns={4} />
			</div>
			<Contact />
		</div>
	);
}
