'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useMemo, useState } from 'react';
import Contact from '../components/contact';
import { type FilterKey, workItems } from './constants';
import './work.css';
import { WORK_STATUS_ORDER } from './status';
import WorkFilters from './work-filters';
import WorkGrid from './work-grid';
import WorkHeader from './work-header';

function WorkPageInner() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const filterParam = searchParams.get('filter') as FilterKey | null;
	const initialFilter: FilterKey =
		filterParam && ['all', 'product', 'engineering'].includes(filterParam)
			? filterParam
			: 'all';

	const [activeFilter, setActiveFilter] = useState<FilterKey>(initialFilter);

	const setFilterWithUrl = (filter: FilterKey) => {
		setActiveFilter(filter);
		const params = new URLSearchParams(searchParams.toString());
		if (filter === 'all') {
			params.delete('filter');
		} else {
			params.set('filter', filter);
		}
		router.replace(`?${params.toString()}`, { scroll: false });
	};

	const sortedItems = useMemo(() => {
		const withIndex = workItems.map((item, index) => ({ item, index }));

		withIndex.sort((a, b) => {
			const aStatus = a.item.status || 'none';
			const bStatus = b.item.status || 'none';

			const aStatusRank = WORK_STATUS_ORDER[aStatus];
			const bStatusRank = WORK_STATUS_ORDER[bStatus];

			if (aStatusRank !== bStatusRank) {
				return aStatusRank - bStatusRank;
			}

			const aYear = Number.parseInt(a.item.year.replace(/\D/g, ''), 10) || 0;
			const bYear = Number.parseInt(b.item.year.replace(/\D/g, ''), 10) || 0;

			if (aYear !== bYear) {
				return bYear - aYear;
			}

			return a.index - b.index;
		});

		return withIndex.map((w) => w.item);
	}, []);

	const filteredItems = useMemo(() => {
		if (activeFilter !== 'all') {
			return sortedItems.filter((w) => w.category === activeFilter);
		}
		return sortedItems;
	}, [activeFilter, sortedItems]);

	return (
		<div className='work-page'>
			<WorkHeader
				filters={
					<WorkFilters
						activeFilter={activeFilter}
						setActiveFilter={setFilterWithUrl}
					/>
				}
			/>
			<div className='work-content-wrap'>
				<div className='work-section-divider'>
					<span className='work-section-divider-text'>CASE STUDIES</span>
					<div className='work-section-divider-line'></div>
				</div>
				<WorkGrid items={filteredItems} gridColumns={3} />
			</div>
			<Contact />
		</div>
	);
}

export default function WorkPage() {
	return (
		<Suspense fallback={<div className='work-page' />}>
			<WorkPageInner />
		</Suspense>
	);
}
