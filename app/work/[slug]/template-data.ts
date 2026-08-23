/**
 * ================================================================
 * CASE STUDY DATA — BLANK TEMPLATE
 * ================================================================
 */

import type { CaseStudyData } from './case-study-types';

export const TEMPLATE_PROJECT_DATA: CaseStudyData = {
	// ── Identity ────────────────────────────────────────────────
	slug: '', // URL slug, e.g. 'xana-rag-platform'
	company: '', // e.g. 'Ixana'
	organization: '', // e.g. "Founder's Office"
	title: '', // e.g. 'XANA — Multifile RAG Platform'
	dateRange: '', // e.g. 'Jan 2024 – Present'
	role: '', // e.g. 'Product Lead'
	teamSize: '', // e.g. '4 people'

	tags: [],

	// ── Confidentiality ─────────────────────────────────────────
	isConfidential: false,
	confidentialNote: '', // Leave empty to use the default note

	// ── Sections ────────────────────────────────────────────────

	/** 2–3 sentences. Problem · Action · Result */
	tldr: '',

	/**
	 * What did you specifically own?
	 * What tradeoffs did you navigate?
	 */
	roleAndApproach: '',

	/** List of 2–3 key decisions you made, rendered as bullets */
	keyDecisions: ['', '', ''],

	/**
	 * High-level description of what was built.
	 * Focus on what it is and who it serves.
	 */
	whatWasBuilt: '',

	/**
	 * Media items.
	 * - type: 'image' | 'gif' | 'video' | 'demo'
	 * - src: path to image, or YouTube/Vimeo URL, or embed URL
	 * - fullWidth: true → spans both columns
	 * - caption: optional descriptive text shown below
	 */
	media: [
		{ type: 'image', src: '', caption: '', fullWidth: false },
		{ type: 'image', src: '', caption: '', fullWidth: false },
		{ type: 'video', src: '', caption: '', fullWidth: true },
	],

	/**
	 * Metric cards shown in Section 6.
	 * value: a string like "2x", "~40%", "14k+", etc.
	 * Numeric parts animate on scroll.
	 */
	metrics: [
		{ value: '', label: '' },
		{ value: '', label: '' },
		{ value: '', label: '' },
	],

	/**
	 * Narrative context for the metrics.
	 * What do the numbers mean for the business / team / customer?
	 */
	impactContext: '',

	/**
	 * Optional reflection.
	 * Set to null to hide the section entirely.
	 */
	reflection: null,

	links: [],

	// ── Bottom navigation ───────────────────────────────────────
	prevProject: null,
	nextProject: null,
};
