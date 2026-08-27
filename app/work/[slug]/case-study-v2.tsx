/**
 * ================================================================
 * CASE STUDY — 10-SECTION FORMAT
 * ================================================================
 * Structure, section numbering, class names and SVG conventions
 * follow app/Changes/case-study-final-sample.html. Class names are
 * kept identical to the reference and scoped under `.cs2` so the
 * page reuses the reference exactly without leaking generic names
 * like `.badge` or `.metrics` into the rest of the site.
 *
 * Per-status variants (which sections exist, what §08 is called,
 * target length) live in the data, not here — see
 * data/case-studies-v2.json.
 */

import { STATUS_CONFIG } from '../constants';
import CaseStudyBack from './case-study-back';
import Chart from './case-study-charts';
import type { CaseStudyBlock, CaseStudyV2 } from './case-study-types';
import './case-study-v2.css';

function Block({ block }: { block: CaseStudyBlock }) {
	switch (block.kind) {
		case 'para':
			return <p>{block.text}</p>;

		case 'figure':
			return (
				<figure>
					<Chart spec={block.chart} />
					<figcaption>{block.caption}</figcaption>
				</figure>
			);

		case 'table':
			return (
				<table className='tbl'>
					<thead>
						<tr>
							{block.head.map((h) => (
								<th key={h}>{h}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{block.rows.map((row) => (
							<tr key={row[0]}>
								{row.map((cell, ci) => (
									<td
										key={block.head[ci]}
										data-l={ci === 0 ? undefined : block.head[ci]}
									>
										{cell}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			);

		case 'decisions':
			return (
				<>
					{block.label && <h3>{block.label}</h3>}
					<ul className='decisions'>
						{block.items.map((d) => (
							<li key={d.lead}>
								<b>{d.lead}</b> {d.text}
							</li>
						))}
					</ul>
				</>
			);

		case 'scope':
			return (
				<div className='scope'>
					<div className='col ship'>
						<h4>Shipped in v1</h4>
						<ul>
							{block.shipped.map((s) => (
								<li key={s}>{s}</li>
							))}
						</ul>
					</div>
					<div className='col later'>
						<h4>Deferred</h4>
						<ul>
							{block.deferred.map((s) => (
								<li key={s}>{s}</li>
							))}
						</ul>
					</div>
					<div className='col cut'>
						<h4>Cut</h4>
						<ul>
							{block.cut.map((s) => (
								<li key={s}>{s}</li>
							))}
						</ul>
					</div>
				</div>
			);

		case 'doc':
			return (
				<>
					<div className='doc'>
						<div className='doc-bar'>{block.bar}</div>
						<div className='doc-body'>
							{block.lead && (
								<p>
									<b>{block.lead}</b>
								</p>
							)}
							<ul>
								{block.items.map((it) => (
									<li key={it.lead}>
										<b>{it.lead}</b> {it.text}
									</li>
								))}
							</ul>
						</div>
					</div>
					{block.note && <p className='doc-note'>{block.note}</p>}
				</>
			);

		case 'shot':
			return (
				<>
					<div className='shot'>
						{block.image ? (
							// biome-ignore lint/performance/noImgElement: static asset inside a fixed-ratio frame
							<img
								className='shot-photo'
								src={block.image}
								alt={block.alt ?? ''}
								loading='lazy'
							/>
						) : (
							<div className='shot-img'>{block.placeholder}</div>
						)}
						<ol className='callouts'>
							{block.callouts.map((c, i) => (
								<li key={c.lead}>
									<span className='num2'>{i + 1}</span>
									<span>
										<b>{c.lead}</b> {c.text}
									</span>
								</li>
							))}
						</ol>
					</div>
					<p className='shot-note'>{block.note}</p>
				</>
			);

		case 'metrics':
			return (
				<div className='metrics'>
					{block.items.map((m) => (
						<div className='metric' key={m.label}>
							<div className='n'>
								{m.value}
								{m.sub && <small> {m.sub}</small>}
							</div>
							<div className='l'>{m.label}</div>
						</div>
					))}
				</div>
			);

		case 'definition':
			return (
				<p>
					<b className='def-lead'>{block.lead}</b> {block.text}
				</p>
			);

		case 'config':
			return <p className='config'>{block.text}</p>;

		case 'gallery':
			return (
				<>
					<div className='gallery'>
						{block.items.map((it) => (
							<figure key={it.caption}>
								{it.image ? (
									// biome-ignore lint/performance/noImgElement: static asset, fixed frame
									<img
										className='gallery-img'
										src={it.image}
										alt={it.label ?? it.caption}
										loading='lazy'
									/>
								) : (
									<div className='ph'>{it.placeholder}</div>
								)}
								<figcaption>
									{it.label && <b className='gallery-label'>{it.label}</b>}
									{it.caption}
								</figcaption>
							</figure>
						))}
					</div>
					{block.note && <p className='shot-note'>{block.note}</p>}
				</>
			);

		case 'arch':
			return (
				<details className='arch'>
					<summary>{block.summary}</summary>
					<div className='abody'>
						{block.figures.map((f) => (
							<figure key={f.caption}>
								{f.image ? (
									// biome-ignore lint/performance/noImgElement: architecture diagrams are wide static PNGs
									<img
										className='arch-img'
										src={f.image}
										alt={f.caption}
										loading='lazy'
									/>
								) : (
									<div className='ph'>{f.placeholder}</div>
								)}
								<figcaption>{f.caption}</figcaption>
							</figure>
						))}
					</div>
				</details>
			);

		default:
			return null;
	}
}

export default function CaseStudyV2Page({ data }: { data: CaseStudyV2 }) {
	const badge = STATUS_CONFIG[data.status];

	return (
		<div className='cs2'>
			<nav className='cs2-topbar'>
				<div className='cs2-topbar-inner'>
					<CaseStudyBack />
				</div>
			</nav>

			<div className='wrap'>
				<header className='top'>
					<p className='eyebrow'>{data.eyebrow}</p>
					<h1>{data.title}</h1>
					<p className='deck'>{data.deck}</p>
					<span className={`badge ${badge.colorClass}`}>{badge.label}</span>
				</header>

				<dl className='meta'>
					<div>
						<dt>Role</dt>
						<dd>{data.meta.role}</dd>
					</div>
					<div>
						<dt>Team</dt>
						<dd>{data.meta.team}</dd>
					</div>
					<div>
						<dt>Timeline</dt>
						<dd>{data.meta.timeline}</dd>
					</div>
					<div>
						<dt>Stage</dt>
						<dd>{data.meta.stage}</dd>
					</div>
				</dl>

				<p className='demo'>
					<span>{data.confidentiality}</span>
					{data.evidence?.map((e) => (
						<a
							key={e.url}
							href={e.url}
							target='_blank'
							rel='noopener noreferrer'
						>
							{e.label}
						</a>
					))}
				</p>

				<div className='summary'>
					{data.summary.map((s) => (
						<p key={s.lead}>
							<b>{s.lead}</b> {s.text}
						</p>
					))}
				</div>

				{data.sections.map((sec) => (
					<section key={sec.num}>
						<h2>
							<span className='num'>{sec.num}</span>
							{sec.heading}
						</h2>
						{sec.body?.map((p) => (
							<p key={p.slice(0, 40)}>{p}</p>
						))}
						{sec.blocks?.map((b, i) => (
							<Block key={`${sec.num}-${b.kind}-${i}`} block={b} />
						))}
						{sec.after?.map((p) => (
							<p key={p.slice(0, 40)}>{p}</p>
						))}
					</section>
				))}

				<p className='note'>
					<span className='sample'>Sample page — replace all figures</span>
					<br />
					{data.sampleNote}
				</p>
			</div>
		</div>
	);
}
