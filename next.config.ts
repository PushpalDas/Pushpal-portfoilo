import path from 'node:path';
import type { NextConfig } from 'next';

const umami_url = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_URL ?? '';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	pageExtensions: ['ts', 'tsx'],
	transpilePackages: ['next-mdx-remote'],
	reactCompiler: true,
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
