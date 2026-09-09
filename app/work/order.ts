import type { FilterKey } from './constants';
import { WORK_STATUS_ORDER } from './status';
import type { WorkItem } from './types';

/**
 * The one order every view of the work reads in. The /work grid renders
 * it directly, and the home page's Selected work section checks its
 * highlights against it, so the two can never number the same shelf
 * differently.
 *
 * Status group first (production → internal → customer-testing →
 * prototype → research), then the hand-set `order` inside the group,
 * then newest start year, then file order in constants.ts.
 */
export function sortWorkItems(items: WorkItem[]): WorkItem[] {
	const withIndex = items.map((item, index) => ({ item, index }));

	withIndex.sort((a, b) => {
		const aStatus = a.item.status || 'none';
		const bStatus = b.item.status || 'none';

		const aStatusRank = WORK_STATUS_ORDER[aStatus];
		const bStatusRank = WORK_STATUS_ORDER[bStatus];

		if (aStatusRank !== bStatusRank) {
			return aStatusRank - bStatusRank;
		}

		// An explicit order beats the year heuristic inside a group.
		const aOrder = a.item.order ?? Number.POSITIVE_INFINITY;
		const bOrder = b.item.order ?? Number.POSITIVE_INFINITY;
		if (aOrder !== bOrder) {
			return aOrder - bOrder;
		}

		const aYear = Number.parseInt(a.item.year.replace(/\D/g, ''), 10) || 0;
		const bYear = Number.parseInt(b.item.year.replace(/\D/g, ''), 10) || 0;

		if (aYear !== bYear) {
			return bYear - aYear;
		}

		return a.index - b.index;
	});

	return withIndex.map((w) => w.item);
}

/**
 * The slice of the work each filter pill shows. The program-overview card
 * was never part of the grid, so it stays off it under every pill (the
 * page itself remains at /work/ixana-internal-ai-program). Tier fields on
 * the data survive as metadata only.
 */
export function filterWorkItems(
	items: WorkItem[],
	filter: FilterKey,
): WorkItem[] {
	const shown = items.filter((w) => !w.programHead);
	if (filter === 'all') return shown;
	if (filter === 'personal') return personalOrder(shown);
	// A track pill shows the track's shipped and in-use work only. Its
	// prototypes and research file under Personal instead, so every product
	// sits under exactly one of the three.
	return shown.filter((w) => w.track === filter && !isUnshipped(w));
}

/** Prototype or research: the unshipped work Personal collects. */
export function isUnshipped(item: WorkItem): boolean {
	return item.status === 'prototype' || item.status === 'research';
}

/**
 * The three research engines that open the Personal pill, in this order,
 * at the author's request (2026-09-10).
 */
const PERSONAL_LEAD = [
	'dsa-generative-ai-engine-for-a-guided-spiritual-path',
	'neuroadapt-agentic-rag-engine-for-neuroscience-research',
	'quantum-circuit-simulator-interactive-10-qubit-delivering-re',
];

/**
 * Personal: everything off the clock. The three lead engines first, then
 * the rest of the prototypes and research in the standard order, and the
 * engineering builds only after every unshipped product has been shown.
 */
function personalOrder(shown: WorkItem[]): WorkItem[] {
	const unshipped = shown.filter(
		(w) => w.category === 'product' && isUnshipped(w),
	);
	const lead = PERSONAL_LEAD.map((slug) => {
		const item = unshipped.find((w) => w.slug === slug);
		if (!item) {
			throw new Error(`Personal lead ${slug} is not an unshipped product`);
		}
		return item;
	});
	const rest = unshipped.filter(
		(w) => !w.slug || !PERSONAL_LEAD.includes(w.slug),
	);
	const builds = shown.filter((w) => w.category === 'engineering');
	return [...lead, ...rest, ...builds];
}
