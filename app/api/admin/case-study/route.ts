import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

const DATA_PATH = path.join(process.cwd(), 'data', 'case-studies.json');

function readStore(): Record<string, unknown> {
	try {
		if (!fs.existsSync(DATA_PATH)) return {};
		return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
	} catch {
		return {};
	}
}

function writeStore(data: Record<string, unknown>) {
	fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// GET /api/admin/case-study?slug=xana-rag  →  returns that project's data
// GET /api/admin/case-study                →  returns all case studies
export async function GET(request: Request) {
	const authHeader = request.headers.get('x-admin-password');
	if (authHeader !== process.env.ADMIN_PASSWORD) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { searchParams } = new URL(request.url);
	const slug = searchParams.get('slug');
	const store = readStore();

	if (slug) {
		return NextResponse.json({ data: store[slug] ?? null });
	}
	return NextResponse.json({ data: store });
}

// PUT /api/admin/case-study  →  saves/updates one case study
export async function PUT(request: Request) {
	const authHeader = request.headers.get('x-admin-password');
	if (authHeader !== process.env.ADMIN_PASSWORD) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const body = await request.json();
		const { slug } = body;
		if (!slug) {
			return NextResponse.json({ error: 'slug is required' }, { status: 400 });
		}

		const store = readStore();
		store[slug] = body;
		writeStore(store);
		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
	}
}

// DELETE /api/admin/case-study?slug=xana-rag  →  removes a case study
export async function DELETE(request: Request) {
	const authHeader = request.headers.get('x-admin-password');
	if (authHeader !== process.env.ADMIN_PASSWORD) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { searchParams } = new URL(request.url);
	const slug = searchParams.get('slug');
	if (!slug) {
		return NextResponse.json({ error: 'slug is required' }, { status: 400 });
	}

	const store = readStore();
	delete store[slug];
	writeStore(store);
	return NextResponse.json({ success: true });
}
