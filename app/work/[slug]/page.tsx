/**
 * Dynamic route: /work/[slug]
 *
 * Three renderers, checked in order:
 *
 *   1. data/case-studies-v2.json — the authored 10-section format.
 *      Held in its own file because the admin endpoint replaces whole
 *      entries in case-studies.json (`store[slug] = body`), which
 *      would silently drop a nested v2 block on the next save.
 *
 *   2. CaseStudyFinalPage — the generated template, driven by the
 *      work item plus whatever legacy record exists. Figures here are
 *      reconstructed, not authored; it is the fallback for grid items
 *      that have no v2 write-up yet.
 *
 *   3. notFound — the slug matches neither a v2 entry nor a work item.
 */

import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { workItems } from '../constants';
import { workSlug } from '../slug';
import CaseStudyFinalPage from './case-study-final-page';
import type {
	AnyCaseStudyData,
	CaseStudyData,
	CaseStudyV2,
} from './case-study-types';
import { isEditorialCaseStudy } from './case-study-types';
import CaseStudyV2Page from './case-study-v2';

const DATA_PATH = path.join(process.cwd(), 'data', 'case-studies.json');
const V2_PATH = path.join(process.cwd(), 'data', 'case-studies-v2.json');

function readJson<T>(file: string): Record<string, T> {
	try {
		if (!fs.existsSync(file)) return {};
		return JSON.parse(fs.readFileSync(file, 'utf-8'));
	} catch {
		return {};
	}
}

const getAllCaseStudies = () => readJson<AnyCaseStudyData>(DATA_PATH);
const getAllV2 = () => readJson<CaseStudyV2>(V2_PATH);

function findWorkItem(slug: string) {
	return workItems.find(
		(item) => item.slug === slug || workSlug(item) === slug,
	);
}

/** Legacy records render through the template; editorial ones do not. */
function legacyFor(slug: string): CaseStudyData | undefined {
	const record = getAllCaseStudies()[slug];
	if (!record || isEditorialCaseStudy(record)) return undefined;
	return record as CaseStudyData;
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;

	const v2 = getAllV2()[slug];
	if (v2) return { title: `${v2.title} — Pushpal Das`, description: v2.deck };

	const item = findWorkItem(slug);
	if (item) {
		return {
			title: `${item.title} — Pushpal Das`,
			description: item.outcome || `Product case study: ${item.title}`,
		};
	}

	return { title: 'Work — Pushpal Das' };
}

export default async function WorkSlugPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const v2 = getAllV2()[slug];
	if (v2) return <CaseStudyV2Page data={v2} />;

	const item = findWorkItem(slug);
	if (!item) notFound();

	return <CaseStudyFinalPage item={item} legacy={legacyFor(slug)} />;
}
