import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { workItems } from '../constants';
import CaseStudyFinalPage from './case-study-final-page';
import { workSlug } from '../slug';
import type { AnyCaseStudyData, CaseStudyData } from './case-study-types';
import { isEditorialCaseStudy } from './case-study-types';

const dataPath = path.join(process.cwd(), 'data', 'case-studies.json');

function cases(): Record<string, AnyCaseStudyData> {
	try { return JSON.parse(fs.readFileSync(dataPath, 'utf8')); } catch { return {}; }
}

function findWorkItem(slug: string) {
	return workItems.find((item) => item.slug === slug || workSlug(item) === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const item = findWorkItem(slug);
	return item ? { title: `${item.title} — Pushpal Das`, description: `Product case study: ${item.title}` } : { title: 'Work — Pushpal Das' };
}

export default async function WorkSlugPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const item = findWorkItem(slug);
	if (!item) notFound();
	const project = cases()[slug];
	const legacy = project && !isEditorialCaseStudy(project) ? (project as CaseStudyData) : undefined;
	return <CaseStudyFinalPage item={item} legacy={legacy} />;
}
