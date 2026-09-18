'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import type { CertificationItem } from './types';

gsap.registerPlugin(ScrollTrigger);

interface CertificationsGridProps {
	items: CertificationItem[];
	gridColumns?: 2 | 4;
}

export default function CertificationsGrid({
	items,
	gridColumns = 2,
}: CertificationsGridProps) {
	const gridRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const tiles = gridRef.current?.querySelectorAll('.certifications-tile');
			if (tiles) {
				gsap.from(tiles, {
					y: 60,
					opacity: 0,
					duration: 0.8,
					ease: 'power3.out',
					stagger: 0.1,
					scrollTrigger: {
						trigger: gridRef.current,
						start: 'top 85%',
						toggleActions: 'play none none reset',
					},
				});
			}
		}, gridRef);

		return () => ctx.revert();
	}, [items]);

	return (
		<section className='certifications-grid-section' ref={gridRef}>
			<div className='certifications-grid-container'>
				<ul
					className={`certifications-grid-items certifications-grid-${gridColumns}`}
				>
					{items.map((item) => {
						const count = item.documents?.length ?? 0;

						return (
							<li key={item.slug} className='certifications-tile'>
								<div className='certifications-tile-wrap'>
									{/* Every tile is a real link to a real page. It used to be a
									    button opening a modal, and before that an anchor whose
									    href was "" on every record without a credential URL — a
									    link back to this page. The certificate, its brief and
									    whatever link it carries now live at /certifications/<slug>,
									    which is addressable, shareable and indexable. */}
									<Link
										href={`/certifications/${item.slug}`}
										className='certifications-tile-link'
										aria-label={
											count > 1
												? `Open ${item.title.trim()}, ${count} certificates`
												: `Open ${item.title.trim()}`
										}
									>
										<div className='certifications-tile-image-col'>
											<div className='certifications-tile-image'>
												{/* Pitch black, like the page. The card colours the data
												    still carries are deliberately not painted here. */}
												<div className='certifications-tile-image-bg' />
												{item.icon ? (
													<div className='certifications-tile-icon-display'>
														{item.icon}
													</div>
												) : (
													<Image
														src={`/static/images/certificates/${item.src}`}
														alt={item.title}
														fill
														className='certifications-tile-img'
														sizes='(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 24vw'
													/>
												)}
											</div>
										</div>
										<div className='certifications-tile-title-col'>
											<h4>
												<span>{item.title}</span>
											</h4>
											<div className='certifications-tile-stripe' />
										</div>
										<div className='certifications-tile-info-col'>
											<p>{item.services}</p>
										</div>
										{gridColumns === 2 && (
											<div className='certifications-tile-info-col'>
												<p>{item.year}</p>
											</div>
										)}
										{count > 1 && (
											<p className='certifications-tile-count'>
												{count} certificates
											</p>
										)}
									</Link>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
