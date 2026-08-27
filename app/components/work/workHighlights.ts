/**
 * Home-page work highlights.
 *
 * Every figure here has to trace to the corrected case-study data in
 * data/case-studies-v2.json or to a page Ixana/EEGRAB has published — the
 * home page must never contradict a case study. Customer and partner names
 * appear only where the company itself has published the relationship;
 * everything else stays in its generic form.
 *
 * That rule is mechanical: every metric and every panel item carries a
 * `source`, and the shape will not compile without one.
 *
 * The section shows what is actually in use — in production, or shipped
 * internally and in daily use. Nothing research-stage, nothing prototype,
 * nothing in pilot. Anything else lives one click away behind the "+n" rows.
 */

/** Anything shown to a reader has to say where it came from. */
type Sourced = { source: string };

export type Metric = Sourced & {
	/** Display string — "21% → 84%", "9h → 20m", "40+ labs". */
	value: string;
	/** Short, lower-case. */
	label: string;
	/** Set ONLY when `value` is a plain integer; animates 0 → value once. */
	countUp?: number;
};

export type HighlightTrack = 'silicon' | 'ai';

export type PanelItem = Sourced & { text: string; href?: string };

/** Exactly four, so a tile cannot quietly grow a fifth. */
type Features = [string, string, string, string];

export type Highlight = {
	/** Case study at /work/<slug>. */
	slug: string;
	track: HighlightTrack;
	/** Row label. */
	title: string;
	/** Company · years, from the case study's own eyebrow. */
	eyebrow: string;
	/** Outcome-led, ≤ 10 words. */
	headline: string;
	/** One line, ≤ 110 characters. Revealed under the active row. */
	soWhat: string;
	/** metrics[0] is the primary — it is the one that shows in the row. */
	metrics: [Metric, Metric] | [Metric, Metric, Metric];
	/** Outcome phrasing, each ≤ 90 characters. */
	features: Features;
	/** Defaults to "Who's interested?". */
	panelLabel?: string;
	panelItems: PanelItem[];
	role: string;
	status: string;
	years: string;
	/** 'number' shows metrics[0] at display size instead of an image. */
	media: { kind: 'image'; src: string; alt: string } | { kind: 'number' };
	proof?: { text: string; href: string };
};

export type HighlightGroup = {
	track: HighlightTrack;
	label: string;
	/** The "+n more" row at the end of the group. `n` is computed, never typed. */
	more: { href: string };
};

const IXANA_COMPANY = 'https://ixana.ai/company';
const IXANA_BAN = 'https://www.ixana.ai/products/chips/wi-r-ban';
const IXANA_NFE = 'https://www.ixana.ai/products/chips/wi-r-nfe';
const IXANA_TECH = 'https://www.ixana.ai/technology';
const IXANA_DEV_KITS = 'https://www.ixana.ai/products/dev-kits';
const IXANA_REF_DESIGNS = 'https://www.ixana.ai/products/reference-designs';

/**
 * The partner ecosystem, defined once. Every name is published on
 * ixana.ai/company under the heading it is grouped by here — nothing is
 * paraphrased and nothing is added.
 */
const IXANA_PARTNERS: PanelItem[] = [
	{
		text: 'Research partners — Purdue University, National Science Foundation',
		source: `${IXANA_COMPANY} › Research Partners`,
	},
	{
		text: 'Government & defense — U.S. Army, SOCOM, Defense Innovation Unit, U.S. Air Force',
		source: `${IXANA_COMPANY} › Government & Defense`,
	},
	{
		text: 'Industry partners — Tier-1 Smartphone OEM, Tier-1 Wearables Partner, Tier-1 Platform Partner',
		source: `${IXANA_COMPANY} › Industry Partners`,
	},
];

/** The one line every internal Ixana platform carries. */
const IXANA_INTERNAL: PanelItem[] = [
	{
		text: 'Built for Ixana — in daily use across the company',
		source: 'data/case-studies-v2.json › meta.stage on each entry',
	},
];

