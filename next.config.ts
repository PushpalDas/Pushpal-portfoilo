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
		];
	},
	async rewrites() {
		return [
			// The demos are single self-contained files in /public. These
			// rewrites are only here so the case studies can link a clean
			// path rather than an .html extension.
			{
				source: '/demo/ams-dashboard',
				destination: '/demo/ams-dashboard.html',
			},
			{
				source: '/demo/clickup-gantt',
				destination: '/demo/clickup-gantt.html',
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
