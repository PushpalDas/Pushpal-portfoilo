import type { FilterKey } from './constants';

/**
 * Header copy per filter pill. The two lines under the H1 change with the
 * active filter so the header describes the slice of work on screen, not
 * the whole catalogue.
 *
 * `subline` is the one-sentence description. `stack` is the scannable
 * keyword line: the tools and skills a mid/senior product manager leans on
 * for that slice, held to about a dozen so it reads as a line rather than
 * a wall. Every keyword is one the cards or case studies can back —
 * tags and `meta.role` in `data/case-studies*.json`, and the card titles in
 * `constants.ts` for the engineering builds under Others. The exceptions
 * are the day-to-day tools: Jira (SLB) and Asana (EEGRAB) sit with the
 * silicon and embedded work they tracked; the Ixana work ran on ClickUp.
 * Power BI is the author's reporting tool; the case studies name the
 * in-house equivalents.
 */
export interface HeaderCopy {
	subline: string;
	stack: string[];
}

export const HEADER_COPY: Record<FilterKey, HeaderCopy> = {
	all: {
		subline:
			'Silicon delivery, embedded firmware and board bring-up, RAG retrieval and evaluation, multi-agent LLM systems, and the internal platforms built around them.',
		stack: [
			'Silicon program management',
			'Embedded firmware',
			'Body area networks',
			'RAG',
			'Multi-agent LLM systems',
			'LLM evaluation',
			'Python',
			'FastAPI',
			'Next.js',
			'PostgreSQL',
			'ClickUp API',
			'Microsoft Graph',
			'Jira',
			'Power BI',
		],
	},

	// Two silicon lines (BAN, NFE) from first tapeout to production, the dev
	// kits and reference designs on top of them, and the EEGRAB and SLB
	// embedded products owned from requirements to production handoff.
	silicon: {
		subline:
			'Silicon programs, dev kits, reference designs and embedded products.',
		stack: [
			'Silicon program management',
			'Launch gates',
			'Tapeout planning',
			'RTL',
			'AMS',
			'Bring-up and validation',
			'Yield',
			'Embedded firmware',
			'Schematics and BOM',
			'Budgets and BOM costing',
			'Datasheets',
			'Dev kits',
			'Reference designs',
			'Body area networks',
			'Jira',
			'Asana',
			'ClickUp',
		],
	},

	// The fourteen-tool internal program, the RAG platforms with measured
	// ranking quality, the multi-agent systems, and the pilots that decide
	// what goes company-wide. Shipped and in-use work only — the track's
	// research engines file under Personal.
	ai: {
		subline:
			'AI programs, RAG retrieval with measured ranking quality, multi-agent LLM systems, and pilots.',
		stack: [
			'AI product strategy',
			'Pilot design',
			'Adoption metrics',
			'Budgets and option costing',
			'Vendor evaluation',
			'Data protection and consent',
			'RAG',
			'Dense retrieval (bge-m3)',
			'LLM re-ranking',
			'nDCG evaluation',
			'Multi-agent LLM systems',
			'Human-in-the-loop review',
			'Python',
			'FastAPI',
			'Next.js',
			'ClickUp API',
			'Power Automate',
			'Teams Adaptive Cards',
			'Power BI',
			'Excel reporting',
		],
	},

	// Off the clock, in two runs: first the research engines, feasibility
	// studies and bench prototypes that never reached a user, each saying
	// plainly what was proven and what was not; then the engineering builds
	// that are the hands-on foundation under the product work.
	personal: {
		subline:
			'Personal work: research engines, feasibility studies and bench prototypes, then the RTL, firmware, sensor and IoT builds under the product work.',
		stack: [
			'Problem framing',
			'Feasibility studies',
			'Rapid prototyping',
			'Research proposals and grants',
			'Retrieval systems',
			'Multi-agent LLM systems',
			'Verilog',
			'FPGA',
			'RTL',
			'Embedded C',
			'Sensors',
			'IoT systems',
		],
	},
};
