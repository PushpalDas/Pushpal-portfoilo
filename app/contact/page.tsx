import type { Metadata } from 'next';
import ContactPage from './contact-page';

export const metadata: Metadata = {
	title: "Let's Connect",
	description:
		"Get in touch with Pushpal Das — let's discuss your next project, collaborate, or just say hello.",
};

export default function Page() {
	return <ContactPage />;
}