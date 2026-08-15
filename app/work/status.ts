export const WORK_STATUSES = {
	production: { label: 'In production', colorClass: 'status-green' },
	internal: { label: 'Shipped internally', colorClass: 'status-green' },
	'customer-testing': {
		label: 'In customer testing',
		colorClass: 'status-amber',
	},
	prototype: { label: 'Prototype', colorClass: 'status-muted' },
	research: { label: 'Research', colorClass: 'status-muted' },
} as const;

export type WorkStatus = keyof typeof WORK_STATUSES;

export const WORK_STATUS_ORDER: Record<WorkStatus | 'none', number> = {
	production: 1,
	internal: 2,
	'customer-testing': 3,
	prototype: 4,
	research: 5,
	none: 6,
};
