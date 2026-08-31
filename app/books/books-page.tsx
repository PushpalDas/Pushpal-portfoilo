'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Magnetic from '../components/Magnetic';
import { useRevealGroup } from '../hobby/use-reveal';
import {
	type BookCategory,
	bookBySlug,
	books,
	booksIn,
	categories,
	categoryBlurb,
} from './constants';

/**
 * Six jackets for the hero cluster — picked for how they sit together, so
 * the stack reads as a shelf rather than as a grid.
 */
const CLUSTER = [
	'bhagavad-gita-as-it-is',
	'innovators-dilemma',
	'science-of-self-realization',
	'atomic-habits',
	'chip-war',
	'ikigai',
];

/** Anchor id for a shelf, derived so the index and the sections cannot drift. */
const shelfId = (category: BookCategory) =>
	`shelf-${category.toLowerCase().replace(/\s+/g, '-')}`;

/**
 * Covers render at their own proportion inside a fluid column, so the width
 * they are asked for is the column width and nothing more.
 */
const COVER_SIZES =
	'(max-width: 480px) 40vw, (max-width: 900px) 28vw, (max-width: 1200px) 20vw, 200px';

function Jacket({
	book,
	eager,
}: {
	book: (typeof books)[number];
	eager?: boolean;
}) {
	return (
		<Link href={`/books/${book.slug}`} className='books-card'>
			<span className='books-cover'>
				<Image
					src={`/static/images/books/${book.cover}`}
					alt={`${book.title} by ${book.author}`}
					width={400}
					height={600}
					sizes={COVER_SIZES}
					loading={eager ? 'eager' : 'lazy'}
					style={{ width: '100%', height: 'auto' }}
				/>
			</span>
			<span className='books-card-text'>
				<span className='books-card-title'>{book.title}</span>
				<span className='books-card-author'>{book.author}</span>
			</span>
		</Link>
	);
}

export default function BooksPage() {
	const pageRef = useRevealGroup<HTMLElement>();
	const [active, setActive] = useState(shelfId(categories[0]));

	// The index tracks the shelf you are standing in front of.
	useEffect(() => {
		const sections = categories
			.map((c) => document.getElementById(shelfId(c)))
			.filter((el): el is HTMLElement => Boolean(el));
		if (sections.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) setActive(entry.target.id);
				}
			},
			{ rootMargin: '-40% 0px -50% 0px' },
		);
		for (const section of sections) observer.observe(section);
		return () => observer.disconnect();
	}, []);

	return (
		<main className='books-page' ref={pageRef}>
			<section className='books-hero'>
				<div className='books-shell books-hero-grid'>
					<div className='books-hero-copy'>
						<p className='books-eyebrow reveal'>A reading list</p>
						<h1 className='books-display-xl reveal' data-reveal-delay='0.06'>
							What I read, and what it changed.
						</h1>
						<p className='books-lead reveal' data-reveal-delay='0.12'>
							{books.length} books on four shelves — spirituality, product,
							physics, and the ones about getting out of your own way. Covers
							only; a line or two on each, and ten things worth keeping.
						</p>
						<span className='reveal' data-reveal-delay='0.18'>
							<Magnetic strength={18}>
								<Link
									href={`#${shelfId(categories[0])}`}
									className='books-back'
								>
									Start at the first shelf →
								</Link>
							</Magnetic>
						</span>
					</div>

					<div className='books-stage'>
						<div className='books-stage-index'>
							<span className='books-caption'>Shelf 01</span>
							<span className='books-caption'>Personal library</span>
							<span className='books-caption'>{books.length} titles</span>
						</div>
						<div className='books-cluster'>
							{CLUSTER.map((slug, i) => {
								const book = bookBySlug.get(slug);
								if (!book) return null;
								return (
									<figure
										key={slug}
										className='books-cluster-figure reveal'
										data-rhythm={i % 3}
										data-reveal-delay={`${0.06 * i}`}
									>
										<Jacket book={book} eager={i < 3} />
									</figure>
								);
							})}
						</div>
					</div>
				</div>
			</section>

			{/* The four categories, said plainly and kept in view. */}
			<nav className='books-index' aria-label='Shelves'>
				<div className='books-shell books-index-inner'>
					{categories.map((category) => (
						<Link
							key={category}
							href={`#${shelfId(category)}`}
							className='books-index-link'
							data-active={active === shelfId(category)}
						>
							{category}
							<span className='books-index-count'>
								{String(booksIn(category).length).padStart(2, '0')}
							</span>
						</Link>
					))}
				</div>
			</nav>

			{categories.map((category, ci) => {
				const shelf = booksIn(category);
				return (
					<section
						key={category}
						className='books-shelf'
						id={shelfId(category)}
						aria-label={`${category} shelf`}
					>
						<div className='books-shell'>
							<header className='books-shelf-head'>
								<p className='books-eyebrow reveal'>
									{String(ci + 1).padStart(2, '0')} — {category}
								</p>
								<h2 className='books-display-l reveal' data-reveal-delay='0.06'>
									{category}
								</h2>
								<p className='books-lead reveal' data-reveal-delay='0.12'>
									{categoryBlurb[category]}
								</p>
							</header>

							<div className='books-grid'>
								{shelf.map((book, i) => (
									<div key={book.slug} className='reveal'>
										<Jacket book={book} eager={ci === 0 && i < 4} />
									</div>
								))}
							</div>
						</div>
					</section>
				);
			})}
		</main>
	);
}
