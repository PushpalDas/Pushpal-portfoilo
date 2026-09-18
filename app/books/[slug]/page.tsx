/**
 * Dynamic route: /books/[slug]
 *
 * A cover, what the book is, and the two or three lines it earned. No PDF is
 * served here and none is copied into public/ — the jacket thumbnail is the
 * only part of the book this site carries.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { bookBySlug, books } from '../constants';
import BookDetail from './book-detail';
import '../books.css';

export function generateStaticParams() {
	return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const book = bookBySlug.get(slug);

	if (!book) return { title: 'Books — Pushpal Das' };

	return {
		title: `${book.title} — Pushpal Das`,
		description: book.note,
	};
}

export default async function BookSlugPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const book = bookBySlug.get(slug);

	if (!book) notFound();

	return <BookDetail book={book} />;
}
