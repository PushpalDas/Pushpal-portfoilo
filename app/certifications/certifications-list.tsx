'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import type { CertificationItem, CertificationModal } from './types';

gsap.registerPlugin(ScrollTrigger);

interface CertificationsListProps {
	items: CertificationItem[];
	setModal: (modal: CertificationModal) => void;
}

export default function CertificationsList({
	items,
	setModal,
}: CertificationsListProps) {
	const listRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Animate stripes scaling in
			const stripes = listRef.current?.querySelectorAll(
				'.certifications-list-stripe',
			);
			if (stripes) {
				gsap.from(stripes, {
					scaleX: 0,
					transformOrigin: 'left center',
					duration: 0.8,
					ease: 'power3.out',
					stagger: 0.06,
					scrollTrigger: {
						trigger: listRef.current,
						start: 'top 85%',
						toggleActions: 'play none none reset',
					},
				});
			}

			// Scroll-based opacity focus: each item fades in/out based on scroll position
			const rows = listRef.current?.querySelectorAll(
				'.certifications-list-item-wrap',
			);
			if (rows) {
				for (const row of rows) {
					gsap.to(row, {
						scrollTrigger: {
							trigger: row,
							start: 'top 90%',
							end: 'top 20%',
							scrub: true,
							onUpdate: (self) => {
								const progress = self.progress;
								// Fade in from 0.2 to 1 as it enters, stay at 1 in the middle
								let opacity: number;
								if (progress < 0.3) {
									opacity = 0.2 + (progress / 0.3) * 0.8;
								} else {
									opacity = 1;
								}
								(row as HTMLElement).style.opacity = String(opacity);
							},
						},
					});
				}
			}
		}, listRef);

		return () => ctx.revert();
	}, [items]);

	return (
		<section className='certifications-list-section' ref={listRef}>
			<div className='certifications-list-container'>
				<div className='certifications-list-sub-title'>
					<div className='certifications-list-sub-col'>
						<h5>Certification</h5>
					</div>
					<div className='certifications-list-sub-col'>
						<h5>Issuer</h5>
					</div>
					<div className='certifications-list-sub-col'>
						<h5>Category</h5>
					</div>
					<div className='certifications-list-sub-col'>
						<h5>Year</h5>
					</div>
				</div>
				<ul className='certifications-list-items'>
					{items.map((item, index) => (
						<li
							key={`${item.title}-${index}`}
							className='certifications-list-item-wrap'
							style={{ opacity: 0.2 }}
						>
							<div className='certifications-list-stripe' />
							<a
								href={item.url}
								target='_blank'
								rel='noopener noreferrer'
								className='certifications-list-item'
								onMouseEnter={() => setModal({ active: true, index })}
								onMouseLeave={() => setModal({ active: false, index })}
							>
								<div className='certifications-list-col certifications-list-col-title'>
									<h4>
										<span>{item.title}</span>
									</h4>
								</div>
								<div className='certifications-list-col certifications-list-col-info'>
									<p>{item.location}</p>
								</div>
								<div className='certifications-list-col certifications-list-col-info'>
									<p>{item.services}</p>
								</div>
								<div className='certifications-list-col certifications-list-col-info'>
									<p>{item.year}</p>
								</div>
							</a>
						</li>
					))}
					<div className='certifications-list-stripe certifications-list-stripe-last' />
				</ul>
			</div>
		</section>
	);
}
