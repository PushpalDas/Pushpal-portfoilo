'use client';

import { useMemo, useState } from 'react';
import useBreakpoint from 'use-breakpoint';
import Contact from '../components/contact';
import { type FilterKey, workItems } from './constants';
import FloatingImage from './floating-image';
import type { WorkModal } from './types';
import './work.css';
import WorkFilters from './work-filters';
import WorkGrid from './work-grid';
import WorkHeader from './work-header';
import WorkList from './work-list';

const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

export default function WorkPage() {
    const { breakpoint } = useBreakpoint(BREAKPOINTS);
    const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
    const [subFilter, setSubFilter] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'rows' | 'grid-2' | 'grid-4'>('rows');
    const [modal, setModal] = useState<WorkModal>({ active: false, index: 0 });

    // main filtered items based on primary + secondary filter
    const filteredItems = useMemo(() => {
        let items = workItems;
        if (activeFilter !== 'all') {
            items = items.filter((w) => w.categories.includes(activeFilter));
        }
        if (subFilter) {
            items = items.filter((w) => w.categories.includes(subFilter));
        }
        return items;
    }, [activeFilter, subFilter]);

    // compute available sub-filters whenever primary filter changes
    const availableSubFilters = useMemo(() => {
        if (activeFilter === 'all') return [];
        const items = workItems.filter((w) => w.categories.includes(activeFilter));
        const tags = new Set<string>();
        items.forEach((w) => {
            w.categories.forEach((c) => {
                if (c !== activeFilter) tags.add(c);
            });
        });
        return Array.from(tags);
    }, [activeFilter]);

    return (
        <div className="work-page">
            <WorkHeader />
            <WorkFilters
                activeFilter={activeFilter}
                setActiveFilter={(f) => {
                    setActiveFilter(f);
                    setSubFilter(null);
                }}
                subFilters={availableSubFilters}
                activeSubFilter={subFilter}
                setSubFilter={setSubFilter}
                viewMode={viewMode}
                setViewMode={setViewMode}
            />
            <div className="work-content-wrap">
                {viewMode === 'rows' ? (
                    <WorkList items={filteredItems} setModal={setModal} />
                ) : (
                    <WorkGrid items={filteredItems} gridColumns={viewMode === 'grid-4' ? 4 : 2} />
                )}
            </div>
            {breakpoint === 'desktop' && viewMode === 'rows' && (
                <FloatingImage modal={modal} items={filteredItems} />
            )}
            <Contact />
        </div>
    );
}
