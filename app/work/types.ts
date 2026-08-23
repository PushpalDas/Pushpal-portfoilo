export interface WorkItem {
	slug?: string;
	title: string;
	company: string;
	year: string;
	domain: string;
	category: 'product' | 'engineering';
	status:
		| 'production'
		| 'internal'
		| 'customer-testing'
		| 'prototype'
		| 'research'
		| null;
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
