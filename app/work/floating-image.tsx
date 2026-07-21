'use client';

import gsap from 'gsap';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { WorkItem, WorkModal } from './types';

interface FloatingImageProps {
	modal: WorkModal;
	items: WorkItem[];
}

const scaleAnimation = {
	initial: { scale: 0, x: '-50%', y: '-50%' },
	enter: {
		scale: 1,
		x: '-50%',
		y: '-50%',
		transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as const },
	},
	closed: {
		scale: 0,
		x: '-50%',
		y: '-50%',
		transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] as const },
	},
} as const;

export default function FloatingImage({ modal, items }: FloatingImageProps) {
	const { active, index } = modal;
	const containerRef = useRef<HTMLDivElement>(null);
	const cursorRef = useRef<HTMLDivElement>(null);
	const cursorLabelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const xMoveContainer = gsap.quickTo(containerRef.current, 'left', {
			duration: 0.8,
			ease: 'power3',
		});
		const yMoveContainer = gsap.quickTo(containerRef.current, 'top', {
			duration: 0.8,
			ease: 'power3',
		});

		const xMoveCursor = gsap.quickTo(cursorRef.current, 'left', {
			duration: 0.5,
			ease: 'power3',
		});
		const yMoveCursor = gsap.quickTo(cursorRef.current, 'top', {
			duration: 0.5,
			ease: 'power3',
		});

		const xMoveLabel = gsap.quickTo(cursorLabelRef.current, 'left', {
			duration: 0.45,
			ease: 'power3',
		});
		const yMoveLabel = gsap.quickTo(cursorLabelRef.current, 'top', {
			duration: 0.45,
			ease: 'power3',
		});

		const handleMove = (e: MouseEvent) => {
			const { pageX, pageY } = e;
			xMoveContainer(pageX);
			yMoveContainer(pageY);
			xMoveCursor(pageX);
			yMoveCursor(pageY);
			xMoveLabel(pageX);
			yMoveLabel(pageY);
		};

		window.addEventListener('mousemove', handleMove);
		return () => window.removeEventListener('mousemove', handleMove);
	}, []);

	return (
		<>
			<motion.div
				className='floating-image-container'
				ref={containerRef}
				variants={scaleAnimation}
				initial='initial'
				animate={active ? 'enter' : 'closed'}
			>
				<div
					className='floating-image-slider'
					style={{
						top: `${index * -100}%`,
						transition: 'top 0.6s cubic-bezier(0.76, 0, 0.24, 1)',
					}}
				>
					{items.map((item) => (
						<div
							key={`float_${item.title}`}
							className='floating-image-slide'
							style={{ backgroundColor: item.color }}
						>
							<Image
								src={`/static/images/project/${item.src}`}
								alt={item.title}
								width={300}
								height={300}
								className='floating-image-img'
							/>
						</div>
					))}
				</div>
			</motion.div>
			<motion.div
				className='floating-cursor'
				ref={cursorRef}
				variants={scaleAnimation}
				initial='initial'
				animate={active ? 'enter' : 'closed'}
			/>
			<motion.div
				className='floating-cursor-label'
				ref={cursorLabelRef}
				variants={scaleAnimation}
				initial='initial'
				animate={active ? 'enter' : 'closed'}
			>
				View
			</motion.div>
		</>
	);
}
