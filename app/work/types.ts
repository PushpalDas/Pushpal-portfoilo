import type { WorkStatus } from './status';

export interface WorkItem {
	slug?: string;
	title: string;
	company: string;
	year: string;
	domain: string;
	category: 'product' | 'engineering';
	/** Highlight track — also the /work ?domain= filter. Products only. */
	track?: 'silicon' | 'ai';
	status: WorkStatus | null;
	/**
	 * Curation tier. 1 = flagship (the front door), 2 = the internal AI
	 * program (one head card, chapters beneath it), 3 = selected standalone
	 * work, 4 = archive. Engineering builds are the appendix regardless.
	 * Nothing is hidden by a tier — everything is placed by one.
	 */
	tier?: 1 | 2 | 3 | 4;
	/** True only on the program-overview card that fronts tier 2. */
	programHead?: boolean;
	outcome: string;
	image: string;
	href?: string;
	demoUrl?: string;
	color?: string; // Optional if we want to keep tile color mappings
}

export interface WorkModal {
	active: boolean;
	index: number;
}
