'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { LINKEDIN_URL } from '../lib/social';
import { LinkedinIcon } from './layouts/icons/linkedin-icon';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const line1Ref = useRef<HTMLSpanElement>(null);
	const line2Ref = useRef<HTMLSpanElement>(null);
	const btnRef = useRef<HTMLAnchorElement>(null);
	const dividerRef = useRef<HTMLDivElement>(null);
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Animate the two heading lines sliding up
			gsap.from([line1Ref.current, line2Ref.current], {
				y: '110%',
				duration: 1,
				ease: 'power3.out',
				stagger: 0.08,
				scrollTrigger: {
					trigger: headingRef.current,
					start: 'top 85%',
					toggleActions: 'play none none reset',
				},
			});

			// Animate the "Get in touch" button (scale in)
			gsap.from(btnRef.current, {
				scale: 0,
				opacity: 0,
				duration: 0.8,
				ease: 'back.out(1.7)',
				scrollTrigger: {
					trigger: btnRef.current,
					start: 'top 90%',
					toggleActions: 'play none none reset',
				},
			});

			// Animate divider
			gsap.from(dividerRef.current, {
				scaleX: 0,
				transformOrigin: 'left center',
				duration: 1,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: dividerRef.current,
					start: 'top 90%',
					toggleActions: 'play none none reset',
				},
			});

			// Animate bottom footer
			gsap.from(bottomRef.current, {
				y: 40,
				opacity: 0,
				duration: 0.8,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: bottomRef.current,
					start: 'top 95%',
					toggleActions: 'play none none reset',
				},
			});
		}, sectionRef);

		return () => {
			ctx.revert();
		};
	}, []);

	return (
		<section ref={sectionRef} className='contact-section'>
			<div className='contact-wrapper'>
				<div className='contact-container'>
					{/* Main heading */}
					<div className='contact-heading-row'>
						<h2 ref={headingRef} className='contact-heading'>
							<span className='contact-heading-line'>
								<span ref={line1Ref} className='contact-heading-line-inner'>
									<span className='contact-profile-pic-wrapper'>
										<Image
											src='/pushpal.jpeg'
											alt='Pushpal Das'
											width={120}
											height={120}
											className='contact-profile-pic'
										/>
									</span>
									Let&apos;s
								</span>
							</span>
							<span className='contact-heading-line'>
								<span ref={line2Ref} className='contact-heading-line-inner'>
									work together
								</span>
							</span>
						</h2>
					</div>

					{/* Divider + Get in touch button */}
					<div className='contact-cta-row'>
						<div ref={dividerRef} className='contact-divider' />
						<div className='contact-btn-fixed'>
							<Magnetic strength={50}>
								<Link
									ref={btnRef}
									href='/lets-connect'
									className='contact-round-btn'
								>
									<span className='contact-round-btn-fill' />
									<span className='contact-round-btn-text'>Get in touch</span>
								</Link>
							</Magnetic>
							<Magnetic strength={25}>
								<Link
									href={LINKEDIN_URL}
									target='_blank'
									rel='noreferrer'
									aria-label='linkedin'
									className='contact-linkedin'
								>
									<LinkedinIcon className='h-9 w-9' />
								</Link>
							</Magnetic>
						</div>
					</div>
				</div>

				{/* Bottom footer */}
				<div ref={bottomRef} className='contact-bottom-footer'>
					<div className='contact-bottom-col'>
						<div className='contact-bottom-group'>
							<h5 className='contact-bottom-label'>Version</h5>
							<p className='contact-bottom-value'>
								{new Date().getFullYear()} © Edition
							</p>
						</div>
					</div>
					<div className='contact-bottom-col contact-bottom-col--right'>
						<div className='contact-bottom-group'>
							<h5 className='contact-bottom-label'>Local time</h5>
							<p className='contact-bottom-value'>
								<LocalTime />
							</p>
						</div>
					</div>
				</div>
			</div>

			<style>{`
				.contact-section {
					position: relative;
					width: 100%;
					overflow: hidden;
				}

				/* Main wrapper — dark background matching original footer */
				.contact-wrapper {
					position: relative;
					width: 100%;
					background: #1c1d20;
					min-height: 100vh;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding-top: 0;
					padding-bottom: 0;
					background: #1c1d20;
					color: #fff;
					box-shadow: 0px 5px 0px 5px #1c1d20;
				}

				.contact-container {
					width: 100%;
					max-width: 1080px;
					padding: 0 clamp(2.75rem, 6vw, 4.5rem);
					margin: 0 auto;
					display: flex;
					flex-direction: column;
				}

				/* Heading */
				.contact-heading-row {
					position: relative;
					padding-top: clamp(3.25rem, 12vh, 6rem);
					padding-bottom: clamp(1.75rem, 4vw, 3.25rem);
				}

				.contact-heading {
					/* Two lines in the display serif the site already loads for its
					   largest type: the photograph and “Let's” on the first, “work
					   together” on the second. */
					font-family: var(--font-fraunces), Georgia, serif;
					font-optical-sizing: auto;
					font-size: clamp(2.75rem, 6vw, 5rem);
					font-weight: 400;
					line-height: 1.05;
					margin: 0;
					letter-spacing: -0.03em;
					white-space: nowrap;
				}

				.contact-heading-line {
					display: block;
					position: relative;
					overflow: hidden;
					/* The mask clips the rise-in; the padding keeps the descender of the
					   g and the lowered photograph inside it instead of shaving them. */
					padding: 0.06em 0.05em 0.3em 0;
					margin-bottom: -0.2em;
				}

				.contact-heading-line-inner {
					display: block;
					will-change: transform;
				}

				/* Profile picture inline */
				.contact-profile-pic-wrapper {
					display: inline-flex;
					position: relative;
					border-radius: 50%;
					overflow: hidden;
					width: 1.25em;
					height: 1.25em;
					margin-right: 0.25em;
					transform: translateY(0.25em);
					vertical-align: baseline;
				}

				.contact-profile-pic {
					width: 100% !important;
					height: 100% !important;
					object-fit: cover;
					object-position: top;
					border-radius: 50%;
				}

				/* CTA row */
				.contact-cta-row {
					position: relative;
					padding-bottom: clamp(4.5rem, 9vw, 7.5rem);
				}

				.contact-divider {
					width: 100%;
					height: 1px;
					background: rgba(255, 255, 255, 0.2);
				}

								.contact-btn-fixed {
					position: absolute;
					right: clamp(2rem, 5vw, 6rem);
					top: 0;
					transform: translate(0%, -50%);
					z-index: 20;
					/* The round button and, to its right, the same LinkedIn mark
					   the home hero uses. */
					display: flex;
					align-items: center;
					gap: clamp(0.75rem, 1.5vw, 1.25rem);
				}

				.contact-linkedin {
					/* A round plate the size of the icon's button, in the footer's own
					   colour, so the divider stops behind it instead of running through
					   the mark. Reads as a small sibling of the disc beside it. */
					display: inline-flex;
					align-items: center;
					justify-content: center;
					width: clamp(3rem, 4vw, 3.75rem);
					height: clamp(3rem, 4vw, 3.75rem);
					border-radius: 50%;
					border: 1px solid rgba(255, 255, 255, 0.25);
					background: #1c1d20;
					color: #fff;
					transition: border-color 0.4s ease, background-color 0.4s ease;
				}

				.contact-linkedin:hover {
					border-color: #455ce9;
					background: #455ce9;
				}

				.contact-round-btn {
					display: flex;
					align-items: center;
					justify-content: center;
					width: clamp(9em, 12vw, 11em);
					height: clamp(9em, 12vw, 11em);
					border-radius: 50%;
					background: #455CE9;
					color: #fff;
					text-decoration: none;
					font-size: clamp(0.9rem, 1.1vw, 1.1rem);
					transition:
						transform 0.4s cubic-bezier(0.76, 0, 0.24, 1),
						border-color 0.4s ease;
					cursor: pointer;
					position: relative;
					overflow: hidden;
				}

				.contact-round-btn:hover {
					transform: scale(1.15);
				}

				.contact-round-btn-fill {
					position: absolute;
					inset: 0;
					border-radius: 50%;
					background: #334bd3;
					transform: translateY(100%);
					transition:
						transform 0.4s cubic-bezier(0.76, 0, 0.24, 1),
						background-color 0.25s ease-in-out;
				}

				.contact-round-btn:hover .contact-round-btn-fill {
					transform: translateY(0%);
					background: #334bd3;
				}

				.contact-round-btn-text {
					position: relative;
					padding: 0 1em;
					z-index: 2;
					font-weight: 400;
					text-align: center;
				}

				/* Bottom footer — align with original bottom-footer spacing */
				.contact-bottom-footer {
					width: 100%;
					display: flex;
					justify-content: space-between;
					padding: clamp(3.5rem, 6vw, 4.5rem) clamp(2.5rem, 5vw, 4rem)
						clamp(2.25rem, 4vw, 3rem) clamp(2.5rem, 5vw, 4rem);
				}

				.contact-bottom-col--right {
					text-align: right;
				}

				.contact-bottom-col {
					display: flex;
					gap: clamp(2rem, 4vw, 4rem);
				}

				.contact-bottom-group {
					display: flex;
					flex-direction: column;
				}

				.contact-bottom-label {
					font-size: 0.7rem;
					text-transform: uppercase;
					letter-spacing: 0.1em;
					color: rgba(255, 255, 255, 0.4);
					margin: 0 0 1em 0;
					font-weight: 400;
				}

				.contact-bottom-value {
					font-size: 0.85rem;
					color: rgba(255, 255, 255, 0.7);
					margin: 0;
					font-weight: 300;
				}

				/* Responsive */
				@media screen and (max-width: 768px) {
					.contact-heading {
						font-size: clamp(2rem, 11vw, 3.25rem);
					}

					/* The disc is centred on the divider and rises 45px above it; the
					   heading row must leave that much room or the two collide. */
					.contact-heading-row {
						padding-bottom: 4.5rem;
					}

					.contact-profile-pic-wrapper {
						width: 0.95em;
						height: 0.95em;
						transform: translateY(0.1em);
					}

					.contact-btn-fixed {
						transform: translate(-20%, -50%);
					}

					.contact-round-btn {
						width: 90px;
						height: 90px;
						font-size: 0.7rem;
					}

					/* Version stays left and the time right, on one row, even on a phone. */
					.contact-bottom-footer {
						gap: 1.5rem;
					}

					.contact-arrow {
						bottom: 1em;
					}
				}
			`}</style>
		</section>
	);
}

function LocalTime() {
	const timeRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const update = () => {
			if (timeRef.current) {
				const now = new Date();
				timeRef.current.textContent = now.toLocaleTimeString('en-US', {
					hour: '2-digit',
					minute: '2-digit',
					timeZoneName: 'short',
				});
			}
		};
		update();
		const interval = setInterval(update, 1000);
		return () => clearInterval(interval);
	}, []);

	return <span ref={timeRef} />;
}
