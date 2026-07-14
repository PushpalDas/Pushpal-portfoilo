import type { Metadata } from 'next';
import WorkPage from './work-page';

export const metadata: Metadata = {
    title: 'Work',
    description: 'Selected projects by Pushpal Das',
};

export default function Page() {
    return <WorkPage />;
}
