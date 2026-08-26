'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type Photograph = {
	src: string;
	title: string;
	category: 'People' | 'Nature' | 'Places' | 'Details';
	ratio?: 'landscape' | 'portrait' | 'tall' | 'square';
	position?: string;
};

const selectedPhotographs: Photograph[] = [
	{
		src: '/Photography/IMG_6204.jpg',
		title: 'The quiet between tasks',
		category: 'People',
		ratio: 'portrait',
	},
	{
		src: '/Photography/IMG_6206.jpg',
		title: 'Durga in motion',
		category: 'Details',
		ratio: 'portrait',
	},
	{
		src: '/Photography/IMG_6225.jpg',
		title: 'Marble after dusk',
		category: 'Places',
		ratio: 'landscape',
	},
	{
		src: '/Photography/IMG_6228.jpg',
		title: 'A closer world',
		category: 'Details',
		ratio: 'square',
	},
	{
		src: '/Photography/IMG_6230.jpg',
		title: 'Bridge in fog',
		category: 'Places',
		ratio: 'portrait',
	},
	{
		src: '/Photography/IMG_6214.jpg',
		title: 'Morning pages',
		category: 'People',
		ratio: 'portrait',
	},
	{
		src: '/Photography/IMG_6245.jpg',
		title: 'Tea country',
		category: 'Places',
		ratio: 'tall',
	},
	{
		src: '/Photography/IMG_6258.jpg',
		title: 'Last light',
		category: 'Nature',
		ratio: 'portrait',
	},
	{
		src: '/Photography/IMG_6260.jpg',
		title: 'Winter silence',
		category: 'Places',
		ratio: 'portrait',
	},
	{
		src: '/Photography/IMG_6268.jpg',
		title: 'Threshold',
		category: 'Places',
		ratio: 'portrait',
	},
	{
		src: '/Photography/IMG_6281.jpg',
		title: 'Weather turning',
		category: 'Nature',
		ratio: 'landscape',
	},
	{
		src: '/Photography/IMG_6289.jpg',
		title: 'The traveller',
		category: 'People',
		ratio: 'tall',
		position: 'center 30%',
	},
];

const photoFiles = [
	'IMG_6201.jpg',
	'IMG_6202.jpg',
	'IMG_6204.jpg',
	'IMG_6205.jpg',
	'IMG_6206.jpg',
	'IMG_6207.jpg',
	'IMG_6208.jpg',
	'IMG_6209.jpg',
	'IMG_6210.jpg',
	'IMG_6211.jpg',
	'IMG_6212.jpg',
	'IMG_6213.jpg',
	'IMG_6214.jpg',
	'IMG_6215.jpg',
	'IMG_6216.jpg',
	'IMG_6217.jpg',
	'IMG_6219.jpg',
	'IMG_6220.jpg',
	'IMG_6221.jpg',
	'IMG_6223.jpg',
	'IMG_6224.jpg',
	'IMG_6225.jpg',
	'IMG_6226.jpg',
	'IMG_6227.jpg',
	'IMG_6228.jpg',
	'IMG_6229.jpg',
	'IMG_6230.jpg',
	'IMG_6231.jpg',
	'IMG_6232.jpg',
	'IMG_6233.jpg',
	'IMG_6234.jpg',
	'IMG_6235.jpg',
	'IMG_6236.jpg',
	'IMG_6237.jpg',
	'IMG_6238.jpg',
	'IMG_6239.jpg',
	'IMG_6240.jpg',
	'IMG_6241.jpg',
	'IMG_6242.jpg',
	'IMG_6244.jpg',
	'IMG_6245.jpg',
	'IMG_6246.jpg',
	'IMG_6247.jpg',
	'IMG_6248.jpg',
	'IMG_6249.jpg',
	'IMG_6250.jpg',
	'IMG_6251.jpg',
	'IMG_6252.jpg',
	'IMG_6253.jpg',
	'IMG_6254.jpg',
	'IMG_6255.jpg',
	'IMG_6256.jpg',
	'IMG_6257.jpg',
	'IMG_6258.jpg',
	'IMG_6259.jpg',
	'IMG_6260.jpg',
	'IMG_6261.jpg',
	'IMG_6262.jpg',
	'IMG_6263.jpg',
	'IMG_6264.jpg',
	'IMG_6265.jpg',
	'IMG_6266.jpg',
	'IMG_6267.jpg',
	'IMG_6268.jpg',
	'IMG_6270.jpg',
	'IMG_6271.jpg',
	'IMG_6272.jpg',
	'IMG_6273.jpg',
	'IMG_6274.jpg',
	'IMG_6275.jpg',
	'IMG_6276.jpg',
	'IMG_6277.jpg',
	'IMG_6278.jpg',
	'IMG_6279.jpg',
	'IMG_6280.jpg',
	'IMG_6281.jpg',
	'IMG_6282.jpg',
	'IMG_6283.jpg',
	'IMG_6284.jpg',
	'IMG_6285.jpg',
	'IMG_6286.jpg',
	'IMG_6287.jpg',
	'IMG_6288.jpg',
	'IMG_6289.jpg',
	'IMG_6290.jpg',
];

