/**
 * Home-page work slides.
 *
 * Every figure here has to trace to the corrected case-study data in
 * data/case-studies-v2.json or to a page Ixana/EEGRAB has published — the
 * home page must never contradict a case study. Customer and partner names
 * appear only where the company itself has published the relationship;
 * everything else stays in its generic form.
 */

export type WorkLink = {
	label: string;
	href: string;
};

export type WorkSlide = {
	src: string;
	width: number;
	height: number;
	/** Rendered under the image. */
	title?: string;
	/** Image alt text — distinct from the displayed title. */
	alt?: string;
	features?: string[];
	interested?: {
		category: string;
		items: string[];
	}[];
	/** Overrides the "Who's interested?" heading on the second panel. */
	panelLabel?: string;
	/** Public references shown inside the second panel. */
	links?: WorkLink[];
	/** The case study this slide comes from. */
	caseStudy?: WorkLink;
};

export type WorkTile = {
	title: string;
	description: string;
	image: {
		src: string;
		width: number;
		height: number;
	};
	carousel?: WorkSlide[];
	features?: string[];
	interested?: {
		category: string;
		items: string[];
	}[];
	panelLabel?: string;
	links?: WorkLink[];
	caseStudy?: WorkLink;
	/** One compact row under the carousel — the whole portfolio at a glance. */
	strip?: {
		items: string[];
		link: WorkLink;
	};
};

export const workTiles: WorkTile[] = [
	{
		description: `Here are things`,
		title: `I've worked on`,
		// Intentionally empty: this tile renders through the carousel below.
		// `image` is the fallback WorkContent uses for a tile without one.
		image: {
			src: '',
			width: 600,
			height: 770,
		},
		carousel: [
			{
				src: '/static/images/ixana-wir-devices.png',
				width: 1024,
				height: 576,
				title:
					'Wi-R: Wire-Like Wireless. Ultra-Efficient Wireless Built for Human-AI Collaboration.',
				alt: 'Wi-R body-area and near-field devices',
				caseStudy: {
					label: 'Read the case study →',
					href: '/work/wi-r-ban-yr23',
				},
			},
			{
				src: '/static/images/project/ixana-patent-tracker.png',
				width: 2980,
				height: 1816,
				title:
					'Patent program — 50+ filings across six product lines, owned end to end.',
				alt: 'Patent matter lifecycle tracker',
				features: [
					'Disclosure-to-filing cut from about 14 weeks to 6',
					'First grants issued — US12619308B2 on Google Patents',
					'Filing calendar anchored to the silicon tapeout calendar',
					'Quarterly file / defer / publish / abandon reviews with the founder/CTO',
				],
				panelLabel: 'Proof',
				links: [
					{
						label: 'Granted — wearable EQS-HBC device (US12619308B2)',
						href: 'https://patents.google.com/patent/US12619308B2/en',
					},
					{
						label:
							'Published — human-body-resonance data transfer (US20250379663A1)',
						href: 'https://patents.google.com/patent/US20250379663A1/en',
					},
					{
						label:
							'Published — error-proportional encoding for body area networks (US20250192915A1)',
						href: 'https://patents.google.com/patent/US20250192915A1/en',
					},
				],
				caseStudy: {
					label: 'Read the case study →',
					href: '/work/ixana-patent-program',
				},
			},
			{
				src: '/static/images/xana.png',
				width: 1024,
				height: 576,
				title: "XANA — Ixana's internal AI operating system.",
				alt: "XANA — Ixana's internal AI operating system",
				features: [
					'One search across five systems — docs, meetings, tasks, patents — with cited answers',
					'Meeting recordings you can enter by transcript: click a line, land on the moment',
					"A planning OS that stops on uncertainty and won't let one model approve its own work",
					'Delivery run on instrumented data — pipeline tracking, capacity, audit trail',
					'Adopted company-wide within a quarter of launch',
				],
				interested: [
					{
						category: '',
						items: ['Built for Ixana — in daily use across the company'],
					},
				],
				caseStudy: {
					label: 'Read the case study →',
					href: '/work/xana-multifile-rag-based-data-singularity-platform',
				},
			},
			{
				src: '/static/images/wishkey.jpg',
				width: 1024,
				height: 576,
				title:
					'Wishkey ensures every key is tracked, every access is logged, and every return is verified.',
				alt: 'WishKey electronic key cabinet',
				features: [
					'Stand-alone plug-and-play solution',
					'Advanced RFID technology',
					'Android system, touch screen interface',
					'Access with SSO, RFID',
					'Air gap system',
					'Quick installation, can be put on the desk or fixed on the wall',
					'Backup battery optional',
				],
				interested: [
					{
						category: '',
						// TODO(pushpal): 0.4 — restore "State Bank of India, Accenture" only
						// if EEGRAB has published them as customers (brochure or site).
						items: ['Banking and enterprise facilities across India'],
					},
				],
				links: [
					{
						label: 'WishKey brochure — EEGRAB',
						href: 'https://eegrab.com/wp-content/uploads/2021/brochure/Wishkey_brochure.pdf',
					},
					{
						label: 'WishKey product demo — EEGRAB',
						href: 'https://www.youtube.com/watch?v=8etIl_0wj0I',
					},
				],
				caseStudy: {
					label: 'Read the case study →',
					href: '/work/eegrab-wishkey',
				},
			},
		],
		features: [
			'Data rate: 5–20 Mbit/s across the family',
			'Latency: sub-millisecond links',
			'Physically secure: field confined to the body / touch range — nothing to intercept across a room',
			'Networks: up to 16 devices on one body',
			"Energy: 0.1–0.2 nJ/bit — ~50× NFC's efficiency, an order of magnitude beyond Bluetooth",
		],
		interested: [
			// TODO(pushpal): 0.3 — every named partner was removed because the keep-list
			// was not supplied. Restore any of these the moment Ixana's own site or PR
			// carries them: Purdue University · NSF · U.S. Army · USSOCOM · Defense
			// Innovation Unit · U.S. Air Force. Confirm the defense row's phrasing too.
			{
				category: 'Research Partners',
				items: ['University and federal research partners'],
			},
			{
				category: 'Government & Defense',
				items: ['U.S. defense programs (public engagements via Ixana)'],
			},
			{
				category: 'Industry Partners',
				items: ['Defense & Tier-1 consumer programs under NDA'],
			},
		],
		strip: {
			items: [
				'35 written-up case studies across 56 projects',
				'silicon to production',
				'developer kits & reference designs',
				'a patent estate',
				'14 internal tools at Ixana',
				'consumer & industrial hardware',
			],
			link: { label: 'See all work →', href: '/work' },
		},
	},
];
