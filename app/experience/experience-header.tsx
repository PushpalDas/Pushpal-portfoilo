'use client';

import gsap from 'gsap';
import { useEffect, useRef } from 'react';

interface ExperienceHeaderProps {
	filters?: React.ReactNode;
	subtitle?: string;
}

export default function ExperienceHeader({
	filters,
	subtitle,
}: ExperienceHeaderProps) {
	const headerRef = useRef<HTMLDivElement>(null);
	const line1Ref = useRef<HTMLSpanElement>(null);
	const line2Ref = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from([line1Ref.current, line2Ref.current], {
				y: '100%',
				duration: 1.2,
				ease: 'power3.out',
				stagger: 0.1,
				delay: 0.3,
			});
		}, headerRef);

		return () => ctx.revert();
	}, []);

	return (
		<header ref={headerRef} className='experience-header-section'>
			<div className='experience-header-container'>
				<div className='experience-header-content'>
					<h1 className='experience-header-title'>
						<span className='experience-header-line'>
							<span ref={line1Ref} className='experience-header-line-inner'>
								Journey so far
							</span>
						</span>
					</h1>
					<div className='experience-header-bottom-row'>
						<p className='experience-header-subtitle'>
							{subtitle || 'From 2022 to present - In one timeline'}
						</p>
						{filters && (
							<div className='experience-header-filters'>{filters}</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
