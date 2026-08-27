'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

/** The house reveal: rise 24px, fade in, trigger at top 88%, reverse on the way back up. */
const HOUSE = {
	y: 24,
	duration: 0.6,
	start: 'top 88%',
	ease: 'power3.out',
} as const;

export const prefersReducedMotion = (): boolean =>
	typeof window !== 'undefined' &&
	window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Reveals one element. Under reduced motion the element is simply set to
 * its resting state — no motion means no motion, not faster motion.
 */
export function useReveal<T extends HTMLElement>(delay = 0) {
	const ref = useRef<T>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		if (prefersReducedMotion()) {
			gsap.set(el, { autoAlpha: 1, y: 0 });
			return;
		}

		const tween = gsap.fromTo(
			el,
			{ y: HOUSE.y, autoAlpha: 0 },
			{
				y: 0,
				autoAlpha: 1,
				duration: HOUSE.duration,
				delay,
				ease: HOUSE.ease,
				scrollTrigger: {
					trigger: el,
					start: HOUSE.start,
					toggleActions: 'play none none reverse',
				},
			},
		);

		return () => {
			tween.scrollTrigger?.kill();
			tween.kill();
		};
	}, [delay]);

	return ref;
}

/**
 * Reveals every `.reveal` inside a container, staggering direct children of
 * a `.reveal-stagger` group by 0.06s. One ScrollTrigger per element, so a
 * frame low on the page reveals when it arrives rather than with its row.
 */
export function useRevealGroup<T extends HTMLElement>() {
	const ref = useRef<T>(null);

	useEffect(() => {
		const root = ref.current;
		if (!root) return;

		if (prefersReducedMotion()) {
			gsap.set(root.querySelectorAll('.reveal'), { autoAlpha: 1, y: 0 });
			return;
		}

		const ctx = gsap.context(() => {
			for (const el of gsap.utils.toArray<HTMLElement>('.reveal')) {
				const stagger = el.dataset.revealDelay;
				gsap.fromTo(
					el,
					{ y: HOUSE.y, autoAlpha: 0 },
					{
						y: 0,
						autoAlpha: 1,
						duration: HOUSE.duration,
						delay: stagger ? Number(stagger) : 0,
						ease: HOUSE.ease,
						scrollTrigger: {
							trigger: el,
							start: HOUSE.start,
							toggleActions: 'play none none reverse',
						},
					},
				);
			}
		}, root);

		return () => ctx.revert();
	}, []);

	return ref;
}
