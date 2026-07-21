'use client';

import { useMemo, useState } from 'react';
import Contact from '../components/contact';
import { type FilterKey, experienceItems, filters } from './constants';
import FloatingImage from './floating-image';
import type { ExperienceModal } from './types';
import './experience.css';
import ExperienceFilters from './experience-filters';
import ExperienceGrid from './experience-grid';
import ExperienceHeader from './experience-header';

import LiveTrial from './live-trial';
import ExperienceTimeline from './experience-timeline';

export default function ExperiencePage() {
	const [activeFilter, setActiveFilter] = useState<FilterKey>('professional');

	const EXPERIENCE_CATEGORY_ORDER = [
		'professional',
		'entrepreneurship',
		'industrial',
		'education',
	];

	// Filter items based on active filter (same pattern as work page)
	const filteredItems = useMemo(() => {
		if (activeFilter !== 'all') {
			return experienceItems.filter((e) => e.categories.includes(activeFilter));
		}
		// Sort by category priority
		return [...experienceItems].sort((a, b) => {
			const aPriority = EXPERIENCE_CATEGORY_ORDER.findIndex((cat) =>
				a.categories.some((c) => c.toLowerCase() === cat),
			);
			const bPriority = EXPERIENCE_CATEGORY_ORDER.findIndex((cat) =>
				b.categories.some((c) => c.toLowerCase() === cat),
			);
			const aIdx =
				aPriority === -1 ? EXPERIENCE_CATEGORY_ORDER.length : aPriority;
			const bIdx =
				bPriority === -1 ? EXPERIENCE_CATEGORY_ORDER.length : bPriority;
			return aIdx - bIdx;
		});
	}, [activeFilter]);

	// Compute dynamic subtitle based on current filtered items
	const timelineSubtitle = useMemo(() => {
		if (filteredItems.length === 0) return '';

		const years = filteredItems
			.flatMap((item) => {
				const getYear = (str: string) => {
					if (str === 'present' || !str) return new Date().getFullYear();
					const parts = str.split(' ');
					return parseInt(parts[parts.length - 1]);
				};
				return [getYear(item.startDate), getYear(item.endDate || 'present')];
			})
			.filter((y) => !isNaN(y));

		if (years.length === 0) return '';

		const minYear = Math.min(...years);
		const hasPresent = filteredItems.some((item) => item.endDate === 'present');
		const maxYearStr = hasPresent ? 'present' : Math.max(...years).toString();

		return `From ${minYear} to ${maxYearStr} - In one timeline`;
	}, [filteredItems]);

	// State for modal
	const [modal, setModal] = useState<ExperienceModal>({
		active: false,
		index: 0,
	});

	return (
		<div className='experience-page'>
			<ExperienceHeader
				subtitle={timelineSubtitle}
				filters={
					<ExperienceFilters
						activeFilter={activeFilter}
						setActiveFilter={setActiveFilter}
					/>
				}
			/>
			<ExperienceTimeline items={filteredItems} />
			<Contact />
		</div>
	);
}
