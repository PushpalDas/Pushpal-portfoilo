import type { Metadata } from 'next';
import ExperiencePage from './experience-page';

export const metadata: Metadata = {
	title: 'Experience',
	description: 'Professional experience by Pushpal Das',
};

export default function Page() {
	return <ExperiencePage />;
}
