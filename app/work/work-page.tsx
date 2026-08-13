'use client';

import { useMemo, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useBreakpoint from 'use-breakpoint';
import Contact from '../components/contact';
import { type FilterKey, workItems } from './constants';
import './work.css';
import WorkFilters from './work-filters';
import WorkGrid from './work-grid';
import WorkHeader from './work-header';

const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

function WorkPageInner() {
	const { breakpoint } = useBreakpoint(BREAKPOINTS);
	const router = useRouter();
	const searchParams = useSearchParams();

	const filterParam = searchParams.get('filter') as FilterKey | null;
	const initialFilter: FilterKey = filterParam && ['all', 'product', 'engineering'].includes(filterParam) 
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

	const STATUS_ORDER: Record<string, number> = {
		'production': 1,
		'internal': 2,
		'customer-testing': 3,
		'prototype': 4,
		'research': 5,
		'null': 6,
	};

	const sortedItems = useMemo(() => {
		const withIndex = workItems.map((item, index) => ({ item, index }));
		
		withIndex.sort((a, b) => {
			const aStatus = a.item.status || 'null';
			const bStatus = b.item.status || 'null';
			
			const aStatusRank = STATUS_ORDER[aStatus as keyof typeof STATUS_ORDER];
			const bStatusRank = STATUS_ORDER[bStatus as keyof typeof STATUS_ORDER];
			
			if (aStatusRank !== bStatusRank) {
				return aStatusRank - bStatusRank;
			}

			const aYear = parseInt(a.item.year.replace(/\D/g, '')) || 0;
			const bYear = parseInt(b.item.year.replace(/\D/g, '')) || 0;
			
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
