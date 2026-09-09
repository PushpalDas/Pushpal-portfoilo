import fs from 'node:fs';
import path from 'node:path';
import type { CaseStudyV2 } from '../../work/[slug]/case-study-types';
import { type FilterKey, filters } from '../../work/constants';
import { WORK_STATUSES } from '../../work/status';
import { leadingInTrack, moreInTrack } from '../../work/tracks';
import type { WorkItem } from '../../work/types';
import WorkHighlights, {
	type HighlightCardData,
	type HighlightGroupData,
} from './work-highlights';
import {
	HIGHLIGHTS_PER_TRACK,
	highlightGroups,
	METRICS_PER_CARD,
} from './workHighlights';

const V2_PATH = path.join(process.cwd(), 'data', 'case-studies-v2.json');

/** The /work pill's label, so the home page names a track the same way. */
function pillLabel(key: FilterKey): string {
	const pill = filters.find((f) => f.key === key);
	if (!pill) throw new Error(`/work has no filter pill for ${key}`);
	return pill.label;
}

/** The same file, read the same way, as /work/[slug] reads it. */
function readCaseStudies(): Record<string, CaseStudyV2> {
	return JSON.parse(fs.readFileSync(V2_PATH, 'utf-8'));
}

/** The case study's own metrics block — the numbers its §08 shows. */
function metricsOf(study: CaseStudyV2, slug: string) {
	for (const section of study.sections) {
		for (const block of section.blocks ?? []) {
			if (block.kind === 'metrics') return block.items;
		}
	}
	throw new Error(`Case study ${slug} has no metrics block for the home card`);
}

/**
 * One home card, built entirely from what the work page already holds.
 * A field the work page lacks is a build error, not a blank on the card.
 */
function cardFor(item: WorkItem, studies: Record<string, CaseStudyV2>) {
	const slug = item.slug;
	if (!slug) {
		throw new Error(`Highlighted work item "${item.title}" has no slug`);
	}
	const study = studies[slug];
	if (!study) {
		throw new Error(`Highlighted work item ${slug} has no v2 case study`);
	}
	if (!item.demoUrl) {
		throw new Error(`Highlighted work item ${slug} has no demoUrl`);
	}

	const card: HighlightCardData = {
		slug,
		title: item.title,
		outcome: item.outcome,
		company: item.company,
		domain: item.domain,
		demoUrl: item.demoUrl,
		image: item.image,
		color: item.color,
		badge: item.status ? WORK_STATUSES[item.status] : null,
		metrics: metricsOf(study, slug)
			.slice(0, METRICS_PER_CARD)
			.map((m) => ({
				value: m.value,
				sub: m.sub,
				label: m.label,
				// Only a bare integer can count up; anything else is shown as is.
				countUp: /^\d+$/.test(m.value) ? Number(m.value) : undefined,
			})),
		summary: study.summary,
		role: study.meta.role,
		stage: study.meta.stage,
	};
	return card;
}

/**
 * Server half of the Work section: every card, count and badge on the
 * page is derived here, at build time, from app/work/constants.ts and
 * data/case-studies-v2.json — the same two sources the /work page and
 * its case studies render from — and handed down as plain values. Nothing
 * downstream carries its own copy of a figure, and neither data file
 * reaches the client bundle.
 */
export default function Works() {
	const studies = readCaseStudies();

	// Each group is the top of its track on /work — serial numbers 1..6
	// under that pill, in that order — so the two pages number one shelf
	// the same way.
	const cardsByTrack = highlightGroups.map((group) => ({
		group,
		cards: leadingInTrack(group.track, HIGHLIGHTS_PER_TRACK).map((item) =>
			cardFor(item, studies),
		),
	}));

	const featured = cardsByTrack.flatMap(({ cards }) =>
		cards.map((c) => c.slug),
	);

	const groups: HighlightGroupData[] = cardsByTrack.map(({ group, cards }) => ({
		track: group.track,
		label: pillLabel(group.track),
		moreHref: group.more.href,
		moreCount: moreInTrack(group.track, featured),
		cards,
	}));

	return <WorkHighlights groups={groups} allLabel={pillLabel('all')} />;
}
