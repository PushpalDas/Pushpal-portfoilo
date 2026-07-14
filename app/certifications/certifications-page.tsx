'use client';

import { useMemo, useState } from 'react';
import useBreakpoint from 'use-breakpoint';
import Contact from '../components/contact';
import { type FilterKey, certificationItems } from './constants';
import FloatingImage from './floating-image';
import type { CertificationModal } from './types';
import './certifications.css';
import CertificationsFilters from './certifications-filters';
import CertificationsGrid from './certifications-grid';
import CertificationsHeader from './certifications-header';
import CertificationsList from './certifications-list';

const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

export default function CertificationsPage() {
    const { breakpoint } = useBreakpoint(BREAKPOINTS);
    const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
    const [viewMode, setViewMode] = useState<'rows' | 'grid-2' | 'grid-4'>('rows');
    const [modal, setModal] = useState<CertificationModal>({ active: false, index: 0 });

    const filteredItems = useMemo(() => {
        if (activeFilter === 'all') return certificationItems;
        return certificationItems.filter((c) => c.categories.includes(activeFilter));
    }, [activeFilter]);

    return (
        <div className="certifications-page">
            <CertificationsHeader />
            <CertificationsFilters
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                viewMode={viewMode}
                setViewMode={setViewMode}
            />
            <div className="certifications-content-wrap">
                {viewMode === 'rows' ? (
                    <CertificationsList items={filteredItems} setModal={setModal} />
                ) : (
                    <CertificationsGrid items={filteredItems} gridColumns={viewMode === 'grid-4' ? 4 : 2} />
                )}
            </div>
            {breakpoint === 'desktop' && viewMode === 'rows' && (
                <FloatingImage modal={modal} items={filteredItems} />
            )}
            <Contact />
        </div>
    );
}
