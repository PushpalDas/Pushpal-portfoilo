import type { Metadata } from 'next';
import AdminPage from './admin-page';

export const metadata: Metadata = {
	title: 'Admin',
	description: 'Admin dashboard for managing portfolio content',
	robots: { index: false, follow: false },
};

export default function Page() {
	return <AdminPage />;
}
