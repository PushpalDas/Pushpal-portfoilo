'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
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
					{items.map((item, index) => (
						<li key={`${item.title}-${index}`} className='certifications-tile'>
							<div className='certifications-tile-wrap'>
								<a
									href={item.url}
									target='_blank'
									rel='noopener noreferrer'
									className='certifications-tile-link'
								>
									<div className='certifications-tile-image-col'>
										<div className='certifications-tile-image'>
											<div
												className='certifications-tile-image-bg'
												style={{ backgroundColor: item.color }}
											/>
											{item.icon ? (
												<div className='certifications-tile-icon-display'>
													{item.icon}
												</div>
											) : (
												<Image
													src={`/static/images/project/${item.src}`}
													alt={item.title}
													fill
													className='certifications-tile-img'
													sizes='(max-width: 768px) 100vw, 50vw'
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
								</a>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
