'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import Magnetic from '../components/Magnetic';
import ContactSheet from './contact-sheet';
import {
	archive,
	count,
	frameNumber,
	hero,
	type Photo,
	selected,
} from './photos';
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
	hangLarge: '(max-width: 640px) 100vw, (max-width: 900px) 58vw, 590px',
	hangMedium: '(max-width: 640px) 84vw, (max-width: 900px) 46vw, 470px',
	hangSmall: '(max-width: 640px) 84vw, (max-width: 900px) 34vw, 350px',
} as const;

/** Span class per frame drives which `sizes` string it gets. */
const HANG_SIZE: Record<number, string> = {
	2: SIZES.hangLarge,
	3: SIZES.hangSmall,
	4: SIZES.hangMedium,
	5: SIZES.hangSmall,
	6: SIZES.hangLarge,
	7: SIZES.hangSmall,
	8: SIZES.hangMedium,
	9: SIZES.hangLarge,
	10: SIZES.hangSmall,
	11: SIZES.hangLarge,
	12: SIZES.hangMedium,
};

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

	const hang = selected.slice(1);

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
							Twelve observations from a growing personal archive.
						</p>
					</header>

					<div className='hoobie-hang'>
						{hang.map((photo) => (
							<figure
								key={photo.id}
								className='hoobie-hang-figure reveal'
								data-frame={photo.number}
							>
								<button
									type='button'
									className='hoobie-frame-button'
									onClick={() => openAt(photo.number - 1)}
									ref={(el) => registerRef(photo.number - 1, el)}
									aria-label={`Open ${photo.title} in the image viewer`}
								>
									<Plate
										photo={photo}
										sizes={HANG_SIZE[photo.number] ?? SIZES.hangMedium}
										quality={88}
									/>
								</button>
								<figcaption className='hoobie-caption hoobie-hang-caption'>
									{frameNumber(photo.number)} · {photo.title} · {photo.category}
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
