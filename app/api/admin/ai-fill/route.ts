import { NextResponse } from 'next/server';
import {
	CASE_STUDY_FIELDS,
	callModel,
	DEFAULT_ROLE,
	FIELD_ORDER,
	filesToParts,
	normalizeProvider,
	normalizeRole,
	validateFiles,
	voiceRules,
} from '../../../lib/ai-case-study';

const RESPONSE_SCHEMA = {
	type: 'OBJECT',
	properties: CASE_STUDY_FIELDS,
	propertyOrdering: FIELD_ORDER,
};

function systemPrompt(role: string, roleWasGiven: boolean): string {
	return `Act as a ${role} filling out a portfolio case study from the attached documentation, text, or data source. Read the source and populate the fields in the schema.

${
	roleWasGiven
		? `The author has already stated their role on this project: "${role}". That is fixed. Return it back in the role field exactly as written, unchanged, and write every other field to match it — the scope a ${role} would have owned, the decisions they would have made, the results they would be measured on.`
		: `The author has not stated their role, so write as a ${DEFAULT_ROLE}. If the source clearly names the role they held, put that in the role field; otherwise leave the role field empty.`
}

${voiceRules(role)}

Accuracy:
- Ground every field in the source. Never invent facts, numbers, companies, dates, or URLs.
- If the source does not cover a field, return an empty string (or omit the array). An empty field is correct; a plausible guess is not.
- Writing from a ${role}'s seat changes emphasis and wording, never the facts. Do not promote the author into work the source does not credit them with.
- metrics must only contain figures the source actually states.`;
}

/* ─── POST /api/admin/ai-fill ─────────────────────────────── */

export async function POST(request: Request) {
	const authHeader = request.headers.get('x-admin-password');
	if (authHeader !== process.env.ADMIN_PASSWORD) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const formData = await request.formData();
		const files = formData
			.getAll('file')
			.filter((f): f is File => f instanceof File);
		const notes = (formData.get('notes') as string | null) ?? '';
		const rawRole = (formData.get('role') as string | null) ?? '';
		const role = normalizeRole(rawRole);
		const roleWasGiven = rawRole.trim().length > 0;
		const provider = normalizeProvider(
			formData.get('provider') as string | null,
		);

		if (files.length === 0) {
			return NextResponse.json(
				{ error: 'No document uploaded' },
				{ status: 400 },
			);
		}

		const invalid = validateFiles(files);
		if (invalid) {
			return NextResponse.json({ error: invalid }, { status: 400 });
		}

		const parts: Record<string, unknown>[] = [
			{ text: systemPrompt(role, roleWasGiven) },
		];

		if (files.length > 1) {
			parts.push({
				text: `There are ${files.length} documents below. Read all of them and merge what they say into one case study. Where they overlap, prefer the more specific detail; where they conflict, prefer the document that reads as more recent or more authoritative.`,
			});
		}

		let docParts: Record<string, unknown>[];
		try {
			docParts = await filesToParts(files);
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Unsupported file';
			return NextResponse.json({ error: message }, { status: 400 });
		}

		if (docParts.length === 0) {
			return NextResponse.json(
				{ error: 'Those documents are empty.' },
				{ status: 400 },
			);
		}
		parts.push(...docParts);

		if (notes.trim()) {
			parts.push({
				text: `Additional context from the author:\n${notes.trim()}`,
			});
		}

		const result = await callModel(
			provider,
			parts,
			RESPONSE_SCHEMA,
			'case_study',
		);
		if (!result.ok) {
			return NextResponse.json(
				{ error: result.error },
				{ status: result.status },
			);
		}

		return NextResponse.json({ success: true, data: result.data });
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : 'AI fill failed';
		console.error('AI fill error:', error);
		return NextResponse.json({ error: message }, { status: 500 });
	}
}
