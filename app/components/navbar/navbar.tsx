'use client';

import classNames from 'classnames';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { mukta } from '../../fonts';
import Magnetic from '../Magnetic';

const navLinks = [
	{ href: '/', label: 'Home' },
	{ href: '/about', label: 'About' },
	{ href: '/work', label: 'Work' },
	{ href: '/hoobie', label: 'Hobby' },
	{ href: '/experience', label: 'Experience' },
	{ href: '/certifications', label: 'Certifications' },
	{ href: '/book-a-meeting', label: 'Book a meeting' },
];

export default function Navbar() {
	const pathname = usePathname();
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	const isCaseStudySubpage =
		pathname.startsWith('/work/') && pathname !== '/work';

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	if (isCaseStudySubpage) return null;

	return (
		<motion.nav
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
			className={classNames(
				'fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl',
				'rounded-full border border-white/15 backdrop-blur-2xl',
				'transition-all duration-300',
				scrolled ? 'bg-white/10 shadow-lg shadow-black/10' : 'bg-white/5',
				mukta.className,
			)}
		>
			<div className='flex items-center justify-between px-4 py-2 md:px-6'>
				{/* Left: Avatar + Name */}
				<Magnetic strength={20}>
					<Link href='/' className='flex items-center gap-2.5 shrink-0'>
						<div className='relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-white/20'>
							<Image
								src='/pushpal.jpeg'
								alt='Avatar'
								fill
								className='object-cover object-top'
								sizes='32px'
							/>
						</div>
						<span className='text-white font-semibold text-sm tracking-wide'>
							Pushpal Das
						</span>
					</Link>
				</Magnetic>

				{/* Center: Nav Links (desktop) */}
				<div className='hidden md:flex items-center gap-1'>
					{navLinks.map(({ href, label }) => {
						const isActive =
							href === '/' ? pathname === '/' : pathname.startsWith(href);
						return (
							<Magnetic key={href} strength={15}>
								<Link
									href={href}
									aria-current={isActive ? 'page' : undefined}
									className={classNames(
										'relative px-3.5 py-1.5 text-sm rounded-full transition-colors duration-200',
										isActive ? 'text-white' : 'text-gray-400 hover:text-white',
									)}
								>
									{isActive && (
										<motion.span
											layoutId='navbar-active'
											className='absolute inset-0 rounded-full bg-blue-500/30'
											transition={{
												type: 'spring',
												stiffness: 380,
												damping: 30,
											}}
										/>
									)}
									<span className='relative z-10'>{label}</span>
								</Link>
							</Magnetic>
						);
					})}
				</div>

				{/* Right: CTA + Mobile toggle */}
				<div className='flex items-center gap-3'>
					<Magnetic strength={20}>
						<Link
							href='/contact'
							className={classNames(
								'hidden sm:inline-flex items-center px-4 py-1.5 text-sm font-medium rounded-full',
								'border border-white/20 text-white',
								'hover:bg-white/10 transition-colors duration-200',
							)}
						>
							Let&apos;s Connect
						</Link>
					</Magnetic>

					{/* Mobile hamburger */}
					<button
						type='button'
						onClick={() => setMobileOpen(!mobileOpen)}
						className='md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5'
						aria-label='Toggle menu'
					>
						<span
							className={classNames(
								'block h-0.5 w-5 bg-white rounded-full transition-transform duration-300',
								mobileOpen && 'translate-y-2 rotate-45',
							)}
						/>
						<span
							className={classNames(
								'block h-0.5 w-5 bg-white rounded-full transition-opacity duration-300',
								mobileOpen && 'opacity-0',
							)}
						/>
						<span
							className={classNames(
								'block h-0.5 w-5 bg-white rounded-full transition-transform duration-300',
								mobileOpen && '-translate-y-2 -rotate-45',
							)}
						/>
					</button>
				</div>
			</div>

			{/* Mobile dropdown */}
			{mobileOpen && (
				<motion.div
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: 'auto' }}
					exit={{ opacity: 0, height: 0 }}
					className='md:hidden border-t border-white/10 px-4 pb-4 pt-2'
				>
					<div className='flex flex-col gap-1'>
						{navLinks.map(({ href, label }) => {
							const isActive =
								href === '/' ? pathname === '/' : pathname.startsWith(href);
							return (
								<Link
									key={href}
									href={href}
									onClick={() => setMobileOpen(false)}
									aria-current={isActive ? 'page' : undefined}
									className={classNames(
										'px-3 py-2 text-sm rounded-lg transition-colors duration-200',
										isActive
											? 'text-white bg-white/10'
											: 'text-gray-400 hover:text-white hover:bg-white/5',
									)}
								>
									{label}
								</Link>
							);
						})}
						<Link
							href='/contact'
							onClick={() => setMobileOpen(false)}
							className='mt-2 text-center px-4 py-2 text-sm font-medium rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors duration-200'
						>
							Let&apos;s Connect
						</Link>
					</div>
				</motion.div>
			)}
		</motion.nav>
	);
}
