'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import './experience-timeline.css';
import type { ExperienceItem } from './types';

gsap.registerPlugin(ScrollTrigger);

// Parse date string like "Nov 2023" to Date object
const parseDate = (dateStr: string): Date => {
	if (dateStr === 'present') return new Date();
	const [month, year] = dateStr.split(' ');
	const monthMap: { [key: string]: number } = {
		Jan: 0,
		Feb: 1,
		Mar: 2,
		Apr: 3,
		May: 4,
		Jun: 5,
		Jul: 6,
		Aug: 7,
		Sep: 8,
		Oct: 9,
		Nov: 10,
		Dec: 11,
	};
	return new Date(parseInt(year), monthMap[month] || 0, 1);
};

// Calculate years between dates
const calculateYears = (startDate: string, endDate?: string): string => {
	const start = parseDate(startDate);
	const end = endDate ? parseDate(endDate) : new Date();
	const diffMs = end.getTime() - start.getTime();
	const diffYears = diffMs / (1000 * 60 * 60 * 24 * 365.25);

	if (diffYears >= 1) {
		return `${Math.floor(diffYears)} yr${Math.floor(diffYears) > 1 ? 's' : ''}`;
	}
	const diffMonths = diffMs / (1000 * 60 * 60 * 24 * 30.44);
	return `${Math.floor(diffMonths)} mo`;
};

// Get timeline min and max years
const getTimelineRange = (items: ExperienceItem[]) => {
	const allDates = items.flatMap((item) => [
		item.startDate,
		item.endDate || 'present',
	]);
	const dates = allDates.map((d) => parseDate(d));
	const minYear = Math.min(...dates.map((d) => d.getFullYear()));

	const maxYearExact = Math.max(...dates.map((d) => d.getFullYear()));
	// If any date is past January of the max year (e.g. present day), pad maxYear by 1
	// so the timeline track has space to show the bar crossing the maxYear exact marker.
	const hasPartialFinalYear = dates.some(
		(d) => d.getFullYear() === maxYearExact && d.getMonth() > 0,
	);
	const maxYear = hasPartialFinalYear ? maxYearExact + 1 : maxYearExact;

	return { minYear, maxYear };
};

// Calculate position on timeline
const getTimelinePosition = (date: string, items: ExperienceItem[]): number => {
	const { minYear, maxYear } = getTimelineRange(items);
	const d = parseDate(date);
	const year = d.getFullYear() + d.getMonth() / 12;
	return ((year - minYear) / (maxYear - minYear)) * 100;
};

interface ExperienceTimelineProps {
	items: ExperienceItem[];
}

export default function ExperienceTimeline({ items }: ExperienceTimelineProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const { minYear, maxYear } = getTimelineRange(items);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const bars = containerRef.current?.querySelectorAll('.timeline-bar');
			if (bars) {
				gsap.fromTo(
					bars,
					{ scaleX: 0, opacity: 0 },
					{
						scaleX: 1,
						opacity: 1,
						duration: 0.8,
						stagger: 0.05,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: containerRef.current,
							start: 'top 80%',
							end: 'center 50%',
							toggleActions: 'play none none reverse',
						},
						transformOrigin: 'left',
					},
				);
			}
		}, containerRef);

		return () => ctx.revert();
	}, []);

	const sortedItems = [...items].sort(
		(a, b) =>
			parseDate(b.startDate).getTime() - parseDate(a.startDate).getTime(),
	);

	return (
		<div className='experience-timeline-section' ref={containerRef}>
			<div className='timeline-container'>
				{/* Horizontal Timeline */}
				<div className='timeline-horizontal'>
					<div
						className='timeline-row'
						style={{ alignItems: 'end', marginBottom: '1rem' }}
					>
						<div className='timeline-row-title'></div>
						<div className='years-axis'>
							{Array.from(
								{ length: maxYear - minYear + 1 },
								(_, i) => minYear + i,
							).map((year) => {
								const pos = ((year - minYear) / (maxYear - minYear)) * 100;
								return (
									<div
										key={year}
										className='year-label'
										style={{ left: `${pos}%` }}
									>
										{year}
									</div>
								);
							})}
						</div>
						<div className='timeline-row-duration'></div>
					</div>

					<div className='timeline-bars-container'>
						{sortedItems.map((item, idx) => {
							const startPos = getTimelinePosition(item.startDate, items);
							const endPos = getTimelinePosition(
								item.endDate || 'present',
								items,
							);
							const width = endPos - startPos;

							return (
								<motion.div
									key={`${item.title}-${idx}`}
									className='timeline-row'
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									transition={{ delay: idx * 0.05 }}
								>
									<div className='timeline-row-title'>{item.company}</div>
									<div className='timeline-bars-track'>
										<motion.div
											className='timeline-bar'
											style={{
												left: `${startPos}%`,
												width: `${width}%`,
												backgroundColor: item.color,
											}}
											whileHover={{ scaleY: 1.4 }}
											transition={{
												type: 'spring',
												stiffness: 300,
												damping: 20,
											}}
										>
											{width >= 40 && (
												<span className='bar-designation inside'>
													{item.title}
												</span>
											)}
											{width < 40 && (
												<span
													className='bar-designation outside'
													style={
														startPos > 50
															? {
																	right: '100%',
																	left: 'auto',
																	textAlign: 'right',
																	paddingRight: '0.8rem',
																}
															: {
																	left: '100%',
																	right: 'auto',
																	textAlign: 'left',
																	paddingLeft: '0.8rem',
																}
													}
												>
													{item.title}
												</span>
											)}
											<div className='bar-label'>
												<span className='bar-label-dates'>
													{item.startDate}
													{item.endDate &&
														item.endDate !== 'present' &&
														` - ${item.endDate}`}
													{item.endDate === 'present' && ' - Now'}
												</span>
												<span className='bar-label-services'>
													{item.services}
												</span>
											</div>
										</motion.div>
									</div>
									<div className='timeline-row-duration'>{item.duration}</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
