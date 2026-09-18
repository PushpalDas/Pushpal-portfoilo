/**
 * Dynamic route: /certifications/[slug]
 *
 * Every record on /certifications has a page here — one certificate or nine,
 * a course or an award. The grid links; nothing opens in place.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { certificationItems } from '../constants';
import { detailOf } from '../format';
import CertificationDetail from './certification-detail';

function findCertification(slug: string) {
	return certificationItems.find((item) => item.slug === slug);
}

export function generateStaticParams() {
	return certificationItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const item = findCertification(slug);

	if (!item) return { title: 'Certifications — Pushpal Das' };

	return {
		title: `${item.title.trim()} — Pushpal Das`,
		description: detailOf(item),
	};
}

export default async function CertificationSlugPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const item = findCertification(slug);

	if (!item) notFound();

	return <CertificationDetail item={item} />;
}
