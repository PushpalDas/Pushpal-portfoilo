'use client';

import classNames from 'classnames';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Magnetic from '../../Magnetic';
import { MoonIcon } from '../icons/moon-icon';
import { SunMediumIcon } from '../icons/sun-icon';

const ThemeSwitch = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme, resolvedTheme } = useTheme();

	// When mounted on client, now we can show the UI
	useEffect(() => setMounted(true), []);

	const toggleTheme = () => {
		const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';

		// Use ViewTransition API if supported, otherwise fallback to immediate switch
		if (typeof document !== 'undefined' && 'startViewTransition' in document) {
			document.startViewTransition(() => {
				setTheme(newTheme);
			});
		} else {
			setTheme(newTheme);
		}
	};

	return (
		<div className='fixed top-4 right-4 z-50'>
			<Magnetic strength={35}>
				<motion.button
					aria-label='Toggle Dark Mode'
					type='button'
					whileTap={{
						scale: 0.85,
					}}
					whileHover={{ scale: 1.1 }}
					onClick={toggleTheme}
					className={classNames(
						'flex items-center justify-center w-10 h-10 rounded-full',
						'border border-white/20 backdrop-blur-xl',
						'transition-all duration-300',
						'hover:border-white/40 hover:bg-white/10',
						'active:scale-95',
					)}
				>
					<motion.div
						initial={false}
						animate={{
							rotate:
								mounted && (theme === 'dark' || resolvedTheme === 'dark')
									? 180
									: 0,
						}}
						transition={{
							duration: 0.5,
							type: 'spring',
							stiffness: 200,
							damping: 10,
						}}
					>
						{mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
							<SunMediumIcon className='h-5 w-5 text-yellow-400' />
						) : (
							<MoonIcon className='h-5 w-5 text-blue-300' />
						)}
					</motion.div>
				</motion.button>
			</Magnetic>
		</div>
	);
};

export default ThemeSwitch;
