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

    // Filter items based on active filter (same pattern as work page)
    const filteredItems = useMemo(() => {
        if (activeFilter === 'all') return experienceItems;
        return experienceItems.filter((e) => e.categories.includes(activeFilter));
    }, [activeFilter]);

    // Compute dynamic subtitle based on current filtered items
    const timelineSubtitle = useMemo(() => {
        if (filteredItems.length === 0) return '';
        
        const years = filteredItems.flatMap(item => {
            const getYear = (str: string) => {
                if (str === 'present' || !str) return new Date().getFullYear();
                const parts = str.split(' ');
                return parseInt(parts[parts.length - 1]);
            };
            return [getYear(item.startDate), getYear(item.endDate || 'present')];
        }).filter(y => !isNaN(y));
        
        if (years.length === 0) return '';
        
        const minYear = Math.min(...years);
        const hasPresent = filteredItems.some(item => item.endDate === 'present');
        const maxYearStr = hasPresent ? 'present' : Math.max(...years).toString();
        
        return `From ${minYear} to ${maxYearStr} - All my experience in one timeline`;
    }, [filteredItems]);

    // State for modal
    const [modal, setModal] = useState<ExperienceModal>({ active: false, index: 0 });

    return (
        <div className="experience-page">
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
            <LiveTrial />
            <div className="experience-content-wrap">
                <ExperienceGrid items={filteredItems} gridColumns={2} />
            </div>
            <FloatingImage modal={modal} items={filteredItems} />
            <Contact />
        </div>
    );
}
