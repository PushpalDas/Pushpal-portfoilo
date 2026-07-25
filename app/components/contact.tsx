'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
	const sectionRef = useRef<HTMLElement>(null);
	const roundedDivRef = useRef<HTMLDivElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const line1Ref = useRef<HTMLSpanElement>(null);
	const line2Ref = useRef<HTMLSpanElement>(null);
	const btnRef = useRef<HTMLAnchorElement>(null);
	const emailRef = useRef<HTMLAnchorElement>(null);
	const dividerRef = useRef<HTMLDivElement>(null);
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// KEY ANIMATION: Rounded divider shrinks to 0 height as you scroll (like Dennis Snellenberg)
			gsap.to(roundedDivRef.current, {
				height: 0,
				ease: 'none',
				scrollTrigger: {
					trigger: sectionRef.current,
					start: '0% 100%',
					end: '50% 100%',
					scrub: 0,
				},
			});

			// Animate heading lines sliding up
			gsap.from([line1Ref.current, line2Ref.current], {
				y: '100%',
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

			// Animate email link
			gsap.from(emailRef.current, {
				y: 30,
				opacity: 0,
				duration: 0.8,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: emailRef.current,
					start: 'top 92%',
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
			{/* Rounded divider — height animates to 0 on scroll */}
			<div className='contact-rounded-div' ref={roundedDivRef}>
				<div className='contact-rounded-div-inner' />
			</div>

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
									Let&apos;s work
								</span>
							</span>
							<span className='contact-heading-line'>
								<span ref={line2Ref} className='contact-heading-line-inner'>
									together
								</span>
							</span>
						</h2>
					</div>

					{/* Divider + Get in touch button */}
					<div className='contact-cta-row'>
						<div ref={dividerRef} className='contact-divider' />
						<div className='contact-btn-fixed'>
							<Magnetic strength={50}>
								<a
									ref={btnRef}
									href='mailto:pushpaldas2001@gmail.com'
									className='contact-round-btn'
								>
									<span className='contact-round-btn-fill' />
									<span className='contact-round-btn-text'>Get in touch</span>
								</a>
							</Magnetic>
						</div>
					</div>

					{/* Email */}
					<div className='contact-email-row'>
						<Magnetic strength={25}>
							<a
								ref={emailRef}
								href='mailto:pushpaldas2001@gmail.com'
								className='contact-email-link'
							>
								<span className='contact-email-fill' />
								<span className='contact-email-text'>
									pushpaldas2001@gmail.com
								</span>
							</a>
						</Magnetic>
					</div>
				</div>

				{/* Bottom footer */}
				<div ref={bottomRef} className='contact-bottom-footer'>
					<div className='contact-bottom-col'>
						<div className='contact-bottom-group'>
							<h5 className='contact-bottom-label'>Version</h5>
							<p className='contact-bottom-value'>2025 © Edition</p>
						</div>
						<div className='contact-bottom-group'>
							<h5 className='contact-bottom-label'>Local time</h5>
							<p className='contact-bottom-value'>
								<LocalTime />
							</p>
						</div>
					</div>
					<div className='contact-bottom-col'>
						<div className='contact-bottom-socials'>
							<h5 className='contact-bottom-label'>Socials</h5>
							<ul className='contact-socials-list'>
								<li>
									<Magnetic strength={15}>
										<a
											href='https://github.com/pushpaldas'
											target='_blank'
											rel='noopener noreferrer'
											className='contact-social-link'
										>
											Github
										</a>
									</Magnetic>
								</li>
								<li>
									<Magnetic strength={15}>
										<a
											href='https://www.linkedin.com/in/pushpaldas/'
											target='_blank'
											rel='noopener noreferrer'
											className='contact-social-link'
										>
											LinkedIn
										</a>
									</Magnetic>
								</li>
								<li>
									<Magnetic strength={15}>
										<a
											href='https://twitter.com/pushpaldas'
											target='_blank'
											rel='noopener noreferrer'
											className='contact-social-link'
										>
											Twitter
										</a>
									</Magnetic>
								</li>
							</ul>
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

				/* Rounded divider — starts at 10vh, animates to 0 on scroll */
				.contact-rounded-div {
					width: 100%;
					position: relative;
					height: 10vh;
					overflow: hidden;
					z-index: 2;
					will-change: height;
				}

				.contact-rounded-div-inner {
					width: 150%;
					display: block;
					position: absolute;
					height: 750%;
					left: 50%;
					border-radius: 50%;
					transform: translate(-50%, -86.666%);
					z-index: 1;
					box-shadow: 0 0 2px 1px #1c1d20;
					-webkit-backface-visibility: hidden;
					backface-visibility: hidden;
				}

				:is(.dark) .contact-rounded-div-inner {
					background: #1c1d20;
				}

				:is(:not(.dark)) .contact-rounded-div-inner {
					background: #1c1d20;
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
					font-size: clamp(2.75rem, 5.5vw, 4.25rem);
					font-weight: 400;
					line-height: 1.1;
					margin: 0;
					letter-spacing: -0.02em;
					font-family: inherit;
				}

				.contact-heading-line {
					display: block;
					position: relative;
					overflow: hidden;
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
					padding-bottom: clamp(2.5rem, 5vw, 4rem);
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

				/* Email link */
				.contact-email-row {
					padding-bottom: clamp(3rem, 6vw, 5rem);
				}

				.contact-email-link {
					position: relative;
					display: inline-flex;
					align-items: center;
					padding: 0.8em 2em;
					border: 1px solid rgba(255, 255, 255, 0.25);
					border-radius: 100px;
					color: #fff;
					text-decoration: none;
					font-size: clamp(0.9rem, 1.2vw, 1.3rem);
					font-weight: 300;
					overflow: hidden;
					transition: color 0.4s ease, border-color 0.4s ease;
					cursor: pointer;
					background: transparent;
				}

				.contact-email-fill {
					position: absolute;
					inset: 0;
					background: #455CE9;
					border-radius: 100px;
					transform: translateY(100%);
					transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
				}

				.contact-email-link:hover .contact-email-fill {
					transform: translateY(0%);
				}

				.contact-email-link:hover {
					border-color: #455CE9;
				}

				.contact-email-text {
					position: relative;
					z-index: 2;
				}

				/* Bottom footer — align with original bottom-footer spacing */
				.contact-bottom-footer {
					width: 100%;
					display: flex;
					justify-content: space-between;
					padding: clamp(3.5rem, 6vw, 4.5rem) clamp(2.5rem, 5vw, 4rem)
						clamp(2.25rem, 4vw, 3rem) clamp(2.5rem, 5vw, 4rem);
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

				.contact-bottom-socials {
					display: flex;
					flex-direction: column;
				}

				.contact-socials-list {
					display: flex;
					gap: 1.5em;
					list-style: none;
					margin: 0;
					padding: 0;
				}

				.contact-social-link {
					color: rgba(255, 255, 255, 0.7);
					text-decoration: none;
					font-size: 0.85rem;
					font-weight: 300;
					position: relative;
					transition: color 0.3s ease;
				}

				.contact-social-link::after {
					content: '';
					position: absolute;
					bottom: -2px;
					left: 0;
					width: 0;
					height: 1px;
					background: #fff;
					transition: width 0.3s ease;
				}

				.contact-social-link:hover {
					color: #fff;
				}

				.contact-social-link:hover::after {
					width: 100%;
				}

				/* Responsive */
				@media screen and (max-width: 768px) {
					.contact-rounded-div {
						height: 7.5vh;
					}

					.contact-heading {
						font-size: clamp(2rem, 10vw, 3.5rem);
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

					.contact-bottom-footer {
						flex-direction: column;
						gap: 2rem;
					}

					.contact-bottom-col:first-child {
						order: 2;
					}

					.contact-email-row {
						padding-bottom: clamp(3rem, 8vw, 5rem);
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
