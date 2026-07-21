import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import { certificationItems, filters } from '../../../certifications/constants';

export async function GET(request: Request) {
	const authHeader = request.headers.get('x-admin-password');
	if (authHeader !== process.env.ADMIN_PASSWORD) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}
	return NextResponse.json({ items: certificationItems, filters });
}

function generateConstantsFile(items: typeof certificationItems): string {
	const itemsStr = items
		.map((item) => {
			const categories = item.categories
				.filter((c: unknown): c is string => typeof c === 'string')
				.map((c: string) => `'${c.replace(/'/g, "\\'")}'`)
				.join(', ');
			return `    {
        title: '${item.title.replace(/'/g, "\\'").replace(/®/g, '\\u00AE')}',
        location: '${item.location.replace(/'/g, "\\'").replace(/®/g, '\\u00AE')}',
        services: '${item.services.replace(/'/g, "\\'").replace(/®/g, '\\u00AE')}',
        year: '${item.year.replace(/'/g, "\\'").replace(/®/g, '\\u00AE')}',
        src: '${item.src.replace(/'/g, "\\'").replace(/®/g, '\\u00AE')}',
        color: '${item.color}',
        url: '${item.url.replace(/'/g, "\\'").replace(/®/g, '\\u00AE')}',
        categories: [${categories}],
    }`;
		})
		.join(',\n');

	return `import type { CertificationItem } from './types';

export const certificationItems: CertificationItem[] = [
${itemsStr},
];

export const filters = [
    { key: 'all', label: 'All' },
    { key: 'management', label: 'Management' },
    { key: 'skills', label: 'Skills' },
    { key: 'achievements', label: 'Achievements' },
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
		const filePath = path.join(
			process.cwd(),
			'app',
			'certifications',
			'constants.ts',
		);
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