export const highlightGroups: HighlightGroup[] = [
	{
		track: 'silicon',
		label: 'Silicon & systems',
		more: { href: '/work?domain=silicon' },
	},
	{
		track: 'ai',
		label: 'AI programs & platforms',
		more: { href: '/work?domain=ai' },
	},
];

export const workHighlights: Highlight[] = [
	// ---------------------------------------------------------------- silicon
	{
		slug: 'wi-r-ban-yr31',
		track: 'silicon',
		title: 'Wi-R BAN · YR31',
		eyebrow: 'Ixana · 2024–present',
		headline: 'Body-area silicon, shipped to customer hardware.',
		soWhat:
			'Wire-like wireless for wearables — the signal stays on the body, not in the air.',
		metrics: [
			{
				value: '20 Mbit/s',
				label: 'peak data rate',
				source: `${IXANA_BAN} › YR31 "Up to 20 Mbit/s", "<0.2ms"`,
			},
			{
				value: '0.1–0.2 nJ/bit',
				label: 'energy per bit',
				source: `${IXANA_TECH} › "0.1-0.2 nJ/bit … a decade better than Bluetooth, NFC" · "50x More Efficient"`,
			},
			{
				value: '16',
				countUp: 16,
				label: 'devices per network',
				source: `${IXANA_BAN} › "Up to 16 devices in the network"`,
			},
		],
		features: [
			'Two-part family: YR23 at 5 Mbit/s sub-1 ms, YR31 at 20 Mbit/s sub-0.2 ms',
			'Field confined to the body — nothing to intercept across a room',
			'Single-digit-milliwatt link, roughly a tenth of the radio budget it replaces',
			'The silicon under the BAN dev kit and every on-body reference design since',
		],
		panelItems: IXANA_PARTNERS,
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
		slug: 'wi-r-nfe-xa-nfe3001',
		track: 'silicon',
		title: 'Wi-R NFE · XA-NFE3001',
		eyebrow: 'Ixana · 2024–present',
		headline: 'Gen-2 near field: four times the real throughput.',
		soWhat:
			'A sealed device gets a service port — 100 MB of firmware lands inside a minute.',
		metrics: [
			{
				value: '3.4 → 13.5 Mbit/s',
				label: 'real throughput, gen-1 to gen-2',
				source:
					'case-studies-v2.json#wi-r-nfe-xa-nfe3001 › summary › "Real throughput went from about 3.4 to 13.5 Mbit/s"',
			},
			{
				value: '100 MB in 59 s',
				label: 'firmware image plus validation logs',
				source:
					'case-studies-v2.json#wi-r-nfe-xa-nfe3001 › §06 › "a 100 MB firmware image plus its validation logs in fifty-nine"',
			},
			{
				value: '9 of 14',
				label: 'stalled evaluations converted',
				source:
					'case-studies-v2.json#wi-r-nfe-xa-nfe3001 › summary › "Nine of the fourteen stalled evaluations converted"',
			},
		],
		features: [
			'13.5 Mbit/s of real data at 1–15 cm, under 6 mW, at sub-0.2 ms latency',
			'No radiated RF — the field stays inside the enclosure it serves',
			'All six requirement lines met, including the three gen-1 missed',
			'No gen-1 socket lost to the upgrade',
		],
		panelItems: IXANA_PARTNERS,
		role: 'Program manager — silicon delivery',
		status: 'In production',
		years: '2024–present',
		media: {
			kind: 'image',
			src: '/static/images/project/wi-r-nfe-xa-nfe3001-package.png',
			alt: 'Wi-R NFE XA-NFE3001 transceiver package',
		},
		proof: { text: 'Wi-R NFE on ixana.ai', href: IXANA_NFE },
	},
	{
		slug: 'wi-r-dev-kits-ban-yr23-and-nfe-xa-nfe2001',
		track: 'silicon',
		title: 'Wi-R Dev Kits',
		eyebrow: 'Ixana · 2024–2026',
		headline: 'A working on-body link in under a day.',
		soWhat:
			'Eval silicon became a kit partner teams bring up without weeks of RF debugging.',
		metrics: [
			{
				value: '28.5 d → 6 hrs',
				label: 'median time to first link',
				source:
					'case-studies-v2.json#wi-r-dev-kits-ban-yr23-and-nfe-xa-nfe2001 › summary › "Median time to first link fell from 28.5 days to about 6 hours"',
			},
			{
				value: '2 kits',
				label: 'BAN YR23 and NFE XA-NFE2001',
				source: `${IXANA_DEV_KITS} › kit contents, both with Documentation & SDK and Example Scripts`,
			},
			{
				value: '9 of 34',
				label: 'evaluations became design-ins',
				source:
					'case-studies-v2.json#wi-r-dev-kits-ban-yr23-and-nfe-xa-nfe2001 › summary › "9 of 34 evaluations converted into design-ins"',
			},
		],
		features: [
			'A partner engineer holds a link across their own body inside the hour',
			'BAN and NFE on one platform — boards, a known-good host, tested electrodes',
			'Ships with documentation, an SDK and worked example scripts',
			'The on-ramp to the smartglasses and tactical-headset reference designs',
		],
		panelItems: IXANA_PARTNERS,
		role: 'Owned productisation from eval boards to a shipping kit',
		status: 'In production',
		years: '2024–2026',
		media: {
			kind: 'image',
			src: '/static/images/project/Image__10_.jpg',
			alt: 'Wi-R dev kit enclosure showing the sensor port, module bay and power control',
		},
		proof: { text: 'Dev kits on ixana.ai', href: IXANA_DEV_KITS },
	},
	{
		slug: 'wi-r-reference-designs',
		track: 'silicon',
		title: 'Wi-R reference designs',
		eyebrow: 'Ixana · 2024–2026',
		headline: 'Two designs an OEM can copy, not admire.',
		soWhat:
			'Video smartglasses and a tactical headset — schematic, layout, BOM and firmware.',
		metrics: [
			{
				value: '11 wks → 3 wks',
				label: "datasheet to a demo on a partner's hardware",
				source:
					'case-studies-v2.json#wi-r-reference-designs › summary › "fell from about eleven weeks to three"',
			},
			{
				value: '6 of 9',
				label: 'design-ins citing a reference design',
				source:
					'case-studies-v2.json#wi-r-reference-designs › summary › "Six of the nine design-ins in the period cite a reference design"',
			},
			{
				value: '2 designs',
				label: 'smartglasses and tactical headset',
				source: `${IXANA_REF_DESIGNS} · case-studies-v2.json#wi-r-reference-designs › §06`,
			},
		],
		features: [
			'All-day compressed video off a head-worn device, on a wearable battery',
			'Voice between headset and body-worn radio, with no emission to locate',
			'Each ships as schematic, layout, validated BOM and firmware',
			'Support hours per evaluation held flat while concurrent evaluations tripled',
		],
		panelItems: IXANA_PARTNERS,
		role: 'Program manager — reference design delivery',
		status: 'In production',
		years: '2024–2026',
		media: {
			kind: 'image',
			src: '/static/images/project/wi-r-refdesign-smartglasses.jpg',
			alt: 'All-day video streaming smartglasses reference design',
		},
		proof: { text: 'Reference designs on ixana.ai', href: IXANA_REF_DESIGNS },
	},
	{
		slug: 'eegrab-wishkey',
		track: 'silicon',
		title: 'WishKey',
		eyebrow: 'EEGRAB · 2023',
		headline: 'A key that cannot leave anonymously.',
		soWhat:
			'Per-slot locking, so every key-removal event names an authenticated person.',
		metrics: [
			{
				value: '4 min → 15 s',
				label: 'to draw a key',
				source:
					'case-studies-v2.json#eegrab-wishkey › summary › "about fifteen seconds instead of four minutes"',
			},
			{
				value: '0.3%',
				label: 'of key-removal events unattributed',
				source:
					'case-studies-v2.json#eegrab-wishkey › summary › "0.3% of key-removal events are unattributed"',
			},
			{
				value: '2 hrs',
				label: 'to commission a cabinet, no IT involved',
				source:
					'case-studies-v2.json#eegrab-wishkey › summary › "a cabinet is commissioned in two hours with no IT involved"',
			},
		],
		features: [
			'Thirty tagged keys, each in its own slot with its own lock and sensor',
			'A card tap and a PIN release only the slot you are entitled to',
			'Stand-alone and plug-and-play: desk or wall, optional backup battery',
			'Android touch interface, SSO and RFID access, air-gapped',
		],
		panelItems: [
			{
				text: 'Banking and enterprise facilities across India',
				source:
					'case-studies-v2.json#eegrab-wishkey › §01 › "data-centre halls, plants, commercial estates, substations"',
			},
			{
				text: 'WishKey brochure — EEGRAB',
				href: 'https://eegrab.com/wp-content/uploads/2021/brochure/Wishkey_brochure.pdf',
				source:
					'https://eegrab.com/wp-content/uploads/2021/brochure/Wishkey_brochure.pdf',
			},
		],
		role: 'Senior Embedded Design Engineer, end to end',
		status: 'In production',
		years: '2023',
		media: {
			kind: 'image',
			src: '/static/images/wishkey.jpg',
			alt: 'WishKey electronic key cabinet',
		},
		proof: {
			text: 'WishKey demo — EEGRAB',
			href: 'https://www.youtube.com/watch?v=8etIl_0wj0I',
		},
	},
	{
		slug: 'slb-sensor-signal-generator',
		track: 'silicon',
		title: 'Sensor signal generator',
		eyebrow: 'SLB · 2023',
		headline: 'Downhole faults, reproduced on a bench.',
		soWhat:
			'A failure analyst stops waiting for a well to reproduce a fault on demand.',
		metrics: [
			{
				value: '98.2%',
				label: 'of catalogued fault signatures reproduced',
				source:
					'case-studies-v2.json#slb-sensor-signal-generator › summary › "reproduces 98.2% of the catalogued field fault signatures — 55 of 56"',
			},
			{
				value: 'weeks → <1 day',
				label: 'to reproduce a reported fault',
				source:
					'case-studies-v2.json#slb-sensor-signal-generator › summary › "fell from weeks of waiting to under a day"',
			},
			{
				value: '40+ labs',
				label: 'running the bench',
				source:
					'case-studies-v2.json#slb-sensor-signal-generator › summary › "runs in more than 40 SLB failure-analysis labs"',
			},
		],
		features: [
			'Plays documented field fault signatures back open-loop, on demand',
			'LabVIEW front panel drives the channel definitions',
			'Analogue signals plus CAN sensor traffic on the tool bus',
			'Calibrated meters across the channels as every session’s reference',
		],
		panelItems: [
			{
				text: 'SLB failure-analysis labs — 40+ running the bench',
				source:
					'case-studies-v2.json#slb-sensor-signal-generator › meta.stage › "deployed across 40+ SLB failure-analysis labs"',
			},
		],
		role: 'Failure Analysis & R&D Engineer',
		status: 'In production',
		years: '2023',
		media: {
			kind: 'image',
			src: '/static/images/project/slb-sensor-pack-verification-bench.jpg',
			alt: 'Sensor signal generator bench: laptop channel front panel, DAQ module, four calibrated meters and boards under test',
		},
	},

	// --------------------------------------------------------------------- ai
	{
		slug: 'xana-multifile-rag-based-data-singularity-platform',
		track: 'ai',
		title: 'XANA — Ixana-Wiki',
		eyebrow: 'Ixana · 2025',
		headline: 'One search box for the whole company.',
		soWhat:
			'Multifile RAG answering with citations across docs, meetings, tasks and patents.',
		metrics: [
			{
				value: '9 min → <1 min',
				label: 'median time to find a document',
				source:
					'case-studies-v2.json#xana-multifile-rag-based-data-singularity-platform › summary › "Median time-to-find fell from nine minutes to under one"',
			},
			{
				value: '118 of 140',
				label: 'employees, inside a quarter',
				source:
					'case-studies-v2.json#xana-multifile-rag-based-data-singularity-platform › summary › "118 of 140 employees used it within a quarter"',
			},
			{
				value: '5',
				countUp: 5,
				label: 'systems searched as one',
				source:
					'case-studies-v2.json#xana-multifile-rag-based-data-singularity-platform › summary › "OneDrive, ClickUp, Teams, efficiency trackers and patent records"',
			},
		],
		features: [
			'One search across five systems — docs, meetings, tasks, patents — with citations',
			'Meeting recordings entered by transcript: click a line, land on the moment',
			'Hybrid search and role-based access, so the index can hold everything',
			'Adopted company-wide within a quarter of launch',
		],
		panelItems: IXANA_INTERNAL,
		role: 'Owned it from concept to company-wide rollout',
		status: 'Live, company-wide',
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
		eyebrow: 'Ixana · 2026',
		headline: 'From raw brief to execution-ready plan in minutes.',
		soWhat:
			'Stops on uncertainty, and never lets one model approve its own work.',
		metrics: [
			{
				value: '6m 40s',
				label: 'median brief to human review',
				source:
					'case-studies-v2.json#ai-prd-multi-agent-multi-llm-shared-memory-generative-system › summary › "A run reaches human review in a median of 6m 40s"',
			},
			{
				value: '2 models',
				label: 'a second must approve the first',
				source:
					'case-studies-v2.json#ai-prd-multi-agent-multi-llm-shared-memory-generative-system › summary › "requires a different model to review the plan than wrote it"',
			},
			{
				value: '68%',
				label: 'of plans approved on first read',
				source:
					'case-studies-v2.json#ai-prd-multi-agent-multi-llm-shared-memory-generative-system › summary › "68% of plans are approved by the human on first read"',
			},
		],
		features: [
			'A raw brief reaches human review in a median of 6m 40s',
			'Stops on uncertainty instead of guessing',
			'Second-model approval before any plan passes',
			'Multi-agent, multi-LLM; an approved plan freezes before tasks generate',
		],
		panelItems: IXANA_INTERNAL,
		role: 'Designed the governance model; shipped it',
		status: 'Live for internal planning',
		years: '2026',
		media: { kind: 'number' },
	},
	{
		slug: 'ai-pm-generative-ai-engine-for-rca-report-automation',
		track: 'ai',
		title: 'AMS performance dashboard',
		eyebrow: 'Ixana · 2026',
		headline: 'A two-day report, produced in twelve minutes.',
		soWhat:
			'Every delay now carries a root cause that a named person has signed.',
		metrics: [
			{
				value: '21% → 84%',
				label: 'delayed tasks with a stated root cause',
				source:
					'case-studies-v2.json#ai-pm-generative-ai-engine-for-rca-report-automation › §08 metrics › "21% → 84%"',
			},
			{
				value: '2 days → 12m',
				label: 'to produce the monthly report',
				source:
					'case-studies-v2.json#ai-pm-generative-ai-engine-for-rca-report-automation › §08 metrics › "2 days → 12m"',
			},
			{
				value: '3 → 1',
				label: 'versions of the report in circulation',
				source:
					'case-studies-v2.json#ai-pm-generative-ai-engine-for-rca-report-automation › §08 metrics › "3 → 1"',
			},
		],
		features: [
			'Counting stays rule-based; synthesis is what goes to a model',
			'A signature gate in front of publication — no unsigned cause ships',
			'Six dashboard sheets refreshed per run',
			'No count or percentage on the report is computed by a model',
		],
		panelItems: IXANA_INTERNAL,
		role: 'Product manager, delivery owner',
		status: 'Live, running monthly',
		years: '2026',
		media: { kind: 'number' },
	},
	{
		slug: 'ai-pm-generative-ai-engine-for-resource-allocation',
		track: 'ai',
		title: 'Engineering bandwidth reporting',
		eyebrow: 'Ixana · 2025',
		headline: 'Capacity forecasts that need nothing from engineers.',
		soWhat:
			'Thirty engineers across three teams, compiled from 58 task lists, unasked.',
		metrics: [
			{
				value: '9h → 20m',
				label: 'monthly compile, now review only',
				source:
					'case-studies-v2.json#ai-pm-generative-ai-engine-for-resource-allocation › §08 metrics › "9h → 20m"',
			},
			{
				value: '11 → 2',
				label: 'reporting errors caught per cycle',
				source:
					'case-studies-v2.json#ai-pm-generative-ai-engine-for-resource-allocation › §08 metrics › "11 → 2"',
			},
			{
				value: '58',
				countUp: 58,
				label: 'task lists covered per run',
				source:
					'case-studies-v2.json#ai-pm-generative-ai-engine-for-resource-allocation › §08 metrics › "58"',
			},
		],
		features: [
			'One definition of committed capacity across all three teams',
			'Undated tasks handled by rule, timezone drift corrected on due dates',
			"Appends a formatted report to each team's tab, monthly",
			'Requires no update from any engineer — the guardrail that keeps it true',
		],
		panelItems: IXANA_INTERNAL,
		role: 'Product manager, delivery owner',
		status: 'Live, running monthly across three teams',
		years: '2025',
		media: { kind: 'number' },
	},
	{
		slug: 'ixana-patent-program',
		track: 'ai',
		title: 'Patent program',
		eyebrow: 'Ixana · 2024–2026',
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
				label: 'disclosure to filing, no extra inventor time',
				source:
					'case-studies-v2.json#ixana-patent-program › summary › "median disclosure-to-filing down from about fourteen weeks to six"',
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
				text: 'Published — error-proportional encoding for BANs (US20250192915A1)',
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

/**
 * Compactness limits, checked at module load so a build fails rather than a
 * tile quietly growing until it breaks the panel. The feature count is a
 * tuple in the type; lengths cannot be, so they are checked here.
 */
(function enforceLimits() {
	const problems: string[] = [];

	for (const h of workHighlights) {
		const words = h.headline.trim().split(/\s+/).length;
		if (words > 10) {
			problems.push(`${h.slug}: headline is ${words} words (max 10)`);
		}
		if (h.soWhat.length > 110) {
			problems.push(`${h.slug}: soWhat is ${h.soWhat.length} chars (max 110)`);
		}
		for (const feature of h.features) {
			if (feature.length > 90) {
				problems.push(
					`${h.slug}: feature is ${feature.length} chars (max 90) — "${feature}"`,
				);
			}
		}
		const maxItems = h.eyebrow.startsWith('Ixana') ? 3 : 4;
		if (h.panelItems.length > maxItems) {
			problems.push(
				`${h.slug}: ${h.panelItems.length} panel items (max ${maxItems})`,
			);
		}
		const nonNumeric = h.metrics.filter((m) => !/\d/.test(m.value)).length;
		if (nonNumeric > 1) {
			problems.push(`${h.slug}: ${nonNumeric} non-numeric metrics (max 1)`);
		}
	}

	if (problems.length) {
		throw new Error(`workHighlights limits:\n  ${problems.join('\n  ')}`);
	}
})();
