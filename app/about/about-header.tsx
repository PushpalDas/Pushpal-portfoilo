'use client';

import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function AboutHeader() {
	const headerRef = useRef<HTMLDivElement>(null);
	const line1Ref = useRef<HTMLSpanElement>(null);

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
		<header ref={headerRef} className='about-header-section'>
			<div className='about-header-container'>
				<div className='about-header-row'>
					<div className='about-header-col'>
						<h1 className='about-header-title'>
							<span className='about-header-line'>
								<span ref={line1Ref} className='about-header-line-inner'>
									Electrons and a frame
								</span>
							</span>
						</h1>
						<div className='about-header-subline-wrap'>
							<p className='about-header-subline'>
								I&apos;m Pushpal Das. I build products where electronics meets
								people — currently Principal PM in the CTO&apos;s office at
								Ixana.
							</p>
							<p className='about-header-note'>
								The roles, dates and credentials live on the experience page.
								This one is about how I see.
							</p>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
