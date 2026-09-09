'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/dist/lenis-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import '../../work/work.css';
import Magnetic from '../Magnetic';
import './work-highlights.css';
import type { HighlightTrack } from './workHighlights';

gsap.registerPlugin(ScrollTrigger);

/** Every link out of this section tells the case study where the reader came from. */
const FROM_HOME = '?from=home';

interface Badge {
	label: string;
	colorClass: string;
}

/**
 * One home card. Every field is the work page's own — the work item in
 * app/work/constants.ts and its case study in data/case-studies-v2.json —
 * assembled in works.tsx at build time. Nothing here is typed by hand.
 */
export interface HighlightCardData {
	/** Case study at /work/<slug>. */
	slug: string;
	/** The /work card's title. */
	title: string;
	/** The /work card's one-line outcome. */
	outcome: string;
	/** The /work card's meta row: company · domain, and the demo it links. */
	company: string;
	domain: string;
	demoUrl: string;
	image: string;
	color?: string;
	badge: Badge | null;
	/** The first few numbers from the case study's own metrics block. */
	metrics: {
		value: string;
		sub?: string;
		label: string;
		/** Set only when `value` is a bare integer; animates 0 → value once. */
		countUp?: number;
	}[];
	/** The case study's summary — Problem, What I did, Result. */
	summary: { lead: string; text: string }[];
	role: string;
	stage: string;
}

export interface HighlightGroupData {
	track: HighlightTrack;
	label: string;
	moreHref: string;
	/** Products on the track the home page is not already showing. */
	moreCount: number;
	cards: HighlightCardData[];
}

interface WorkHighlightsProps {
	groups: HighlightGroupData[];
	/** The /work "All" pill's label. */
	allLabel: string;
}

type Pick = 'all' | HighlightTrack;

/**
 * A /work tile with the case study's numbers on its face and its summary
 * behind one disclosure, so twelve pieces of work fit on the page without
 * a second reading surface. The numbers are the most valuable thing on
 * the card and are never a click away.
 */
