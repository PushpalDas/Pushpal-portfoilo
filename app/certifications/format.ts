import type { CertificationItem } from './types';

/**
 * Shared by the viewer (a client component) and the detail page (a server
 * one), so it lives outside both rather than being imported across the
 * boundary.
 */

/** 'Null' is in the data as a literal string, and is not a place. */
export const real = (v: string | undefined): string => {
	const t = v?.trim() ?? '';
	return t && t.toLowerCase() !== 'null' ? t : '';
};

/** Categories carry duplicates in different cases: ['Management','management']. */
export function categoriesOf(item: CertificationItem): string[] {
	const seen = new Set<string>();
	const out: string[] = [];
	for (const c of item.categories) {
		const key = c.trim().toLowerCase();
		if (!key || seen.has(key)) continue;
		seen.add(key);
		out.push(key[0].toUpperCase() + key.slice(1));
	}
	return out;
}

/**
 * The line or two under the title.
 *
 * A certificate is not a case study, so this stays to what the record
 * actually holds — issuer, year, and what it is filed under. Anything
 * richer belongs in `summary`, written by hand against the certificate
 * itself, and is used instead when it is there.
 */
export function detailOf(item: CertificationItem): string {
	if (real(item.summary)) return item.summary as string;

	const issuer = real(item.services);
	const year = real(item.year);
	const where = real(item.location);
	const cats = categoriesOf(item);

	const first = issuer
		? `Issued by ${issuer}${year ? ` in ${year}` : ''}.`
		: year
			? `Awarded in ${year}.`
			: '';
	const second = cats.length
		? `Filed under ${cats.join(', ').toLowerCase()}.`
		: '';
	const third = where && where !== issuer ? `Programme run by ${where}.` : '';

	return [first, third, second].filter(Boolean).join(' ');
}
