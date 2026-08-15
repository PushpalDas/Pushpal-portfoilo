import type { WorkStatus } from '../status';
import type {
	CaseStudyData,
	EditorialCaseStudyData,
	EditorialMetric,
} from './case-study-types';

const CONFIGURATION_LABEL =
	/(chunk|embedding|dimension|model used|service|cache|ttl|token context|polling|execution budget|retry|maximum|planned retrieval|gold set|prompt cache|concurrent|source workbook|project list|test suite|test case|qubit capacity|deployment target|host|endpoint|ip address)/i;
const SENSITIVE_VALUE =
	/(?:^|\D)(?:\d{1,3}\.){3}\d{1,3}(?:\D|$)|\b(?:api[_ -]?key|secret|token|password)\b/i;

function cleanLabel(text: string, label: string) {
	return text.replace(new RegExp(`^${label}:?\\s*`, 'i'), '').trim();
}

function splitSummary(tldr: string) {
	const normalized = tldr.replace(/\r/g, '').trim();
	const problemMatch = normalized.match(
		/Problem:\s*([\s\S]*?)(?=\n\n(?:What (?:we|I) did|Result):|$)/i,
	);
	const actionMatch = normalized.match(
		/What (?:we|I) did:\s*([\s\S]*?)(?=\n\nResult:|$)/i,
	);
	const resultMatch = normalized.match(/Result:\s*([\s\S]*)$/i);
	return {
		problem: problemMatch?.[1]?.trim() || cleanLabel(normalized, 'Problem'),
		action: actionMatch?.[1]?.trim() || '',
		result: resultMatch?.[1]?.trim() || '',
	};
}

function paragraphs(value: string | null | undefined) {
	return (value ?? '')
		.split(/\n\s*\n/)
		.map((item) => item.trim())
		.filter(Boolean);
}

function stageLabel(status: WorkStatus | null) {
	switch (status) {
		case 'production':
			return 'Live with customers';
		case 'internal':
			return 'Live internally';
		case 'customer-testing':
			return 'Customer testing';
		case 'prototype':
			return 'Prototype';
		case 'research':
			return 'Research';
		default:
			return 'Stage not published';
	}
}

function metricGroups(metrics: CaseStudyData['metrics']) {
	const outcomes: EditorialMetric[] = [];
	const configuration: string[] = [];
	for (const metric of metrics ?? []) {
		if (!metric.value?.trim() || !metric.label?.trim()) continue;
		const text = `${metric.value} ${metric.label}`;
		if (SENSITIVE_VALUE.test(text)) continue;
		if (CONFIGURATION_LABEL.test(metric.label)) configuration.push(text);
		else outcomes.push(metric);
	}
	return { outcomes, configuration };
}

function numericValue(value: string) {
	const matches = value.replace(/,/g, '').match(/-?\d*\.?\d+/g);
	if (!matches?.length) return null;
	const parsed = Number.parseFloat(matches[matches.length - 1]);
	return Number.isFinite(parsed) ? Math.abs(parsed) : null;
}

function inferredScope(data: CaseStudyData) {
	const context = [data.title, data.whatWasBuilt, ...(data.tags ?? [])]
		.join(' ')
		.toLowerCase();

	if (/patent|lawyer|legal|prior art/.test(context)) {
		return {
			deferred: [
				'Additional jurisdictions and filing-specific document templates',
				'Deeper attorney review, docketing, and portfolio-system integrations',
			],
			cut: [
				'Autonomous filing or legal conclusions without attorney review',
				'Broad legal research outside the validated patent workflow',
			],
		};
	}
	if (/procurement/.test(context)) {
		return {
			deferred: [
				'Supplier-facing status views and richer ERP integrations',
				'Predictive cycle-time and procurement-risk analytics',
			],
			cut: [
				'Automatic approval of high-risk or high-value purchases',
				'Replacing the source procurement and finance systems',
			],
		};
	}
	if (/calendar/.test(context)) {
		return {
			deferred: [
				'Expanded recurring-event and delegate-calendar edge cases',
				'Administrator diagnostics and sync-health reporting',
			],
			cut: [
				'Building a standalone calendar client',
				'Replicating private event content beyond availability needs',
			],
		};
	}
	if (/quantum/.test(context)) {
		return {
			deferred: [
				'Circuits beyond the validated ten-qubit learning scope',
				'Cloud quantum-hardware execution and collaborative workspaces',
			],
			cut: [
				'Production hardware-noise claims without device validation',
				'Advanced algorithms that did not strengthen the core learning flow',
			],
		};
	}
	if (/neuro|spike|neuroscience/.test(context)) {
		return {
			deferred: [
				'Larger multi-lab validation datasets and benchmark coverage',
				'Real-time acquisition integrations and collaborative analysis',
			],
			cut: [
				'Clinical or diagnostic claims beyond the research evidence',
				'Custom analysis paths that weakened reproducibility',
			],
		};
	}
	if (/dāsa|dasa|spiritual|iskcon/.test(context)) {
		return {
			deferred: [
				'Multilingual retrieval and additional approved source collections',
				'Guided study plans and longitudinal feedback loops',
			],
			cut: [
				'Uncited free-form answers that could not be traced to source material',
				'Replacing teacher or community judgment with automated guidance',
			],
		};
	}
	if (/video|meeting|transcript/.test(context)) {
		return {
			deferred: [
				'Additional recording sources and richer transcript analytics',
				'Personalized collections, saved searches, and notification workflows',
			],
			cut: [
				'Public sharing before access controls were validated',
				'Full video editing features outside the retrieval use case',
			],
		};
	}
	if (
		/wi-r|body area|near field|silicon|sensor|smart watch|microphone|pcb|smartglasses|headphone|ornithopter|e-car/.test(
			context,
		)
	) {
		return {
			deferred: [
				'Broader device, environment, and partner-validation coverage',
				'Production diagnostics and self-service developer tooling',
			],
			cut: [
				'Non-core form factors before the primary link was validated',
				'Features that increased power or system complexity without proving user value',
			],
		};
	}
	if (
		/clickup|resource|scrum|pipeline|dashboard|report|salary|tracker|automation/.test(
			context,
		)
	) {
		return {
			deferred: [
				'Predictive forecasting, scenario planning, and richer trend analytics',
				'Additional source-system integrations and administrator controls',
			],
			cut: [
				'Automatic employee performance scoring from incomplete workflow data',
				'Replacing the underlying project-management system',
			],
		};
	}
	if (/rag|ai|generative|search|wiki|document/.test(context)) {
		return {
			deferred: [
				'Additional data connectors, analytics, and feedback workflows',
				'Finer-grained permissions and configurable retrieval policies',
			],
			cut: [
				'Uncited answers that users could not independently verify',
				'Broad platform features outside the validated core workflow',
			],
		};
	}
	return {
		deferred: [
			'Expanded analytics and operational reporting',
			'Additional integrations beyond the documented core workflow',
		],
		cut: [
			'Low-signal customization before the primary workflow was validated',
			'Platform expansion without evidence of repeatable demand',
		],
	};
}

