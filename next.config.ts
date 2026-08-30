import path from 'node:path';
import type { NextConfig } from 'next';

const umami_url = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_URL ?? '';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	pageExtensions: ['ts', 'tsx'],
	transpilePackages: ['next-mdx-remote'],
	reactCompiler: true,
	// The photography archive is the only heavy image set on the site, and
	// every file in it is immutable. AVIF first, the qualities /hobby actually
	// asks for (Next 16 coerces anything outside the allowlist), and a one-year
	// cache. deviceSizes and imageSizes stay at the Next 16 defaults.
	images: {
		formats: ['image/avif', 'image/webp'],
		qualities: [75, 82, 88, 90],
		minimumCacheTTL: 31536000,
	},
	// Routes that have been renamed. Kept permanently so existing links and
	// anything already indexed still land.
	async redirects() {
		return [
			{
				source: '/hoobie',
				destination: '/hobby',
				permanent: true,
			},
			// Book a meeting was folded into Let's connect, which now carries
			// the booking widget, the message form and the contact routes.
			{
				source: '/book-a-meeting',
				destination: '/lets-connect',
				permanent: true,
			},
			// Two case studies were folded into the products they were always
			// a feature of: bandwidth reporting into the reporting dashboard,
			// and the dashboard sync into the patent programme. Both had their
			// own page for a while, so both keep a permanent redirect.
			{
				source: '/work/ai-pm-generative-ai-engine-for-resource-allocation',
				destination: '/work/ai-pm-customized-multi-view-for-pms',
				permanent: true,
			},
			{
				source: '/work/patent-tracker-generative-ai-engine-for-data-extraction',
				destination: '/work/ixana-patent-program',
				permanent: true,
			},
			// The AMS monthly dashboard was rebuilt as the reporting engine
			// it always wanted to be: any of five delivery teams, and a
			// weekly, monthly or quarterly window. The old slug and the old
			// demo path both had links out in the world, so both redirect.
			{
				source: '/work/ai-pm-generative-ai-engine-for-rca-report-automation',
				destination: '/work/team-performance-reporting',
				permanent: true,
			},
			{
				source: '/demo/ams-dashboard',
				destination: '/demo/team-performance',
				permanent: true,
			},
		];
	},
	async rewrites() {
		return [
			// The demos are single self-contained files in /public. These
			// rewrites are only here so the case studies can link a clean
			// path rather than an .html extension.
			{
				source: '/demo/team-performance',
				destination: '/demo/team-performance.html',
			},
			// The four Ricky Kids demos. Each is a recreation of the bench,
			// tank or batch tool its case study describes, not a product.
			{
				source: '/demo/autism-bench',
				destination: '/demo/autism-bench.html',
			},
			{
				source: '/demo/rider-count',
				destination: '/demo/rider-count.html',
			},
			{
				source: '/demo/sludge-envelope',
				destination: '/demo/sludge-envelope.html',
			},
			{
				source: '/demo/radar-error-budget',
				destination: '/demo/radar-error-budget.html',
			},
			{
				source: '/demo/ornithopter-concept',
				destination: '/demo/ornithopter-concept.html',
			},
			{
				source: '/demo/covid-bench',
				destination: '/demo/covid-bench.html',
			},
			// The ENVI-City concept explorer: the published paper's city
			// vision drawn and audited in place, created for the case study's
			// "What was built" evidence beside the DOI.
			{
				source: '/demo/envi-city',
				destination: '/demo/envi-city.html',
			},
			// Same pattern for the Scrum ecosystem demo, linked from
			// section 06 of that case study and from the work card.
			{
				source: '/demo/scrum-desk',
				destination: '/demo/scrum-desk.html',
			},
			{
				source: '/demo/clickup-gantt',
				destination: '/demo/clickup-gantt.html',
			},
			// The audit trail demo: the same workspace seen from the
			// other side, linked from section 06 of that case study and
			// from the work card.
			{
				source: '/demo/clickup-audit',
				destination: '/demo/clickup-audit.html',
			},
			// The two pilots. Request Desk recreates the M365-native
			// procurement workflow; Band Desk recreates the salary
			// benchmarking and offer drafting tool. Both are linked from
			// section 06 of their case study and from the work card.
			{
				source: '/demo/procurement-desk',
				destination: '/demo/procurement-desk.html',
			},
			{
				source: '/demo/salary-bands',
				destination: '/demo/salary-bands.html',
			},
			// The NeuroAdapt feature-extraction demo, linked from section
			// 04 of that case study and from the work card.
			{
				source: '/demo/neuroadapt',
				destination: '/demo/neuroadapt.html',
			},
			// The quantum gate simulator: the prototype's state-vector
			// engine ported into one file, linked from section 04 of that
			// case study and from the work card.
			{
				source: '/demo/quantum-simulator',
				destination: '/demo/quantum-simulator.html',
			},
			// The patent drafting prototype: the intake gate, a run, the
			// result and the corpus-coverage verdict that decides whether
			// any of it means anything. Linked from sections 04 and 05 of
			// that case study and from the work card.
			{
				source: '/demo/ai-lawyer',
				destination: '/demo/ai-lawyer.html',
			},
			// The planning OS: the product's decision logic ported into one
			// file, linked from section 06 of that case study and from the
			// work card.
			{
				source: '/demo/prd-os',
				destination: '/demo/prd-os.html',
			},
			{
				source: '/umami.js',
				destination: `${umami_url}/script.js`,
			},
			{
				source: '/api/send',
				destination: `${umami_url}/api/send`,
			},
		];
	},
};

export default nextConfig;
