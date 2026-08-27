import classNames from 'classnames';
import Link from 'next/link';
import { merryWeather } from '../../fonts';
import { LINKEDIN_URL, X_URL } from '../../lib/social';
import { workItems } from '../../work/constants';
import { AtSignIcon } from '../layouts/icons/at-sign-icon';
import { GithubIcon } from '../layouts/icons/github-icon';
import { LinkedinIcon } from '../layouts/icons/linkedin-icon';
import { XIcon } from '../layouts/icons/x-icon';
import Magnetic from '../Magnetic';
import SplashCursor from '../splash-cursor';
import ArrowDown from './arrow-down';

/**
 * The proof strip. Every item traces to a page Ixana has published or to a
 * figure counted out of app/work/constants.ts — the same standing rule the
 * work section runs on. INTERNAL_TOOLS is computed rather than typed.
 */
const INTERNAL_TOOLS = workItems.filter(
	(item) =>
		item.company === 'Ixana' &&
		item.category === 'product' &&
		item.status === 'internal',
).length;

const PROOF = [
	{
		text: '4 Wi-R parts in production',
		// YR23 and YR31 on /products/chips/wi-r-ban; XA-NFE2001 and XA-NFE3001
		// on /products/chips/wi-r-nfe. The /products index lists the two
		// families rather than the parts, so the part count comes off the two
		// chip pages.
		source: 'https://www.ixana.ai/products/chips/wi-r-ban + /wi-r-nfe',
	},
	{
		text: '50+ patent filings, first grants issued',
		source:
			'case-studies-v2.json#ixana-patent-program › "Fifty-plus filings across six product lines" · https://patents.google.com/patent/US12619308B2/en',
	},
	{
		text: `${INTERNAL_TOOLS} internal tools in daily use at Ixana`,
		source:
			'app/work/constants.ts › company Ixana · category product · status internal',
	},
];

/** One line to revert if this reads as overclaiming. */
const HERO_H1 = 'I turn deep-tech R&D into products that ship.';

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
							{HERO_H1}
						</h1>
						<section className='relative z-10'>
							<p className='text-base text-justify'>
								Principal PM in the CTO&apos;s office at Ixana — I run the Wi-R
								silicon programs from spec to production, the patent program
								(50+ filings, first grants issued), and the internal tools the
								company plans and delivers with.
							</p>
							<ul className='mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[0.68rem] uppercase tracking-[0.1em] text-neutral-400'>
								{PROOF.map((item) => (
									<li key={item.text}>{item.text}</li>
								))}
							</ul>
						</section>
						<section className='relative z-10 flex space-x-4 items-center text-sm'>
							<div>
								<p>More about me: </p>
								<div className='flex -ml-2'>
									{/* Every profile link on the site now reads one constant.
									    TODO(pushpal): 0.1 — X_URL still needs confirming; see
									    app/lib/social.ts. */}
									<Magnetic strength={25}>
										<Link
											href={LINKEDIN_URL}
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
											href={X_URL}
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
									<Link href='/work'>See the work →</Link>
								</Magnetic>
							</div>
						</section>
					</div>
				</div>
			</SplashCursor>
		</main>
	);
}
