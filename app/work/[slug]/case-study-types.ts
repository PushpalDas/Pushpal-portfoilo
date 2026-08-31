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

// ============================================================
//  Case study v2 — the 10-section format
//  Mirrors app/Changes/case-study-final-sample.html section for
//  section. A slug present in data/case-studies-v2.json renders
//  with this shape; everything else falls back to the older
//  layout below.
// ============================================================

export type CaseStudyStatus =
	| 'production'
	| 'internal'
	| 'customer-testing'
	| 'prototype'
	| 'research';

/** Static SVG chart specs. One form per §08 across the portfolio. */
export type ChartSpec =
	/** Horizontal bars — sizing, evidence counts, recall by source */
	| {
			form: 'hbar';
			title: string;
			max: number;
			unit?: string;
			rows: { name: string; value: number; label: string; dim?: boolean }[];
	  }
	/** Line with area fill over time, optional pre-agreed threshold */
	| {
			form: 'lineArea';
			title: string;
			yMax: number;
			yTicks: number[];
			xLabels: string[];
			points: number[];
			threshold?: { value: number; label: string };
	  }
	/** Before/after column pairs per category */
	| {
			form: 'pairedBars';
			title: string;
			yMax: number;
			unit?: string;
			beforeLabel: string;
			afterLabel: string;
			groups: { name: string; before: number; after: number }[];
	  }
	/** Narrowing funnel stages */
	| {
			form: 'funnel';
			title: string;
			stages: { name: string; value: number; label: string }[];
	  }
	/** Stacked columns per period */
	| {
			form: 'stackedBars';
			title: string;
			yMax: number;
			series: { name: string; color: string }[];
			columns: { name: string; values: number[] }[];
			/** Optional event markers above a column — e.g. a public launch date */
			markers?: { index: number; label: string }[];
	  }
	/** Before → after dot pairs on one row per item */
	| {
			form: 'dumbbell';
			title: string;
			max: number;
			unit?: string;
			rows: { name: string; from: number; to: number }[];
	  }
	/** Grouped horizontal bars — two series per row */
	| {
			form: 'groupedHBar';
			title: string;
			max: number;
			unit?: string;
			seriesNames: [string, string];
			rows: { name: string; a: number; b: number }[];
	  }
	/** Slope lines between two points, one line per item */
	| {
			form: 'slope';
			title: string;
			yMax: number;
			unit?: string;
			leftLabel: string;
			rightLabel: string;
			lines: { name: string; from: number; to: number }[];
	  }
	/** Stacked area over time */
	| {
			form: 'stackedArea';
			title: string;
			yMax: number;
			xLabels: string[];
			series: { name: string; color: string; points: number[] }[];
	  }
	/** Columns with a horizontal threshold rule */
	| {
			form: 'barsThreshold';
			title: string;
			yMax: number;
			unit?: string;
			threshold: { value: number; label: string };
			columns: { name: string; value: number }[];
	  }
	/** Two lines over the same x-axis */
	| {
			form: 'dualLine';
			title: string;
			yMax: number;
			xLabels: string[];
			series: { name: string; color: string; points: number[] }[];
	  }
	/** Frequency distribution */
	| {
			form: 'histogram';
			title: string;
			yMax: number;
			xTitle: string;
			ceiling?: { index: number; label: string };
			bins: { name: string; value: number }[];
	  }
	/** One row per pre-agreed gate: actual bar against a target marker */
	| {
			form: 'gateBars';
			title: string;
			rows: {
				name: string;
				value: number;
				target: number;
				max: number;
				label: string;
				targetLabel: string;
				pass: boolean;
			}[];
	  }
	/** Single curve over a non-time x-axis */
	| {
			form: 'curve';
			title: string;
			yMax: number;
			yUnit: string;
			xLabels: string[];
			points: number[];
			ceiling?: { value: number; label: string };
	  }
	/** Scatter with optional cluster colouring */
	| {
			form: 'scatter';
			title: string;
			xTitle: string;
			yTitle: string;
			xMax: number;
			yMax: number;
			points: { x: number; y: number; group?: number }[];
	  }
	/** One dot per category on a shared scale, with n per row */
	| {
			form: 'dotplot';
			title: string;
			max: number;
			unit?: string;
			threshold?: { value: number; label: string };
			rows: { name: string; value: number; n: number }[];
	  }
	/** Cumulative step area */
	| {
			form: 'cumulative';
			title: string;
			yMax: number;
			xLabels: string[];
			points: number[];
			threshold?: { value: number; label: string };
	  }
	/**
	 * Survival curves — one step curve per cohort showing what share of a
	 * population is still waiting at elapsed point N. A vertical rule marks the
	 * agreed waiting limit and a marker per cohort shows where half has moved.
	 * Distinct from `dualLine`, which compares two independent series, and from
	 * `histogram`, which shows a distribution rather than what is still open.
	 */
	| {
			form: 'survival';
			title: string;
			xTitle: string;
			xLabels: string[];
			series: { name: string; color: string; points: number[] }[];
			threshold: { index: number; label: string };
			medians: { name: string; index: number; label: string }[];
	  }
	/**
	 * Descending bars against a left axis, with a cumulative-share line on a
	 * right axis — the standard defect / escape analysis. Bars are drawn in
	 * the order given, so supply them already sorted.
	 */
	| {
			form: 'pareto';
			title: string;
			yMax: number;
			unit?: string;
			cutoff?: { value: number; label: string };
			bars: { name: string; value: number }[];
	  }
	/**
	 * Grid of cells shaded by value — a coverage or pass-rate matrix.
	 * `rows` are the y labels, `cols` the x labels, and `cells` is
	 * row-major with one number per row × col. `max` sets full shade.
	 */
	| {
			form: 'heatmap';
			title: string;
			rows: string[];
			cols: string[];
			cells: number[][];
			max: number;
			unit?: string;
			legend?: string;
	  }
	/**
	 * Horizontal stacked bars — a phase breakdown, one bar per row.
	 * `values` in each row line up with `series`, so a phase that
	 * disappears is a zero rather than a missing entry.
	 */
	| {
			form: 'stackedHBar';
			title: string;
			max: number;
			unit?: string;
			series: { name: string; color: string }[];
			rows: { name: string; values: number[]; label: string }[];
	  }
	/**
	 * Bars extending either side of a zero axis — change per metric where
	 * direction and desirability are independent. `good: false` colours a
	 * row as a regression, so a deliberate trade reads as one.
	 */
	| {
			form: 'diverging';
			title: string;
			max: number;
			unit?: string;
			rows: { name: string; value: number; label: string; good: boolean }[];
	  }
	/**
	 * Two or more curves over shared x categories, with a horizontal
	 * acceptance threshold and the acceptable region shaded. For data
	 * where the story is which series crosses out of a budget, and where.
	 */
	| {
			form: 'thresholdCurves';
			title: string;
			yMax: number;
			yUnit: string;
			xLabels: string[];
			series: { name: string; color: string; points: number[] }[];
			threshold: { value: number; label: string };
	  }
	/**
	 * Unit chart — one cell per countable item, filled to `value`.
	 * For coverage where the remainder is small enough to matter: the
	 * gap is visible as specific empty cells, not as a percentage.
	 */
	/**
	 * A path through a two-dimensional trade space, one point per revision.
	 * For programmes where the story is the route taken between two
	 * competing quantities, not the endpoint. `target` shades the corner
	 * that was agreed up front.
	 */
	| {
			form: 'trajectory';
			title: string;
			xTitle: string;
			yTitle: string;
			xMin: number;
			xMax: number;
			yMin: number;
			yMax: number;
			target?: { x: number; y: number; label: string };
			points: { name: string; x: number; y: number; note: string }[];
	  }
	/**
	 * One dot per measured unit along a shared scale, several units per row —
	 * a strip plot. For showing a population rather than its summary, where
	 * the spread is the finding. Distinct from `dotplot`, which carries one
	 * dot per category. Jitter is derived from the index so server and client
	 * render identically.
	 */
	| {
			form: 'strips';
			title: string;
			min: number;
			max: number;
			unit?: string;
			band?: { from: number; to: number; label: string };
			rows: { name: string; values: number[]; label: string; own?: boolean }[];
	  }
	/**
	 * Sensitivity analysis — one bar per term, spanning the swing that term
	 * puts into the result when it moves across its plausible range, sorted
	 * widest first. Distinct from `diverging`, which draws a single value
	 * out from zero rather than a range straddling it.
	 */
	| {
			form: 'tornado';
			title: string;
			max: number;
			unit?: string;
			baseline: string;
			rows: { name: string; low: number; high: number; label: string }[];
	  }
	/**
	 * Grid of categorical verdicts — one glyph per row × column, coloured by
	 * outcome rather than shaded by magnitude. For feasibility matrices where
	 * "no path exists" is a different answer from "measured badly", which a
	 * numeric `heatmap` cannot express.
	 */
	| {
			form: 'statusGrid';
			title: string;
			rows: string[];
			cols: string[];
			cells: ('pass' | 'marginal' | 'fail' | 'none')[][];
			legend: { pass: string; marginal: string; fail: string; none: string };
	  }
	/**
	 * Operating envelopes against a shared regime boundary — one band per
	 * option showing the span of a physical variable in which it works, with
	 * a vertical rule where the medium itself changes behaviour. For findings
	 * that are a threshold rather than a quantity.
	 */
	| {
			form: 'bands';
			title: string;
			min: number;
			max: number;
			unit?: string;
			boundary: { value: number; label: string };
			marks?: { value: number; label: string }[];
			rows: {
				name: string;
				from: number;
				to: number;
				label: string;
				own?: boolean;
			}[];
	  }
	/**
	 * Waterfall — a running balance walked from one total to another, one
	 * floating bar per contribution, with adds and subtractions coloured
	 * separately. For claims that need decomposing, including the terms that
	 * turn out to run the wrong way.
	 */
	| {
			form: 'waterfall';
			title: string;
			min: number;
			max: number;
			unit?: string;
			bars: {
				name: string;
				value: number;
				kind: 'total' | 'add' | 'subtract';
				label: string;
			}[];
	  }
	/**
	 * Central estimate with an uncertainty interval, judged against a decision
	 * threshold, one row per case. For findings where the question is not the
	 * size of the effect but whether it survives the model's own error bars.
	 */
	| {
			form: 'intervals';
			title: string;
			min: number;
			max: number;
			unit?: string;
			threshold: { value: number; label: string };
			rows: {
				name: string;
				value: number;
				lo: number;
				hi: number;
				label: string;
				clears: boolean;
			}[];
	  }
	/**
	 * Radar — several options scored on the same set of criteria by the same
	 * reviewers, one polygon per option. For multi-criteria design reviews,
	 * where the shape of a weakness matters more than any single score.
	 */
	| {
			form: 'radar';
			title: string;
			max: number;
			axes: string[];
			series: { name: string; color: string; values: number[] }[];
	  }
	/**
	 * Confusion matrix — actual against predicted for one classifier, with the
	 * diagonal read as correct and everything off it as an error. Distinct
	 * from `heatmap`, which shades magnitude: here the direction of an error
	 * is the finding, because over- and under-counting are not equally costly.
	 */
	| {
			form: 'confusion';
			title: string;
			classes: string[];
			cells: number[][];
			rowLabel: string;
			colLabel: string;
			marginLabel: string;
	  }
	/**
	 * Ordered campaign log — one marker per attempt in sequence, coloured by
	 * outcome, with an optional rule marking where something changed. For
	 * small test campaigns where the order of events is the finding, which a
	 * distribution or a matrix throws away.
	 */
	| {
			form: 'sequence';
			title: string;
			events: { name: string; outcome: 'ok' | 'abort' | 'fail' }[];
			legend: { ok: string; abort: string; fail: string };
			marker?: { afterIndex: number; label: string };
	  }
	/**
	 * Two curves over a shared x-axis with the area between them shaded —
	 * for a finding that is the *gap* rather than either series. The lower
	 * curve is a component of the upper one, so the band closing is the
	 * result. Distinct from `dualLine`, which compares two independent
	 * series and says nothing about the space between them, and from
	 * `thresholdCurves`, where the reference is a fixed budget rather than
	 * a second measurement.
	 */
	| {
			form: 'gapArea';
			title: string;
			yMax: number;
			yUnit?: string;
			xLabels: string[];
			upper: { name: string; points: number[] };
			lower: { name: string; points: number[] };
			gapLabel: string;
			marker?: { index: number; label: string };
	  }
	| {
			form: 'waffle';
			title: string;
			total: number;
			value: number;
			perRow: number;
			filledLabel: string;
			emptyLabel: string;
	  }
	/**
	 * Variable-width stacked columns. Each column is split by `series` like a
	 * normal stacked bar, but its *width* carries a second quantity, so a
	 * group that holds most of the population cannot be outvoted visually by
	 * a small group with a tidier split.
	 */
	| {
			form: 'marimekko';
			title: string;
			series: { name: string; color: string }[];
			columns: {
				name: string;
				weight: number;
				weightLabel: string;
				values: number[];
			}[];
	  };

