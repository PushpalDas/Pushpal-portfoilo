import type { WorkStatus } from '../status';

// ============================================================
//  Case Study — Type Definitions
//  Used by every project page under /work/[slug]
// ============================================================

export type MediaType = 'image' | 'video' | 'gif' | 'demo';

export interface MediaItem {
	type: MediaType;
	src: string; // empty string → ignored on live page
	caption?: string;
	fullWidth?: boolean; // true → spans both columns in the grid
}

export interface MetricItem {
	value: string; // e.g. "2x", "~40%"
	label: string; // e.g. "Speed improvement"
}

export interface LinkItem {
	icon:
		| 'github'
		| 'file'
		| 'play'
		| 'certificate'
		| 'video'
		| 'paper'
		| 'drive'
		| 'external';
	label: string;
	url: string;
}

export interface ProjectNav {
	slug: string;
	title: string;
}

export interface CaseStudyData {
	format?: 'legacy';
	slug: string;
	company: string;
	organization: string;
	title: string;
	dateRange: string;
	role: string;
	teamSize: string;
	tags: string[];

	/**
	 * Set to true for NDA/confidential projects.
	 * – Section 5 media grid is replaced with a "Confidential" card.
	 * – Metric values should use relative terms (handled by you in data).
	 * – Proprietary links are hidden from Section 8.
	 */
	isConfidential?: boolean;
	confidentialNote?: string;

	tldr: string;
	roleAndApproach: string;

	/** List of 2–3 key decisions, rendered as bullets */
	keyDecisions: string[];

	whatWasBuilt: string;

	/**
	 * Supports 4 types: image | video | gif | demo
	 */
	media: MediaItem[];

	metrics: MetricItem[];
	impactContext: string;

	/** Set to null to hide the Reflection section entirely */
	reflection: string | null;

	links: LinkItem[];

	prevProject: ProjectNav | null;
	nextProject: ProjectNav | null;
	editorialOverrides?: EditorialOverrides;
}

export interface EditorialVisual {
	src: string;
	alt: string;
	caption: string;
	type: 'image' | 'chart' | 'document' | 'diagram';
}

export interface EditorialDecision {
	call: string;
	alternative: string;
	rationale: string;
}

export interface EditorialEvidenceRow {
	action: string;
	breakdown: string;
	evidence: string;
}

export interface EditorialTradeoff {
	tension: string;
	choice: string;
	cost: string;
}

export interface EditorialCallout {
	title: string;
	detail: string;
}

export interface EditorialMetric {
	value: string;
	label: string;
}

export interface EditorialChartSeries {
	label: string;
	value: number;
	displayValue: string;
}

export interface EditorialChart {
	title: string;
	caption: string;
	series: EditorialChartSeries[];
}

export interface EditorialOverrides {
	deck?: string;
	meta?: Partial<EditorialCaseStudyData['meta']>;
	whyNow?: Partial<EditorialCaseStudyData['whyNow']>;
	problemExperience?: Partial<EditorialCaseStudyData['problemExperience']>;
	roleApproach?: Partial<EditorialCaseStudyData['roleApproach']>;
	scope?: Partial<NonNullable<EditorialCaseStudyData['scope']>>;
	alignment?: string[];
	built?: Partial<EditorialCaseStudyData['built']>;
	tradeoffs?: EditorialTradeoff[];
	outcomes?: Partial<EditorialCaseStudyData['outcomes']>;
	architecture?: EditorialCaseStudyData['architecture'];
	technicalConfiguration?: string;
	footerNote?: string;
}

export interface EditorialCaseStudyData {
	format: 'editorial-v2';
	slug: string;
	title: string;
	company: string;
	year: string;
	domain: string;
	deck: string;
	status: WorkStatus | null;
	confidentialityNote?: string;
	meta: {
		role: string;
		team: string;
		timeline: string;
		stage: string;
	};
	summary: {
		problem: string;
		action: string;
		result: string;
	};
	whyNow: {
		body: string[];
		visuals?: EditorialVisual[];
	};
	problemExperience: {
		body: string[];
		evidence?: EditorialEvidenceRow[];
		visuals?: EditorialVisual[];
	};
	roleApproach: {
		owned: string;
		decisions: EditorialDecision[];
	};
	scope?: {
		shipped: string[];
		deferred: string[];
		cut: string[];
		hardestCut: string;
		inferred?: boolean;
		artifact?: EditorialVisual;
	};
	alignment?: string[];
	built: {
		body: string[];
		visual?: EditorialVisual;
		callouts?: EditorialCallout[];
	};
	tradeoffs?: EditorialTradeoff[];
	outcomes: {
		body: string[];
		metrics?: EditorialMetric[];
		visuals?: EditorialVisual[];
		threshold?: string;
		guardrail?: string;
		metricDefinition?: string;
		limitation?: string;
		chart?: EditorialChart;
	};
	architecture?: {
		summary: string;
		visuals: EditorialVisual[];
	};
	reflection: string[];
	technicalConfiguration?: string;
	evidenceLinks?: LinkItem[];
	footerNote?: string;
}

export type AnyCaseStudyData = CaseStudyData | EditorialCaseStudyData;

export function isEditorialCaseStudy(
	data: AnyCaseStudyData,
): data is EditorialCaseStudyData {
	return data.format === 'editorial-v2';
}
