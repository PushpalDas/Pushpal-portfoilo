'use client';

import Magnetic from '../Magnetic';
import { ArrowDownIcon } from '../layouts/icons/arrow-down-icon';

export default function ArrowDown() {
	return (
		<Magnetic strength={40} className='z-10 absolute bottom-5 left-1/2 transform -translate-x-1/2'>
			<button
				type='button'
				aria-label='Scroll down'
				onClick={() => {
					const intro = document.querySelector('#intro');

					intro?.scrollIntoView({ behavior: 'smooth' });
				}}
				className='cursor-pointer dark:text-white'
			>
				<ArrowDownIcon size={18} />
			</button>
		</Magnetic>
	);
}
