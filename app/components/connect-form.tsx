'use client';

import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { LINKEDIN_URL, X_URL } from '../lib/social';
import Magnetic from './Magnetic';

/**
 * "Send a message" and "Or find me on", lifted out of the contact page so
 * /contact and /book-a-meeting show one implementation rather than two that
 * drift. The markup, the mailto submit and the .lc-* styles are the
 * originals — only their home has changed.
 */

const SOCIALS = [
	{
		label: 'LinkedIn',
		href: LINKEDIN_URL,
		icon: (
			<svg width='22' height='22' fill='currentColor' viewBox='0 0 24 24'>
				<title>LinkedIn</title>
				<path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
			</svg>
		),
	},
	{
		label: 'GitHub',
		href: 'https://github.com/pushpaldas',
		icon: (
			<svg width='22' height='22' fill='currentColor' viewBox='0 0 24 24'>
				<title>GitHub</title>
				<path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' />
			</svg>
		),
	},
	{
		label: 'Twitter / X',
		href: X_URL,
		icon: (
			<svg width='20' height='20' fill='currentColor' viewBox='0 0 24 24'>
				<title>Twitter / X</title>
				<path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
			</svg>
		),
	},
	{
		label: 'Email',
		href: 'mailto:pushpaldas2001@gmail.com',
		icon: (
			<svg
				width='22'
				height='22'
				fill='none'
				stroke='currentColor'
				strokeWidth='1.5'
				viewBox='0 0 24 24'
			>
				<title>Email</title>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
				/>
			</svg>
		),
	},
];

