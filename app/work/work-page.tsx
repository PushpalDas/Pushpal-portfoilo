'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';
import Contact from '../components/contact';
import { type FilterKey, filters, workItems } from './constants';
import './work.css';
import { filterWorkItems, sortWorkItems } from './order';
import WorkFilters from './work-filters';
import WorkGrid from './work-grid';
import WorkHeader from './work-header';

const FILTER_KEYS: FilterKey[] = filters.map((f) => f.key);

/**
 * The pill /work opens on when the URL names none. Silicon & systems, at
 * the author's request (2026-09-10) — the page leads with the silicon
 * work rather than the whole catalogue. All is one pill away and keeps
 * its own URL, ?filter=all.
 */
const DEFAULT_FILTER: FilterKey = 'silicon';

const isFilterKey = (value: string | null): value is FilterKey =>
	FILTER_KEYS.includes(value as FilterKey);

/**
 * Links written before the row was flattened. `?domain=` was the track
 * sub-filter and `?filter=product|engineering` the level above it; both
 * still land where the reader meant to go.
 */
const LEGACY_KEYS: Record<string, FilterKey> = {
	product: 'all',
	engineering: 'personal',
	silicon: 'silicon',
	ai: 'ai',
	// Prototypes & research and Others were folded into Personal (2026-09-10).
	prototypes: 'personal',
	others: 'personal',
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
			DEFAULT_FILTER);

	const setFilterWithUrl = (filter: FilterKey) => {
		const params = new URLSearchParams(searchParams.toString());
		if (filter === DEFAULT_FILTER) {
			params.delete('filter');
		} else {
			params.set('filter', filter);
		}
		// The old sub-level param would otherwise fight the click.
		params.delete('domain');
		router.replace(`?${params.toString()}`, { scroll: false });
	};

	// One sort and one filter, shared with the home page's Selected work
	// section (app/work/order.ts) so both number a shelf the same way.
	const sortedItems = useMemo(() => sortWorkItems(workItems), []);
	const filteredItems = useMemo(
		() => filterWorkItems(sortedItems, activeFilter),
		[activeFilter, sortedItems],
	);

	return (
		<div className='work-page'>
			<WorkHeader
				activeFilter={activeFilter}
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
