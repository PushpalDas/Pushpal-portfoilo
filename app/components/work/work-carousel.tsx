'use client';

import Image from 'next/image';
import './work-carousel.css';
import { useCallback, useRef, useState } from 'react';
import Magnetic from '../Magnetic';

interface CarouselImage {
	src: string;
	width: number;
	height: number;
	title?: string;
	/** Alt text, kept separate from the caption printed under the image. */
	alt?: string;
}

interface WorkCarouselProps {
	images: CarouselImage[];
	currentIndex?: number;
	onIndexChange?: (index: number) => void;
}

export default function WorkCarousel({
	images,
	currentIndex: externalIndex,
	onIndexChange,
}: WorkCarouselProps) {
	const [internalIndex, setInternalIndex] = useState(0);
	const currentIndex =
		externalIndex !== undefined ? externalIndex : internalIndex;
	const containerRef = useRef<HTMLDivElement>(null);

	const goTo = useCallback(
		(idx: number) => {
			const nextIdx = (idx + images.length) % images.length;
			if (onIndexChange) {
				onIndexChange(nextIdx);
			} else {
				setInternalIndex(nextIdx);
			}
		},
		[images.length, onIndexChange],
	);

	return (
		<div className='work-carousel' ref={containerRef}>
			{/* Carousel viewport */}
			<div className='work-carousel-viewport'>
				<div
					className='work-carousel-track'
					style={{
						transform: `translateX(-${currentIndex * 100}%)`,
					}}
				>
					{images.map((img, idx) => (
						<div key={`carousel-${idx}`} className='work-carousel-slide'>
							{img.src ? (
								<div className='work-carousel-slide-content'>
									<Image
										src={img.src}
										alt={img.alt || img.title || `Slide ${idx + 1}`}
										width={img.width}
										height={img.height}
										className='work-carousel-img'
										priority={idx === 0}
									/>
									{img.title && (
										<p className='work-carousel-slide-title'>{img.title}</p>
									)}
								</div>
							) : (
								<div className='work-carousel-placeholder'>
									<svg
										width='48'
										height='48'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='1'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
										<circle cx='8.5' cy='8.5' r='1.5' />
										<polyline points='21 15 16 10 5 21' />
									</svg>
									<span>Coming soon</span>
								</div>
							)}
						</div>
					))}
				</div>

				{/* Left arrow — inside viewport */}
				<div className='work-carousel-edge-arrow work-carousel-edge-left'>
					<Magnetic strength={15}>
						<button
							type='button'
							className={`work-carousel-nav-btn${currentIndex === 0 ? '' : ' active'}`}
							onClick={() => goTo(currentIndex - 1)}
							aria-label='Previous slide'
						>
							<span className='work-carousel-nav-btn-fill' />
							<span className='work-carousel-nav-btn-text'>
								<svg
									width='18'
									height='18'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<polyline points='15 18 9 12 15 6' />
								</svg>
							</span>
						</button>
					</Magnetic>
				</div>

				{/* Right arrow — inside viewport */}
				<div className='work-carousel-edge-arrow work-carousel-edge-right'>
					<Magnetic strength={15}>
						<button
							type='button'
							className={`work-carousel-nav-btn${currentIndex === images.length - 1 ? '' : ' active'}`}
							onClick={() => goTo(currentIndex + 1)}
							aria-label='Next slide'
						>
							<span className='work-carousel-nav-btn-fill' />
							<span className='work-carousel-nav-btn-text'>
								<svg
									width='18'
									height='18'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<polyline points='9 18 15 12 9 6' />
								</svg>
							</span>
						</button>
					</Magnetic>
				</div>
			</div>
		</div>
	);
}
