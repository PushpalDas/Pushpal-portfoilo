'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';
import Contact from '../components/contact';
import { type FilterKey, workItems } from './constants';
import './work.css';
import { WORK_STATUS_ORDER } from './status';
import { isTrackFilterKey, type TrackFilterKey } from './tracks';
import WorkDomainFilters from './work-domain-filters';
import WorkFilters from './work-filters';
import WorkGrid from './work-grid';
import WorkHeader from './work-header';

const FILTER_KEYS: FilterKey[] = ['all', 'product', 'engineering'];

function WorkPageInner() {
	const router = useRouter();
	const searchParams = useSearchParams();

	// The URL is the single source of truth for both levels. The home page's
	// "+n" rows deep-link straight in, so a pasted link and a click have to
	// land in exactly the same state.
	const filterParam = searchParams.get('filter') as FilterKey | null;
	const domainParam = searchParams.get('domain');
	const trackFromUrl: TrackFilterKey = isTrackFilterKey(domainParam)
		? domainParam
		: 'all';

	// ?domain= with no ?filter= reads as Products plus that track — which is
	// what the "+n" rows mean.
	const activeFilter: FilterKey =
		filterParam && FILTER_KEYS.includes(filterParam)
			? filterParam
			: trackFromUrl !== 'all'
				? 'product'
				: 'all';

	// Tracks only exist under Products, so they are the sub-level of it.
	const showTracks = activeFilter === 'product';
	const activeTrack: TrackFilterKey = showTracks ? trackFromUrl : 'all';

	const setFilterWithUrl = (filter: FilterKey) => {
		const params = new URLSearchParams(searchParams.toString());
		if (filter === 'all') {
			params.delete('filter');
		} else {
			params.set('filter', filter);
		}
		// Leaving Products takes the track with it.
		if (filter !== 'product') {
			params.delete('domain');
		}
		router.replace(`?${params.toString()}`, { scroll: false });
	};

	const setTrackWithUrl = (track: TrackFilterKey) => {
		const params = new URLSearchParams(searchParams.toString());
		if (track === 'all') {
			params.delete('domain');
		} else {
			params.set('domain', track);
		}
		// A track always implies Products; keep the two levels consistent.
		params.set('filter', 'product');
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
		let items = sortedItems.filter((w) => !w.programHead);
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
				<div className='work-section-divider'>
					<span className='work-section-divider-text'>CASE STUDIES</span>
					<div className='work-section-divider-line'></div>
				</div>
				{/* The track pills belong to the case studies below them, not to
				    the header — so they sit under the line, aligned with the toggle
				    that reveals them. */}
				<WorkDomainFilters
					activeTrack={activeTrack}
					setActiveTrack={setTrackWithUrl}
					open={showTracks}
				/>
				{filteredItems.length > 0 ? (
					<WorkGrid
						items={filteredItems}
						gridColumns={3}
						domain={activeTrack === 'all' ? undefined : activeTrack}
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
