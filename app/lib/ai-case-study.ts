/* Shared Gemini plumbing for the admin case-study AI tools.
   Used by /api/admin/ai-fill (first draft) and /api/admin/ai-refine (chat edits). */

export const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.6-flash';
export const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// Inline uploads share the request body, which Gemini caps at ~20MB.
export const MAX_BYTES = 15 * 1024 * 1024;
export const MAX_FILES = 10;

// Extensions we read as plain text and paste straight into the prompt.
export const TEXT_EXTENSIONS = [
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
export const BINARY_MIME: Record<string, string> = {
	'.pdf': 'application/pdf',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.webp': 'image/webp',
};

export const LINK_ICONS = [
	'github',
	'file',
	'play',
	'certificate',
	'video',
	'paper',
	'drive',
	'external',
];

/* ─── Field schema (mirrors CaseStudyForm in app/admin/admin-page.tsx) ── */

export const CASE_STUDY_FIELDS = {
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
		description: '3–6 short skill/domain tags, e.g. "AI/ML", "System Design".',
		items: { type: 'STRING' },
	},
	tldr: {
		type: 'STRING',
		description:
			'A summary of the project in three sections separated by two newlines (\\n\\n). You MUST follow this exact template:\n\n' +
			'Problem: [One-sentence description of the problem/challenge]\n\n' +
			'What we did: [One-sentence description of the solution/work done]\n\n' +
			'Result: [One-sentence description of the outcome/metrics/next steps]\n\n' +
			'Do not write anything else or use other headings.',
	},
	roleAndApproach: {
		type: 'STRING',
		description:
			"Describe the author's role and approach in two sections separated by two newlines (\\n\\n). You MUST follow this exact template:\n\n" +
			'What I owned: [Describe what the author specifically owned/led, including scope, roadmap, design/engineering alignment, etc.]\n\n' +
			'Tradeoffs I navigated: [Describe the key tradeoffs navigated, e.g. "Warmth vs. verifiability — ... And build-speed vs. rigor — ..."]\n\n' +
			'Do not write anything else or use other headings.',
	},
	keyDecisions: {
		type: 'ARRAY',
		description:
			'Up to 3 key decisions, most consequential first. Each is one or two sentences covering the decision and why it was made over the alternatives. Return fewer than 3 if the source only supports fewer.',
		items: { type: 'STRING' },
	},
	whatWasBuilt: {
		type: 'STRING',
		description: 'What the solution is, how it works, who it serves.',
	},
	metrics: {
		type: 'ARRAY',
		description:
			'Quantified outcomes stated in the source. Omit entirely if the source has no numbers.',
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
			'Only URLs that literally appear in the source. Never invent one.',
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
} as const;

export const FIELD_ORDER = Object.keys(CASE_STUDY_FIELDS);

/* ─── Voice ───────────────────────────────────────────────── */

/* The author's role on the project drives the whole voice. Whatever they put
   in the case study's Role field becomes the persona; an empty field falls
   back to Project Manager. */
export const DEFAULT_ROLE = 'Project Manager';

export function normalizeRole(raw: string | null | undefined): string {
	return (raw ?? '').trim() || DEFAULT_ROLE;
}

export function voiceRules(role: string): string {
	return `Voice — you are a ${role}, and every field is written from that seat:
- Write what a ${role} would have owned on this project: the calls they made, the tradeoffs they weighed, the outcomes they were judged on. Skip work that belonged to someone else.
- Use the vocabulary a ${role} uses. Technical terms are fine — you know this product deeply — but reach for them the way a ${role} does, not the way a developer does: name the technology when it explains a decision or a constraint, then go straight back to the outcome.
- Never stack jargon, never explain the implementation for its own sake, never write for an audience of engineers.
- Crisp and to the point. Short sentences. Cut every word that is not doing work.
- Lead with what the thing does and who it is for, not how it is built.
- A reader outside the team should follow every sentence on the first pass.
- First person, past tense ("I built...", "I owned...").
- No marketing language, no buzzwords, no hype adjectives, no em-dashes.

Format:
- Prose fields are body copy: full sentences and paragraphs, no markdown, no bullet points, no headings. Exceptions:
  1. The "tldr" field MUST follow the exact format of "Problem: ...\n\nWhat we did: ...\n\nResult: ...".
  2. The "roleAndApproach" field MUST follow the exact format of "What I owned: ...\n\nTradeoffs I navigated: ...".
- tags are short noun phrases, not sentences.`;
}

/* ─── Request helpers ─────────────────────────────────────── */

export function extensionOf(filename: string): string {
	const dot = filename.lastIndexOf('.');
	return dot === -1 ? '' : filename.slice(dot).toLowerCase();
}

export type GeminiPart = Record<string, unknown>;

/** Turns uploaded files into Gemini parts. Throws with a user-facing message. */
export async function filesToParts(files: File[]): Promise<GeminiPart[]> {
	const parts: GeminiPart[] = [];

	for (const file of files) {
		const ext = extensionOf(file.name);

		if (TEXT_EXTENSIONS.includes(ext)) {
			const text = await file.text();
			if (!text.trim()) continue;
			parts.push({ text: `--- DOCUMENT: ${file.name} ---\n${text}` });
		} else if (BINARY_MIME[ext]) {
			const buffer = Buffer.from(await file.arrayBuffer());
			parts.push({ text: `--- DOCUMENT: ${file.name} ---` });
			parts.push({
				inline_data: {
					mime_type: BINARY_MIME[ext],
					data: buffer.toString('base64'),
				},
			});
		} else {
			throw new Error(
				`Unsupported file type "${ext || file.name}". Use PDF, TXT, MD, or an image. For Word documents, export to PDF first.`,
			);
		}
	}

	return parts;
}

/** Validates the uploaded set. Returns a user-facing message, or null if fine. */
export function validateFiles(files: File[]): string | null {
	if (files.length > MAX_FILES) {
		return `Too many documents (${files.length}). Maximum is ${MAX_FILES} at a time.`;
	}
	const totalBytes = files.reduce((sum, f) => sum + f.size, 0);
	if (totalBytes > MAX_BYTES) {
		return `Documents total ${(totalBytes / 1024 / 1024).toFixed(1)}MB. Maximum is 15MB across all files.`;
	}
	return null;
}

/* ─── Gemini call ─────────────────────────────────────────── */

type GeminiResult =
	| { ok: true; data: Record<string, unknown> }
	| { ok: false; error: string; status: number };

export async function callGemini(
	apiKey: string,
	parts: GeminiPart[],
	responseSchema: unknown,
): Promise<GeminiResult> {
	const res = await fetch(GEMINI_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
		body: JSON.stringify({
			contents: [{ parts }],
			generationConfig: {
				responseMimeType: 'application/json',
				responseSchema,
			},
		}),
	});

	if (!res.ok) {
		const detail = await res.text();
		console.error('Gemini error:', res.status, detail);
		if (res.status === 404) {
			return {
				ok: false,
				status: 502,
				error: `Model "${GEMINI_MODEL}" is not available for this key. Set GEMINI_MODEL in .env.local.`,
			};
		}
		if (res.status === 400 || res.status === 403) {
			return {
				ok: false,
				status: 502,
				error:
					'Gemini rejected the request. Check that GEMINI_API_KEY is valid.',
			};
		}
		if (res.status === 429) {
			return {
				ok: false,
				status: 502,
				error: 'Gemini rate limit hit. Try again shortly.',
			};
		}
		return {
			ok: false,
			status: 502,
			error: `Gemini request failed (${res.status}).`,
		};
	}

	const json = await res.json();
	const candidate = json.candidates?.[0];
	const raw =
		candidate?.content?.parts
			?.map((p: { text?: string }) => p.text ?? '')
			.join('') ?? '';

	if (!raw.trim()) {
		return {
			ok: false,
			status: 502,
			error:
				candidate?.finishReason === 'MAX_TOKENS'
					? 'Gemini ran out of output room. Try a shorter document.'
					: 'Gemini returned an empty response.',
		};
	}

	try {
		return { ok: true, data: JSON.parse(raw) };
	} catch {
		console.error('Gemini returned non-JSON:', raw.slice(0, 500));
		return { ok: false, status: 502, error: 'Gemini returned malformed JSON.' };
	}
}
