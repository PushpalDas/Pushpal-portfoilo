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

/**
 * Blocks that live in constants.ts but are not per-item data. They are
 * emitted verbatim on every save — the previous template dropped them,
 * which broke the case-study badge and the /work domain filter.
 */
const FILE_HEADER = `import type { WorkItem } from './types';

/**
 * Status system — the ONLY valid values are the five below plus \`null\`.
 * Colour encodes how far the work went, not what kind of thing it is,
 * so there are three colour families across five statuses.
 *
 * Adding a sixth status should be a one-line change here, not a hunt
 * through components. Both the grid badge and the case-study badge read
 * from this object.
 */
export const STATUS_CONFIG: Record<
	NonNullable<WorkItem['status']>,
	{ label: string; colorClass: string }
> = {
	production: { label: 'In production', colorClass: 'status-green' },
	internal: { label: 'Shipped internally', colorClass: 'status-green' },
	'customer-testing': {
		label: 'In customer testing',
		colorClass: 'status-amber',
	},
	prototype: { label: 'Prototype', colorClass: 'status-muted' },
	research: { label: 'Research', colorClass: 'status-muted' },
};

/**
 * Grid sort order. Because every card is the same size, sort carries the
 * hierarchy: status group first, newest year first inside each group,
 * then data-file order so it can be hand-tuned. Applies in every filter view.
 */
export const STATUS_ORDER: Record<string, number> = {
	production: 1,
	internal: 2,
	'customer-testing': 3,
	prototype: 4,
	research: 5,
	null: 6,
};
`;

const FILE_FOOTER = `
export const filters = [
	{ key: 'all', label: 'All' },
	{ key: 'product', label: 'Product' },
	{ key: 'engineering', label: 'Engineering' },
] as const;

export type FilterKey = (typeof filters)[number]['key'];
`;

const q = (value: unknown): string =>
	String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");

function generateConstantsFile(items: typeof workItems): string {
	const itemsStr = items
		.map((item) => {
			// Every optional field is written back only when the item has it,
			// and never dropped just because it is optional.
			const lines = [
				`\t\ttitle: '${q(item.title)}',`,
				`\t\tcompany: '${q(item.company)}',`,
				`\t\tyear: '${q(item.year)}',`,
				`\t\tdomain: '${q(item.domain)}',`,
				`\t\tcategory: '${item.category || 'product'}',`,
			];
			if (item.track) lines.push(`\t\ttrack: '${item.track}',`);
			lines.push(`\t\tstatus: ${item.status ? `'${item.status}'` : 'null'},`);
			lines.push(`\t\toutcome: '${q(item.outcome)}',`);
			lines.push(`\t\timage: '${q(item.image)}',`);
			if (item.href) lines.push(`\t\thref: '${q(item.href)}',`);
			if (item.demoUrl) lines.push(`\t\tdemoUrl: '${q(item.demoUrl)}',`);
			if (item.slug) lines.push(`\t\tslug: '${q(item.slug)}',`);
			if (item.color) lines.push(`\t\tcolor: '${q(item.color)}',`);
			return `\t{\n${lines.join('\n')}\n\t}`;
		})
		.join(',\n');

	return `${FILE_HEADER}
export const workItems: WorkItem[] = [
${itemsStr},
];
${FILE_FOOTER}`;
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