export default function ConnectForm() {
	const rootRef = useRef<HTMLDivElement>(null);
	const formRef = useRef<HTMLFormElement>(null);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [focused, setFocused] = useState<string | null>(null);

	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const ctx = gsap.context(() => {
			gsap.from(formRef.current, {
				y: 60,
				opacity: 0,
				duration: 1,
				ease: 'power3.out',
				delay: 0.6,
			});
			gsap.from('.lc-social-card', {
				y: 40,
				opacity: 0,
				duration: 0.8,
				ease: 'power3.out',
				stagger: 0.08,
				delay: 0.8,
			});
		}, rootRef);

		return () => ctx.revert();
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const subject = encodeURIComponent(`Hey Pushpal! from ${formData.name}`);
		const body = encodeURIComponent(
			`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`,
		);
		window.open(
			`mailto:pushpaldas2001@gmail.com?subject=${subject}&body=${body}`,
			'_self',
		);
	};

	return (
		<div className='lc-content' ref={rootRef}>
			<form ref={formRef} className='lc-form' onSubmit={handleSubmit}>
				<div className='lc-form-header'>
					<h2 className='lc-form-title'>Send a message</h2>
					<p className='lc-form-desc'>
						Fill out the form and I&apos;ll get back to you.
					</p>
				</div>

				{(['name', 'email', 'message'] as const).map((field) => (
					<div key={field} className='lc-field'>
						<label
							htmlFor={`lc-${field}`}
							className={`lc-label ${focused === field || formData[field] ? 'lc-label-active' : ''}`}
						>
							{field === 'name'
								? 'Your Name'
								: field === 'email'
									? 'Your Email'
									: 'Your Message'}
						</label>
						{field === 'message' ? (
							<textarea
								id={`lc-${field}`}
								className='lc-input lc-textarea'
								value={formData[field]}
								onChange={(e) =>
									setFormData((p) => ({ ...p, [field]: e.target.value }))
								}
								onFocus={() => setFocused(field)}
								onBlur={() => setFocused(null)}
								rows={5}
								required
							/>
						) : (
							<input
								id={`lc-${field}`}
								type={field === 'email' ? 'email' : 'text'}
								className='lc-input'
								value={formData[field]}
								onChange={(e) =>
									setFormData((p) => ({ ...p, [field]: e.target.value }))
								}
								onFocus={() => setFocused(field)}
								onBlur={() => setFocused(null)}
								required
							/>
						)}
						<div className='lc-input-line' />
					</div>
				))}

				<Magnetic strength={30}>
					<button type='submit' className='lc-submit'>
						<span className='lc-submit-fill' />
						<span className='lc-submit-text'>
							Send Message
							<svg
								width='18'
								height='18'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<title>Send</title>
								<path d='M7 17L17 7M17 7H7M17 7v10' />
							</svg>
						</span>
					</button>
				</Magnetic>
			</form>

			<div className='lc-socials'>
				<h3 className='lc-socials-title'>Or find me on</h3>
				<div className='lc-socials-grid'>
					{SOCIALS.map((s) => (
						<Magnetic key={s.label} strength={20}>
							<a
								href={s.href}
								target={s.href.startsWith('mailto') ? undefined : '_blank'}
								rel='noopener noreferrer'
								className='lc-social-card'
							>
								<span className='lc-social-fill' />
								<span className='lc-social-icon'>{s.icon}</span>
								<span className='lc-social-label'>{s.label}</span>
								<svg
									className='lc-social-arrow'
									width='14'
									height='14'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
								>
									<title>Open</title>
									<path d='M7 17L17 7M17 7H7M17 7v10' />
								</svg>
							</a>
						</Magnetic>
					))}
				</div>
			</div>

			<style>{`

				/* ── Content ── */
				.lc-content {
					max-width: 1080px;
					width: 100%;
					margin: 0 auto;
					padding: 0 clamp(2rem, 6vw, 4.5rem) clamp(3rem, 6vh, 5rem);
					display: grid;
					grid-template-columns: 1.2fr 1fr;
					gap: clamp(2rem, 4vw, 4rem);
					align-items: start;
				}

				/* ── Form ── */
				.lc-form {
					background: rgba(255,255,255,0.04);
					border: 1px solid rgba(255,255,255,0.08);
					border-radius: 24px;
					padding: clamp(2rem, 3vw, 3rem);
					backdrop-filter: blur(20px);
					-webkit-backdrop-filter: blur(20px);
				}

				.lc-form-header {
					margin-bottom: 2rem;
				}

				.lc-form-title {
					font-size: 1.25rem;
					font-weight: 500;
					margin: 0 0 0.5rem;
					color: #fff;
				}

				.lc-form-desc {
					font-size: 0.85rem;
					color: rgba(255,255,255,0.4);
					margin: 0;
					font-weight: 300;
				}

				.lc-field {
					position: relative;
					margin-bottom: 1.75rem;
				}

				.lc-label {
					position: absolute;
					top: 0.85rem;
					left: 0;
					font-size: 0.9rem;
					color: rgba(255,255,255,0.3);
					pointer-events: none;
					transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
					font-weight: 300;
				}

				.lc-label-active {
					top: -0.6rem;
					font-size: 0.7rem;
					color: rgba(255,255,255,0.6);
					letter-spacing: 0.05em;
					text-transform: uppercase;
				}

				.lc-input {
					width: 100%;
					background: transparent;
					border: none;
					border-bottom: 1px solid rgba(255,255,255,0.12);
					outline: none;
					color: #fff;
					font-size: 0.95rem;
					padding: 0.85rem 0 0.6rem;
					font-family: inherit;
					font-weight: 300;
					transition: border-color 0.3s ease;
				}

				.lc-input:focus {
					border-bottom-color: #455CE9;
				}

				.lc-textarea {
					resize: none;
					min-height: 100px;
					line-height: 1.6;
				}

				.lc-input-line {
					position: absolute;
					bottom: 0;
					left: 0;
					width: 0;
					height: 2px;
					background: #455CE9;
					transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
				}

				.lc-field:focus-within .lc-input-line {
					width: 100%;
				}

				/* Submit button */
				.lc-submit {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					padding: 1rem 2.5rem;
					border-radius: 100px;
					border: 1px solid rgba(255,255,255,0.15);
					background: transparent;
					color: #fff;
					font-size: 0.95rem;
					font-weight: 400;
					cursor: pointer;
					position: relative;
					overflow: hidden;
					transition: border-color 0.4s ease;
					font-family: inherit;
					margin-top: 0.5rem;
				}

				.lc-submit:hover {
					border-color: #455CE9;
				}

				.lc-submit-fill {
					position: absolute;
					inset: 0;
					background: #455CE9;
					border-radius: 100px;
					transform: translateY(100%);
					transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
				}

				.lc-submit:hover .lc-submit-fill {
					transform: translateY(0%);
				}

				.lc-submit-text {
					position: relative;
					z-index: 2;
					display: flex;
					align-items: center;
					gap: 0.5rem;
				}

				/* ── Socials ── */
				.lc-socials {
					padding-top: 1rem;
				}

				.lc-socials-title {
					font-size: 0.7rem;
					text-transform: uppercase;
					letter-spacing: 0.12em;
					color: rgba(255,255,255,0.35);
					margin: 0 0 1.25rem;
					font-weight: 400;
				}

				.lc-socials-grid {
					display: flex;
					flex-direction: column;
					gap: 0.6rem;
				}

				.lc-social-card {
					display: flex;
					align-items: center;
					gap: 1rem;
					padding: 1.15rem 1.5rem;
					border-radius: 16px;
					border: 1px solid rgba(255,255,255,0.08);
					background: rgba(255,255,255,0.03);
					color: rgba(255,255,255,0.7);
					text-decoration: none;
					position: relative;
					overflow: hidden;
					transition: all 0.35s ease;
					cursor: pointer;
				}

				.lc-social-card:hover {
					border-color: rgba(255,255,255,0.15);
					color: #fff;
				}

				.lc-social-fill {
					position: absolute;
					inset: 0;
					background: rgba(69, 92, 233, 0.15);
					border-radius: 16px;
					transform: translateY(100%);
					transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
				}

				.lc-social-card:hover .lc-social-fill {
					transform: translateY(0%);
				}

				.lc-social-icon {
					position: relative;
					z-index: 2;
					flex-shrink: 0;
					display: flex;
				}

				.lc-social-label {
					position: relative;
					z-index: 2;
					flex: 1;
					font-size: 0.95rem;
					font-weight: 400;
				}

				.lc-social-arrow {
					position: relative;
					z-index: 2;
					flex-shrink: 0;
					opacity: 0;
					transform: translate(-4px, 4px);
					transition: all 0.3s ease;
				}

				.lc-social-card:hover .lc-social-arrow {
					opacity: 0.7;
					transform: translate(0, 0);
				}


				@media screen and (max-width: 768px) {
					.lc-content {
					grid-template-columns: 1fr;
					}

					.lc-socials {
					padding-top: 0;
					}

					.lc-socials-grid {
					display: grid;
					grid-template-columns: 1fr 1fr;
					}

					.lc-social-card {
					flex-direction: column;
					text-align: center;
					padding: 1.25rem 1rem;
					gap: 0.6rem;
					}

					.lc-social-arrow {
					display: none;
					}

				}
			`}</style>
		</div>
	);
}
