import { getPosts } from './thoughts/utils';

export const baseUrl = 'https://pushpaldas.com';

export default async function sitemap() {
	const blogs = getPosts().map((post) => ({
		url: `${baseUrl}/thoughts/${post.slug}`,
		lastModified: post.metadata.publishedAt,
	}));

	const routes = [
		'',
		'work',
		'experience',
		'certifications',
		'hoobie',
		'about',
		'uses',
	].map((route) => ({
		url: `${baseUrl}/${route}`,
		lastModified: new Date().toISOString().split('T')[0],
	}));

	return [...routes, ...blogs];
}
