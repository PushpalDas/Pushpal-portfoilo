import fs from 'node:fs';
import path from 'node:path';
import { getPosts } from './thoughts/utils';

export const baseUrl = 'https://pushpaldas.com';

const V2_PATH = path.join(process.cwd(), 'data', 'case-studies-v2.json');

// The 37 authored case studies are the highest-value pages on the site;
// derive their routes from the data file rather than typing them in.
function caseStudySlugs(): string[] {
	try {
		if (!fs.existsSync(V2_PATH)) return [];
		return Object.keys(JSON.parse(fs.readFileSync(V2_PATH, 'utf-8')));
	} catch {
		return [];
	}
}

export default async function sitemap() {
	const blogs = getPosts().map((post) => ({
		url: `${baseUrl}/thoughts/${post.slug}`,
		lastModified: post.metadata.publishedAt,
	}));

	const today = new Date().toISOString().split('T')[0];

	const routes = [
		'',
		'work',
		'experience',
		'certifications',
		'hobby',
		'about',
		'uses',
	].map((route) => ({
		url: `${baseUrl}/${route}`,
		lastModified: today,
	}));

	const caseStudies = caseStudySlugs().map((slug) => ({
		url: `${baseUrl}/work/${slug}`,
		lastModified: today,
	}));

	return [...routes, ...caseStudies, ...blogs];
}
