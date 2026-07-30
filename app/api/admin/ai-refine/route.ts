import { NextResponse } from 'next/server';
import {
	CASE_STUDY_FIELDS,
	callModel,
	FIELD_ORDER,
	filesToParts,
	normalizeProvider,
	normalizeRole,
	validateFiles,
	voiceRules,
} from '../../../lib/ai-case-study';

/* Every field is optional here — the model returns ONLY what it changed,
   and the client merges just those keys back into the form. */
const RESPONSE_SCHEMA = {
	type: 'OBJECT',
	properties: {
		reply: {
			type: 'STRING',
			description:
				'One or two sentences to the author saying what you changed and why. Plain, conversational. If you changed nothing, say what you need from them.',
		},
		updates: {
			type: 'OBJECT',
			description:
				'ONLY the fields you rewrote. Omit every field the author did not ask about.',
			properties: CASE_STUDY_FIELDS,
			propertyOrdering: FIELD_ORDER,
		},
	},
	required: ['reply'],
	propertyOrdering: ['reply', 'updates'],
};

function systemPrompt(role: string): string {
	return `Act as a ${role} revising an existing portfolio case study draft. The author will tell you what is wrong with a section, or how they want it written. Apply their instruction.

The single most important rule: change ONLY what the author asked about. Put those fields in "updates" and omit every other field. A field you do not return is left exactly as the author wrote it, which is what you want. Never rewrite a section just because you think it could be better. Never "tidy up" neighbouring fields.

Leave the role field alone unless the author explicitly asks you to change it. It is what sets the voice for everything else.

${voiceRules(role)}

Accuracy:
- Keep every fact, number, name, date, and URL from the current draft unless the author corrects it or a source document contradicts it.
- Never invent facts to fill a section out. If the author asks for something the draft and sources do not support, return no update for that field and use "reply" to tell them what you need.
- When the author dictates wording ("write it like this..."), follow their wording closely; tighten the phrasing but do not change their meaning.

In "reply", speak to the author directly and keep it to a sentence or two.`;
}

/* ─── POST /api/admin/ai-refine ───────────────────────────── */

export async function POST(request: Request) {
	const authHeader = request.headers.get('x-admin-password');
	if (authHeader !== process.env.ADMIN_PASSWORD) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const formData = await request.formData();
		const instruction = (
			(formData.get('instruction') as string | null) ?? ''
		).trim();
		const draftRaw = (formData.get('draft') as string | null) ?? '{}';
		const historyRaw = (formData.get('history') as string | null) ?? '[]';
		const role = normalizeRole(formData.get('role') as string | null);
		const provider = normalizeProvider(
			formData.get('provider') as string | null,
		);
		const files = formData
			.getAll('file')
			.filter((f): f is File => f instanceof File);

		if (!instruction) {
			return NextResponse.json(
				{ error: 'Tell the assistant what to change.' },
				{ status: 400 },
			);
		}

		const invalid = validateFiles(files);
		if (invalid) {
			return NextResponse.json({ error: invalid }, { status: 400 });
		}

		const parts: Record<string, unknown>[] = [{ text: systemPrompt(role) }];

		// The source documents, so the author can ask for detail the draft dropped.
		if (files.length > 0) {
			try {
				const docParts = await filesToParts(files);
				if (docParts.length > 0) {
					parts.push({
						text: 'Source documents this draft came from, for reference:',
					});
					parts.push(...docParts);
				}
			} catch (err) {
				const message = err instanceof Error ? err.message : 'Unsupported file';
				return NextResponse.json({ error: message }, { status: 400 });
			}
		}

		parts.push({
			text: `Current draft (JSON — these are the author's existing values):\n${draftRaw}`,
		});

		// Prior turns, so "make it shorter still" resolves against what came before.
		try {
			const history = JSON.parse(historyRaw) as {
				role?: string;
				text?: string;
			}[];
			const transcript = history
				.filter((m) => m?.text)
				.slice(-8)
				.map((m) => `${m.role === 'ai' ? 'You' : 'Author'}: ${m.text?.trim()}`)
				.join('\n');
			if (transcript) {
				parts.push({ text: `Earlier in this conversation:\n${transcript}` });
			}
		} catch {
			// A malformed history is not worth failing the request over.
		}

		parts.push({ text: `The author's instruction now:\n${instruction}` });

		const result = await callModel(
			provider,
			parts,
			RESPONSE_SCHEMA,
			'case_study_edit',
		);
		if (!result.ok) {
			return NextResponse.json(
				{ error: result.error },
				{ status: result.status },
			);
		}

		const { reply, updates } = result.data as {
			reply?: string;
			updates?: Record<string, unknown>;
		};

		return NextResponse.json({
			success: true,
			reply: reply ?? '',
			updates: updates ?? {},
		});
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : 'AI edit failed';
		console.error('AI refine error:', error);
		return NextResponse.json({ error: message }, { status: 500 });
	}
}