export interface CaseStudyFigure {
	chart: ChartSpec;
	caption: string;
}

export interface CaseStudySection {
	/** Two-digit number as shown in the heading, e.g. "01" */
	num: string;
	heading: string;
	/** Paragraphs of body copy, rendered in order before any block */
	body?: string[];
	/** Blocks rendered after the body paragraphs, in array order */
	blocks?: CaseStudyBlock[];
	/** Paragraphs rendered after the blocks */
	after?: string[];
}

export type CaseStudyBlock =
	/** A paragraph placed between two blocks, where ordering matters */
	| { kind: 'para'; text: string }
	/**
	 * A list of internal or external links with a one-line note each —
	 * built for the program page's chapter list, where a name has to be
	 * the way into the page it names.
	 */
	| {
			kind: 'links';
			label?: string;
			items: { label: string; href: string; note?: string }[];
	  }
	| { kind: 'figure'; chart: ChartSpec; caption: string }
	/** Evidence / tradeoff table. `head` labels are reused as mobile row labels. */
	| { kind: 'table'; head: string[]; rows: string[][] }
	/** Key decisions — bolded lead sentence, then the reasoning */
	| {
			kind: 'decisions';
			label?: string;
			items: { lead: string; text: string }[];
	  }
	/** Shipped / Deferred / Cut columns */
	| { kind: 'scope'; shipped: string[]; deferred: string[]; cut: string[] }
	/** A cropped page from a working document */
	| {
			kind: 'doc';
			bar: string;
			lead?: string;
			items: { lead: string; text: string }[];
			note?: string;
	  }
	/** Annotated screen or board photo with 3–4 numbered decision callouts.
	 *  `href` attaches the running surface behind the screenshot, so a reader
	 *  can open the thing rather than only read about it. */
	| {
			kind: 'shot';
			image?: string;
			placeholder?: string;
			alt?: string;
			callouts: { lead: string; text: string }[];
			note: string;
			href?: string;
			hrefLabel?: string;
	  }
	/** Outcome metric tiles — six per full case study, never configuration */
	| { kind: 'metrics'; items: { value: string; sub?: string; label: string }[] }
	/** "How we counted" definition line */
	| { kind: 'definition'; lead: string; text: string }
	/** The single monospace configuration line */
	| { kind: 'config'; text: string }
	/**
	 * Captioned grid of product surfaces — for a platform whose several
	 * screens each carry a decision. At most one per page, and it never
	 * replaces the `shot` block: `shot` argues one screen with numbered
	 * callouts, `gallery` shows that the rest of the system exists.
	 */
	| {
			kind: 'gallery';
			items: {
				image?: string;
				placeholder?: string;
				label?: string;
				caption: string;
				/**
				 * Describes the screen for a reader who cannot see it. The
				 * label is a title, not a description, so it makes poor alt
				 * text; where this is absent the label is still used, which
				 * is why it is optional rather than required.
				 */
				alt?: string;
				/** The live surface this screen is a picture of. */
				href?: string;
				hrefLabel?: string;
			}[];
			note?: string;
	  }
	/** Collapsed architecture block, near the bottom of the page */
	| {
			kind: 'arch';
			summary: string;
			figures: { image?: string; placeholder?: string; caption: string }[];
	  };

export interface CaseStudyV2 {
	slug: string;
	/** Company · Year · Domain */
	eyebrow: string;
	title: string;
	/** One line stating the outcome */
	deck: string;
	status: CaseStudyStatus;
	meta: { role: string; team: string; timeline: string; stage: string };
	/** Confidentiality line under the meta strip */
	confidentiality: string;
	/** Public, verifiable evidence — datasheets, product pages, patents */
	evidence?: { label: string; url: string }[];
	/**
	 * The fast layer for a skimming reader. Facts carry only claims a
	 * public source or the linked demo can back (Class A) or that the page
	 * declares real-but-masked (Class B) — never illustrative placeholders.
	 * The pull line is harvested from the page's own prose, never written new.
	 */
	fast?: {
		pull?: string;
		facts?: { text: string; cls: 'A' | 'B' }[];
	};
	/** Exactly three: Problem / What I did / Result */
	summary: { lead: string; text: string }[];
	sections: CaseStudySection[];
	/** Footer sample-figures note. Required on every generated page. */
	sampleNote: string;
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
