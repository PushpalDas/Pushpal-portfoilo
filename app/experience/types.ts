export interface ExperienceItem {
	title: string;
	company: string;
	location: string;
	services: string;
	year: string;
	startDate: string;
	endDate?: string;
	duration?: string;
	src: string;
	color: string;
	url: string;
	categories: string[];
	icon?: React.ReactNode;
	description?: string;
}

export interface ExperienceModal {
	active: boolean;
	index: number;
}
