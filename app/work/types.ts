export interface WorkItem {
	title: string;
	location: string;
	services: string;
	year: string;
	src: string;
	color: string;
	url: string;
	/** When set, the grid card links to /work/[slug] (internal case study page) */
	slug?: string;
	categories: string[];
	icon?: React.ReactNode;
}

export interface WorkModal {
	active: boolean;
	index: number;
}
