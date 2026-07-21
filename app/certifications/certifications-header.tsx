'use client';

import gsap from 'gsap';
import { useEffect, useRef } from 'react';

interface CertificationsHeaderProps {
	filters?: React.ReactNode;
}

export default function CertificationsHeader({
	filters,
}: CertificationsHeaderProps) {
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
		<header ref={headerRef} className='certifications-header-section'>
			<div className='certifications-header-container'>
				<div className='certifications-header-row'>
					<div className='certifications-header-col'>
						<h1 className='certifications-header-title'>
							<span className='certifications-header-line'>
								<span
									ref={line1Ref}
									className='certifications-header-line-inner'
								>
									Verified
								</span>
							</span>
						</h1>
					</div>
					{filters && (
						<div className='certifications-header-filters'>{filters}</div>
					)}
				</div>
			</div>
		</header>
	);
}
