export type WorkTile = {
	title: string;
	description: string;
	image: {
		src: string;
		width: number;
		height: number;
	};
};

export const workTiles: WorkTile[] = [
	{
		description: `Here are things`,
		title: `I've worked on`,
		image: {
			src: '',
			width: 600,
			height: 770,
		},
	},
	{
		description: 'I built',
		title: 'Developer Kits',
		image: {
			src: '/static/images/p21.png',
			width: 600,
			height: 554,
		},
	},
	{
		description: `I maintained`,
		title: 'Modules',
		image: {
			src: '/static/images/p22.png',
			width: 600,
			height: 717,
		},
	},
	{
		description: `I built`,
		title: 'Reference Designs',
		image: {
			src: '/static/images/p23.png',
			width: 600,
			height: 717,
		},
	},
];
