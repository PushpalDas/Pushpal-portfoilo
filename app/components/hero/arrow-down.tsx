'use client';

import { ArrowDownIcon } from '../layouts/icons/arrow-down-icon';
import Magnetic from '../Magnetic';

export default function ArrowDown() {
	return (
		<Magnetic
			strength={40}
			className='z-10 absolute bottom-5 left-1/2 transform -translate-x-1/2'
		>
			<button
				type='button'
				aria-label='Scroll to selected work'
				onClick={() => {
					// The Selected work section on the home page (id="work").
					const work = document.querySelector('#work');

					work?.scrollIntoView({ behavior: 'smooth' });
				}}
				className='cursor-pointer dark:text-white flex flex-col items-center gap-2'
			>
				<span className='text-sm'>Selected work</span>
				<ArrowDownIcon size={18} />
			</button>
		</Magnetic>
	);
}