const allPhotographs: Photograph[] = photoFiles.map((file, index) => ({
	src: `/Photography/${file}`,
	title: `Archive frame ${String(index + 1).padStart(2, '0')}`,
	category: 'Details',
}));

function ArrowIcon() {
	return (
		<svg viewBox='0 0 24 24' aria-hidden='true'>
			<path d='M5 12h14M13 6l6 6-6 6' />
		</svg>
	);
}

function CloseIcon() {
	return (
		<svg viewBox='0 0 24 24' aria-hidden='true'>
			<path d='M6 6l12 12M18 6 6 18' />
		</svg>
	);
}

export default function HoobieGallery() {
	const [activePhoto, setActivePhoto] = useState<number | null>(null);
	const selectedSources = useMemo(
		() => new Set(selectedPhotographs.map((photo) => photo.src)),
		[],
	);
	const archivePhotographs = useMemo(
		() => allPhotographs.filter((photo) => !selectedSources.has(photo.src)),
		[selectedSources],
	);
	const lightboxPhotographs = useMemo(
		() => [...selectedPhotographs, ...archivePhotographs],
		[archivePhotographs],
	);

	useEffect(() => {
		if (activePhoto === null) return;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setActivePhoto(null);
			if (event.key === 'ArrowRight') {
				setActivePhoto((current) =>
					current === null ? 0 : (current + 1) % lightboxPhotographs.length,
				);
			}
			if (event.key === 'ArrowLeft') {
				setActivePhoto((current) =>
					current === null
						? 0
						: (current - 1 + lightboxPhotographs.length) %
							lightboxPhotographs.length,
				);
			}
		};

		window.addEventListener('keydown', onKeyDown);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [activePhoto, lightboxPhotographs.length]);

	const moveLightbox = (direction: -1 | 1) => {
		setActivePhoto((current) => {
			if (current === null) return 0;
			return (
				(current + direction + lightboxPhotographs.length) %
				lightboxPhotographs.length
			);
		});
	};

	return (
		<main className='hoobie-page'>
			<section className='hoobie-hero' aria-labelledby='hoobie-title'>
				<div className='hoobie-hero-copy'>
					<p className='hoobie-kicker'>A practice in noticing</p>
					<h1 id='hoobie-title'>The camera is how I slow the world down.</h1>
					<div className='hoobie-intro'>
						<p>
							A personal archive of people, places, wildlife and passing light —
							photographed by Pushpal Das.
						</p>
						<a href='#selected-frames'>
							View selected frames <ArrowIcon />
						</a>
					</div>
				</div>

				<div className='hoobie-hero-stage'>
					<div className='hoobie-stage-index'>
						<span>Observation 01</span>
						<span>Personal archive / Study 01</span>
					</div>
					<div className='hoobie-hero-image'>
						<button
							type='button'
							className='hoobie-hero-panel hoobie-hero-side'
							onClick={() => setActivePhoto(5)}
							aria-label='Open Morning pages in image viewer'
						>
							<Image
								src={selectedPhotographs[5].src}
								alt='Morning pages'
								fill
								sizes='25vw'
								className='hoobie-cover'
							/>
						</button>
						<button
							type='button'
							className='hoobie-hero-panel hoobie-hero-main'
							onClick={() => setActivePhoto(0)}
							aria-label='Open The quiet between tasks in image viewer'
						>
							<Image
								src={selectedPhotographs[0].src}
								alt='A man absorbed in his work'
								fill
								priority
								sizes='(max-width: 768px) 100vw, 42vw'
								className='hoobie-cover'
							/>
						</button>
						<button
							type='button'
							className='hoobie-hero-panel hoobie-hero-side'
							onClick={() => setActivePhoto(11)}
							aria-label='Open The traveller in image viewer'
						>
							<Image
								src={selectedPhotographs[11].src}
								alt='The traveller'
								fill
								sizes='25vw'
								className='hoobie-cover'
								style={{ objectPosition: 'center 30%' }}
							/>
						</button>
						<span className='hoobie-image-number'>01 / 85</span>
						<span className='hoobie-view-cue'>
							Open frame <ArrowIcon />
						</span>
					</div>
				</div>
			</section>

			<section className='hoobie-statement' aria-label='Photography statement'>
				<p className='hoobie-section-label'>Why I photograph</p>
				<p className='hoobie-statement-copy'>
					Not to make the ordinary look grand, but to notice what the ordinary
					was already holding: a gesture, a shadow, a brief alignment of things.
				</p>
			</section>

			<section
				className='hoobie-selected-section'
				id='selected-frames'
				aria-labelledby='selected-title'
			>
				<div className='hoobie-section-heading'>
					<div>
						<p className='hoobie-section-label'>01 — Selected work</p>
						<h2 id='selected-title'>Frames I return to</h2>
					</div>
					<p>12 observations from a growing personal archive.</p>
				</div>

				<div className='hoobie-editorial-grid'>
					{selectedPhotographs.slice(1).map((photo, index) => (
						<figure
							className={`hoobie-photo-card hoobie-photo-${index + 2}`}
							key={photo.src}
						>
							<button
								type='button'
								className={`hoobie-photo-frame is-${photo.ratio}`}
								onClick={() => setActivePhoto(index + 1)}
								aria-label={`Open ${photo.title} in image viewer`}
							>
								<Image
									src={photo.src}
									alt={photo.title}
									fill
									sizes='(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 38vw'
									className='hoobie-cover'
									style={{ objectPosition: photo.position }}
								/>
								<span className='hoobie-open-icon'>
									<ArrowIcon />
								</span>
							</button>
							<figcaption>
								<span>{String(index + 2).padStart(2, '0')}</span>
								<div>
									<strong>{photo.title}</strong>
									<small>{photo.category}</small>
								</div>
							</figcaption>
						</figure>
					))}
				</div>
			</section>

			<section className='hoobie-archive' aria-labelledby='archive-title'>
				<div className='hoobie-section-heading'>
					<div>
						<p className='hoobie-section-label'>02 — Contact sheet</p>
						<h2 id='archive-title'>The wider archive</h2>
					</div>
					<p>
						{archivePhotographs.length} more frames. Unpolished, varied, alive.
					</p>
				</div>

				<div className='hoobie-contact-sheet'>
					{archivePhotographs.map((photo, index) => (
						<button
							type='button'
							className='hoobie-contact-frame'
							key={photo.src}
							onClick={() => setActivePhoto(selectedPhotographs.length + index)}
							aria-label={`Open ${photo.title} in image viewer`}
						>
							<Image
								src={photo.src}
								alt={photo.title}
								fill
								sizes='(max-width: 640px) 33vw, (max-width: 1000px) 20vw, 12vw'
								className='hoobie-cover'
							/>
							<span>{String(index + 13).padStart(2, '0')}</span>
						</button>
					))}
				</div>
			</section>

			<footer className='hoobie-footer'>
				<p>End of contact sheet — for now.</p>
				<Link href='/about'>
					Read more about me <ArrowIcon />
				</Link>
			</footer>

			{activePhoto !== null && (
				<div
					className='hoobie-lightbox'
					role='dialog'
					aria-modal='true'
					aria-label='Photography viewer'
				>
					<button
						type='button'
						className='hoobie-lightbox-close'
						onClick={() => setActivePhoto(null)}
						aria-label='Close image viewer'
					>
						<CloseIcon />
					</button>

					<div className='hoobie-lightbox-image'>
						<Image
							src={lightboxPhotographs[activePhoto].src}
							alt={lightboxPhotographs[activePhoto].title}
							fill
							priority
							sizes='100vw'
							className='hoobie-contain'
						/>
					</div>

					<div className='hoobie-lightbox-meta'>
						<span>
							{String(activePhoto + 1).padStart(2, '0')} /{' '}
							{lightboxPhotographs.length}
						</span>
						<strong>{lightboxPhotographs[activePhoto].title}</strong>
					</div>

					<div className='hoobie-lightbox-controls'>
						<button
							type='button'
							onClick={() => moveLightbox(-1)}
							aria-label='Previous photograph'
						>
							Previous
						</button>
						<button
							type='button'
							onClick={() => moveLightbox(1)}
							aria-label='Next photograph'
						>
							Next
						</button>
					</div>
				</div>
			)}
		</main>
	);
}
