'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import type { WorkItem } from './types';

gsap.registerPlugin(ScrollTrigger);

interface WorkGridProps {
	items: WorkItem[];
	gridColumns?: 2 | 4;
}

export default function WorkGrid({ items, gridColumns = 2 }: WorkGridProps) {
	const gridRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const tiles = gridRef.current?.querySelectorAll('.work-tile');
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
		<section className='work-grid-section' ref={gridRef}>
			<div className='work-grid-container'>
				<ul className={`work-grid-items work-grid-${gridColumns}`}>
					{items.map((item) => {
						const cardInner = (
							<>
								<div className='work-tile-image-col'>
									<div className='work-tile-image'>
										<div
											className='work-tile-image-bg'
											style={{ backgroundColor: item.color }}
										/>
										{item.icon ? (
											<div className='work-tile-icon-display'>
												{item.icon}
											</div>
										) : (
											<Image
												src={`/static/images/project/${item.src}`}
												alt={item.title}
												fill
												className='work-tile-img'
												sizes='(max-width: 768px) 100vw, 50vw'
											/>
										)}
									</div>
								</div>
								<div className='work-tile-title-col'>
									<h4>
										<span>{item.title}</span>
									</h4>
									<div className='work-tile-stripe' />
								</div>
								<div className='work-tile-info-col'>
									<p>{item.services}</p>
								</div>
								{gridColumns === 2 && (
									<div className='work-tile-info-col'>
										<p>{item.year}</p>
									</div>
								)}
							</>
						);

						// Case 1: has a slug → internal case study page
						if (item.slug) {
							return (
								<li key={item.title} className='work-tile'>
									<div className='work-tile-wrap'>
										<Link
											href={`/work/${item.slug}`}
											target='_blank'
											className='work-tile-link'
										>
											{cardInner}
										</Link>
									</div>
								</li>
							);
						}

						// Case 2: has an external URL → open in new tab
						if (item.url) {
							return (
								<li key={item.title} className='work-tile'>
									<div className='work-tile-wrap'>
										<a
											href={item.url}
											target='_blank'
											rel='noopener noreferrer'
											className='work-tile-link'
										>
											{cardInner}
										</a>
									</div>
								</li>
							);
						}

						// Case 3: no slug and no URL → non-clickable card
						return (
							<li key={item.title} className='work-tile'>
								<div className='work-tile-wrap'>
									<div className='work-tile-link work-tile-link--static'>
										{cardInner}
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
