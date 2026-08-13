'use client';

import gsap from 'gsap';
import { useEffect, useRef } from 'react';

interface WorkHeaderProps {
	filters?: React.ReactNode;
}

export default function WorkHeader({ filters }: WorkHeaderProps) {
	const headerRef = useRef<HTMLDivElement>(null);
	const line1Ref = useRef<HTMLSpanElement>(null);
	const line2Ref = useRef<HTMLSpanElement>(null);

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
				<div className='work-header-row'>
					<div className='work-header-col'>
						<h1 className='work-header-title'>
							<span className='work-header-line'>
								<span ref={line1Ref} className='work-header-line-inner'>
									From Silicon to AI
								</span>
							</span>
						</h1>
						<div className='work-header-subline-wrap'>
							<p className='work-header-subline'>
								Product manager with an engineering background — body area network silicon, RAG platforms, and internal tools. Three shipped commercially.
							</p>
						</div>
					</div>
					{filters && <div className='work-header-filters'>{filters}</div>}
				</div>
			</div>
		</header>
	);
}
