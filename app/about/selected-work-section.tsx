import Link from 'next/link';
import {
	aiRemainder,
	type SelectedWorkCard,
	selectedWork,
	siliconRemainder,
} from './selected-work';
import './selected-work.css';

/**
 * The spotlight index — everything essential is on the card at rest. Hover and
 * focus only add the feature lines; nothing here is gated behind interaction.
 */

/**
 * /work filters on category (`all | product | engineering`) and has no
 * silicon/AI split, so both buttons deep-link to the product view rather than
 * to a filter that does not exist.
 */
const WORK_HREF = '/work?filter=product';

const CATEGORIES = [
	{ key: 'silicon', label: 'Silicon', remainder: siliconRemainder },
	{ key: 'ai', label: 'AI Programs', remainder: aiRemainder },
] as const;

function WorkCard({ card }: { card: SelectedWorkCard }) {
	// The accent dot is reserved for work that is actually shipped and running.
	const live = card.status === 'In production';

	return (
		<article className={live ? 'sw-card sw-card-live' : 'sw-card'}>
			<p className='sw-stat'>{card.stat}</p>
			<p className='sw-stat-context'>{card.statContext}</p>
			<h4 className='sw-headline'>
				{/* Stretched link: the whole card is the hit target, the text stays
				    selectable, and no interactive element is nested inside it. */}
				<Link className='sw-card-link' href={`/work/${card.slug}`}>
					{card.headline}
				</Link>
			</h4>
			<p className='sw-outcome'>{card.outcome}</p>
			<ul className='sw-features'>
				{card.features.map((feature) => (
					<li key={feature}>{feature}</li>
				))}
			</ul>
			<p className='sw-audience'>
				<span className='sw-audience-label'>For </span>
				{card.audience}
			</p>
			<p className='sw-card-footer'>
				<span className='sw-status'>
					<span className='sw-status-dot' />
					{card.status}
				</span>
				<span className='sw-meta-sep' aria-hidden='true'>
					·
				</span>
				<span>{card.company}</span>
				<span className='sw-meta-sep' aria-hidden='true'>
					·
				</span>
				<span>{card.years}</span>
			</p>
		</article>
	);
}

function MoreButton({ count, label }: { count: number; label: string }) {
	return (
		<Link
			className='sw-more'
			href={WORK_HREF}
			aria-label={`See ${count} more ${label} projects on the work page`}
		>
			<span className='sw-more-fill' />
			<span className='sw-more-text'>+{count}</span>
		</Link>
	);
}

export default function SelectedWork() {
	return (
		<section className='selected-work' aria-labelledby='selected-work-title'>
			<h2 className='sw-title' id='selected-work-title'>
				Selected work
			</h2>
			<p className='sw-subhead'>
				Silicon to AI — 39 projects across production, internal tools, and the
				lab.
			</p>

			{CATEGORIES.map((category) => (
				<div className='sw-category' key={category.key}>
					<h3 className='sw-category-label'>
						<span className='sw-category-dot' />
						{category.label}
					</h3>
					<ul className='sw-grid'>
						{selectedWork
							.filter((card) => card.category === category.key)
							.map((card) => (
								<li className='sw-cell' key={card.slug}>
									<WorkCard card={card} />
								</li>
							))}
						<li className='sw-cell sw-cell-more'>
							<MoreButton
								count={category.remainder.length}
								label={category.label}
							/>
						</li>
					</ul>
				</div>
			))}

			<p className='sw-full-history'>
				<Link className='sw-history-link' href='/experience'>
					Full history <span aria-hidden='true'>→</span>
				</Link>
			</p>
		</section>
	);
}
