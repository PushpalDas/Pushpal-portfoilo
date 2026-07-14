import type { Metadata } from 'next';
import AboutPage from './about-page';

export const metadata: Metadata = {
    title: 'About',
    description: 'Learn more about Pushpal Das - Software Engineer, Product Manager, and AI enthusiast',
};

export default function Page() {
    return <AboutPage />;
}