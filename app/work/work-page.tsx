'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useMemo, useState } from 'react';
import Contact from '../components/contact';
import { type FilterKey, workItems } from './constants';
import './work.css';
import { WORK_STATUS_ORDER } from './status';
import { isTrackFilterKey, type TrackFilterKey } from './tracks';
import WorkDomainFilters from './work-domain-filters';
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

	// The domain pills are deep-linked from the home page, so the URL is the
	// source of truth rather than a second copy of it in component state.
	const domainParam = searchParams.get('domain');
	const activeTrack: TrackFilterKey = isTrackFilterKey(domainParam)
		? domainParam
		: 'all';

	const setTrackWithUrl = (track: TrackFilterKey) => {
		const params = new URLSearchParams(searchParams.toString());
		if (track === 'all') {
			params.delete('domain');
		} else {
			params.set('domain', track);
		}
		router.replace(`?${params.toString()}`, { scroll: false });
	};

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
		let items = sortedItems;
		if (activeFilter !== 'all') {
			items = items.filter((w) => w.category === activeFilter);
		}
		if (activeTrack !== 'all') {
			items = items.filter((w) => w.track === activeTrack);
		}
		return items;
	}, [activeFilter, activeTrack, sortedItems]);

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
				<WorkDomainFilters
					activeTrack={activeTrack}
					setActiveTrack={setTrackWithUrl}
				/>
				{filteredItems.length > 0 ? (
					<>
						<div className='work-section-divider'>
							<span className='work-section-divider-text'>CASE STUDIES</span>
							<div className='work-section-divider-line'></div>
						</div>
						<WorkGrid items={filteredItems} gridColumns={3} />
					</>
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
