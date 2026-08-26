'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import {
	type MouseEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import Magnetic from '../Magnetic';
import './work-highlights.css';
import {
	type Highlight,
	type HighlightTrack,
	highlightGroups,
	workHighlights,
} from './workHighlights';

gsap.registerPlugin(ScrollTrigger);

interface WorkHighlightsProps {
	/** Products on each track the home page is not already showing. */
	moreCounts: Partial<Record<HighlightTrack, number>>;
	/** Both numbers are counted from app/work/constants.ts, never typed. */
	totals: { caseStudies: number; projects: number };
}

/**
 * Mobile stacks the index and its panels into one accordion, which means a
 * row and its panel have to be adjacent. They live in different containers,
 * so the order is assigned here and applied only under the mobile query.
 */
function buildPlan() {
	let cursor = 1;
	const panelOrder: number[] = [];

	const groups = highlightGroups.map((group) => {
		const eyebrowOrder = cursor++;
		const rows = workHighlights
			.map((highlight, index) => ({ highlight, index }))
			.filter((entry) => entry.highlight.track === group.track)
			.map((entry) => {
				const rowOrder = cursor++;
				panelOrder[entry.index] = cursor++;
				return { ...entry, rowOrder };
			});
		const moreOrder = group.more ? cursor++ : undefined;
		return { group, eyebrowOrder, rows, moreOrder };
	});

	return { groups, panelOrder };
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

function Panel({
	highlight,
	index,
	isActive,
	order,
	panelRef,
}: {
	highlight: Highlight;
	index: number;
	isActive: boolean;
	order: number;
	panelRef: (el: HTMLElement | null) => void;
}) {
	const href = `/work/${highlight.slug}`;
	const headingId = `wh-headline-${highlight.slug}`;
	const linked = highlight.panelItems.some((item) => item.href);

	return (
		<article
			ref={panelRef}
			id={`wh-panel-${highlight.slug}`}
			className='wh-panel'
			style={{ order }}
			data-active={isActive}
			aria-hidden={!isActive}
			inert={!isActive}
			aria-labelledby={headingId}
		>
			<div className='wh-panel-inner'>
				<div className='wh-media'>
					<Link href={href} className='wh-media-link'>
						{highlight.media.kind === 'image' ? (
							<Image
								src={highlight.media.src}
								alt={highlight.media.alt}
								fill
								className='wh-media-img'
								sizes='(max-width: 1023px) 100vw, 50vw'
								priority={index === 0}
							/>
						) : (
							/* No product shot exists for this one, so the number is
							   the picture rather than a filler image. */
							<span className='wh-media-number'>
								{highlight.metrics[0].value}
							</span>
						)}
					</Link>
				</div>

				<div className='wh-panel-body'>
					<h3 id={headingId} className='wh-headline'>
						<Link href={href}>{highlight.headline}</Link>
					</h3>
					<p className='wh-sowhat'>{highlight.soWhat}</p>

					<dl className='wh-metrics'>
						{highlight.metrics.map((metric) => (
							<div className='wh-metric' key={metric.label}>
								<dt className='wh-metric-value'>
									{metric.countUp === undefined ? (
										metric.value
									) : (
										<span data-countup={metric.countUp}>{metric.value}</span>
									)}
								</dt>
								<dd className='wh-metric-label'>{metric.label}</dd>
							</div>
						))}
					</dl>

					<div className='wh-divider' />

					<Features features={highlight.features} />

					<div className='wh-panel-list'>
						<h4>{highlight.panelLabel ?? "Who's interested?"}</h4>
						<ul
							className={`wh-panel-items${linked ? ' wh-panel-items--stacked' : ''}`}
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
					</div>

					<p className='wh-meta'>
						{highlight.role} · {highlight.status} · {highlight.years}
					</p>

					<p className='wh-panel-links'>
						<Magnetic strength={12}>
							<Link href={href} className='wh-case-link'>
								Read the case study →
							</Link>
						</Magnetic>
						{highlight.proof && (
							<a
								href={highlight.proof.href}
								target='_blank'
								rel='noopener noreferrer'
								className='wh-proof-link'
							>
								{highlight.proof.text} ↗
							</a>
						)}
					</p>
				</div>
			</div>
		</article>
	);
}

export default function WorkHighlights({
	moreCounts,
	totals,
}: WorkHighlightsProps) {
	const { groups, panelOrder } = buildPlan();

	const [active, setActive] = useState(0);

	const rootRef = useRef<HTMLElement>(null);
	const navRef = useRef<HTMLElement>(null);
	const ruleRef = useRef<HTMLSpanElement>(null);
	const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);
	const panelRefs = useRef<(HTMLElement | null)[]>([]);

	const activeRef = useRef(0);
	const prevActive = useRef<number | null>(null);
	const counted = useRef(new Set<string>());
	const hoverTimer = useRef<number | null>(null);
	const finePointer = useRef(false);
	const motion = useRef({ isDesktop: false, reduced: false, entered: false });

	activeRef.current = active;

	/** Slides the active rule. Rows are measured before the tween, never inside it. */
	const positionRule = useCallback((instant: boolean) => {
		const rule = ruleRef.current;
		const row = rowRefs.current[activeRef.current];
		if (!rule || !row || !motion.current.isDesktop) return;

		const top = row.offsetTop;
		const height = row.offsetHeight;
		gsap.set(rule, { height });

		if (instant || motion.current.reduced) {
			gsap.set(rule, { y: top });
		} else {
			gsap.to(rule, { y: top, duration: 0.35, ease: 'power4.out' });
		}
	}, []);

	/** Plain integers count up once per tile per page load; everything else is static. */
	const runCountUp = useCallback((index: number) => {
		const panel = panelRefs.current[index];
		if (!panel || !motion.current.entered) return;

		for (const node of panel.querySelectorAll<HTMLElement>('[data-countup]')) {
			const key = `${index}:${node.dataset.countup}`;
			if (counted.current.has(key)) continue;
			counted.current.add(key);

			const target = Number(node.dataset.countup);
			if (!Number.isFinite(target)) continue;

			if (motion.current.reduced) {
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
	}, []);

	// Once JS is running, GSAP owns panel visibility — the CSS [data-active]
	// rules are the no-JS and first-paint fallback.
	useEffect(() => {
		panelRefs.current.forEach((panel, index) => {
			if (panel)
				gsap.set(panel, { autoAlpha: index === activeRef.current ? 1 : 0 });
		});
	}, []);

	useEffect(() => {
		const query = window.matchMedia('(hover: hover) and (pointer: fine)');
		const sync = () => {
			finePointer.current = query.matches;
		};
		sync();
		query.addEventListener('change', sync);
		return () => query.removeEventListener('change', sync);
	}, []);

	useEffect(() => {
		const mm = gsap.matchMedia();

		mm.add(
			{
				desktop: '(min-width: 1024px)',
				mobile: '(max-width: 1023px)',
				reduced: '(prefers-reduced-motion: reduce)',
			},
			(context) => {
				const { desktop, reduced } = context.conditions as {
					desktop: boolean;
					mobile: boolean;
					reduced: boolean;
				};

				motion.current.isDesktop = desktop;
				motion.current.reduced = reduced;
				positionRule(true);

				const onEnter = () => {
					motion.current.entered = true;
					runCountUp(activeRef.current);
				};

				if (reduced) {
					ScrollTrigger.create({
						trigger: rootRef.current,
						start: 'top 80%',
						once: true,
						onEnter,
					});
					return;
				}

				const heading = rootRef.current?.querySelector('.wh-intro');
				const rows = rowRefs.current.filter(Boolean);
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: rootRef.current,
						start: 'top 70%',
						once: true,
						onEnter,
					},
				});

				if (heading) {
					tl.from(heading, {
						opacity: 0,
						y: 24,
						duration: 0.6,
						ease: 'power3.out',
					});
				}
				if (rows.length) {
					tl.from(
						rows,
						{
							opacity: 0,
							y: 24,
							duration: 0.6,
							ease: 'power3.out',
							stagger: 0.04,
						},
						'-=0.35',
					);
				}
			},
			rootRef,
		);

		return () => {
			mm.revert();
		};
	}, [positionRule, runCountUp]);

	useEffect(() => {
		const previous = prevActive.current;
		prevActive.current = active;

		positionRule(previous === null);
		runCountUp(active);

		if (previous === null || previous === active) return;

		const outgoing = panelRefs.current[previous];
		const incoming = panelRefs.current[active];
		if (!incoming) return;

		const { reduced } = motion.current;
		const handover = reduced ? 0.15 : 0.18;
		const tl = gsap.timeline();

		tl.set(incoming, { autoAlpha: 0 }, 0);
		if (outgoing) {
			tl.to(
				outgoing,
				{ autoAlpha: 0, duration: handover, ease: 'power2.out' },
				0,
			);
		}
		tl.set(incoming, { autoAlpha: 1 }, handover);

		const media = incoming.querySelector('.wh-media');
		const body = incoming.querySelector('.wh-panel-body');

		if (media) {
			tl.fromTo(
				media,
				{ autoAlpha: 0 },
				{ autoAlpha: 1, duration: reduced ? 0.15 : 0.5 },
				handover,
			);
		}
		if (body) {
			tl.fromTo(
				body,
				reduced ? { autoAlpha: 0 } : { autoAlpha: 0, y: 12 },
				reduced
					? { autoAlpha: 1, duration: 0.15 }
					: { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out' },
				handover,
			);
		}

		return () => {
			tl.kill();
		};
	}, [active, positionRule, runCountUp]);

	const clearHover = useCallback(() => {
		if (hoverTimer.current !== null) {
			window.clearTimeout(hoverTimer.current);
			hoverTimer.current = null;
		}
	}, []);

	useEffect(() => clearHover, [clearHover]);

	/** 80 ms of intent, so crossing rows on the way to the panel doesn't flash it. */
	const handleEnter = (index: number) => {
		if (!finePointer.current) return;
		clearHover();
		hoverTimer.current = window.setTimeout(() => setActive(index), 80);
	};

	const handleClick = (index: number) => (event: MouseEvent) => {
		// Coarse pointers select; only the media box and the case-study link
		// navigate. A fine pointer follows the link as normal.
		if (finePointer.current) return;
		event.preventDefault();
		setActive(index);
	};

	return (
		<section className='work-highlights' ref={rootRef} id='work'>
			<div className='wh-grid'>
				<div className='wh-left'>
					<header className='wh-intro' style={{ order: 0 }}>
						<h2>Silicon to AI.</h2>
						<p>Six programs, owned end to end. The rest is one click away.</p>
					</header>

					<nav className='wh-nav' ref={navRef} aria-label='Highlighted work'>
						<span className='wh-rule' ref={ruleRef} aria-hidden='true' />

						{groups.map(({ group, eyebrowOrder, rows, moreOrder }) => (
							<div className='wh-group' key={group.track}>
								<p className='wh-eyebrow' style={{ order: eyebrowOrder }}>
									{group.label}
								</p>

								{rows.map(({ highlight, index, rowOrder }) => (
									<Link
										key={highlight.slug}
										href={`/work/${highlight.slug}`}
										className='wh-row'
										style={{ order: rowOrder }}
										ref={(el) => {
											rowRefs.current[index] = el;
										}}
										data-active={index === active}
										aria-current={index === active ? 'true' : undefined}
										aria-expanded={index === active}
										aria-controls={`wh-panel-${highlight.slug}`}
										onMouseEnter={() => handleEnter(index)}
										onMouseLeave={clearHover}
										onFocus={() => setActive(index)}
										onClick={handleClick(index)}
									>
										<span className='wh-row-title'>{highlight.title}</span>
										<span className='wh-row-metric'>
											{highlight.metrics[0].value}
										</span>
									</Link>
								))}

								{group.more && moreOrder !== undefined && (
									<span className='wh-more-wrap' style={{ order: moreOrder }}>
										<Magnetic strength={12}>
											<Link href={group.more.href} className='wh-more'>
												+{moreCounts[group.track] ?? 0} more →
											</Link>
										</Magnetic>
									</span>
								)}
							</div>
						))}
					</nav>

					<p className='wh-strip' style={{ order: 999 }}>
						{totals.caseStudies} case studies across {totals.projects} projects
						·{' '}
						<Magnetic strength={12}>
							<Link href='/work'>See all work →</Link>
						</Magnetic>
					</p>
				</div>

				{workHighlights.map((highlight, index) => (
					<Panel
						key={highlight.slug}
						highlight={highlight}
						index={index}
						isActive={index === active}
						order={panelOrder[index]}
						panelRef={(el) => {
							panelRefs.current[index] = el;
						}}
					/>
				))}
			</div>
		</section>
	);
}
