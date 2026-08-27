import Analytics from 'app/components/analytics/analytics';
import Navbar from 'app/components/navbar/navbar';
import ThemeSwitch from 'app/components/layouts/theme-switch/theme-switch';
import LenisProvider from 'app/components/providers/LenisProvider';
import ThemeProvider from 'app/components/providers/ThemeProvider';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { fraunces, mukta } from './fonts';
import './tailwind.css';

export const metadata: Metadata = {
	title: {
		template: '%s | Pushpal Das',
		default: 'Pushpal Das',
	},
	description:
		'Product manager for deep tech — Wi-R silicon programs, a patent estate, and the AI tools that run delivery at Ixana.',
	metadataBase: new URL('https://pushpaldas.com'),
};

interface RootLayoutProps {
	children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
			className={`${mukta.className} ${fraunces.variable}`}
		>
			<head>
				<link
					rel='apple-touch-icon'
					sizes='76x76'
					href='/static/favicons/favicon.ico'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/static/favicons/favicon.ico'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/static/favicons/favicon.ico'
				/>
				<meta name='msapplication-TileColor' content='#000000' />
				<meta name='theme-color' content='#000000' />
				<link rel='alternate' type='application/rss+xml' href='/feed.xml' />
			</head>
			<body className='bg-white text-black antialiased dark:bg-black dark:text-white selection:bg-primary-500 selection:text-white'>
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'
					themes={['dark', 'light']}
				>
					<LenisProvider>
						<Navbar />
						<ThemeSwitch />
						{children}
					</LenisProvider>
					{process.env.NODE_ENV === 'production' && <Analytics />}
				</ThemeProvider>
			</body>
		</html>
	);
}
