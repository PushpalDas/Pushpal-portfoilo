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
		.map((item: any) => {
			const itemSlug = item.slug;
			const hasCaseStudy = itemSlug && savedSlugs.has(itemSlug);
			const slugLine = hasCaseStudy
				? `\n        slug: '${itemSlug.replace(/'/g, "\\'")}',`
				: '';
			
			const hrefLine = item.href ? `\n        href: '${item.href.replace(/'/g, "\\'")}',` : '';
			const demoUrlLine = item.demoUrl ? `\n        demoUrl: '${item.demoUrl.replace(/'/g, "\\'")}',` : '';

			return `    {
        title: '${item.title.replace(/'/g, "\\'")}',
        company: '${(item.company || '').replace(/'/g, "\\'")}',
        year: '${(item.year || '').replace(/'/g, "\\'")}',
        domain: '${(item.domain || '').replace(/'/g, "\\'")}',
        category: '${item.category || 'product'}',
        status: ${item.status ? `'${item.status}'` : 'null'},
        outcome: '${(item.outcome || '').replace(/'/g, "\\'")}',
        image: '${(item.image || '').replace(/'/g, "\\'")}',${hrefLine}${demoUrlLine}${slugLine}
        color: '${item.color || ''}',
    }`;
		})
		.join(',\n');

	return `import type { WorkItem } from './types';

export const workItems: WorkItem[] = [
${itemsStr},
];

export const filters = [
    { key: 'all', label: 'All' },
    { key: 'product', label: 'Product' },
    { key: 'engineering', label: 'Engineering' },
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
