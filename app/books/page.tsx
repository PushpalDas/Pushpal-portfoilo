import type { Metadata } from 'next';
import BooksPage from './books-page';
import './books.css';

export const metadata: Metadata = {
	title: 'Books',
	description:
		'The books Pushpal Das reads and returns to — scripture, product, physics, and one on attention.',
};

export default function Page() {
	return <BooksPage />;
}
