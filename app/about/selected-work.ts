import type { WORK_STATUSES, WorkStatus } from '../work/status';

/**
 * The About page's spotlight index — ten metric-led cards in two categories.
 *
 * Everything essential is visible without interaction; the `features` lines are
 * the only enrichment layer. Edits here are data-only: the section reads this
 * module and nothing else.
 *
 * Every `slug` is verified against `app/work/constants.ts` and resolves to a
 * live `/work/<slug>` case study.
 */

/**
 * The five status labels, derived from the work page's status table rather than
 * re-declared here — adding a sixth status stays a one-line change in
 * `app/work/status.ts`.
 */
export type SelectedWorkStatus = (typeof WORK_STATUSES)[WorkStatus]['label'];

export interface SelectedWorkCard {
	slug: string;
	category: 'silicon' | 'ai';
	headline: string;
	/** Rendered large — this wins the first fixation. */
	stat: string;
	/** Small muted line qualifying the stat. */
	statContext: string;
	outcome: string;
	features: [string, string, string];
	audience: string;
	status: SelectedWorkStatus;
	company: string;
	years: string;
}

export const selectedWork: SelectedWorkCard[] = [
	// ─── Silicon ───────────────────────────────────────────────
	{
		slug: 'wi-r-ban-yr31',
		category: 'silicon',
		headline: 'YR31 — the second-generation body-area radio',
		stat: '~1/10th',
		statContext: 'the radio power budget it replaces',
		outcome:
			'Holds an on-body link in the single-digit-milliwatt class — roughly a tenth of the radio-power budget it replaces.',
		features: [
			'Second-gen Wi-R body-area silicon',
			'Single-digit-milliwatt on-body link',
			'~10× lower power than the budget it replaces',
		],
		audience:
			'Wearable, AR and hearables OEMs designing all-day, battery-powered on-body devices',
		status: 'In production',
		company: 'Ixana',
		years: '2024–present',
	},
	{
		slug: 'wi-r-ban-yr23',
		category: 'silicon',
		headline: "YR23 — the first Wi-R silicon in customers' hands",
		stat: 'First',
		statContext: 'Wi-R body-area part to reach customer hardware',
		outcome:
			'First Wi-R body-area part to reach customer hardware — the silicon under the BAN dev kit and every on-body reference design that followed.',
		features: [
			'First Wi-R BAN part shipped to customer hardware',
			'Foundation for the BAN developer kit',
			'Basis for the on-body reference designs',
		],
		audience:
			'OEM hardware teams evaluating body-area networking for production',
		status: 'In production',
		company: 'Ixana',
		years: '2024–present',
	},
	{
		slug: 'wi-r-reference-designs',
		category: 'silicon',
		headline: 'Reference designs — video and voice, carried by the body',
		stat: 'Video + voice',
		statContext: 'over the body, not the air',
		outcome:
			'Proved Wi-R carries live video to smartglasses and voice to a tactical radio over the body rather than the air.',
		features: [
			'Live over-body video link to smartglasses',
			'Voice to a tactical radio without RF over the air',
			'Turnkey designs partners build from',
		],
		audience:
			'Consumer AR makers and defense/tactical communications integrators',
		status: 'In production',
		company: 'Ixana',
		years: '2024–2026',
	},
	{
		slug: 'wi-r-dev-kits-ban-yr23-and-nfe-xa-nfe2001',
		category: 'silicon',
		headline: 'Dev kits — a working on-body link in under a day',
		stat: '<1 day',
		statContext: 'to a working on-body link — was weeks of RF debugging',
		outcome:
			'Turned eval silicon into a shipping dev kit; partner teams bring up a working on-body link in under a day instead of weeks of RF debugging.',
		features: [
			'Eval silicon productized into a shipping developer kit',
			'On-body link running in under a day',
			'Removes weeks of RF bring-up',
		],
		audience: 'Partner engineering teams and design houses evaluating Wi-R',
		status: 'In production',
		company: 'Ixana',
		years: '2024–present',
	},
	{
		slug: 'eegrab-wishkey',
		category: 'silicon',
		headline: 'WishKey — the key register, made accountable',
		stat: 'Per-key',
		statContext: 'accountability — paper register to audited cabinet',
		outcome:
			'Replaced a paper key register with an audited electronic cabinet — shipped as a catalogue product with per-key accountability.',
		features: [
			'Audited electronic key cabinet',
			'Per-key accountability and access trail',
			'Shipped as a catalogue product',
		],
		audience:
			'Facilities, security and operations buyers managing controlled keys',
		status: 'In production',
		company: 'EEGRAB',
		years: '2023',
	},
	// ─── AI Programs ───────────────────────────────────────────
	{
		slug: 'xana-multifile-rag-based-data-singularity-platform',
		category: 'ai',
		headline: 'Ixana-Wiki — one search box for the whole company',
		stat: '9 min → <1',
		statContext: 'median document hunt · 118 of 140 employees adopted',
		outcome:
			'Cut the median document hunt from nine minutes to under one — 118 of 140 employees now on a single search box.',
		features: [
			'Multifile retrieval-augmented knowledge platform',
			'Median hunt 9 min → under 1 min',
			'118 of 140 employees adopted',
		],
		audience:
			'Every knowledge worker; leadership tracking company-wide adoption',
		status: 'Shipped internally',
		company: 'Ixana',
		years: '2026',
	},
	{
		slug: 'ai-prd-multi-agent-multi-llm-shared-memory-generative-system',
		category: 'ai',
		headline: 'Planning OS — a reviewed plan in minutes',
		stat: '3–8 min',
		statContext: 'from raw brief to reviewed, execution-ready plan',
		outcome:
			'Turns a raw brief into a reviewed, execution-ready plan in 3–8 minutes — with a second model required to approve the first.',
		features: [
			'Brief → execution-ready plan in 3–8 minutes',
			'Multi-agent, multi-LLM with shared memory',
			'Built-in review gate — one model approves another',
		],
		audience: 'Product and program leaders turning briefs into plans',
		status: 'Shipped internally',
		company: 'Ixana',
		years: '2026',
	},
	{
		slug: 'ixana-patent-program',
		category: 'ai',
		headline: 'Patent program — 50+ filings, owned end to end',
		stat: '50+ filings',
		statContext: 'disclosure-to-filing ~14 weeks → 6, no extra inventor time',
		outcome:
			'Owned 50+ filings across six Wi-R product lines end to end; cut disclosure-to-filing from ~14 weeks to 6 — on no extra inventor time.',
		features: [
			'50+ filings across six Wi-R product lines',
			'Disclosure-to-filing ~14 weeks → 6',
			'Zero additional inventor time',
		],
		audience: 'CTO office, IP counsel and execs building a patent moat',
		status: 'Shipped internally',
		company: 'Ixana',
		years: '2026',
	},
	{
		slug: 'dsa-generative-ai-engine-for-a-guided-spiritual-path',
		category: 'ai',
		headline: 'Dāsa — answers you can trust to the citation',
		stat: '0 fabricated',
		statContext: 'citations across 100 evaluated answers — up from 17',
		outcome:
			'Zero fabricated citations across 100 evaluated answers — up from 17.',
		features: [
			'Retrieval engine for scripture questions',
			'Zero fabricated citations across 100 evaluated answers (up from 17)',
			'Citation-grounded, hallucination-controlled',
		],
		audience:
			'Faith communities and anyone needing provably grounded AI answers',
		status: 'Research',
		company: 'ISKCON',
		years: '2026–present',
	},
	{
		slug: 'ai-pm-generative-ai-engine-for-real-time-pipeline-diagnostic',
		category: 'ai',
		headline: 'Flow Tracker — three pipelines, one live view',
		stat: '3 → 1',
		statContext: 'pipelines into one live view; weekly deck compile eliminated',
		outcome:
			'One live view across the PS, AMS and RTL pipelines — leads stopped assembling the weekly review deck from three sources.',
		features: [
			'Real-time diagnostics across PS, AMS and RTL',
			'Single live view replacing three-source manual assembly',
			'Killed the weekly deck compile',
		],
		audience:
			'Delivery leads and program managers running multi-pipeline reviews',
		status: 'Shipped internally',
		company: 'Ixana',
		years: '2026',
	},
];

/**
 * Counts for the "+n" buttons — the rendered count is these arrays' lengths,
 * never a hardcoded number. Membership is adjustable; these are labels, not
 * slugs, so nothing here needs to resolve to a route.
 */
export const siliconRemainder = [
	'Wi-R NFE XA-NFE3001',
	'Wi-R NFE XA-NFE2001',
	'EEGRAB condenser microphone',
	'EEGRAB cost-effective smart watch',
	'SLB sensor signal generator',
];

export const aiRemainder = [
	'AMS monthly RCA reporting',
	'Scrum ecosystem',
	'ClickUp Activity Tracker',
	'Video library & meeting recordings',
	'ClickUp reporting & Gantt dashboard',
	'In-house meeting notetaker',
	'Document change intelligence',
	'Automated engineering bandwidth reporting',
	'Calendar sync (Outlook ↔ Gmail)',
	'Patent dashboard sync',
	'Procurement Orchestrator',
	'AI Salary Generator',
	'AI Lawyer (multi-agent patent drafting)',
	'NeuroAdapt spike-train features',
	'Quantum Gate Simulator',
];
