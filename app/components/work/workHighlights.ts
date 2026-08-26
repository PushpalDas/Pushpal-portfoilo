/**
 * Home-page work highlights.
 *
 * Every figure here has to trace to the corrected case-study data in
 * data/case-studies-v2.json or to a page Ixana/EEGRAB has published — the
 * home page must never contradict a case study. Customer and partner names
 * appear only where the company itself has published the relationship;
 * everything else stays in its generic form.
 *
 * That rule is mechanical here: every metric and every panel item carries a
 * `source`, and the shape will not compile without one.
 */

/** Anything shown to a reader has to say where it came from. */
type Sourced = { source: string };

export type Metric = Sourced & {
	/** Display string — "118 of 140", "9 min → <1 min", "0". */
	value: string;
	/** Short, lower-case. */
	label: string;
	/** Set ONLY when `value` is a plain integer; animates 0 → value once. */
	countUp?: number;
};

export type HighlightTrack = 'silicon' | 'ai' | 'ip';

export type Highlight = {
	/** Case study at /work/<slug>. */
	slug: string;
	track: HighlightTrack;
	/** Row label. */
	title: string;
	/** Outcome-led, ≤ 10 words. */
	headline: string;
	soWhat: string;
	/** metrics[0] is the primary — it is the one that shows in the row. */
	metrics: [Metric, Metric] | [Metric, Metric, Metric];
	/** 4–5, outcome phrasing, rendered in two interleaved columns. */
	features: string[];
	/** Defaults to "Who's interested?". */
	panelLabel?: string;
	panelItems: (Sourced & { text: string; href?: string })[];
	role: string;
	status: string;
	years: string;
	/** 'number' shows metrics[0] at display size instead of an image. */
	media:
		| { kind: 'image'; src: string; alt: string }
		| { kind: 'number' };
	proof?: { text: string; href: string };
	/** The patent tile sits on its own, below both tracks. */
	pinned?: boolean;
};

export type HighlightGroup = {
	track: HighlightTrack;
	label: string;
	/** The "+n more" row at the end of the group. `n` is computed, never typed. */
	more?: { href: string };
};

const IXANA_COMPANY = 'https://ixana.ai/company';
const IXANA_BAN = 'https://www.ixana.ai/products/chips/wi-r-ban';
const IXANA_TECH = 'https://www.ixana.ai/technology';
const IXANA_DEV_KITS = 'https://www.ixana.ai/products/dev-kits';

export const highlightGroups: HighlightGroup[] = [
	{ track: 'silicon', label: 'Silicon & systems', more: { href: '/work?domain=silicon' } },
	{ track: 'ai', label: 'AI programs & platforms', more: { href: '/work?domain=ai' } },
	{ track: 'ip', label: 'Patents, across both' },
];

