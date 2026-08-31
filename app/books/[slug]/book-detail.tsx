import Image from 'next/image';
import Link from 'next/link';
import { type Book, books } from '../constants';

/**
 * Neighbours on the same shelf, so a reader can walk a category without
 * going back to the index. Derived from the shelf order rather than stored.
 */
function neighbours(book: Book) {
	const shelf = books.filter((b) => b.category === book.category);
	const i = shelf.findIndex((b) => b.slug === book.slug);
	return {
		previous: i > 0 ? shelf[i - 1] : undefined,
		next: i < shelf.length - 1 ? shelf[i + 1] : undefined,
	};
}

export default function BookDetail({ book }: { book: Book }) {
	const { previous, next } = neighbours(book);

	return (
		<main className='books-page'>
			<div className='books-shell books-detail'>
				<Link href='/books' className='books-back'>
					<span aria-hidden='true'>←</span> Back to the shelf
				</Link>

				<article className='books-detail-grid'>
					<div className='books-detail-cover'>
						<Image
							src={`/static/images/books/${book.cover}`}
							alt={
								book.coverIsCard
									? `${book.title} by ${book.author}`
									: `Cover of ${book.title} by ${book.author}`
							}
							width={400}
							height={600}
							sizes='(max-width: 700px) 70vw, 300px'
							priority
							style={{ width: '100%', height: 'auto' }}
						/>
					</div>

					<div className='books-detail-copy'>
						<p className='books-eyebrow'>{book.category}</p>
						<h1 className='books-detail-title'>{book.title}</h1>
						<p className='books-detail-author'>{book.author}</p>

						{book.year && (
							<ul className='books-detail-meta'>
								<li>First published {book.year}</li>
							</ul>
						)}

						<p className='books-detail-note'>{book.note}</p>

						{/* Three jackets on this shelf are a set card, not a scan. Said
						    here rather than left for the reader to wonder about. */}
						{book.coverIsCard && (
							<p className='books-card-note'>
								Set as a card — this edition carries no jacket
							</p>
						)}
					</div>
				</article>

				{/* What stayed with me from the book, ten at a time. Written as
				    notes in my own words, not as quotations — see the note in
				    constants.ts on why this shelf never reproduces the text. */}
				{book.takeaways.length > 0 && (
					<section className='books-takeaways' aria-label='Bookmarked'>
						<h2 className='books-takeaways-head'>Bookmarked</h2>
						<ol className='books-takeaways-list'>
							{book.takeaways.map((t) => (
								<li key={t}>{t}</li>
							))}
						</ol>
					</section>
				)}

				{(previous || next) && (
					<nav
						className='books-detail-nav'
						aria-label={`More ${book.category}`}
					>
						{previous && (
							<Link href={`/books/${previous.slug}`}>
								<span aria-hidden='true'>←</span> {previous.title}
							</Link>
						)}
						{next && (
							<Link href={`/books/${next.slug}`}>
								{next.title} <span aria-hidden='true'>→</span>
							</Link>
						)}
					</nav>
				)}
			</div>
		</main>
	);
}