function HighlightCard({ card }: { card: HighlightCardData }) {
	const [open, setOpen] = useState(false);
	const detailsId = useId();
	const cardRef = useRef<HTMLLIElement>(null);
	const counted = useRef(false);

	const href = `/work/${card.slug}${FROM_HOME}`;

	// Count-ups run once, when the card first arrives.
	useEffect(() => {
		const el = cardRef.current;
		if (!el) return;

		const nodes = el.querySelectorAll<HTMLElement>('[data-countup]');
		if (nodes.length === 0) return;

		const reduced = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;

		const run = () => {
			if (counted.current) return;
			counted.current = true;
			for (const node of nodes) {
				const target = Number(node.dataset.countup);
				if (!Number.isFinite(target)) continue;
				if (reduced) {
					node.textContent = String(target);
					continue;
				}
				const proxy = { value: 0 };
				node.textContent = '0';
				gsap.to(proxy, {
					value: target,
					duration: 0.6,
					ease: 'power2.out',
					onUpdate: () => {
						node.textContent = String(Math.round(proxy.value));
					},
				});
			}
		};

		if (reduced) {
			run();
			return;
		}

		const trigger = ScrollTrigger.create({
			trigger: el,
			start: 'top 88%',
			once: true,
			onEnter: run,
		});
		return () => trigger.kill();
	}, []);

	return (
		<li className='work-tile wh-card' ref={cardRef} data-open={open}>
			<div className='work-tile-wrap'>
				<div className='work-tile-link'>
					<div className='work-tile-image-col'>
						<div className='work-tile-image'>
							{/* The same image the /work grid renders for this item, off the
							    same field, so the two grids cannot show different things. */}
							<div
								className='work-tile-image-bg'
								style={{ backgroundColor: card.color }}
							/>
							<Link
								href={href}
								className='wh-card-media'
								aria-hidden='true'
								tabIndex={-1}
							>
								<Image
									src={`/static/images/project/${card.image}`}
									alt=''
									fill
									className='work-tile-img'
									sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
								/>
							</Link>
						</div>
					</div>

					<div className='work-tile-title-col'>
						{/* Status on the left, the disclosure on the right, in the same
						    pill and the same colour family as the status — so a card in
						    production opens on green, one in testing on amber. */}
						<div className='wh-card-status-row'>
							{card.badge && (
								<span className={`work-status-badge ${card.badge.colorClass}`}>
									{card.badge.label}
								</span>
							)}
							<button
								type='button'
								className={`work-status-badge wh-card-toggle ${card.badge?.colorClass ?? 'status-muted'}`}
								aria-expanded={open}
								aria-controls={detailsId}
								onClick={() => setOpen((v) => !v)}
							>
								<span className='wh-card-toggle-label'>
									{open ? 'Hide details' : 'Details'}
								</span>
								{/* A single downward arrow beside the label; it points up
								    while the card is open. */}
								<span
									className='wh-card-chevron'
									aria-hidden='true'
									data-open={open}
								>
									<svg
										aria-hidden='true'
										focusable='false'
										viewBox='0 0 12 12'
										width='1em'
										height='1em'
										fill='none'
										stroke='currentColor'
										strokeWidth='1.6'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<path d='M6 1.5v9' />
										<path d='M2.5 7l3.5 3.5L9.5 7' />
									</svg>
								</span>
							</button>
						</div>
						<h4 className='work-tile-title-clamp'>
							<Link href={href} className='wh-card-title-link'>
								{card.title}
							</Link>
						</h4>
						<p className='work-tile-outcome'>{card.outcome}</p>
					</div>

					<dl className='wh-card-metrics'>
						{card.metrics.map((metric) => (
							<div className='wh-card-metric' key={metric.label}>
								<dt className='wh-card-metric-value'>
									{metric.countUp === undefined ? (
										metric.value
									) : (
										<span data-countup={metric.countUp}>{metric.value}</span>
									)}
									{metric.sub && (
										<span className='wh-card-metric-sub'> {metric.sub}</span>
									)}
								</dt>
								<dd className='wh-card-metric-label'>{metric.label}</dd>
							</div>
						))}
					</dl>

					{/* The same meta row as the /work card — company · domain on the
					    left, the Demo marker on the right, one line — with the case
					    study link between them. The marker links the demo the work
					    item itself carries. */}
					<div className='work-tile-meta-col'>
						<div className='work-tile-stripe wh-card-stripe' />
						<div className='work-tile-info-col wh-card-meta-row'>
							<p>
								{card.company} &middot; {card.domain}
							</p>
							<Link href={href} className='wh-card-case'>
								Case study →
							</Link>
							<a
								className='work-demo-marker'
								href={card.demoUrl}
								target='_blank'
								rel='noopener noreferrer'
							>
								Demo ↗
							</a>
						</div>
					</div>

					{/* The case study's own summary, verbatim. */}
					<div className='wh-card-details' id={detailsId} data-open={open}>
						<div className='wh-card-details-inner'>
							{card.summary.map((para) => (
								<p className='wh-card-summary' key={para.lead}>
									<strong>{para.lead}</strong> {para.text}
								</p>
							))}
							<p className='wh-card-role'>
								{card.role} · {card.stage}
							</p>
						</div>
					</div>
				</div>
			</div>
		</li>
	);
}

