/**
 * ================================================================
 * CERTIFICATION DETAIL — the case-study page, holding certificates
 * ================================================================
 * Every record on /certifications opens here, whether it holds one
 * certificate or nine. Rather than fork a second look for it, this
 * reuses the case-study shell wholesale — the same `.cs2` scope, the
 * same top bar, header, meta strip and numbered sections that
 * /work/[slug] renders. The only new CSS widens the lead plate.
 *
 * An achievement is not a certification, so the wording turns with
 * it: awarded rather than issued, an award rather than a set of
 * courses. The layout does not turn with it — a reader moving
 * between the two should not have to relearn the page.
 */

import Link from 'next/link';
import { categoriesOf, real } from '../format';
import type { CertificateDoc, CertificationItem } from '../types';
import '../../work/[slug]/case-study-v2.css';
import './certification-detail.css';

const IMAGE_ROOT = '/static/images/certificates';

/**
 * A record that lists its certificates uses that list. Everything else has
 * exactly one, already sitting on the record itself — no reason to repeat it
 * in the data.
 */
function documentsOf(item: CertificationItem): CertificateDoc[] {
	if (item.documents?.length) return item.documents;
	return [
		{
			src: item.src,
			title: item.title.trim(),
			url: real(item.url) || undefined,
		},
	];
}

/** The line under a plate: what it is and when, joined only where known. */
function plateCaption(doc: CertificateDoc, titleCard?: boolean): string {
	const kind = real(doc.kind) || (titleCard ? 'Title card' : '');
	return [kind, real(doc.date)].filter(Boolean).join(' · ');
}

export default function CertificationDetail({
	item,
}: {
	item: CertificationItem;
}) {
	const docs = documentsOf(item);
	const issuer = real(item.services);
	const cats = categoriesOf(item);
	const credential = real(item.url);
	const awarded = real(item.year) || real(docs.find((d) => real(d.date))?.date);
	const isAward = item.categories.some(
		(c) => c.trim().toLowerCase() === 'achievements',
	);
	const many = docs.length > 1;

	// The deck says what the plate below actually is, so a card is never
	// mistaken for a document.
	const deck = item.titleCard
		? isAward
			? 'Recognition — no certificate was issued for it.'
			: 'Not yet issued — the plate stands in for the certificate.'
		: isAward
			? 'One award record, shown as held.'
			: many
				? `${docs.length} certificates, shown as issued.`
				: 'One certificate, shown as issued.';

	const heading = isAward
		? 'The award'
		: many
			? 'The certificates'
			: 'The certificate';

	return (
		<div className='cs2'>
			<nav className='cs2-topbar'>
				<div className='cs2-topbar-inner'>
					<Link href='/certifications' className='cs2-back'>
						<span aria-hidden='true'>←</span> Back to certifications
					</Link>
				</div>
			</nav>

			<div className='wrap'>
				<header className='top'>
					{issuer && <p className='eyebrow'>{issuer}</p>}
					<h1>{item.title.trim()}</h1>
					<p className='deck'>{deck}</p>
				</header>

				<dl className='meta'>
					<div>
						<dt>{isAward ? 'Organisation' : 'Issued by'}</dt>
						<dd>{issuer || '—'}</dd>
					</div>
					<div>
						<dt>{isAward ? 'Year' : 'Awarded'}</dt>
						<dd>{awarded || '—'}</dd>
					</div>
					<div>
						<dt>{isAward ? 'Records' : 'Certificates'}</dt>
						<dd>{docs.length}</dd>
					</div>
					<div>
						<dt>Filed under</dt>
						<dd>{cats.length ? cats.join(', ') : '—'}</dd>
					</div>
				</dl>

				{credential && (
					<p className='demo'>
						<span>
							{isAward
								? 'Where this was announced'
								: 'Verification link printed on the certificate'}
						</span>
						<a href={credential} target='_blank' rel='noopener noreferrer'>
							{isAward ? 'Read the announcement' : 'Verify this certificate'} ↗
						</a>
					</p>
				)}

				{real(item.summary) && (
					<div className='summary'>
						<p>{item.summary}</p>
					</div>
				)}

				<section>
					<h2>
						<span className='num'>01</span>
						{heading}
					</h2>

					<div className='gallery'>
						{docs.map((doc, i) => {
							const caption = plateCaption(doc, item.titleCard);
							// A pair sits side by side; a lone plate, or the certificate a
							// programme closes with, takes the full width instead.
							const lead = i === 0 && docs.length !== 2;
							return (
								<figure key={doc.src} className={lead ? 'lead' : undefined}>
									{/* biome-ignore lint/performance/noImgElement: static asset, fixed frame */}
									<img
										className='gallery-img'
										src={`${IMAGE_ROOT}/${doc.src}`}
										alt={
											isAward
												? `${doc.title}, award`
												: `${doc.title} certificate`
										}
										loading={i === 0 ? 'eager' : 'lazy'}
									/>
									<figcaption>
										<b className='gallery-label'>{doc.title}</b>
										{caption}
										{doc.url && (
											<a
												className='demo-link'
												href={doc.url}
												target='_blank'
												rel='noopener noreferrer'
											>
												{isAward ? 'Read more' : 'Verify'} ↗
											</a>
										)}
									</figcaption>
								</figure>
							);
						})}
					</div>
				</section>
			</div>
		</div>
	);
}
