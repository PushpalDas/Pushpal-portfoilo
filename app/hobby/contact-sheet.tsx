'use client';

import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { justify, targetRowHeight } from './justify';
import { archive, frameNumber, type Photo } from './photos';

const GAP = 1;

/** Client components still render on the server; useLayoutEffect warns there. */
const useIsoLayoutEffect =
	typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** archive is static, so the ratios are computed once at module load. */
const RATIOS = archive.map((p) => p.width / p.height);

/** Server and first client paint use this; the real pass corrects it. */
const SSR_TARGET = 150;

interface Props {
	onOpen: (index: number) => void;
	registerRef: (index: number, el: HTMLButtonElement | null) => void;
}

export default function ContactSheet({ onOpen, registerRef }: Props) {
	const containerRef = useRef<HTMLDivElement>(null);

	const [boxes, setBoxes] = useState(() =>
		archive.map((p) => ({
			w: (p.width / p.height) * SSR_TARGET,
			h: SSR_TARGET,
		})),
	);

	// One rAF-batched measure, on mount and on every resize. The sheet sits
	// far below the fold, so the first correction is off-screen.
	useIsoLayoutEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		let frame = 0;
		const measure = () => {
			frame = 0;
			const width = el.clientWidth;
			if (width <= 0) return;
			setBoxes(justify(RATIOS, width, targetRowHeight(window.innerWidth), GAP));
		};

		measure();

		const observer = new ResizeObserver(() => {
			if (frame) return;
			frame = requestAnimationFrame(measure);
		});
		observer.observe(el);

		return () => {
			if (frame) cancelAnimationFrame(frame);
			observer.disconnect();
		};
	}, []);

	return (
		<div className='hoobie-sheet' ref={containerRef}>
			{archive.map((photo: Photo, i) => {
				const box = boxes[i] ?? { w: SSR_TARGET, h: SSR_TARGET };
				return (
					<button
						type='button'
						key={photo.id}
						className='hoobie-sheet-cell'
						style={{ width: `${box.w}px`, height: `${box.h}px` }}
						onClick={() => onOpen(photo.number - 1)}
						ref={(el) => registerRef(photo.number - 1, el)}
						aria-label={`Open frame ${frameNumber(photo.number)} in the image viewer`}
					>
						<Image
							src={photo.src}
							alt={photo.alt}
							fill
							sizes='(max-width: 640px) 40vw, (max-width: 900px) 25vw, 16vw'
							quality={82}
							placeholder='blur'
							blurDataURL={photo.blurDataURL}
							className='hoobie-sheet-img'
						/>
						<span className='hoobie-sheet-number' aria-hidden='true'>
							{frameNumber(photo.number)}
						</span>
					</button>
				);
			})}
		</div>
	);
}
