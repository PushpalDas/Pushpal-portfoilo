import type { Metadata } from 'next';
import CertificationsPage from './certifications-page';

export const metadata: Metadata = {
    title: 'Certifications',
    description: 'Professional certifications by Pushpal Das',
};

export default function Page() {
    return <CertificationsPage />;
}