export function legacyToEditorial(
	data: CaseStudyData,
	status: WorkStatus | null,
): EditorialCaseStudyData {
	const summary = splitSummary(data.tldr);
	const roleParts = paragraphs(data.roleAndApproach);
	const documentedTradeoff = roleParts[1]
		? cleanLabel(roleParts[1], 'Tradeoffs I navigated')
		: '';
	const { outcomes, configuration } = metricGroups(data.metrics);
	const media = (data.media ?? []).filter((item) => item.src?.trim());
	const imageMedia = media.filter(
		(item) => item.type === 'image' || item.type === 'gif',
	);
	const builtVisual = imageMedia[0];
	const outcomeText = paragraphs(data.impactContext);
	const metricSeries = outcomes
		.map((metric) => ({
			label: metric.label,
			value: numericValue(metric.value),
			displayValue: metric.value,
		}))
		.filter(
			(
				series,
			): series is { label: string; value: number; displayValue: string } =>
				series.value !== null,
		)
		.slice(0, 6);
	const evidenceSeries = [
		{
			label: 'Product decisions documented',
			value: (data.keyDecisions ?? []).filter(Boolean).length,
		},
		{ label: 'Supporting visuals', value: imageMedia.length },
		{ label: 'Verified outcome measures', value: outcomes.length },
		{ label: 'Public evidence links', value: (data.links ?? []).length },
	].map((series) => ({ ...series, displayValue: String(series.value) }));
	const scopeDraft = inferredScope(data);

	if (!summary.action) {
		summary.action =
			data.whatWasBuilt ||
			roleParts[0] ||
			'The available project record documents the solution, but not a separate ownership summary.';
	}
	if (!summary.result) {
		summary.result = outcomes.length
			? `The verified project record includes ${outcomes.length} measured result${outcomes.length === 1 ? '' : 's'}, detailed below.`
			: 'The available record does not include a verified post-launch outcome, so this page does not imply one.';
	}

	const generated: EditorialCaseStudyData = {
		format: 'editorial-v2',
		slug: data.slug,
		title: data.title,
		company: data.company || data.organization || 'Independent project',
		year: data.dateRange || 'Date not published',
		domain: data.tags?.[0] || 'Product',
		deck: summary.action,
		status,
		confidentialityNote: data.isConfidential
			? data.confidentialNote ||
				'Internal product — screens and figures are limited to material cleared for this portfolio.'
			: undefined,
		meta: {
			role: data.role || 'Role not documented',
			team: data.teamSize || 'Team details not published',
			timeline: data.dateRange || 'Timeline not published',
			stage: stageLabel(status),
		},
		summary,
		whyNow: {
			body: [
				summary.problem,
				`The documented product response was to ${summary.action.charAt(0).toLowerCase()}${summary.action.slice(1)}`,
			],
		},
		problemExperience: {
			body: [
				summary.problem,
				'The current project record does not include a formal interview sample or diary study. The case study therefore keeps the problem statement qualitative instead of manufacturing discovery evidence.',
			],
			evidence: [
				{
					action: 'Existing workflow or constraint',
					breakdown: summary.problem,
					evidence:
						'Documented in the project record; a formal sample size was not captured.',
				},
			],
		},
		roleApproach: {
			owned: roleParts[0]
				? cleanLabel(roleParts[0], 'What I owned')
				: data.role
					? `I contributed in the documented role of ${data.role}. The source material does not provide a more granular ownership boundary.`
					: 'The source material does not document a reliable ownership boundary.',
			decisions: (data.keyDecisions ?? []).filter(Boolean).map((decision) => ({
				call: decision,
				alternative: '',
				rationale: '',
			})),
		},
		scope: {
			shipped: data.whatWasBuilt ? [data.whatWasBuilt] : [],
			deferred: scopeDraft.deferred,
			cut: scopeDraft.cut,
			hardestCut:
				'This scope reconstruction is an AI-assisted draft based on the documented product boundary. Validate it against the actual roadmap and decision record before treating it as factual.',
			inferred: true,
		},
		alignment: [
			'The current project record does not document a specific stakeholder disagreement or concession. The portfolio leaves that evidence gap visible instead of manufacturing consensus work.',
		],
		built: {
			body: paragraphs(data.whatWasBuilt || summary.action),
			visual: builtVisual
				? {
						src: builtVisual.src,
						alt: builtVisual.caption || `${data.title} project visual`,
						caption:
							builtVisual.caption ||
							'Project visual from the existing case-study record.',
						type: 'image',
					}
				: undefined,
			callouts: (data.keyDecisions ?? [])
				.filter(Boolean)
				.slice(0, 4)
				.map((decision, index) => ({
					title: `Product decision ${index + 1}.`,
					detail: decision,
				})),
		},
		tradeoffs: documentedTradeoff
			? [
					{
						tension: 'Documented product tradeoff',
						choice: documentedTradeoff,
						cost: 'The cost of this choice is not documented in the current record.',
					},
				]
			: [
					{
						tension: 'Not documented',
						choice:
							'The existing record does not identify a defensible product tradeoff.',
						cost: 'No cost is claimed without supporting project evidence.',
					},
				],
		outcomes: {
			body: outcomeText.length
				? outcomeText
				: outcomes.length
					? [
							'These are the measured results currently supported by the project record.',
						]
					: [
							'This project was not documented with reliable outcome instrumentation. The portfolio intentionally avoids turning technical configuration into business impact.',
						],
			metrics: outcomes,
			limitation:
				status === 'research'
					? 'The existing record does not establish production adoption or commercial impact.'
					: undefined,
			chart: metricSeries.length
				? {
						title: 'Quantified evidence in the project record',
						caption:
							'Values are preserved from the existing record. Units remain in each label; bar lengths are normalized for presentation and should only be compared when units match.',
						series: metricSeries,
					}
				: {
						title: 'Case-study evidence coverage',
						caption:
							'Documentation coverage for this portfolio entry—not a product-impact claim. It highlights where verified evidence still needs to be added.',
						series: evidenceSeries,
					},
		},
		architecture: {
			summary: 'Product architecture and delivery flow',
			visuals: imageMedia.slice(1, 3).map((item) => ({
				src: item.src,
				alt: item.caption || `${data.title} architecture or supporting visual`,
				caption:
					item.caption ||
					'Supporting technical visual from the existing project record.',
				type: 'diagram',
			})),
		},
		reflection: data.reflection
			? paragraphs(data.reflection)
			: [
					'The existing project record does not include a retrospective. A future revision should document the process decision that would change, rather than inventing hindsight.',
				],
		technicalConfiguration: configuration.length
			? configuration.join(' · ')
			: undefined,
		evidenceLinks: data.links ?? [],
		footerNote: data.isConfidential
			? 'This case study uses only material cleared for this portfolio. Sensitive details and absolute figures are omitted.'
			: 'This page is based on the currently documented project record. Missing discovery and outcome evidence is identified rather than reconstructed as fact.',
	};

	const overrides = data.editorialOverrides;
	if (!overrides) return generated;

	return {
		...generated,
		deck: overrides.deck ?? generated.deck,
		meta: { ...generated.meta, ...overrides.meta },
		whyNow: { ...generated.whyNow, ...overrides.whyNow },
		problemExperience: {
			...generated.problemExperience,
			...overrides.problemExperience,
		},
		roleApproach: { ...generated.roleApproach, ...overrides.roleApproach },
		scope: {
			shipped: [],
			deferred: [],
			cut: [],
			hardestCut: '',
			...generated.scope,
			...overrides.scope,
			inferred: false,
		},
		alignment: overrides.alignment ?? generated.alignment,
		built: { ...generated.built, ...overrides.built },
		tradeoffs: overrides.tradeoffs ?? generated.tradeoffs,
		outcomes: { ...generated.outcomes, ...overrides.outcomes },
		architecture: overrides.architecture ?? generated.architecture,
		technicalConfiguration:
			overrides.technicalConfiguration ?? generated.technicalConfiguration,
		footerNote: overrides.footerNote ?? generated.footerNote,
	};
}
