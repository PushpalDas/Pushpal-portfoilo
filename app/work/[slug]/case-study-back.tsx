'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

/**
 * The back link knows where the reader came from.
 *
 * Links out of the home page's work section carry `?from=home`, so the way
 * back is the section they were reading rather than the top of /work. The
 * `?filter=` a /work card was filtered by rides along the same way, so a
 * visitor lands back on the list they left. `?domain=` is the name that
 * carry had before the filter row was flattened.
 */
function BackLink() {
	const searchParams = useSearchParams();

	if (searchParams.get('from') === 'home') {
		return (
			<Link href='/#work' className='cs2-back'>
				<span aria-hidden='true'>←</span> Back to home
			</Link>
		);
	}

	const filter = searchParams.get('filter') ?? searchParams.get('domain');
	const href = filter ? `/work?filter=${filter}` : '/work';

	return (
		<Link href={href} className='cs2-back'>
			<span aria-hidden='true'>←</span> Back to work
		</Link>
	);
}

/** Prerender the default, then let the query string correct it on the client. */
export default function CaseStudyBack() {
	return (
		<Suspense
			fallback={
				<Link href='/work' className='cs2-back'>
					<span aria-hidden='true'>←</span> Back to work
				</Link>
			}
		>
			<BackLink />
		</Suspense>
	);
}
