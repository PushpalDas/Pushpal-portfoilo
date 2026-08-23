import type { WorkItem } from './types';

export function workSlug(item: Pick<WorkItem, 'title'>) {
	return item.title
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '')
		.slice(0, 72);
}
