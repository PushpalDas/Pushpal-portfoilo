export type WorkTile = {
	title: string;
	description: string;
	image: {
		src: string;
		width: number;
		height: number;
	};
	carousel?: {
		src: string;
		width: number;
		height: number;
		title?: string;
		features?: string[];
		interested?: {
			category: string;
			items: string[];
		}[];
	}[];
	features?: string[];
	interested?: {
		category: string;
		items: string[];
	}[];
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
		carousel: [
			{
				src: '/static/images/ixana-wir-devices.png',
				width: 1024,
				height: 576,
				title:
					'Wi-R: Wire-Like Wireless. Ultra-Efficient Wireless Built for Human-AI Collaboration.',
			},
			{
				src: '/static/images/xana.png',
				width: 1024,
				height: 576,
				title: 'XANA — the Google of Ixana',
				features: [
					"Ixana's inbuilt multifile RAG based data singularity platform",
					'Vector search → Internal docs, meeting recordings, slides, spreadsheets, etc..',
					'Open any file, ask and find answers quick with XANA.',
					'No more jumping tabs, 10x efficient than third party babies',
					'Self adapting system, more we use, the smarter it gets',
					'AI system for Efficiency & Patents',
					'AI Product Planning OS',
					'On screen AI',
				],
				interested: [
					{
						category: '',
						items: ['Ixana'],
					},
				],
			},
			{
				src: '/static/images/wishkey.jpg',
				width: 1024,
				height: 576,
				title:
					'Wishkey ensures every key is tracked, every access is logged, and every return is verified.',
				features: [
					'Stand-alone plug-and-play solution',
					'Advanced RFID technology',
					'Android system, touch screen interface',
					'Access with SSO, RFID',
					'Air gap system',
					'Quick installation, can be put on the desk or fixed on the wall',
					'Backup battery optional',
				],
				interested: [
					{
						category: '',
						items: ['State Bank of India', 'Accenture'],
					},
				],
			},
		],
		features: [
			'High-Speed Data, 5-20 Mbit/s',
			'Ultra-Low Latency, <1 ms',
			'Physically Secure, <1m confinement',
			'Multi-Device Networks, Up to 16 devices',
			'50x More Efficient, 0.1-0.2 nJ/bit energy efficiency, a decade better than Bluetooth, NFC',
		],
		interested: [
			{
				category: 'Research Partners',
				items: ['Purdue University', 'NSF'],
			},
			{
				category: 'Government & Defense',
				items: [
					'U.S. Army',
					'USSOCOM',
					'Defense Innovation Unit',
					'U.S. Air Force',
				],
			},
			{
				category: 'Industry Partners',
				items: [
					'Tier-1 Smartphone OEM',
					'Tier-1 Wearables Partner',
					'Tier-1 Platform Partner',
				],
			},
		],
	},
];
