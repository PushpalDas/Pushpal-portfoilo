import type { Metadata } from 'next';
import AboutPage from './about-page';

export const metadata: Metadata = {
	title: 'About',
	description:
		"Pushpal Das, Principal PM in Ixana's CTO office. Electronics, embedded systems and product — built at the intersection of art and science.",
};

export default function Page() {
	return <AboutPage />;
}
