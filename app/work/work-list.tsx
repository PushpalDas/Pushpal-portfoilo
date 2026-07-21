'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import type { WorkItem, WorkModal } from './types';

gsap.registerPlugin(ScrollTrigger);

interface WorkListProps {
	items: WorkItem[];
	setModal: (modal: WorkModal) => void;
}

export default function WorkList({ items, setModal }: WorkListProps) {
	const listRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Animate stripes scaling in
			const stripes = listRef.current?.querySelectorAll('.work-list-stripe');
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
			const rows = listRef.current?.querySelectorAll('.work-list-item-wrap');
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
		<section className='work-list-section' ref={listRef}>
			<div className='work-list-container'>
				<div className='work-list-sub-title'>
					<div className='work-list-sub-col'>
						<h5>Client</h5>
					</div>
					<div className='work-list-sub-col'>
						<h5>Location</h5>
					</div>
					<div className='work-list-sub-col'>
						<h5>Services</h5>
					</div>
					<div className='work-list-sub-col'>
						<h5>Year</h5>
					</div>
				</div>
				<ul className='work-list-items'>
					{items.map((item, index) => (
						<li
							key={item.title}
							className='work-list-item-wrap'
							style={{ opacity: 0.2 }}
						>
							<div className='work-list-stripe' />
							<a
								href={item.url}
								target='_blank'
								rel='noopener noreferrer'
								className='work-list-item'
								onMouseEnter={() => setModal({ active: true, index })}
								onMouseLeave={() => setModal({ active: false, index })}
							>
								<div className='work-list-col work-list-col-title'>
									<h4>
										<span>{item.title}</span>
									</h4>
								</div>
								<div className='work-list-col work-list-col-info'>
									<p>{item.location}</p>
								</div>
								<div className='work-list-col work-list-col-info'>
									<p>{item.services}</p>
								</div>
								<div className='work-list-col work-list-col-info'>
									<p>{item.year}</p>
								</div>
							</a>
						</li>
					))}
					<div className='work-list-stripe work-list-stripe-last' />
				</ul>
			</div>
		</section>
	);
}
