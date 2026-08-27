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
import {
	type Highlight,
	type HighlightTrack,
	highlightGroups,
	workHighlights,
} from './workHighlights';

gsap.registerPlugin(ScrollTrigger);

/** Every link out of this section tells the case study where the reader came from. */
const FROM_HOME = '?from=home';

export interface Badge {
	label: string;
	colorClass: string;
}

interface WorkHighlightsProps {
	/** Products on each track the home page is not already showing. */
	moreCounts: Partial<Record<HighlightTrack, number>>;
	/** Status badge per slug, read off app/work/constants.ts upstream. */
	badges: Record<string, Badge | null>;
}

function Features({ features }: { features: string[] }) {
	// Two interleaved columns, so list order reads across rather than down.
	return (
		<div className='wh-features'>
			<ul className='wh-features-col'>
				{features
					.filter((_, i) => i % 2 === 0)
					.map((feature) => (
						<li key={feature}>{feature}</li>
					))}
			</ul>
			<ul className='wh-features-col'>
				{features
					.filter((_, i) => i % 2 === 1)
					.map((feature) => (
						<li key={feature}>{feature}</li>
					))}
			</ul>
		</div>
	);
}

/**
 * A /work tile, carrying everything the old detail panel held.
 *
 * The numbers stay on the face of the card — they are the most valuable
 * thing on it and should never be a click away. Features and who's
 * interested sit behind one disclosure that opens the card in place, so
 * eleven programmes fit on the page without a second reading surface.
 */
function HighlightCard({
	highlight,
	badge,
}: {
	highlight: Highlight;
	badge: Badge | null;
}) {
	const [open, setOpen] = useState(false);
	const detailsId = useId();
	const cardRef = useRef<HTMLLIElement>(null);
	const counted = useRef(false);

	const href = `/work/${highlight.slug}${FROM_HOME}`;
	const stacked = highlight.panelItems.length > 1;

	// Count-ups run once, when the card first arrives.
	useEffect(() => {
		const card = cardRef.current;
		if (!card) return;

		const nodes = card.querySelectorAll<HTMLElement>('[data-countup]');
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
			trigger: card,
			start: 'top 88%',
			once: true,
			onEnter: run,
		});
		return () => trigger.kill();
	}, []);

	return (
		<li className='work-tile wh-card' ref={cardRef}>
			<div className='work-tile-wrap'>
				<div className='work-tile-link'>
					<div className='work-tile-image-col'>
						<div className='work-tile-image'>
							<Link
								href={href}
								className='wh-card-media'
								aria-hidden='true'
								tabIndex={-1}
							>
								{highlight.media.kind === 'image' ? (
									<Image
										src={highlight.media.src}
										alt=''
										fill
										className='work-tile-img'
										sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
									/>
								) : (
									/* No product shot exists for this one, so the number is
									   the picture rather than a filler image. */
									<span className='wh-card-number'>
										{highlight.metrics[0].value}
									</span>
								)}
							</Link>
						</div>
					</div>

					<div className='work-tile-title-col'>
						{badge && (
							<span className={`work-status-badge ${badge.colorClass}`}>
								{badge.label}
							</span>
						)}
						<h4 className='work-tile-title-clamp'>
							<Link href={href} className='wh-card-title-link'>
								{highlight.title}
							</Link>
						</h4>
						<p className='work-tile-outcome'>{highlight.headline}</p>
					</div>

					<dl className='wh-card-metrics'>
						{highlight.metrics.map((metric) => (
							<div className='wh-card-metric' key={metric.label}>
								<dt className='wh-card-metric-value'>
									{metric.countUp === undefined ? (
										metric.value
									) : (
										<span data-countup={metric.countUp}>{metric.value}</span>
									)}
								</dt>
								<dd className='wh-card-metric-label'>{metric.label}</dd>
							</div>
						))}
					</dl>

					<div className='work-tile-meta-col'>
						<div className='work-tile-stripe' />
						<div className='work-tile-info-col'>
							<p>{highlight.eyebrow}</p>
							{highlight.proof && (
								<a
									href={highlight.proof.href}
									target='_blank'
									rel='noopener noreferrer'
									className='work-demo-marker wh-card-proof'
								>
									{highlight.proof.text} ↗
								</a>
							)}
						</div>
					</div>

					<div className='wh-card-foot'>
						<button
							type='button'
							className='wh-card-toggle'
							aria-expanded={open}
							aria-controls={detailsId}
							onClick={() => setOpen((v) => !v)}
						>
							{open ? 'Hide details' : 'Details'}
							<span aria-hidden='true' data-open={open}>
								⌄
							</span>
						</button>
						<Link href={href} className='wh-card-case'>
							Read the case study →
						</Link>
					</div>

					<div className='wh-card-details' id={detailsId} data-open={open}>
						<div className='wh-card-details-inner'>
							<h5 className='wh-card-sub'>What it does</h5>
							<Features features={highlight.features} />

							<h5 className='wh-card-sub'>
								{highlight.panelLabel ?? "Who's interested?"}
							</h5>
							<ul
								className={`wh-panel-items${stacked ? ' wh-panel-items--stacked' : ''}`}
							>
								{highlight.panelItems.map((item) => (
									<li key={item.text}>
										{item.href ? (
											<a
												href={item.href}
												target='_blank'
												rel='noopener noreferrer'
											>
												{item.text}
											</a>
										) : (
											item.text
										)}
									</li>
								))}
							</ul>

							<p className='wh-card-role'>
								{highlight.role} · {highlight.status} · {highlight.years}
							</p>
						</div>
					</div>
				</div>
			</div>
		</li>
	);
}

export default function WorkHighlights({
	moreCounts,
	badges,
}: WorkHighlightsProps) {
	const rootRef = useRef<HTMLElement>(null);

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
					<p className='wh-subhead wh-reveal'>
						{workHighlights.length} programs in production or daily use.
					</p>
				</header>

				{highlightGroups.map((group) => {
					const tiles = workHighlights.filter((h) => h.track === group.track);
					return (
						<section className='wh-group' key={group.track}>
							<h3 className='wh-group-line wh-reveal'>{group.label}</h3>

							<div className='work-section-divider wh-reveal'>
								<span className='work-section-divider-text'>CASE STUDIES</span>
								<div className='work-section-divider-line' />
							</div>

							<ul className='work-grid-items work-grid-3'>
								{tiles.map((highlight) => (
									<HighlightCard
										key={highlight.slug}
										highlight={highlight}
										badge={badges[highlight.slug] ?? null}
									/>
								))}
							</ul>

							<div className='wh-more-row wh-reveal'>
								<Magnetic strength={15}>
									<Link href={group.more.href} className='work-filter-btn'>
										<span className='work-filter-btn-fill' />
										<span className='work-filter-btn-text'>
											+{moreCounts[group.track] ?? 0} more →
										</span>
									</Link>
								</Magnetic>
							</div>
						</section>
					);
				})}

				<p className='wh-all wh-reveal'>
					<Magnetic strength={12}>
						<Link href='/work' className='wh-all-link'>
							See all work →
						</Link>
					</Magnetic>
				</p>
			</div>
		</section>
	);
}
