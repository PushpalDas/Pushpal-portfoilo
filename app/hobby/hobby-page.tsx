'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import Magnetic from '../components/Magnetic';
import ContactSheet from './contact-sheet';
import { archive, count, frameNumber, hang, hero, type Photo } from './photos';
import { useRevealGroup } from './use-reveal';

const CHAPTERS = [
	{ id: 'selected-frames', label: '01 Selected' },
	{ id: 'the-archive', label: '02 Archive' },
	{ id: 'contact-sheet', label: '03 Contact sheet' },
];

/**
 * Measured at 640, 900, 1200 and 1920 against the real placements and
 * rounded up to the next Next.js candidate. Every source file is 1179px
 * wide, so nothing above that is reachable and the largest sensible
 * candidate is 1200.
 */
const SIZES = {
	heroCentre: '(max-width: 640px) 92vw, (max-width: 900px) 88vw, 34vw',
	heroSide: '(max-width: 640px) 44vw, (max-width: 900px) 42vw, 16vw',
	/* Collage columns: 2 below 640, 3 to 900, 4 above. */
	hang: '(max-width: 640px) 46vw, (max-width: 900px) 30vw, (max-width: 1200px) 23vw, 280px',
} as const;

function Plate({
	photo,
	sizes,
	quality,
	eager = false,
	className,
}: {
	photo: Photo;
	sizes: string;
	quality: number;
	eager?: boolean;
	className?: string;
}) {
	return (
		<span
			className={`hoobie-plate hoobie-plate-hover${className ? ` ${className}` : ''}`}
			style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
		>
			<Image
				src={photo.src}
				alt={photo.alt}
				fill
				sizes={sizes}
				quality={quality}
				placeholder='blur'
				blurDataURL={photo.blurDataURL}
				loading={eager ? 'eager' : 'lazy'}
				fetchPriority={eager ? 'high' : undefined}
				preload={eager || undefined}
				style={
					photo.objectPosition
						? { objectPosition: photo.objectPosition }
						: undefined
				}
			/>
		</span>
	);
}

interface HeroPlateProps {
	photo: Photo;
	position: 'left' | 'centre' | 'right';
	onOpen: (index: number) => void;
	registerRef: (index: number, el: HTMLButtonElement | null) => void;
}

function HeroPlate({ photo, position, onOpen, registerRef }: HeroPlateProps) {
	const centre = position === 'centre';
	return (
		<figure className={`hoobie-plate-figure hoobie-plate-${position}`}>
			<button
				type='button'
				className='hoobie-frame-button'
				onClick={() => onOpen(photo.number - 1)}
				ref={(el) => registerRef(photo.number - 1, el)}
				aria-label={`Open ${photo.title} in the image viewer`}
			>
				<Plate
					photo={photo}
					sizes={centre ? SIZES.heroCentre : SIZES.heroSide}
					quality={88}
					eager={centre}
				/>
			</button>
			<figcaption className='hoobie-caption hoobie-plate-caption'>
				{frameNumber(photo.number)} · {photo.title}
			</figcaption>
		</figure>
	);
}

