'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { WORK_STATUSES } from '../status';
import type {
	EditorialCaseStudyData,
	EditorialChart,
	EditorialVisual,
} from './case-study-types';
import './editorial-case-study.css';

function visualSource(src: string) {
	if (
		src.startsWith('/') ||
		src.startsWith('http://') ||
		src.startsWith('https://')
	) {
		return src;
	}
	return `/static/images/project/${src}`;
}

function publicConfiguration(value?: string) {
	if (!value) return '';
	const sensitive =
		/(?:^|\D)(?:\d{1,3}\.){3}\d{1,3}(?:\D|$)|\b(?:api[_ -]?key|secret|token|password|deployment target|host|endpoint)\b/i;
	return value
		.split(/\s*[Â··]\s*/)
		.filter((item) => item && !sensitive.test(item))
		.join(' · ');
}

function Paragraphs({ items }: { items: string[] }) {
	return items.filter(Boolean).map((item) => <p key={item}>{item}</p>);
}

function Figure({ visual }: { visual: EditorialVisual }) {
	if (!visual.src) return null;
	return (
		<figure className={`ecs-figure ecs-figure--${visual.type}`}>
			<div className='ecs-figure-frame'>
				<Image
					src={visualSource(visual.src)}
					alt={visual.alt}
					width={1400}
					height={800}
					className='ecs-figure-image'
					sizes='(max-width: 900px) 100vw, 820px'
				/>
			</div>
			{visual.caption && <figcaption>{visual.caption}</figcaption>}
		</figure>
	);
}

