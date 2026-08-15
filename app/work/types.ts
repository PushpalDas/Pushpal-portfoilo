import type { WorkStatus } from './status';

export interface WorkItem {
	slug?: string;
	title: string;
	company: string;
	year: string;
	domain: string;
	category: 'product' | 'engineering';
	status: WorkStatus | null;
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
