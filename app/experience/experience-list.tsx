'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import type { ExperienceItem, ExperienceModal } from './types';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceListProps {
	items: ExperienceItem[];
	setModal: (modal: ExperienceModal) => void;
}

export default function ExperienceList({
	items,
	setModal,
}: ExperienceListProps) {
	const listRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Animate stripes scaling in
			const stripes = listRef.current?.querySelectorAll(
				'.experience-list-stripe',
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
				'.experience-list-item-wrap',
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
		<section className='experience-list-section' ref={listRef}>
			<div className='experience-list-container'>
				<div className='experience-list-sub-title'>
					<div className='experience-list-sub-col'>
						<h5>Position</h5>
					</div>
					<div className='experience-list-sub-col'>
						<h5>Location</h5>
					</div>
					<div className='experience-list-sub-col'>
						<h5>Services</h5>
					</div>
					<div className='experience-list-sub-col'>
						<h5>Year</h5>
					</div>
				</div>
				<ul className='experience-list-items'>
					{items.map((item, index) => (
						<li
							key={item.title}
							className='experience-list-item-wrap'
							style={{ opacity: 0.2 }}
						>
							<div className='experience-list-stripe' />
							<a
								href={item.url}
								target='_blank'
								rel='noopener noreferrer'
								className='experience-list-item'
								onMouseEnter={() => setModal({ active: true, index })}
								onMouseLeave={() => setModal({ active: false, index })}
							>
								<div className='experience-list-col experience-list-col-title'>
									<h4>
										<span>{item.title}</span>
									</h4>
								</div>
								<div className='experience-list-col experience-list-col-info'>
									<p>{item.location}</p>
								</div>
								<div className='experience-list-col experience-list-col-info'>
									<p>{item.services}</p>
								</div>
								<div className='experience-list-col experience-list-col-info'>
									<p>{item.year}</p>
								</div>
							</a>
						</li>
					))}
					<div className='experience-list-stripe experience-list-stripe-last' />
				</ul>
			</div>
		</section>
	);
}
