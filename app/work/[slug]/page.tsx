/**
 * Dynamic route: /work/[slug]
 *
 * Reads case study data from `data/case-studies.json` at request time.
 * To add a case study, go to /admin → edit a work item → fill in the
 * "Case Study" tab → Save. The page will reflect changes immediately on
 * the next visit (no code changes needed).
 */

import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { workItems } from '../constants';
import type { AnyCaseStudyData } from './case-study-types';
import { isEditorialCaseStudy } from './case-study-types';
import EditorialCaseStudyPage from './editorial-case-study-page';
import { legacyToEditorial } from './legacy-to-editorial';

const DATA_PATH = path.join(process.cwd(), 'data', 'case-studies.json');

function getAllCaseStudies(): Record<string, AnyCaseStudyData> {
	try {
		if (!fs.existsSync(DATA_PATH)) return {};
		return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
	} catch {
		return {};
	}
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const store = getAllCaseStudies();
	const project = store[slug];
	if (!project) return { title: 'Work — Pushpal Das' };

	return {
		title: `${project.title || slug} — Pushpal Das`,
		description:
			(isEditorialCaseStudy(project) ? project.deck : project.tldr) ||
			`Case study: ${project.title || slug}`,
	};
}

export default async function WorkSlugPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const store = getAllCaseStudies();
	const project = store[slug];

	if (!project) notFound();

	const workItem = workItems.find((item) => item.slug === slug);
	const editorialProject = isEditorialCaseStudy(project)
		? project
		: legacyToEditorial(project, workItem?.status ?? null);

	return <EditorialCaseStudyPage data={editorialProject} />;
}