export const workHighlights: Highlight[] = [
	{
		slug: 'wi-r-ban-yr31',
		track: 'silicon',
		title: 'Wi-R Body Area Network',
		headline: 'Body-area silicon, shipped to customer hardware.',
		soWhat:
			'Wire-like wireless for human-AI wearables — the signal stays on the body, not in the air.',
		metrics: [
			{
				value: '0.1–0.2 nJ/bit',
				label: 'energy per bit — ~50× NFC, a decade beyond Bluetooth',
				source: `${IXANA_TECH} › "Wi-R achieves 0.1-0.2 nJ/bit energy efficiency, a decade better than Bluetooth, NFC, and other short-range wireless technologies" · "50x More Efficient"`,
			},
			{
				value: '20 Mbit/s',
				label: 'peak rate, at sub-0.2 ms latency',
				source: `${IXANA_BAN} › YR31 "Up to 20 Mbit/s", "<0.2ms"`,
			},
			{
				value: '16',
				countUp: 16,
				label: 'devices on one body network',
				source: `${IXANA_BAN} › "Up to 16 devices in the network"`,
			},
		],
		features: [
			'Two-part family: YR23 at 5 Mbit/s sub-1 ms, YR31 at 20 Mbit/s sub-0.2 ms',
			'Physically secure: the field is confined to the body and touch range — nothing to intercept across a room',
			'A single-digit-milliwatt on-body link, roughly a tenth of the radio budget it replaces',
			'The silicon under the BAN dev kit and every on-body reference design that followed',
		],
		panelItems: [
			{
				text: 'Purdue University',
				source: `${IXANA_COMPANY} › Research Partners`,
			},
			{
				text: 'National Science Foundation',
				source: `${IXANA_COMPANY} › Research Partners`,
			},
			{ text: 'U.S. Army', source: `${IXANA_COMPANY} › Government & Defense` },
			{ text: 'SOCOM', source: `${IXANA_COMPANY} › Government & Defense` },
			{
				text: 'Defense Innovation Unit',
				source: `${IXANA_COMPANY} › Government & Defense`,
			},
			{
				text: 'U.S. Air Force',
				source: `${IXANA_COMPANY} › Government & Defense`,
			},
		],
		role: 'Owned spec → production, YR23 and YR31',
		status: 'In production',
		years: '2024–present',
		media: {
			kind: 'image',
			src: '/static/images/ixana-wir-devices.png',
			alt: 'Wi-R body-area and near-field devices',
		},
		proof: { text: 'Wi-R BAN on ixana.ai', href: IXANA_BAN },
	},
	{
		slug: 'wi-r-dev-kits-ban-yr23-and-nfe-xa-nfe2001',
		track: 'silicon',
		title: 'Wi-R Dev Kits',
		headline: 'A working on-body link in under a day.',
		soWhat:
			'Turned eval silicon into a kit partner teams bring up without weeks of RF debugging.',
		metrics: [
			{
				value: '28.5 d → 6 hrs',
				label: "median time to a partner's first on-body link",
				source:
					'case-studies-v2.json#wi-r-dev-kits-ban-yr23-and-nfe-xa-nfe2001 › summary › "Median time to first link fell from 28.5 days to about 6 hours"',
			},
			{
				value: '2 kits',
				label: 'BAN YR23 and NFE XA-NFE2001, each with SDK and example scripts',
				source: `${IXANA_DEV_KITS} › "2x YR23 Boards, BER/PER Test, Documentation & SDK, Example Scripts" · "2x XA-NFE2001 Boards, Smartwatch form factor, Example Scripts, Development Tools & SDK"`,
			},
			{
				value: '9 of 34',
				label: 'kit evaluations that became design-ins',
				source:
					'case-studies-v2.json#wi-r-dev-kits-ban-yr23-and-nfe-xa-nfe2001 › summary › "9 of 34 evaluations converted into design-ins"',
			},
		],
		features: [
			'A partner engineer opens the box and holds a link across their own body inside the hour',
			'BAN and NFE evaluation on one platform — boards, a known-good host and tested electrodes',
			'Ships with documentation, an SDK and worked example scripts',
			'The on-ramp to the smartglasses and tactical-headset reference designs',
		],
		panelItems: [
			{
				text: 'Tier-1 Smartphone OEM',
				source: `${IXANA_COMPANY} › Industry Partners`,
			},
			{
				text: 'Tier-1 Wearables Partner',
				source: `${IXANA_COMPANY} › Industry Partners`,
			},
			{
				text: 'Tier-1 Platform Partner',
				source: `${IXANA_COMPANY} › Industry Partners`,
			},
		],
		role: 'Owned productisation from eval boards to a shipping kit',
		status: 'In production',
		years: '2024–present',
		media: {
			kind: 'image',
			src: '/static/images/project/Image__10_.jpg',
			alt: 'Wi-R dev kit enclosure showing the sensor port, module bay and power control',
		},
		proof: { text: 'Dev kits on ixana.ai', href: IXANA_DEV_KITS },
	},
	{
		slug: 'xana-multifile-rag-based-data-singularity-platform',
		track: 'ai',
		title: 'XANA — Ixana-Wiki',
		headline: 'One search box for the whole company.',
		soWhat:
			'A multifile RAG platform that answers with citations across docs, meetings, tasks and patents.',
		metrics: [
			{
				value: '9 min → <1 min',
				label: 'median time to find a document',
				source:
					'case-studies-v2.json#xana-multifile-rag-based-data-singularity-platform › summary › "Median time-to-find fell from nine minutes to under one"',
			},
			{
				value: '118 of 140',
				label: 'employees on one search box, inside a quarter',
				source:
					'case-studies-v2.json#xana-multifile-rag-based-data-singularity-platform › summary › "118 of 140 employees used it within a quarter"',
			},
			{
				value: '5',
				countUp: 5,
				label: 'systems searched as one, with cited answers',
				source:
					'case-studies-v2.json#xana-multifile-rag-based-data-singularity-platform › summary › "one searchable repository across OneDrive, ClickUp, Teams, efficiency trackers and patent records"',
			},
		],
		features: [
			'One search across five systems — docs, meetings, tasks, patents — with cited answers',
			'Meeting recordings you can enter by transcript: click a line, land on the moment',
			'Hybrid search and role-based access, so the index can hold everything',
			'Adopted company-wide within a quarter of launch',
		],
		panelItems: [
			{
				text: 'Built for Ixana — in daily use across the company',
				source:
					'case-studies-v2.json#xana-multifile-rag-based-data-singularity-platform › meta.stage › "Live, company-wide"',
			},
		],
		role: 'Owned it from concept to company-wide rollout',
		status: 'Shipped internally',
		years: '2025',
		media: {
			kind: 'image',
			src: '/static/images/xana.png',
			alt: "XANA — Ixana's internal AI operating system",
		},
		proof: { text: 'Repo', href: 'https://github.com/PushpalDas/Ixana-Wiki' },
	},
	{
		slug: 'ai-prd-multi-agent-multi-llm-shared-memory-generative-system',
		track: 'ai',
		title: 'AI Product-Planning OS',
		headline: 'From raw brief to execution-ready plan in minutes.',
		soWhat:
			'A planning system that stops on uncertainty and never lets one model approve its own work.',
		metrics: [
			{
				value: '6m 40s',
				label: 'median run from raw brief to human review',
				source:
					'case-studies-v2.json#ai-prd-multi-agent-multi-llm-shared-memory-generative-system › summary › "A run reaches human review in a median of 6m 40s"',
			},
			{
				value: '2 models',
				label: 'a second model must approve the first',
				source:
					'case-studies-v2.json#ai-prd-multi-agent-multi-llm-shared-memory-generative-system › summary › "requires a different model to review the plan than wrote it"',
			},
			{
				value: '68%',
				label: 'of plans approved by the human on first read',
				source:
					'case-studies-v2.json#ai-prd-multi-agent-multi-llm-shared-memory-generative-system › summary › "68% of plans are approved by the human on first read"',
			},
		],
		features: [
			'A raw brief reaches human review in a median of 6m 40s',
			'Stops on uncertainty instead of guessing',
			'Second-model approval before any plan passes',
			'Multi-agent, multi-LLM, shared memory — the approved plan is frozen before tasks are generated',
		],
		panelItems: [
			{
				text: "Built for Ixana's planning and delivery teams",
				source:
					'case-studies-v2.json#ai-prd-multi-agent-multi-llm-shared-memory-generative-system › meta.stage › "Live for internal planning"',
			},
		],
		role: 'Designed the governance model; shipped it',
		status: 'Shipped internally',
		years: '2026',
		media: { kind: 'number' },
	},
	{
		slug: 'dsa-generative-ai-engine-for-a-guided-spiritual-path',
		track: 'ai',
		title: 'Dāsa',
		headline: 'Zero fabricated citations. By design.',
		soWhat:
			'A citation-grounded retrieval engine for scripture — every answer traces to a source.',
		metrics: [
			{
				value: '0',
				label: 'fabricated citations across 100 evaluated answers',
				source:
					'case-studies-v2.json#dsa-generative-ai-engine-for-a-guided-spiritual-path › summary › "fabricated citations fell from 17 per 100 answers to zero"',
			},
			{
				value: '17 → 0',
				label: 'fabrications before → after the eval-gated rebuild',
				source:
					'case-studies-v2.json#dsa-generative-ai-engine-for-a-guided-spiritual-path › summary › "fabricated citations fell from 17 per 100 answers to zero"',
			},
			{
				value: '0.614 → 0.840',
				label: 'retrieval quality, nDCG@6 after re-ranking',
				source:
					'case-studies-v2.json#dsa-generative-ai-engine-for-a-guided-spiritual-path › summary › "retrieval quality rose from 0.614 to 0.840 nDCG@6 after re-ranking"',
			},
		],
		features: [
			'Citation-grounded retrieval — a deterministic guard strips any citation that was not retrieved',
			'Eval-gated: nothing ships while fabrication is above zero',
			'A calibrated distance gate refuses questions the corpus does not address',
			'Roughly 32,000 chunks across books, letters and verified lecture transcripts',
		],
		panelItems: [
			{
				text: 'ISKCON — a volunteer project over published texts',
				source:
					'case-studies-v2.json#dsa-generative-ai-engine-for-a-guided-spiritual-path › confidentiality › "Volunteer project over published texts"',
			},
		],
		role: 'Owned the evaluation method and the engine',
		status: 'Research — engine and interface built, not yet connected',
		years: '2026–present',
		media: { kind: 'number' },
		proof: {
			text: 'Product walkthrough',
			href: 'https://www.youtube.com/watch?v=S4G_99Yn2M4',
		},
	},
	{
		slug: 'ixana-patent-program',
		track: 'ip',
		pinned: true,
		title: 'Patent program',
		headline: 'A patent estate, owned end to end.',
		soWhat: 'Filings across six Wi-R product lines, from disclosure to grant.',
		metrics: [
			{
				value: '50+',
				label: 'filings across six product lines',
				source:
					'case-studies-v2.json#ixana-patent-program › summary › "Fifty-plus filings across six product lines"',
			},
			{
				value: '14 → 6 wks',
				label: 'disclosure to filing, on no extra inventor time',
				source:
					'case-studies-v2.json#ixana-patent-program › summary › "median disclosure-to-filing down from about fourteen weeks to six, and inventor time per disclosure falling rather than rising"',
			},
			{
				value: 'Granted',
				label: 'US12619308B2, first of the estate',
				source: 'https://patents.google.com/patent/US12619308B2/en',
			},
		],
		features: [
			'Disclosure-to-filing cut from about 14 weeks to 6',
			'Filing calendar anchored to the silicon tapeout calendar',
			'Quarterly file / defer / publish / abandon reviews with the founder/CTO',
			'First grants issued',
		],
		panelLabel: 'Proof',
		panelItems: [
			{
				text: 'Granted — wearable EQS-HBC device (US12619308B2)',
				href: 'https://patents.google.com/patent/US12619308B2/en',
				source: 'https://patents.google.com/patent/US12619308B2/en',
			},
			{
				text: 'Published — human-body-resonance data transfer (US20250379663A1)',
				href: 'https://patents.google.com/patent/US20250379663A1/en',
				source: 'https://patents.google.com/patent/US20250379663A1/en',
			},
			{
				text: 'Published — error-proportional encoding for body area networks (US20250192915A1)',
				href: 'https://patents.google.com/patent/US20250192915A1/en',
				source: 'https://patents.google.com/patent/US20250192915A1/en',
			},
		],
		role: 'Owned the program end to end with the founder/CTO',
		status: 'Live across three outside firms',
		years: '2024–2026',
		media: {
			kind: 'image',
			src: '/static/images/project/ixana-patent-tracker.png',
			alt: 'Patent matter lifecycle tracker',
		},
	},
];
