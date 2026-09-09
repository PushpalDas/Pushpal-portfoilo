'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import BooksPage from '../books/books-page';
import Magnetic from '../components/Magnetic';
import HobbyPage from './hobby-page';

/**
 * The hobby page holds two collections — the photography archive and the
 * reading list — behind one switch at the top. Each collection is its own
 * page component, rendered exactly as it was when it had its own route;
 * this file only decides which one is on screen.
 *
 * The URL is the single source of truth: `/hobby` is photography,
 * `/hobby?view=books` is the shelf, so either can be linked to directly.
 */
const VIEWS = [
	{ key: 'photography', label: 'Photography' },
	{ key: 'books', label: 'Books' },
] as const;

type View = (typeof VIEWS)[number]['key'];

const isView = (value: string | null): value is View =>
	VIEWS.some((v) => v.key === value);

function HobbySwitchInner() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const viewParam = searchParams.get('view');
	const view: View = isView(viewParam) ? viewParam : 'photography';

	const choose = (next: View) => {
		const params = new URLSearchParams(searchParams.toString());
		if (next === 'photography') {
			params.delete('view');
		} else {
			params.set('view', next);
		}
		const query = params.toString();
		router.replace(query ? `?${query}` : '/hobby', { scroll: false });
		window.scrollTo({ top: 0 });
	};

	return (
		<div className='hobby-shell' data-view={view}>
			<nav className='hobby-switch' aria-label='Hobby collections'>
				{VIEWS.map((v) => (
					<Magnetic key={v.key} strength={15}>
						<button
							type='button'
							className='hoobie-cta hobby-switch-btn'
							data-active={view === v.key}
							aria-pressed={view === v.key}
							onClick={() => choose(v.key)}
						>
							<span className='hoobie-cta-fill' />
							<span className='hoobie-cta-label'>{v.label}</span>
						</button>
					</Magnetic>
				))}
			</nav>

			{view === 'books' ? <BooksPage /> : <HobbyPage />}
		</div>
	);
}

export default function HobbySwitch() {
	return (
		<Suspense fallback={<div className='hobby-shell' />}>
			<HobbySwitchInner />
		</Suspense>
	);
}
