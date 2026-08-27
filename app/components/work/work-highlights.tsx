'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/dist/lenis-react';
import Image from 'next/image';
import Link from 'next/link';
import {
	type MouseEvent,
	useCallback,
	useEffect,
	useLayoutEffect,
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

/** Every link out of this section tells the case study where the reader came from. */
const FROM_HOME = '?from=home';

interface WorkHighlightsProps {
	/** Products on each track the home page is not already showing. */
	moreCounts: Partial<Record<HighlightTrack, number>>;
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
		const moreOrder = cursor++;
		return { group, eyebrowOrder, rows, moreOrder };
	});

	return { groups, panelOrder };
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
	const href = `/work/${highlight.slug}${FROM_HOME}`;
	const headingId = `wh-headline-${highlight.slug}`;

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
							/* No product shot exists for this one, so the number is the
							   picture rather than a filler image. */
							<span className='wh-media-number'>
								{highlight.metrics[0].value}
							</span>
						)}
					</Link>
				</div>

				<div className='wh-panel-body'>
					{/* The soWhat line lives on the active row, where it does the work
					    of showing the row is open. Repeating it here put the same
					    sentence on screen twice. */}
					<div className='wh-panel-head'>
						<h3 id={headingId} className='wh-headline'>
							<Link href={href}>{highlight.headline}</Link>
						</h3>
					</div>

					<dl className='wh-metric-strip'>
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

					<div className='wh-panel-cols'>
						<div className='wh-col'>
							<h4>What it does</h4>
							<ul className='wh-features'>
								{highlight.features.map((feature) => (
									<li key={feature}>{feature}</li>
								))}
							</ul>
						</div>
						<div className='wh-col'>
							<h4>{highlight.panelLabel ?? "Who's interested?"}</h4>
							<ul className='wh-panel-items'>
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
					</div>

					<div className='wh-panel-foot'>
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
			</div>
		</article>
	);
}

export default function WorkHighlights({ moreCounts }: WorkHighlightsProps) {
	const { groups, panelOrder } = buildPlan();

	const [active, setActive] = useState(0);

	const rootRef = useRef<HTMLElement>(null);
	const navRef = useRef<HTMLElement>(null);
	const bandRef = useRef<HTMLSpanElement>(null);
	const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);
	const panelRefs = useRef<(HTMLElement | null)[]>([]);

	const activeRef = useRef(0);
	const prevActive = useRef<number | null>(null);
	const counted = useRef(new Set<string>());
	const hoverTimer = useRef<number | null>(null);
	const finePointer = useRef(false);
	const motion = useRef({ isDesktop: false, reduced: false, entered: false });

	// Hover selection is only honoured when the pointer actually moved. Rows
	// sliding under a stationary cursor during a scroll fire mouseenter too,
	// and that is what used to change the active project mid-scroll.
	const lastPointerMove = useRef(-1);
	const scrollQuietAt = useRef(-1);

	activeRef.current = active;

	useLenis(() => {
		// Lenis reports on every frame it moves; hold hover off until 150 ms
		// after the last one.
		scrollQuietAt.current = performance.now() + 150;
	});

	/** Slides the inverted band. Rows are measured before the tween, never inside it. */
	const positionBand = useCallback((instant: boolean) => {
		const band = bandRef.current;
		const row = rowRefs.current[activeRef.current];
		if (!band || !row || !motion.current.isDesktop) return;

		const top = row.offsetTop;
		const height = row.offsetHeight;

		if (instant || motion.current.reduced) {
			gsap.set(band, { y: top, height, autoAlpha: 1 });
		} else {
			gsap.to(band, {
				y: top,
				height,
				autoAlpha: 1,
				duration: 0.35,
				ease: 'power4.out',
			});
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

	// Once JS is running GSAP owns panel visibility; the CSS [data-active]
	// rules are the no-JS and first-paint fallback.
	useEffect(() => {
		panelRefs.current.forEach((panel, index) => {
			if (panel) {
				gsap.set(panel, { autoAlpha: index === activeRef.current ? 1 : 0 });
			}
		});
	}, []);

	useEffect(() => {
		const query = window.matchMedia('(hover: hover) and (pointer: fine)');
		const sync = () => {
			finePointer.current = query.matches;
		};
		sync();
		query.addEventListener('change', sync);

		const onPointerMove = () => {
			lastPointerMove.current = performance.now();
		};
		window.addEventListener('pointermove', onPointerMove, { passive: true });

		return () => {
			query.removeEventListener('change', sync);
			window.removeEventListener('pointermove', onPointerMove);
		};
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
				if (!desktop && bandRef.current) {
					gsap.set(bandRef.current, { autoAlpha: 0 });
				}
				positionBand(true);

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
							stagger: 0.03,
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
	}, [positionBand, runCountUp]);

	// The active row reveals its soWhat, which changes row heights the moment
	// React commits — measure after layout, before paint.
	useLayoutEffect(() => {
		positionBand(prevActive.current === null);
	}, [positionBand]);

	useEffect(() => {
		const previous = prevActive.current;
		prevActive.current = active;

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
	}, [active, runCountUp]);

	const clearHover = useCallback(() => {
		if (hoverTimer.current !== null) {
			window.clearTimeout(hoverTimer.current);
			hoverTimer.current = null;
		}
	}, []);

	useEffect(() => clearHover, [clearHover]);

	/**
	 * 80 ms of intent, so crossing rows on the way to the panel doesn't flash
	 * it — and only when the pointer genuinely moved onto the row while the
	 * page was still.
	 */
	const handleEnter = (index: number) => {
		if (!finePointer.current) return;

		const now = performance.now();
		if (now < scrollQuietAt.current) return;
		if (now - lastPointerMove.current > 100) return;

		clearHover();
		hoverTimer.current = window.setTimeout(() => {
			if (performance.now() < scrollQuietAt.current) return;
			setActive(index);
		}, 80);
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
						<h2>Selected work.</h2>
						<p>{workHighlights.length} programs in production or daily use.</p>
					</header>

					<nav className='wh-nav' ref={navRef} aria-label='Highlighted work'>
						<span className='wh-band' ref={bandRef} aria-hidden='true' />

						{groups.map(({ group, eyebrowOrder, rows, moreOrder }) => (
							<div className='wh-group' key={group.track}>
								<p className='wh-eyebrow' style={{ order: eyebrowOrder }}>
									{group.label}
								</p>

								{rows.map(({ highlight, index, rowOrder }) => (
									<Link
										key={highlight.slug}
										href={`/work/${highlight.slug}${FROM_HOME}`}
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
										<span className='wh-row-main'>
											<span className='wh-row-eyebrow'>
												{highlight.eyebrow}
											</span>
											<span className='wh-row-title'>{highlight.title}</span>
											<span className='wh-row-sowhat'>{highlight.soWhat}</span>
										</span>
										<span className='wh-row-metric'>
											{highlight.metrics[0].value}
										</span>
									</Link>
								))}

								<span className='wh-more-wrap' style={{ order: moreOrder }}>
									<Magnetic strength={12}>
										<Link href={group.more.href} className='wh-more'>
											+{moreCounts[group.track] ?? 0} more →
										</Link>
									</Magnetic>
								</span>
							</div>
						))}
					</nav>

					<p className='wh-all' style={{ order: 999 }}>
						<Magnetic strength={12}>
							<Link href='/work' className='wh-more'>
								See all work →
							</Link>
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
