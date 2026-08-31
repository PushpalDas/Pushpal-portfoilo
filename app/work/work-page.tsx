'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';
import Contact from '../components/contact';
import { type FilterKey, filters, workItems } from './constants';
import './work.css';
import { WORK_STATUS_ORDER } from './status';
import WorkFilters from './work-filters';
import WorkGrid from './work-grid';
import WorkHeader from './work-header';

const FILTER_KEYS: FilterKey[] = filters.map((f) => f.key);

const isFilterKey = (value: string | null): value is FilterKey =>
	FILTER_KEYS.includes(value as FilterKey);

/**
 * Links written before the row was flattened. `?domain=` was the track
 * sub-filter and `?filter=product|engineering` the level above it; both
 * still land where the reader meant to go.
 */
const LEGACY_KEYS: Record<string, FilterKey> = {
	product: 'all',
	engineering: 'others',
	silicon: 'silicon',
	ai: 'ai',
};

function WorkPageInner() {
	const router = useRouter();
	const searchParams = useSearchParams();

	// The URL is the single source of truth. The home page's "+n" rows deep-link
	// straight in, so a pasted link and a click have to land in exactly the same
	// state. `?domain=` is read only as a fallback, for links that predate the
	// flat row.
	const filterParam = searchParams.get('filter');
	const domainParam = searchParams.get('domain');

	const activeFilter: FilterKey = isFilterKey(filterParam)
		? filterParam
		: (LEGACY_KEYS[filterParam ?? ''] ??
			LEGACY_KEYS[domainParam ?? ''] ??
			'all');

	const setFilterWithUrl = (filter: FilterKey) => {
		const params = new URLSearchParams(searchParams.toString());
		if (filter === 'all') {
			params.delete('filter');
		} else {
			params.set('filter', filter);
		}
		// The old sub-level param would otherwise fight the click.
		params.delete('domain');
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

	/**
	 * The flat grid, restored at the author's request: three per row in the
	 * original status/year/file order. The program-overview card is the one
	 * exception — it was never part of this grid, so it stays off it (the
	 * page itself remains at /work/ixana-internal-ai-program). Tier fields
	 * on the data survive as metadata only.
	 */
	const filteredItems = useMemo(() => {
		const items = sortedItems.filter((w) => !w.programHead);
		if (activeFilter === 'all') return items;
		if (activeFilter === 'others') {
			return items.filter((w) => w.category === 'engineering');
		}
		if (activeFilter === 'prototypes') {
			return items.filter(
				(w) => w.status === 'prototype' || w.status === 'research',
			);
		}
		return items.filter((w) => w.track === activeFilter);
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
				{filteredItems.length > 0 ? (
					<WorkGrid
						items={filteredItems}
						gridColumns={3}
						filter={activeFilter === 'all' ? undefined : activeFilter}
					/>
				) : (
					<p className='work-empty'>
						Nothing in this combination — try another filter.
					</p>
				)}
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
