/**
 * Dynamic route: /work/[slug]
 *
 * Two data sources, checked in order:
 *
 *   1. data/case-studies-v2.json — the 10-section format. Held in
 *      its own file because the admin endpoint replaces whole
 *      entries in case-studies.json (`store[slug] = body`), which
 *      would silently drop a nested v2 block on the next save.
 *
 *   2. data/case-studies.json — the older layout, still editable
 *      from /admin → work item → Case Study tab.
 */

import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudyPage from './case-study-page';
import type { CaseStudyData, CaseStudyV2 } from './case-study-types';
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

const getAllCaseStudies = () => readJson<CaseStudyData>(DATA_PATH);
const getAllV2 = () => readJson<CaseStudyV2>(V2_PATH);

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;

	const v2 = getAllV2()[slug];
	if (v2) {
		return { title: `${v2.title} — Pushpal Das`, description: v2.deck };
	}

	const project = getAllCaseStudies()[slug];
	if (!project) return { title: 'Work — Pushpal Das' };

	return {
		title: `${project.title || slug} — Pushpal Das`,
		description: project.tldr || `Case study: ${project.title || slug}`,
	};
}

export default async function WorkSlugPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const v2 = getAllV2()[slug];
	if (v2) return <CaseStudyV2Page data={v2} />;

	const project = getAllCaseStudies()[slug];
	if (!project) notFound();

	return <CaseStudyPage data={project} />;
}
