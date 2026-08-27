'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import ConnectForm from '../components/connect-form';
import SplashCursor from '../components/splash-cursor';
import { merryWeather } from '../fonts';

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const line1Ref = useRef<HTMLSpanElement>(null);
	const line2Ref = useRef<HTMLSpanElement>(null);
	const footerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Heading text reveal
			gsap.from([line1Ref.current, line2Ref.current], {
				y: '100%',
				duration: 1,
				ease: 'power3.out',
				stagger: 0.1,
				delay: 0.3,
			});

			// Footer
			gsap.from(footerRef.current, {
				y: 30,
				opacity: 0,
				duration: 0.8,
				ease: 'power3.out',
				delay: 1.0,
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<SplashCursor
			containerClassName='min-h-svh w-screen'
			usePrimaryColors={true}
			SPLAT_RADIUS={0.4}
			SPLAT_FORCE={6000}
			BACK_COLOR={{ r: 0.11, g: 0.11, b: 0.125 }}
			TRANSPARENT={false}
		>
			<section ref={sectionRef} className='lc-page'>
				{/* ── Hero Heading ── */}
				<div className='lc-hero'>
					<h1
						ref={headingRef}
						className={`lc-heading ${merryWeather.className}`}
					>
						<span className='lc-heading-line'>
							<span ref={line1Ref} className='lc-heading-inner'>
								<span className='lc-avatar-wrap'>
									<Image
										src='/pushpal.jpeg'
										alt='Pushpal Das'
										width={120}
										height={120}
										className='lc-avatar'
									/>
								</span>
								Let&apos;s work
							</span>
						</span>
						<span className='lc-heading-line'>
							<span ref={line2Ref} className='lc-heading-inner'>
								together
							</span>
						</span>
					</h1>
					<p className='lc-subtitle'>
						Have a project in mind, want to collaborate, or just want to say
						hello? I&apos;d love to hear from you.
					</p>
				</div>

				{/* ── Main Content ── */}
				<ConnectForm />
				{/* ── Footer ── */}
				<div ref={footerRef} className='lc-footer'>
					<div className='lc-footer-col'>
						<h5 className='lc-footer-label'>Version</h5>
						<p className='lc-footer-value'>2025 © Edition</p>
					</div>
					<div className='lc-footer-col'>
						<h5 className='lc-footer-label'>Local time</h5>
						<p className='lc-footer-value'>
							<LocalTime />
						</p>
					</div>
				</div>

				<style>{`
					.lc-page {
						min-height: 100svh;
						width: 100%;
						display: flex;
						flex-direction: column;
						color: #fff;
						position: relative;
					}

					/* ── Hero ── */
					.lc-hero {
						padding: clamp(7rem, 14vh, 10rem) clamp(2rem, 6vw, 4.5rem) clamp(2rem, 4vh, 3rem);
						max-width: 1080px;
						margin: 0 auto;
						width: 100%;
					}

					.lc-heading {
						font-size: clamp(2.75rem, 5.5vw, 4.5rem);
						font-weight: 400;
						line-height: 1.1;
						margin: 0 0 1.5rem;
						letter-spacing: -0.02em;
					}

					.lc-heading-line {
						display: block;
						overflow: hidden;
					}

					.lc-heading-inner {
						display: block;
						will-change: transform;
					}

					.lc-avatar-wrap {
						display: inline-flex;
						border-radius: 50%;
						overflow: hidden;
						width: 1.25em;
						height: 1.25em;
						margin-right: 0.25em;
						transform: translateY(0.25em);
						vertical-align: baseline;
					}

					.lc-avatar {
						width: 100% !important;
						height: 100% !important;
						object-fit: cover;
						object-position: top;
						border-radius: 50%;
					}

					.lc-subtitle {
						font-size: clamp(0.95rem, 1.2vw, 1.15rem);
						color: rgba(255,255,255,0.5);
						max-width: 480px;
						line-height: 1.6;
						font-weight: 300;
						margin: 0;
					/* ── Footer ── */
					.lc-footer {
						max-width: 1080px;
						width: 100%;
						margin: auto auto 0;
						padding: clamp(3rem, 5vw, 4rem) clamp(2rem, 6vw, 4.5rem) clamp(2rem, 3vw, 3rem);
						display: flex;
						gap: clamp(2rem, 4vw, 4rem);
					}

					.lc-footer-col {
						display: flex;
						flex-direction: column;
					}

					.lc-footer-label {
						font-size: 0.7rem;
						text-transform: uppercase;
						letter-spacing: 0.1em;
						color: rgba(255,255,255,0.35);
						margin: 0 0 0.75rem;
						font-weight: 400;
					}

					.lc-footer-value {
						font-size: 0.85rem;
						color: rgba(255,255,255,0.6);
						margin: 0;
						font-weight: 300;
					}

					/* ── Responsive ── */
					@media screen and (max-width: 768px) {
						.lc-heading {
							font-size: clamp(2rem, 10vw, 3.25rem);
						}

						.lc-avatar-wrap {
							width: 1em;
							height: 1em;
							transform: translateY(0.15em);
						}

						.lc-footer {
							padding-bottom: 2rem;
						}
					}
				`}</style>
			</section>
		</SplashCursor>
	);
}

function LocalTime() {
	const timeRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const update = () => {
			if (timeRef.current) {
				timeRef.current.textContent = new Date().toLocaleTimeString('en-US', {
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
