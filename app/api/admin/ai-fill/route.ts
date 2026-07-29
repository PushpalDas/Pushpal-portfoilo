import { NextResponse } from 'next/server';

/* ─── Config ──────────────────────────────────────────────── */

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.6-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// Inline uploads share the request body, which Gemini caps at ~20MB.
const MAX_BYTES = 15 * 1024 * 1024;

// Extensions we read as plain text and paste straight into the prompt.
const TEXT_EXTENSIONS = [
	'.txt',
	'.md',
	'.markdown',
	'.csv',
	'.json',
	'.html',
	'.htm',
	'.rtf',
];

// Extensions we hand to Gemini as base64 inline data, with their mime types.
const BINARY_MIME: Record<string, string> = {
	'.pdf': 'application/pdf',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.webp': 'image/webp',
};

const LINK_ICONS = [
	'github',
	'file',
	'play',
	'certificate',
	'video',
	'paper',
	'drive',
	'external',
];

/* ─── Response schema (mirrors CaseStudyForm in app/admin/admin-page.tsx) ── */

const RESPONSE_SCHEMA = {
	type: 'OBJECT',
	properties: {
		company: {
			type: 'STRING',
			description: 'Company or client name. Empty string if not stated.',
		},
		organization: {
			type: 'STRING',
			description: 'Team or department, e.g. "Founder\'s Office".',
		},
		title: { type: 'STRING', description: 'Project title.' },
		dateRange: {
			type: 'STRING',
			description: 'e.g. "Jan 2024 – Present". Empty if not stated.',
		},
		role: {
			type: 'STRING',
			description: 'The author\'s role, e.g. "Product Lead".',
		},
		teamSize: {
			type: 'STRING',
			description: 'e.g. "4 people". Empty if not stated.',
		},
		tags: {
			type: 'ARRAY',
			description:
				'3–6 short skill/domain tags, e.g. "AI/ML", "System Design".',
			items: { type: 'STRING' },
		},
		tldr: {
			type: 'STRING',
			description: '2–3 sentences: the problem, what was done, the result.',
		},
		context: {
			type: 'STRING',
			description:
				'Context and problem: the landscape, the gap, why it was hard.',
		},
		roleAndApproach: {
			type: 'STRING',
			description: 'What the author owned, key decisions, tradeoffs navigated.',
		},
		keyDecision: {
			type: 'STRING',
			description:
				'The single most consequential decision, one or two sentences.',
		},
		keyDecisionReasoning: {
			type: 'STRING',
			description: 'Why that decision was made over the alternatives.',
		},
		whatWasBuilt: {
			type: 'STRING',
			description: 'What the solution is, how it works, who it serves.',
		},
		metrics: {
			type: 'ARRAY',
			description:
				'Quantified outcomes stated in the document. Omit entirely if the document has no numbers.',
			items: {
				type: 'OBJECT',
				properties: {
					value: {
						type: 'STRING',
						description: 'Short figure, e.g. "2x", "~40%", "14k+".',
					},
					label: {
						type: 'STRING',
						description: 'What the figure measures, e.g. "Speed improvement".',
					},
				},
				required: ['value', 'label'],
			},
		},
		impactContext: {
			type: 'STRING',
			description: 'What the numbers mean for the business, team, or customer.',
		},
		reflection: {
			type: 'STRING',
			description:
				'Lessons, surprises, what would be done differently. Empty if absent.',
		},
		links: {
			type: 'ARRAY',
			description:
				'Only URLs that literally appear in the document. Never invent one.',
			items: {
				type: 'OBJECT',
				properties: {
					icon: { type: 'STRING', enum: LINK_ICONS },
					label: { type: 'STRING' },
					url: { type: 'STRING' },
				},
				required: ['icon', 'label', 'url'],
			},
		},
	},
	propertyOrdering: [
		'company',
		'organization',
		'title',
		'dateRange',
		'role',
		'teamSize',
		'tags',
		'tldr',
		'context',
		'roleAndApproach',
		'keyDecision',
		'keyDecisionReasoning',
		'whatWasBuilt',
		'metrics',
		'impactContext',
		'reflection',
		'links',
	],
};

const SYSTEM_PROMPT = `You are helping write a portfolio case study from a project document.

Read the attached document and extract the fields in the schema.

Rules:
- Ground every field in the document. Never invent facts, numbers, companies, dates, or URLs.
- If the document does not cover a field, return an empty string (or omit the array). An empty field is correct; a plausible guess is not.
- Write prose in first person, past tense ("I built...", "I owned..."), plain and concrete. No marketing language, no buzzwords, no em-dashes.
- Prose fields are body copy: full sentences and paragraphs, no markdown, no bullet points, no headings.
- metrics must only contain figures the document actually states.
- tags are short noun phrases, not sentences.`;