function MetricChart({ chart }: { chart: EditorialChart }) {
	const maximum = Math.max(1, ...chart.series.map((series) => series.value));
	const description = chart.series
		.map((series) => `${series.label}: ${series.displayValue}`)
		.join('; ');

	return (
		<figure className='ecs-chart'>
			<div
				className='ecs-chart-panel'
				role='img'
				aria-label={`${chart.title}. ${description}`}
			>
				<p className='ecs-chart-title'>{chart.title}</p>
				<div className='ecs-chart-grid' aria-hidden='true'>
					<span />
					<span />
					<span />
					<span />
				</div>
				<div className='ecs-chart-series'>
					{chart.series.map((series) => {
						const width =
							series.value === 0
								? 0
								: Math.max(4, (series.value / maximum) * 100);
						return (
							<div className='ecs-chart-row' key={series.label}>
								<div className='ecs-chart-row-meta'>
									<span>{series.label}</span>
									<strong>{series.displayValue}</strong>
								</div>
								<div className='ecs-chart-track'>
									<span style={{ width: `${width}%` }} />
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<figcaption>{chart.caption}</figcaption>
		</figure>
	);
}

function SectionHeading({
	number,
	children,
}: {
	number: string;
	children: string;
}) {
	return (
		<h2 className='ecs-section-title'>
			<span aria-hidden='true'>{number}</span>
			{children}
		</h2>
	);
}

function outcomeHeading(status: EditorialCaseStudyData['status']) {
	if (status === 'customer-testing')
		return 'Early signal and what I’m watching';
	if (status === 'prototype') return 'What we learned';
	if (status === 'research') return 'Finding and what it changed';
	if (status === 'production' || status === 'internal')
		return 'Impact and outcomes';
	return 'What the record shows';
}

export default function EditorialCaseStudyPage({
	data,
}: {
	data: EditorialCaseStudyData;
}) {
	useEffect(() => {
		const nodes = document.querySelectorAll<HTMLElement>('[data-ecs-reveal]');
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			nodes.forEach((node) => {
				node.classList.add('is-visible');
			});
			return;
		}
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
						observer.unobserve(entry.target);
					}
				});
			},
			{ rootMargin: '0px 0px -8% 0px' },
		);
		nodes.forEach((node) => {
			observer.observe(node);
		});
		return () => observer.disconnect();
	}, []);

	const badge = data.status ? WORK_STATUSES[data.status] : null;
	const fullNarrative = true;
	const evidenceLinks = (data.evidenceLinks ?? []).filter(
		(link) => link.label.trim() && link.url.trim(),
	);
	const technicalConfiguration = publicConfiguration(
		data.technicalConfiguration,
	);

	return (
		<main className='ecs-page'>
			<nav className='ecs-nav' aria-label='Case study navigation'>
				<Link href='/work' className='ecs-back-link'>
					<span aria-hidden='true'>←</span> Back to work
				</Link>
			</nav>

			<article className='ecs-wrap'>
				<header className='ecs-hero'>
					<p className='ecs-eyebrow'>
						{data.company} · {data.year} · {data.domain}
					</p>
					<h1>{data.title}</h1>
					<p className='ecs-deck'>{data.deck}</p>
					{badge && (
						<span className={`ecs-status ${badge.colorClass}`}>
							{badge.label}
						</span>
					)}
				</header>

				<dl className='ecs-meta' aria-label='Project details'>
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
				{data.confidentialityNote && (
					<p className='ecs-confidentiality'>{data.confidentialityNote}</p>
				)}

				<div className='ecs-summary' data-ecs-reveal>
					<p>
						<strong>Problem.</strong> {data.summary.problem}
					</p>
					<p>
						<strong>What I did.</strong> {data.summary.action}
					</p>
					<p>
						<strong>Result.</strong> {data.summary.result}
					</p>
				</div>

				<section className='ecs-section' data-ecs-reveal>
					<SectionHeading number='01'>Why this, and why now</SectionHeading>
					<Paragraphs items={data.whyNow.body} />
					{data.whyNow.visuals?.map((visual) => (
						<Figure key={visual.src} visual={visual} />
					))}
				</section>

				<section className='ecs-section' data-ecs-reveal>
					<SectionHeading number='02'>
						The problem as people experienced it
					</SectionHeading>
					<Paragraphs items={data.problemExperience.body} />
					{!!data.problemExperience.evidence?.length && (
						<div className='ecs-table-scroll'>
							<table className='ecs-table'>
								<thead>
									<tr>
										<th>What they did</th>
										<th>Where it broke</th>
										<th>Evidence</th>
									</tr>
								</thead>
								<tbody>
									{data.problemExperience.evidence.map((row) => (
										<tr key={`${row.action}-${row.evidence}`}>
											<td>{row.action}</td>
											<td>{row.breakdown}</td>
											<td>{row.evidence}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
					{data.problemExperience.visuals?.map((visual) => (
						<Figure key={visual.src} visual={visual} />
					))}
				</section>

				<section className='ecs-section' data-ecs-reveal>
					<SectionHeading number='03'>My role and approach</SectionHeading>
					<p>{data.roleApproach.owned}</p>
					{!!data.roleApproach.decisions.length && (
						<>
							<h3>Key decisions</h3>
							<ul className='ecs-decisions'>
								{data.roleApproach.decisions.map((decision) => (
									<li key={decision.call}>
										<strong>{decision.call}</strong>
										{decision.alternative && (
											<span>
												{' '}
												Alternative rejected: {decision.alternative}.
											</span>
										)}
										{decision.rationale && <span> {decision.rationale}</span>}
									</li>
								))}
							</ul>
						</>
					)}
				</section>

				{fullNarrative && data.scope && (
					<section className='ecs-section' data-ecs-reveal>
						<SectionHeading number='04'>What I cut</SectionHeading>
						{data.scope.inferred && (
							<p className='ecs-draft-note'>
								AI-assisted scope draft — verify these items against the real
								roadmap before publishing.
							</p>
						)}
						<div className='ecs-scope'>
							{[
								['Shipped', data.scope.shipped, 'ship'],
								['Deferred', data.scope.deferred, 'later'],
								['Cut', data.scope.cut, 'cut'],
							].map(([label, values, tone]) => (
								<div
									className={`ecs-scope-card ecs-scope-card--${tone}`}
									key={label as string}
								>
									<h3>{label as string}</h3>
									{(values as string[]).length ? (
										<ul>
											{(values as string[]).map((value) => (
												<li key={value}>{value}</li>
											))}
										</ul>
									) : (
										<p className='ecs-scope-empty'>
											{label === 'Deferred'
												? 'No deferred item is documented in the current project record.'
												: label === 'Cut'
													? 'No explicit scope cut is documented in the current project record.'
													: 'No shipped item is documented in the current project record.'}
										</p>
									)}
								</div>
							))}
						</div>
						{data.scope.hardestCut && <p>{data.scope.hardestCut}</p>}
						{data.scope.artifact && <Figure visual={data.scope.artifact} />}
					</section>
				)}

				{fullNarrative && !!data.alignment?.length && (
					<section className='ecs-section' data-ecs-reveal>
						<SectionHeading number='05'>How I got it agreed</SectionHeading>
						<Paragraphs items={data.alignment} />
					</section>
				)}

				<section className='ecs-section' data-ecs-reveal>
					<SectionHeading number='06'>What was built</SectionHeading>
					<Paragraphs items={data.built.body} />
					{data.built.visual && (
						<div className='ecs-annotated'>
							<Figure visual={data.built.visual} />
							{!!data.built.callouts?.length && (
								<ol className='ecs-callouts'>
									{data.built.callouts.map((callout) => (
										<li key={callout.title}>
											<strong>{callout.title}</strong> {callout.detail}
										</li>
									))}
								</ol>
							)}
						</div>
					)}
				</section>

				{fullNarrative && !!data.tradeoffs?.length && (
					<section className='ecs-section' data-ecs-reveal>
						<SectionHeading number='07'>Tradeoffs</SectionHeading>
						<div className='ecs-table-scroll'>
							<table className='ecs-table'>
								<thead>
									<tr>
										<th>Tension</th>
										<th>What I chose</th>
										<th>What it cost</th>
									</tr>
								</thead>
								<tbody>
									{data.tradeoffs.map((row) => (
										<tr key={row.tension}>
											<td>{row.tension}</td>
											<td>{row.choice}</td>
											<td>{row.cost}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</section>
				)}

				<section className='ecs-section' data-ecs-reveal>
					<SectionHeading number='08'>
						{outcomeHeading(data.status)}
					</SectionHeading>
					<Paragraphs items={data.outcomes.body} />
					{data.outcomes.threshold && (
						<p>
							<strong>Threshold.</strong> {data.outcomes.threshold}
						</p>
					)}
					{data.outcomes.guardrail && (
						<p>
							<strong>Guardrail.</strong> {data.outcomes.guardrail}
						</p>
					)}
					{!!data.outcomes.metrics?.length && (
						<div className='ecs-metrics'>
							{data.outcomes.metrics.map((metric) => (
								<div
									className='ecs-metric'
									key={`${metric.value}-${metric.label}`}
								>
									<strong>{metric.value}</strong>
									<span>{metric.label}</span>
								</div>
							))}
						</div>
					)}
					{data.outcomes.chart && <MetricChart chart={data.outcomes.chart} />}
					{data.outcomes.visuals?.map((visual) => (
						<Figure key={visual.src} visual={visual} />
					))}
					{data.outcomes.metricDefinition && (
						<p>
							<strong>How I counted.</strong> {data.outcomes.metricDefinition}
						</p>
					)}
					{data.outcomes.limitation && (
						<p>
							<strong>Limitation.</strong> {data.outcomes.limitation}
						</p>
					)}
					{technicalConfiguration && (
						<p className='ecs-config'>
							Technical configuration — {technicalConfiguration}
						</p>
					)}
				</section>

				{data.architecture && (
					<section className='ecs-section' data-ecs-reveal>
						<SectionHeading number='09'>How it works</SectionHeading>
						<details className='ecs-architecture'>
							<summary>{data.architecture.summary}</summary>
							<div>
								{data.architecture.visuals.length ? (
									data.architecture.visuals
										.slice(0, 2)
										.map((visual) => (
											<Figure key={visual.src} visual={visual} />
										))
								) : (
									<p className='ecs-architecture-note'>
										A publishable architecture diagram is not available in the
										current project record.
									</p>
								)}
							</div>
						</details>
					</section>
				)}

				{!!data.reflection.length && (
					<section className='ecs-section' data-ecs-reveal>
						<SectionHeading number='10'>What I’d do differently</SectionHeading>
						<Paragraphs items={data.reflection} />
					</section>
				)}

				{!!evidenceLinks.length && (
					<section
						className='ecs-evidence'
						aria-labelledby='ecs-evidence-title'
					>
						<h2 id='ecs-evidence-title'>Public evidence</h2>
						<ul>
							{evidenceLinks.map((link) => (
								<li key={link.url}>
									<a href={link.url} target='_blank' rel='noreferrer'>
										{link.label} ↗
									</a>
								</li>
							))}
						</ul>
					</section>
				)}

				<footer className='ecs-footer-note'>
					{data.footerNote ||
						'Screens are recreations or approved public material, and sensitive figures are anonymised or expressed as relative change. Happy to walk through the real product in a conversation.'}
				</footer>
			</article>
		</main>
	);
}
