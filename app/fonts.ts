import { Fraunces, Inter, Merriweather, Mukta } from 'next/font/google';

export const mukta = Mukta({
	weight: ['200', '300', '400', '500', '600', '700'],
	variable: '--font-mukta',
	subsets: ['latin'],
	display: 'swap',
	preload: true,
});

export const inter = Inter({
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-inter',
	subsets: ['latin'],
	display: 'swap',
	preload: true,
});

export const merryWeather = Merriweather({
	weight: ['300', '400', '700', '900'],
	variable: '--font-merriweather',
	subsets: ['latin'],
	display: 'swap',
	preload: true,
});

// The one display face on the site, used only by /hobby and only at
// display sizes. opsz lets the same file carry both the 5.5rem hero line
// and the 2rem section headings without either looking wrong.
export const fraunces = Fraunces({
	subsets: ['latin'],
	weight: 'variable',
	axes: ['opsz'],
	variable: '--font-fraunces',
	display: 'swap',
	fallback: ['Georgia', 'serif'],
});