export default function WorkHighlights({
	groups,
	allLabel,
}: WorkHighlightsProps) {
	const rootRef = useRef<HTMLElement>(null);

	// The same three pills /work opens with, in the same order, doing the
	// same thing: All shows both groups, a track shows its own.
	const [pick, setPick] = useState<Pick>('all');
	const pills: { key: Pick; label: string }[] = [
		{ key: 'all', label: allLabel },
		...groups.map((g) => ({ key: g.track, label: g.label })),
	];
	const shown = groups.filter((g) => pick === 'all' || g.track === pick);

	// Switching pills moves the remaining group up the page; the reveal
	// triggers were measured for where it used to be, so re-measure once
	// React has committed the new layout.
	const choose = (next: Pick) => {
		setPick(next);
		requestAnimationFrame(() => ScrollTrigger.refresh());
	};

	const lenis = useLenis();

	// The case study's "Back to home" points at /#work. The browser's own hash
	// jump happens before fonts and images settle, which can leave the reader
	// somewhere else entirely — so land it again once Lenis is running.
	useEffect(() => {
		if (!lenis || window.location.hash !== '#work') return;
		const id = window.setTimeout(() => {
			lenis.scrollTo('#work', { immediate: true });
		}, 0);
		return () => window.clearTimeout(id);
	}, [lenis]);

	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const ctx = gsap.context(() => {
			for (const block of gsap.utils.toArray<HTMLElement>('.wh-reveal')) {
				gsap.from(block, {
					y: 24,
					opacity: 0,
					duration: 0.6,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: block,
						start: 'top 88%',
						toggleActions: 'play none none reset',
					},
				});
			}
		}, root);

		return () => ctx.revert();
	}, []);

	return (
		<section className='work-highlights' ref={rootRef} id='work'>
			<div className='wh-shell'>
				<header className='wh-head'>
					<h2 className='wh-title wh-reveal'>Selected work.</h2>
					<div className='work-filters-toggle-row wh-pills wh-reveal'>
						{pills.map((pill) => (
							<Magnetic key={pill.key} strength={15}>
								<button
									type='button'
									className={`work-filter-btn${pick === pill.key ? ' active' : ''}`}
									onClick={() => choose(pill.key)}
									aria-pressed={pick === pill.key}
								>
									<span className='work-filter-btn-fill' />
									<span className='work-filter-btn-text'>{pill.label}</span>
								</button>
							</Magnetic>
						))}
					</div>
				</header>

				{shown.map((group) => (
					<section className='wh-group' key={group.track}>
						<h3 className='wh-group-line wh-reveal'>{group.label}</h3>

						<div className='work-section-divider wh-reveal'>
							<span className='work-section-divider-text'>CASE STUDIES</span>
							<div className='work-section-divider-line' />
						</div>

						<ul className='work-grid-items work-grid-3'>
							{group.cards.map((card) => (
								<HighlightCard key={card.slug} card={card} />
							))}

							{/* The rest of the track, as a tile rather than a button
							    under the grid — it belongs to the same row of work.
							    Built from /work's own tile parts, so it inherits the
							    same hover zoom rather than imitating it. */}
							<li className='work-tile wh-more-tile'>
								<div className='work-tile-wrap'>
									<Link
										href={group.moreHref}
										className='work-tile-link wh-more-card'
									>
										<div className='work-tile-image-col'>
											<div className='work-tile-image'>
												<div className='work-tile-image-bg wh-more-bg' />
												<span className='work-tile-icon-display wh-more-display'>
													<span className='wh-more-count'>
														+{group.moreCount}
													</span>
													<span className='wh-more-word'>more</span>
												</span>
											</div>
										</div>
										<div className='work-tile-title-col'>
											<h4 className='work-tile-title-clamp'>
												<span>{group.label}</span>
											</h4>
											<p className='work-tile-outcome'>
												The rest of the track, on the work page.
											</p>
										</div>
										<div className='work-tile-meta-col'>
											<div className='work-tile-stripe' />
											<div className='work-tile-info-col'>
												<p>See the rest →</p>
											</div>
										</div>
									</Link>
								</div>
							</li>
						</ul>
					</section>
				))}

				{/* This section is a slice of the work page; the link lands on the
				    unfiltered row it was sliced from. /work itself opens on
				    Silicon & systems, so All is named explicitly. */}
				<p className='wh-all wh-reveal'>
					<Magnetic strength={12}>
						<Link href='/work?filter=all' className='wh-all-link'>
							See all work →
						</Link>
					</Magnetic>
				</p>
			</div>
		</section>
	);
}
