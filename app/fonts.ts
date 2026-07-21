import { Merriweather, Mukta, Inter } from 'next/font/google';

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
