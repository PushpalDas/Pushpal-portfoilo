'use client';

import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import type { FilterKey } from './constants';
import { HEADER_COPY } from './header-copy';

interface WorkHeaderProps {
	activeFilter: FilterKey;
	filters?: React.ReactNode;
}

export default function WorkHeader({ activeFilter, filters }: WorkHeaderProps) {
	const headerRef = useRef<HTMLDivElement>(null);
	const line1Ref = useRef<HTMLSpanElement>(null);
	const copy = HEADER_COPY[activeFilter];

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from([line1Ref.current], {
				y: '100%',
				duration: 1.2,
				ease: 'power3.out',
				delay: 0.3,
			});
		}, headerRef);

		return () => ctx.revert();
	}, []);

	return (
		<header ref={headerRef} className='work-header-section'>
			<div className='work-header-container'>
				{/* Title row: the H1 with the filter pills top-aligned beside it,
				    so the pills read as part of the headline and the copy below
				    gets the full width. */}
				<div className='work-header-row'>
					<h1 className='work-header-title'>
						<span className='work-header-line'>
							<span ref={line1Ref} className='work-header-line-inner'>
								From Silicon to AI
							</span>
						</span>
					</h1>
					{filters && <div className='work-header-filters'>{filters}</div>}
				</div>
				{/* Both lines follow the active filter pill — see header-copy.ts.
				    The key remounts them so the fade runs on every change. */}
				<div
					key={activeFilter}
					className='work-header-subline-wrap work-header-copy-swap'
				>
					<p className='work-header-subline'>{copy.subline}</p>
					{/* The scannable line: named tools and skills for a recruiter
					    reading in seconds. Every keyword is one the cards or case
					    studies can back. */}
					<p className='work-header-stack'>{copy.stack.join(' · ')}</p>
				</div>
			</div>
		</header>
	);
}
