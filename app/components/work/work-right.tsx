import type { ReactNode } from 'react';

export interface WorkProps {
	children: ReactNode;
	progress: number;
}

export function WorkRight({ children, progress }: WorkProps) {
	const translateY = Math.max(-50, -(progress - 0.5) * 50);

	return (
		<div
			className='flex min-h-screen flex-1 justify-center lg:items-center py-10 lg:py-0'
			style={{ transform: `translateY(${translateY}px)` }}
		>
			<div className='w-full max-w-[92%] px-6 pt-16 md:px-8 lg:px-12 lg:pt-16'>
				{children}
			</div>
		</div>
	);
}
