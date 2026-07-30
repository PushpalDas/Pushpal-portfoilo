'use client';

/**
 * ================================================================
 * CASE STUDY PAGE TEMPLATE
 * ================================================================
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useEffect } from 'react';
import type { CaseStudyData, MediaItem } from './case-study-types';
import './case-study.css';

gsap.registerPlugin(ScrollTrigger);

// ── Inline SVG icons ────────────────────────────────────────────────────────

function ArrowLeft() {
	return (
		<svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
			<path
				d='M10 13L5 8l5-5'
				stroke='currentColor'
				strokeWidth='1.8'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

function CalendarIcon() {
	return (
		<svg
			className='cs-meta-icon'
			width='14'
			height='14'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.8'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<rect x='3' y='4' width='18' height='18' rx='2' />
			<line x1='16' y1='2' x2='16' y2='6' />
			<line x1='8' y1='2' x2='8' y2='6' />
			<line x1='3' y1='10' x2='21' y2='10' />
		</svg>
	);
}

function UserIcon() {
	return (
		<svg
			className='cs-meta-icon'
			width='14'
			height='14'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.8'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2' />
			<circle cx='12' cy='7' r='4' />
		</svg>
	);
}

function UsersIcon() {
	return (
		<svg
			className='cs-meta-icon'
			width='14'
			height='14'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.8'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
			<circle cx='9' cy='7' r='4' />
			<path d='M23 21v-2a4 4 0 00-3-3.87' />
			<path d='M16 3.13a4 4 0 010 7.75' />
		</svg>
	);
}

function ExternalIcon() {
	return (
		<svg
			width='15'
			height='15'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.8'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6' />
			<polyline points='15 3 21 3 21 9' />
			<line x1='10' y1='14' x2='21' y2='3' />
		</svg>
	);
}

function GithubIcon() {
	return (
		<svg width='15' height='15' viewBox='0 0 24 24' fill='currentColor'>
			<path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' />
		</svg>
	);
}

function FileIcon() {
	return (
		<svg
			width='15'
			height='15'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.8'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' />
			<polyline points='14 2 14 8 20 8' />
		</svg>
	);
}

function PlayIcon() {
	return (
		<svg
			width='15'
			height='15'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.8'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<circle cx='12' cy='12' r='10' />
			<polygon points='10 8 16 12 10 16 10 8' fill='currentColor' />
		</svg>
	);
}

function CertIcon() {
	return (
		<svg
			width='15'
			height='15'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.8'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<circle cx='12' cy='8' r='6' />
			<path d='M9 13.5L7 22l5-3 5 3-2-8.5' />
		</svg>
	);
}

function VideoIcon() {
	return (
		<svg
			width='15'
			height='15'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.8'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<polygon points='23 7 16 12 23 17 23 7' />
			<rect x='1' y='5' width='15' height='14' rx='2' />
		</svg>
	);
}

function PaperIcon() {
	return (
		<svg
			width='15'
			height='15'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.8'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='M4 19.5A2.5 2.5 0 016.5 17H20' />
			<path d='M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z' />
		</svg>
	);
}

function DriveIcon() {
	return (
		<svg
			width='15'
			height='15'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.8'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<polygon points='1 6 1 22 8 22 12 15 8 6 1 6' />
			<polygon points='17 6 11 6 7 22 14 22 23 6 17 6' />
			<polygon points='12 1 8 6 16 6 20 1 12 1' />
		</svg>
	);
}

const LINK_ICONS: Record<string, React.ReactNode> = {
	github: <GithubIcon />,
	file: <FileIcon />,
	play: <PlayIcon />,
	certificate: <CertIcon />,
	video: <VideoIcon />,
	paper: <PaperIcon />,
	drive: <DriveIcon />,
	external: <ExternalIcon />,
};

// ── Helper: derive embed URL for video slots ─────────────────────────────────

function getEmbedUrl(src: string): string {
	const ytMatch = src.match(
		/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
	);
	if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;

	const vmMatch = src.match(/vimeo\.com\/(\d+)/);
	if (vmMatch) return `https://player.vimeo.com/video/${vmMatch[1]}`;

	return src;
}

// ── MediaSlot component ──────────────────────────────────────────────────────

function MediaSlot({ item }: { item: MediaItem }) {
	const wrapperClass = `cs-media-slot${item.fullWidth ? ' cs-media-slot--full' : ''}`;
	let inner: React.ReactNode = null;

	if (item.type === 'image' || item.type === 'gif') {
		inner = (
			// eslint-disable-next-line @next/next/no-img-element
			<img
				src={
					item.src.startsWith('http') || item.src.startsWith('/')
						? item.src
						: `/static/images/project/${item.src}`
				}
				alt={item.caption ?? ''}
				className='cs-media-img'
				loading='lazy'
			/>
		);
	} else if (item.type === 'video') {
		const embedUrl = getEmbedUrl(item.src);
		inner = (
			<iframe
				className='cs-media-iframe'
				src={embedUrl}
				allow='autoplay; fullscreen; picture-in-picture'
				allowFullScreen
				title={item.caption ?? 'Video'}
			/>
		);
	} else if (item.type === 'demo') {
		inner = (
			<iframe
				className='cs-media-iframe'
				src={item.src}
				title={item.caption ?? 'Demo'}
			/>
		);
	}

	return (
		<div className={item.fullWidth ? 'cs-media-slot--full' : undefined}>
			<div className={wrapperClass}>{inner}</div>
			{item.type === 'demo' && (
				<div style={{ marginTop: 8 }}>
					<a
						href={item.src}
						target='_blank'
						rel='noopener noreferrer'
						style={{ color: '#4a7aff', fontSize: 13 }}
					>
						Open in new tab ↗
					</a>
				</div>
			)}
			{item.caption && <p className='cs-media-caption'>{item.caption}</p>}
		</div>
	);
}

// ── Main component ───────────────────────────────────────────────────────────

interface Props {
	data: CaseStudyData;
}

export default function CaseStudyPage({ data }: Props) {
	// GSAP Scroll Reveal and Count-up Animations
	useEffect(() => {
		const ctx = gsap.context(() => {
			// 1. Hero Section Entrance Animation (immediate on mount)
			const hero = document.querySelector('.cs-hero');
			if (hero) {
				const title = hero.querySelector('.cs-title');
				const eyebrow = hero.querySelector('.cs-eyebrow');
				const meta = hero.querySelector('.cs-meta-row');
				const tags = hero.querySelectorAll('.cs-tag');

				const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

				tl.from(eyebrow, { opacity: 0, y: 15, duration: 0.6 })
					.from(title, { opacity: 0, y: 20, duration: 0.8 }, '-=0.4')
					.from(meta, { opacity: 0, y: 15, duration: 0.6 }, '-=0.5')
					.from(
						tags,
						{ opacity: 0, y: 15, duration: 0.6, stagger: 0.05 },
						'-=0.4',
					);
			}

			// 2. Reveal all general sections (.cs-section and .cs-tldr)
			const sections = document.querySelectorAll(
				'.cs-section:not(.cs-metrics-section):not(.cs-media-section):not(.cs-links-section), .cs-tldr',
			);
			sections.forEach((sec) => {
				gsap.fromTo(
					sec,
					{ opacity: 0, y: 35 },
					{
						opacity: 1,
						y: 0,
						duration: 0.8,
						ease: 'power3.out',
						scrollTrigger: {
							trigger: sec,
							start: 'top 88%',
							toggleActions: 'play none none none',
						},
					},
				);
			});

			// 3. Staggered Metric Cards & Count-up Animation
			const metricsSection = document.querySelector('.cs-metrics-section');
			if (metricsSection) {
				const cards = metricsSection.querySelectorAll('.cs-metric-card');
				const heading = metricsSection.querySelector('.cs-heading');
				const footnote = metricsSection.querySelector(
					'.cs-confidential-footnote',
				);

				// Animate metrics section heading first
				if (heading) {
					gsap.from(heading, {
						opacity: 0,
						y: 20,
						duration: 0.6,
						scrollTrigger: {
							trigger: heading,
							start: 'top 88%',
							toggleActions: 'play none none none',
						},
					});
				}

				// Animate cards with stagger and trigger their count-ups
				if (cards.length > 0) {
					gsap.from(cards, {
						opacity: 0,
						y: 35,
						duration: 0.8,
						stagger: 0.1,
						ease: 'power3.out',
						scrollTrigger: {
							trigger: cards[0],
							start: 'top 85%',
							toggleActions: 'play none none none',
							onEnter: () => {
								// Trigger counts once they begin to appear
								cards.forEach((card) => {
									const countEl =
										card.querySelector<HTMLElement>('[data-count-up]');
									if (!countEl) return;
									const target = countEl.dataset.countUp ?? '';
									const numericMatch = target.match(/[\d.]+/);
									if (!numericMatch) return;
									const end = Number.parseFloat(numericMatch[0]);
									const prefix = target.slice(0, numericMatch.index);
									const suffix = target.slice(
										(numericMatch.index ?? 0) + numericMatch[0].length,
									);

									const obj = { val: 0 };
									gsap.to(obj, {
										val: end,
										duration: 1.5,
										ease: 'power2.out',
										onUpdate: () => {
											const current = Math.round(obj.val * 10) / 10;
											countEl.textContent = `${prefix}${current % 1 === 0 ? Math.round(current) : current}${suffix}`;
										},
									});
								});
							},
						},
					});
				}

				if (footnote) {
					gsap.from(footnote, {
						opacity: 0,
						duration: 0.6,
						scrollTrigger: {
							trigger: footnote,
							start: 'top 92%',
							toggleActions: 'play none none none',
						},
					});
				}
			}

			// 4. Staggered Media Grid Reveal
			const mediaSection = document.querySelector('.cs-media-section');
			if (mediaSection) {
				const slots = mediaSection.querySelectorAll(
					'.cs-media-slot, .cs-media-caption',
				);
				if (slots.length > 0) {
					gsap.from(slots, {
						opacity: 0,
						y: 40,
						duration: 1,
						stagger: 0.15,
						ease: 'power3.out',
						scrollTrigger: {
							trigger: mediaSection,
							start: 'top 85%',
							toggleActions: 'play none none none',
						},
					});
				}
			}

			// 5. Staggered Key Decision Bullet items
			const decisionsWrap = document.querySelector('.cs-key-decisions-wrap');
			if (decisionsWrap) {
				const bullets = decisionsWrap.querySelectorAll(
					'.cs-decision-bullet-item',
				);
				if (bullets.length > 0) {
					gsap.from(bullets, {
						opacity: 0,
						x: -20,
						duration: 0.7,
						stagger: 0.12,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: decisionsWrap,
							start: 'top 88%',
							toggleActions: 'play none none none',
						},
					});
				}
			}

			// 6. Go Deeper Links row stagger
			const linksSection = document.querySelector('.cs-links-section');
			if (linksSection) {
				const heading = linksSection.querySelector('.cs-heading');
				const linkBtns = linksSection.querySelectorAll('.cs-link-btn');

				if (heading) {
					gsap.from(heading, {
						opacity: 0,
						y: 15,
						duration: 0.5,
						scrollTrigger: {
							trigger: heading,
							start: 'top 90%',
							toggleActions: 'play none none none',
						},
					});
				}

				if (linkBtns.length > 0) {
					gsap.from(linkBtns, {
						opacity: 0,
						y: 15,
						duration: 0.6,
						stagger: 0.08,
						ease: 'power3.out',
						scrollTrigger: {
							trigger: linksSection,
							start: 'top 88%',
							toggleActions: 'play none none none',
						},
					});
				}
			}

			// 7. Bottom Navigation fade in
			const bottomNav = document.querySelector('.cs-bottom-nav');
			if (bottomNav) {
				gsap.from(bottomNav, {
					opacity: 0,
					y: 20,
					duration: 0.8,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: bottomNav,
						start: 'top 95%',
						toggleActions: 'play none none none',
					},
				});
			}
		}, document.body);

		return () => ctx.revert();
	}, []);

	// ─────────────────────────────────────────────────────────────────
	// Derived states
	const isEmpty = (v: string | undefined | null) => !v || v.trim() === '';

	// Only keep media slots that actually have a source path
	const media = data.media
		? data.media.filter((m) => m.src && m.src.trim() !== '')
		: [];

	// Only keep metrics that have actual values
	const metrics = data.metrics
		? data.metrics.filter((m) => m.value && m.value.trim() !== '')
		: [];

	// Only keep links that have a label and URL
	const links = data.links
		? data.links.filter(
				(l) => l.label && l.label.trim() !== '' && l.url && l.url.trim() !== '',
			)
		: [];

	const hasLinks = links.length > 0;
	const hasMetrics = metrics.length > 0;
	// Split roleAndApproach into "What I owned" and "Tradeoffs I navigated"
	let ownedPart = data.roleAndApproach || '';
	let tradeoffsPart = '';

	const tradeoffsIndex = ownedPart.indexOf('Tradeoffs I navigated:');
	if (tradeoffsIndex !== -1) {
		tradeoffsPart = ownedPart.slice(tradeoffsIndex).trim();
		ownedPart = ownedPart.slice(0, tradeoffsIndex).trim();
	}

	// Also strip any "Key decisions:" block from the text if it was generated there
	const keyDecisionsIndex = ownedPart.indexOf('Key decisions:');
	if (keyDecisionsIndex !== -1) {
		ownedPart = ownedPart.slice(0, keyDecisionsIndex).trim();
	}

	const keyDecisions = data.keyDecisions
		? data.keyDecisions.filter((d) => d && d.trim() !== '')
		: [];

	const tags = data.tags && data.tags.length > 0 ? data.tags : [];

	return (
		<div className='cs-page'>
			{/* ── TOP BAR ─────────────────────────────────────────── */}
			<nav className='cs-topbar'>
				<div className='cs-topbar-inner'>
					<Link href='/work' className='cs-back-btn'>
						<span className='cs-back-arrow'>
							<ArrowLeft />
						</span>
						Back to work
					</Link>
				</div>
			</nav>

			<div className='cs-content'>
				{/* ── SECTION 1: Hero ───────────────────────────────── */}
				<header className='cs-hero'>
					<p className='cs-eyebrow'>
						{isEmpty(data.company) ? (
							<span className='cs-placeholder'>[Company] · [Organization]</span>
						) : (
							<>
								{data.company} · {data.organization}
							</>
						)}
					</p>

					<h1 className='cs-title'>
						{isEmpty(data.title) ? (
							<span className='cs-placeholder'>[Your project title]</span>
						) : (
							data.title
						)}
					</h1>

					<div className='cs-meta-row'>
						{!isEmpty(data.dateRange) && (
							<span className='cs-meta-item'>
								<CalendarIcon />
								{data.dateRange}
							</span>
						)}
						{!isEmpty(data.role) && (
							<span className='cs-meta-item'>
								<UserIcon />
								{data.role}
							</span>
						)}
						{!isEmpty(data.teamSize) && (
							<span className='cs-meta-item'>
								<UsersIcon />
								{data.teamSize}
							</span>
						)}
					</div>

					{tags.length > 0 && (
						<div className='cs-tag-row'>
							{tags.map((tag, i) => (
								<span key={i} className='cs-tag'>
									{tag}
								</span>
							))}
						</div>
					)}
				</header>

				{/* ── SECTION 2: TL;DR ──────────────────────────────── */}
				{!isEmpty(data.tldr) && (
					<div className='cs-tldr cs-reveal'>
						<p className='cs-body' style={{ whiteSpace: 'pre-line' }}>
							{data.tldr}
						</p>
					</div>
				)}

				{/* ── SECTION 3: My role and approach ──────────────────── */}
				{!isEmpty(data.roleAndApproach) && (
					<section className='cs-section cs-reveal cs-role-section'>
						<h2 className='cs-heading'>My role and approach</h2>

						{/* What I owned */}
						{!isEmpty(ownedPart) && (
							<p
								className='cs-body cs-owned-text'
								style={{ whiteSpace: 'pre-line', marginBottom: 24 }}
							>
								{ownedPart}
							</p>
						)}

						{/* Bulleted list of Key Decisions */}
						{keyDecisions.length > 0 && (
							<div
								className='cs-key-decisions-wrap'
								style={{ marginBottom: 24 }}
							>
								<h3 className='cs-decision-label'>Key decisions</h3>
								<ul className='cs-decision-bullets'>
									{keyDecisions.map((decision, i) => (
										<li
											key={i}
											className='cs-decision-bullet-item'
											style={{ whiteSpace: 'pre-line' }}
										>
											{decision}
										</li>
									))}
								</ul>
							</div>
						)}

						{/* Tradeoffs I navigated */}
						{!isEmpty(tradeoffsPart) && (
							<p
								className='cs-body cs-tradeoffs-text'
								style={{ whiteSpace: 'pre-line' }}
							>
								{tradeoffsPart}
							</p>
						)}
					</section>
				)}

				{/* ── SECTION 4: What was built ─────────────────────── */}
				{!isEmpty(data.whatWasBuilt) && (
					<section className='cs-section cs-reveal'>
						<h2 className='cs-heading'>What was built</h2>
						<p className='cs-body' style={{ whiteSpace: 'pre-line' }}>
							{data.whatWasBuilt}
						</p>

						{data.isConfidential && (
							/* Confidential NDA card (only shows here if media is blocked) */
							<div className='cs-confidential-card'>
								<div className='cs-confidential-label'>CONFIDENTIAL</div>
								<p className='cs-confidential-note'>
									{isEmpty(data.confidentialNote)
										? 'Details withheld under NDA. High-level approach and relative impact shared with permission.'
										: data.confidentialNote}
								</p>
							</div>
						)}
					</section>
				)}

				{/* ── SECTION 5: Impact and outcomes (Metrics Grid) ───────────────── */}
				{hasMetrics && (
					<section className='cs-section cs-metrics-section'>
						<h2 className='cs-heading'>Impact and outcomes</h2>
						<div className='cs-metrics-grid'>
							{metrics.map((m, i) => (
								<div key={i} className='cs-metric-card'>
									<div className='cs-metric-value' data-count-up={m.value}>
										{m.value}
									</div>
									<div className='cs-metric-label'>{m.label}</div>
								</div>
							))}
						</div>
						{data.isConfidential && (
							<p className='cs-confidential-footnote'>
								Metrics shown as relative values due to confidentiality.
							</p>
						)}
					</section>
				)}

				{/* ── SECTION 6: Media Grid ─────────────────────── */}
				{!data.isConfidential && media.length > 0 && (
					<section className='cs-section cs-media-section'>
						<div className='cs-media-grid' style={{ marginTop: 0 }}>
							{media.map((item, i) => (
								<MediaSlot key={i} item={item} />
							))}
						</div>
					</section>
				)}

				{/* ── SECTION 7: Impact context (Narrative text) ───────────────── */}
				{!isEmpty(data.impactContext) && (
					<section className='cs-section cs-reveal'>
						<p className='cs-body' style={{ whiteSpace: 'pre-line' }}>
							{data.impactContext}
						</p>
					</section>
				)}

				{/* ── SECTION 8: Reflection (optional) ─────────────── */}
				{data.reflection !== null &&
					data.reflection !== undefined &&
					!isEmpty(data.reflection) && (
						<section className='cs-section cs-reveal'>
							<h2 className='cs-heading'>Reflection</h2>
							<div className='cs-reflection'>
								<p className='cs-body' style={{ whiteSpace: 'pre-line' }}>
									{data.reflection}
								</p>
							</div>
						</section>
					)}

				{/* ── SECTION 9: Go deeper ──────────────────────────── */}
				{hasLinks && (
					<section className='cs-section cs-links-section'>
						<h2 className='cs-heading'>Go deeper</h2>
						<div className='cs-links-row'>
							{links.map((link, i) => (
								<a
									key={i}
									href={link.url}
									target='_blank'
									rel='noopener noreferrer'
									className='cs-link-btn'
								>
									{LINK_ICONS[link.icon] ?? <ExternalIcon />}
									{link.label}
								</a>
							))}
						</div>
					</section>
				)}

				{/* ── BOTTOM NAV ────────────────────────────────────── */}
				<div className='cs-bottom-nav'>
					{data.prevProject ? (
						<Link
							href={`/work/${data.prevProject.slug}`}
							className='cs-nav-link cs-nav-link--prev'
						>
							<span>← Previous project</span>
							<span className='cs-nav-link-title'>
								{data.prevProject.title}
							</span>
						</Link>
					) : (
						<div className='cs-nav-empty' />
					)}

					{data.nextProject ? (
						<Link
							href={`/work/${data.nextProject.slug}`}
							className='cs-nav-link cs-nav-link--next'
						>
							<span>Next project →</span>
							<span className='cs-nav-link-title'>
								{data.nextProject.title}
							</span>
						</Link>
					) : (
						<div className='cs-nav-empty' />
					)}
				</div>
			</div>
		</div>
	);
}
