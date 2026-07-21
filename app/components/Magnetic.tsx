'use client';

import gsap from 'gsap';
import { type ReactNode, useEffect, useRef } from 'react';

interface MagneticProps {
	children: ReactNode;
	strength?: number;
	className?: string;
}

export default function Magnetic({
	children,
	strength = 30,
	className,
}: MagneticProps) {
	const magnetRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = magnetRef.current;
		if (!el || window.innerWidth <= 540) return;

		const handleMouseMove = (e: MouseEvent) => {
			const rect = el.getBoundingClientRect();
			const x = ((e.clientX - rect.left) / el.offsetWidth - 0.5) * strength;
			const y = ((e.clientY - rect.top) / el.offsetHeight - 0.5) * strength;

			gsap.to(el, {
				x,
				y,
				rotate: '0.001deg',
				duration: 1,
				ease: 'power4.out',
			});
		};

		const handleMouseLeave = () => {
			gsap.to(el, {
				x: 0,
				y: 0,
				duration: 1.5,
				ease: 'elastic.out(1, 0.3)',
			});
		};

		el.addEventListener('mousemove', handleMouseMove);
		el.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			el.removeEventListener('mousemove', handleMouseMove);
			el.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, [strength]);

	return (
		<div
			ref={magnetRef}
			className={className}
			style={{ display: 'inline-block' }}
		>
			{children}
		</div>
	);
}
