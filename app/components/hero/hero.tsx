import classNames from 'classnames';
import Link from 'next/link';
import { merryWeather } from '../../fonts';
import { AtSignIcon } from '../layouts/icons/at-sign-icon';
import { GithubIcon } from '../layouts/icons/github-icon';
import { LinkedinIcon } from '../layouts/icons/linkedin-icon';
import { XIcon } from '../layouts/icons/x-icon';
import Magnetic from '../Magnetic';
import SplashCursor from '../splash-cursor';
import ArrowDown from './arrow-down';

export default function Hero() {
	return (
		<main className='relative min-h-svh w-screen overflow-hidden'>
			<SplashCursor
				containerClassName='min-h-svh w-screen'
				usePrimaryColors={true}
				SPLAT_RADIUS={0.5}
				SPLAT_FORCE={8000}
			>
				<div
					className={classNames('relative min-h-svh', merryWeather.className)}
				>
					<ArrowDown />
					<div className='absolute top-[20%] md:top-[40%] max-w-5xl flex-col space-y-4 justify-center px-8 md:px-24 lg:ml-14'>
						<h1 className='text-2xl font-medium md:mr-4 md:text-4xl'>
							Welcome to my <span className='font-bold'>portfolio</span>
						</h1>
						<section className='relative z-10'>
							<p className='text-base text-justify'>
								I help deep-tech teams translate complex R&amp;D into scalable
								products.
								<br />
								<br />
								Currently, working with the Founder and CTO of Ixana, owning
								efficiency, products &amp; patents
							</p>
						</section>
						<section className='relative z-10 flex space-x-4 items-center text-sm'>
							<div>
								<p>More about me: </p>
								<div className='flex -ml-2'>
									<Magnetic strength={25}>
										<Link
											href='https://www.linkedin.com/in/pushpal-das-98485a1b5/'
											target='_blank'
											rel='noreferrer'
											aria-label='linkedin'
											data-skip-splash-cursor
										>
											<LinkedinIcon className='h-9 w-9' />
										</Link>
									</Magnetic>
									<Magnetic strength={25}>
										<Link
											href='https://github.com/PushpalDas'
											target='_blank'
											rel='noreferrer'
											aria-label='github'
											data-skip-splash-cursor
										>
											<GithubIcon className='h-9 w-9' />
										</Link>
									</Magnetic>
									<Magnetic strength={25}>
										<Link
											href='https://x.com/Pushpal_D'
											target='_blank'
											rel='noreferrer'
											aria-label='twitter'
											data-skip-splash-cursor
										>
											<XIcon className='h-9 w-9' />
										</Link>
									</Magnetic>
									<Magnetic strength={25}>
										<Link
											href='mailto:pushpaldas2001@gmail.com'
											aria-label='email'
											rel='noreferrer'
											data-skip-splash-cursor
										>
											<AtSignIcon className='h-9 w-9' />
										</Link>
									</Magnetic>
								</div>
							</div>
							<div className='h-14 border-l border-gray-300' />
							<div
								className='flex flex-wrap space-x-3 space-y-1'
								data-skip-splash-cursor
							>
								<Magnetic strength={20}>
									<Link href='/work'>/projects</Link>
								</Magnetic>
							</div>
						</section>
					</div>
				</div>
			</SplashCursor>
		</main>
	);
}
