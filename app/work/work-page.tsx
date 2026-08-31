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

	/**
	 * The tiered front door renders on the default view only. A track or
	 * category filter is a deliberate slice, so it keeps the flat grid the
	 * home page's deep links were built against — same URLs, same results.
	 */
	const tiered = activeFilter === 'all' && activeTrack === 'all';

	const tiers = useMemo(() => {
		const products = sortedItems.filter((w) => w.category === 'product');
		const flagship = products.filter((w) => w.tier === 1);
		const programHead = products.find((w) => w.programHead);
		const chapters = products.filter((w) => w.tier === 2 && !w.programHead);
		const t3 = products.filter((w) => w.tier === 3);
		const selected = t3.filter(
			(w) => w.status !== 'prototype' && w.status !== 'research',
		);
		const prototypes = t3.filter(
			(w) => w.status === 'prototype' || w.status === 'research',
		);
		const archive = products.filter((w) => (w.tier ?? 4) === 4);
		const appendix = sortedItems.filter((w) => w.category !== 'product');
		return { flagship, programHead, chapters, selected, prototypes, archive, appendix };
	}, [sortedItems]);

	const divider = (text: string, sub?: string) => (
		<div className='work-section-divider'>
			<span className='work-section-divider-text'>{text}</span>
			<div className='work-section-divider-line'></div>
			{sub && <p className='work-tier-sub'>{sub}</p>}
		</div>
	);

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
				{!tiered && (
					<>
						<div className='work-section-divider'>
							<span className='work-section-divider-text'>CASE STUDIES</span>
							<div className='work-section-divider-line'></div>
						</div>
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
					</>
				)}

				{tiered && (
					<>
						{divider(
							'FLAGSHIP',
							'Six pages with the strongest public evidence behind them — shipped silicon with spec pages, live demos, published work.',
						)}
						<WorkGrid items={tiers.flagship} gridColumns={2} />

						{divider(
							'THE INTERNAL AI PROGRAM',
							'Fourteen tools built and run as one program. The program page carries the doctrine; every chapter is a full case study.',
						)}
						{tiers.programHead && (
							<WorkGrid items={[tiers.programHead]} gridColumns={2} />
						)}
						<ul className='work-chapters'>
							{tiers.chapters.map((c) => (
								<li key={c.slug}>
									<a href={`/work/${c.slug}`}>
										<span className='work-chapter-title'>{c.title}</span>
										<span className='work-chapter-note'>{c.outcome}</span>
									</a>
								</li>
							))}
						</ul>

						{divider(
							'SELECTED WORK',
							'Standalone pieces across silicon, hardware and applied AI.',
						)}
						<WorkGrid items={tiers.selected} gridColumns={3} />

						{divider(
							'PROTOTYPES & RESEARCH',
							'Built to test a claim, and honest about which claims remain untested. None of these shipped to users — deliberately labelled, never disguised.',
						)}
						<WorkGrid items={tiers.prototypes} gridColumns={3} />

						{divider(
							'ARCHIVE & APPENDIX',
							'Earlier work, kept for the record.',
						)}
						<ul className='work-archive'>
							{[...tiers.archive, ...tiers.appendix].map((a) => (
								<li key={a.title}>
									{a.href ? (
										<a href={a.href} target='_blank' rel='noopener noreferrer'>
											{a.title}
										</a>
									) : (
										<span>{a.title}</span>
									)}
									<span className='work-archive-meta'>
										{a.company.trim()} · {a.year.trim()}
									</span>
								</li>
							))}
						</ul>
					</>
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
