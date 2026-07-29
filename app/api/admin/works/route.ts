import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import { workItems, filters } from '../../../work/constants';

export async function GET(request: Request) {
	const authHeader = request.headers.get('x-admin-password');
	if (authHeader !== process.env.ADMIN_PASSWORD) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}
	return NextResponse.json({ items: workItems, filters });
}

function getSavedSlugs(): Set<string> {
	try {
		const filePath = path.join(process.cwd(), 'data', 'case-studies.json');
		if (!fs.existsSync(filePath)) return new Set();
		const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
		return new Set(Object.keys(data));
	} catch {
		return new Set();
	}
}

function generateConstantsFile(items: typeof workItems): string {
	const savedSlugs = getSavedSlugs();

	const itemsStr = items
		.map((item) => {
			const categories = item.categories
				.filter((c: unknown): c is string => typeof c === 'string')
				.map((c: string) => `'${c.replace(/'/g, "\\'")}'`)
				.join(', ');
			const itemSlug = (item as { slug?: string }).slug;
			const hasCaseStudy = itemSlug && savedSlugs.has(itemSlug);
			const slugLine = hasCaseStudy
				? `\n        slug: '${itemSlug.replace(/'/g, "\\'")}',`
				: '';
			return `    {
        title: '${item.title.replace(/'/g, "\\'")}',
        location: '${item.location.replace(/'/g, "\\'")}',
        services: '${item.services.replace(/'/g, "\\'")}',
        year: '${item.year.replace(/'/g, "\\'")}',
        src: '${item.src.replace(/'/g, "\\'")}',
        color: '${item.color}',
        url: '${item.url.replace(/'/g, "\\'")}',${slugLine}
        categories: [ ${categories}, ],
    }`;
		})
		.join(',\n');

	return `import type { WorkItem } from './types';

export const workItems = [
${itemsStr},
];

export const filters = [
    { key: 'all', label: 'All' },
    { key: 'products', label: 'Product' },
    { key: 'core', label: 'Core' },
    { key: 'others', label: 'Others' },
] as const;

export type FilterKey = (typeof filters)[number]['key'];
`;
}

export async function PUT(request: Request) {
	const authHeader = request.headers.get('x-admin-password');
	if (authHeader !== process.env.ADMIN_PASSWORD) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { items } = await request.json();
		const filePath = path.join(process.cwd(), 'app', 'work', 'constants.ts');
		const content = generateConstantsFile(items);
		fs.writeFileSync(filePath, content, 'utf-8');
		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to save changes' },
			{ status: 500 },
		);
	}
}