/* ─── Helpers ─────────────────────────────────────────────── */

function extensionOf(filename: string): string {
	const dot = filename.lastIndexOf('.');
	return dot === -1 ? '' : filename.slice(dot).toLowerCase();
}

/* ─── POST /api/admin/ai-fill ─────────────────────────────── */

export async function POST(request: Request) {
	const authHeader = request.headers.get('x-admin-password');
	if (authHeader !== process.env.ADMIN_PASSWORD) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const apiKey = process.env.GEMINI_API_KEY;
	if (!apiKey) {
		return NextResponse.json(
			{
				error:
					'GEMINI_API_KEY is not set. Add it to .env.local and restart the dev server.',
			},
			{ status: 500 },
		);
	}

	try {
		const formData = await request.formData();
		const file = formData.get('file') as File | null;
		const notes = (formData.get('notes') as string | null) ?? '';

		if (!file) {
			return NextResponse.json(
				{ error: 'No document uploaded' },
				{ status: 400 },
			);
		}
		if (file.size > MAX_BYTES) {
			return NextResponse.json(
				{
					error: `Document is ${(file.size / 1024 / 1024).toFixed(1)}MB. Maximum is 15MB.`,
				},
				{ status: 400 },
			);
		}

		const ext = extensionOf(file.name);
		const parts: Record<string, unknown>[] = [{ text: SYSTEM_PROMPT }];

		if (TEXT_EXTENSIONS.includes(ext)) {
			const text = await file.text();
			if (!text.trim()) {
				return NextResponse.json(
					{ error: 'That document is empty.' },
					{ status: 400 },
				);
			}
			parts.push({ text: `--- DOCUMENT: ${file.name} ---\n${text}` });
		} else if (BINARY_MIME[ext]) {
			const buffer = Buffer.from(await file.arrayBuffer());
			parts.push({
				inline_data: {
					mime_type: BINARY_MIME[ext],
					data: buffer.toString('base64'),
				},
			});
		} else {
			return NextResponse.json(
				{
					error: `Unsupported file type "${ext || file.name}". Use PDF, TXT, MD, or an image. For Word documents, export to PDF first.`,
				},
				{ status: 400 },
			);
		}

		if (notes.trim()) {
			parts.push({
				text: `Additional context from the author:\n${notes.trim()}`,
			});
		}

		const res = await fetch(GEMINI_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
			body: JSON.stringify({
				contents: [{ parts }],
				generationConfig: {
					responseMimeType: 'application/json',
					responseSchema: RESPONSE_SCHEMA,
				},
			}),
		});

		if (!res.ok) {
			const detail = await res.text();
			console.error('Gemini error:', res.status, detail);
			if (res.status === 404) {
				return NextResponse.json(
					{
						error: `Model "${GEMINI_MODEL}" is not available for this key. Set GEMINI_MODEL in .env.local.`,
					},
					{ status: 502 },
				);
			}
			if (res.status === 400 || res.status === 403) {
				return NextResponse.json(
					{
						error:
							'Gemini rejected the request. Check that GEMINI_API_KEY is valid.',
					},
					{ status: 502 },
				);
			}
			if (res.status === 429) {
				return NextResponse.json(
					{ error: 'Gemini rate limit hit. Try again shortly.' },
					{ status: 502 },
				);
			}
			return NextResponse.json(
				{ error: `Gemini request failed (${res.status}).` },
				{ status: 502 },
			);
		}

		const json = await res.json();
		const candidate = json.candidates?.[0];
		const raw =
			candidate?.content?.parts
				?.map((p: { text?: string }) => p.text ?? '')
				.join('') ?? '';

		if (!raw.trim()) {
			const reason = candidate?.finishReason;
			return NextResponse.json(
				{
					error:
						reason === 'MAX_TOKENS'
							? 'Gemini ran out of output room. Try a shorter document.'
							: 'Gemini returned an empty response.',
				},
				{ status: 502 },
			);
		}

		let data: Record<string, unknown>;
		try {
			data = JSON.parse(raw);
		} catch {
			console.error('Gemini returned non-JSON:', raw.slice(0, 500));
			return NextResponse.json(
				{ error: 'Gemini returned malformed JSON.' },
				{ status: 502 },
			);
		}

		return NextResponse.json({ success: true, data });
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : 'AI fill failed';
		console.error('AI fill error:', error);
		return NextResponse.json({ error: message }, { status: 500 });
	}
}
