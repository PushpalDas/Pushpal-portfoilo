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
	// /hoobie was the route until the spelling was fixed. Kept permanently so
	// existing links and anything already indexed still land.
	async redirects() {
		return [
			{
				source: '/hoobie',
				destination: '/hobby',
				permanent: true,
			},
		];
	},
	async rewrites() {
		return [
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