export default function HobbyPage() {
	const [, setActiveFrame] = useState<number | null>(null);
	const [chapter, setChapter] = useState(CHAPTERS[0].id);
	const triggers = useRef(new Map<number, HTMLButtonElement | null>());
	const pageRef = useRevealGroup<HTMLElement>();

	const registerRef = useCallback(
		(index: number, el: HTMLButtonElement | null) => {
			triggers.current.set(index, el);
		},
		[],
	);

	// The viewer lands in phase 3; the frames already know what they open.
	const openAt = useCallback((index: number) => setActiveFrame(index), []);

	useEffect(() => {
		const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
			(el): el is HTMLElement => Boolean(el),
		);
		if (sections.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) setChapter(entry.target.id);
				}
			},
			{ rootMargin: '-45% 0px -45% 0px' },
		);
		for (const section of sections) observer.observe(section);
		return () => observer.disconnect();
	}, []);

	return (
		<main className='hoobie-page' ref={pageRef}>
			<nav className='hoobie-chapters' aria-label='Page chapters'>
				{CHAPTERS.map((c) => (
					<Link
						key={c.id}
						href={`#${c.id}`}
						className='hoobie-chapter-link'
						data-active={chapter === c.id}
					>
						{c.label}
					</Link>
				))}
			</nav>

			<section className='hoobie-hero'>
				<div className='hoobie-shell hoobie-hero-grid'>
					<div className='hoobie-hero-copy'>
						<p className='hoobie-eyebrow reveal'>A practice in noticing</p>
						<h1 className='hoobie-display-xl reveal' data-reveal-delay='0.06'>
							The camera is how I slow the world down.
						</h1>
						<p
							className='hoobie-lead hoobie-hero-deck reveal'
							data-reveal-delay='0.12'
						>
							A personal archive of people, places, wildlife and passing light —
							photographed by Pushpal Das.
						</p>
						<span className='reveal' data-reveal-delay='0.18'>
							<Magnetic strength={18}>
								<Link href='#selected-frames' className='hoobie-cta'>
									<span className='hoobie-cta-fill' />
									<span className='hoobie-cta-label'>
										View selected frames →
									</span>
								</Link>
							</Magnetic>
						</span>
					</div>

					<div className='hoobie-stage'>
						<div className='hoobie-stage-index'>
							<span className='hoobie-caption'>Observation 01</span>
							<span className='hoobie-caption'>Personal archive</span>
							<span className='hoobie-caption'>
								{frameNumber(hero.centre.number)} / {count}
							</span>
						</div>
						<div className='hoobie-triptych'>
							<HeroPlate
								photo={hero.left}
								position='left'
								onOpen={openAt}
								registerRef={registerRef}
							/>
							<HeroPlate
								photo={hero.centre}
								position='centre'
								onOpen={openAt}
								registerRef={registerRef}
							/>
							<HeroPlate
								photo={hero.right}
								position='right'
								onOpen={openAt}
								registerRef={registerRef}
							/>
						</div>
					</div>
				</div>
			</section>

			<section className='hoobie-statement' aria-label='Photography statement'>
				<div className='hoobie-shell hoobie-statement-grid'>
					<p className='hoobie-eyebrow reveal'>Why I photograph</p>
					<div>
						<p className='hoobie-statement-quote reveal'>
							Not to make the ordinary look grand, but to notice what the
							ordinary was already holding: a gesture, a shadow, a brief
							alignment of things.
						</p>
						<p className='hoobie-body reveal' data-reveal-delay='0.06'>
							I photograph the way I look — slowly, and off to one side. A
							camera gives me permission to stay a moment longer than is polite:
							to watch light cross a wall, a stranger settle into thought,
							weather change its mind. I am not chasing the grand version of
							anything. I am collecting the ordinary, held for a second longer
							than usual, until it gives something back.
						</p>
					</div>
				</div>
			</section>

			<section className='hoobie-hang-section' id='selected-frames'>
				<div className='hoobie-shell'>
					<header className='hoobie-section-head'>
						<p className='hoobie-eyebrow reveal'>01 — Selected work</p>
						<h2 className='hoobie-display-l reveal' data-reveal-delay='0.06'>
							Frames I return to
						</h2>
						<p className='hoobie-lead reveal' data-reveal-delay='0.12'>
							{hang.length} frames from a growing personal archive.
						</p>
					</header>

					{/* A collage rather than a hang: every frame at its own ratio,
					    small enough to be seen whole, columns doing the alignment. */}
					<div className='hoobie-collage'>
						{hang.map((photo, i) => (
							<figure
								key={photo.id}
								className='hoobie-collage-figure reveal'
								data-rhythm={i % 7}
							>
								<button
									type='button'
									className='hoobie-frame-button'
									onClick={() => openAt(photo.number - 1)}
									ref={(el) => registerRef(photo.number - 1, el)}
									aria-label={
										photo.title
											? `Open ${photo.title} in the image viewer`
											: `Open frame ${frameNumber(photo.number)} in the image viewer`
									}
								>
									<Plate photo={photo} sizes={SIZES.hang} quality={88} />
								</button>
								<figcaption className='hoobie-caption hoobie-collage-caption'>
									{frameNumber(photo.number)}
									{photo.title ? ` · ${photo.title}` : ''}
									{photo.category ? ` · ${photo.category}` : ''}
								</figcaption>
							</figure>
						))}
					</div>
				</div>
			</section>

			<section className='hoobie-sheet-section' id='contact-sheet'>
				<div className='hoobie-shell'>
					<header className='hoobie-section-head'>
						<p className='hoobie-eyebrow reveal'>03 — Contact sheet</p>
						<h2 className='hoobie-display-l reveal' data-reveal-delay='0.06'>
							The wider archive
						</h2>
						<p className='hoobie-lead reveal' data-reveal-delay='0.12'>
							{archive.length} more frames. Unpolished, varied, alive.
						</p>
					</header>
					<ContactSheet onOpen={openAt} registerRef={registerRef} />
				</div>
			</section>

			<section className='hoobie-statement' aria-label='Closing'>
				<div className='hoobie-shell'>
					<p className='hoobie-heading reveal'>End of the sheet — for now.</p>
					<p className='reveal' data-reveal-delay='0.06'>
						<Magnetic strength={14}>
							<Link href='/about' className='hoobie-cta'>
								<span className='hoobie-cta-fill' />
								<span className='hoobie-cta-label'>Read more about me →</span>
							</Link>
						</Magnetic>
					</p>
				</div>
			</section>
		</main>
	);
}
