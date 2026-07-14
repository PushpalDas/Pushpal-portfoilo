'use client';

import { useMemo } from 'react';
import Magnetic from '../components/Magnetic';
import { type FilterKey, filters, workItems } from './constants';

interface WorkFiltersProps {
    activeFilter: FilterKey;
    setActiveFilter: (filter: FilterKey) => void;
    subFilters: string[];
    activeSubFilter: string | null;
    setSubFilter: (filter: string | null) => void;
    viewMode: 'rows' | 'grid-2' | 'grid-4';
    setViewMode: (mode: 'rows' | 'grid-2' | 'grid-4') => void;
}

export default function WorkFilters({
    activeFilter,
    setActiveFilter,
    subFilters,
    activeSubFilter,
    setSubFilter,
    viewMode,
    setViewMode,
}: WorkFiltersProps) {
    const counts = useMemo(() => {
        const c: Record<string, number> = {};
        for (const f of filters) {
            if (f.key === 'all') {
                c[f.key] = workItems.length;
            } else {
                c[f.key] = workItems.filter((w) =>
                    w.categories.includes(f.key),
                ).length;
            }
        }
        return c;
    }, []);

    return (
        <section className="work-filters-section">
            <div className="work-filters-container">
                <div className="work-filters-row">
                    <div className="work-filters-toggle-row">
                        {filters
                            .filter((f) => !['ai', 'hardware', 'others'].includes(f.key))
                            .map((f) => (
                                <Magnetic key={f.key} strength={15}>
                                    <button
                                        type="button"
                                        className={`work-filter-btn${activeFilter === f.key ? ' active' : ''}`}
                                        onClick={() => setActiveFilter(f.key)}
                                    >
                                        <span className="work-filter-btn-fill" />
                                        <span className="work-filter-btn-text">
                                            {f.label}
                                            {f.key !== 'all' && counts[f.key] > 0 && (
                                                <span className="work-filter-count">{counts[f.key]}</span>
                                            )}
                                        </span>
                                    </button>
                                </Magnetic>
                            ))}
                    </div>

                    {filters.some((f) => ['ai', 'hardware', 'others'].includes(f.key)) && (
                        <div className="work-filters-tech-row">
                            <span className="work-filter-group-header">Tech type</span>
                            {filters
                                .filter((f) => ['ai', 'hardware', 'others'].includes(f.key))
                                .map((f) => (
                                    <Magnetic key={f.key} strength={15}>
                                        <button
                                            type="button"
                                            className={`work-filter-btn work-filter-tech-btn${activeSubFilter === f.key ? ' active' : ''}`}
                                            onClick={() => setSubFilter(activeSubFilter === f.key ? null : f.key)}
                                        >
                                            <span className="work-filter-btn-fill" />
                                            <span className="work-filter-btn-text">
                                                <span className="work-tech-bullet">•</span>
                                                {f.label}
                                                {counts[f.key] > 0 && (
                                                    <span className="work-filter-count">{counts[f.key]}</span>
                                                )}
                                            </span>
                                        </button>
                                    </Magnetic>
                                ))}
                        </div>
                    )}
                    <div className="work-filters-grid-row">
                        <Magnetic strength={20}>
                            <button
                                type="button"
                                className={`work-grid-btn${viewMode === 'rows' ? ' active' : ''}`}
                                onClick={() => setViewMode('rows')}
                                aria-label="Rows view"
                                title="List view"
                            >
                                <span className="work-grid-btn-fill" />
                                <span className="work-grid-btn-text">
                                    <svg width="20" height="19" viewBox="0 0 20 19">
                                        <g fill="currentColor" fillRule="evenodd">
                                            <path d="M0 6h20v1H0zM0 0h20v1H0zM0 12h20v1H0zM0 18h20v1H0z" />
                                        </g>
                                    </svg>
                                </span>
                            </button>
                        </Magnetic>
                        <Magnetic strength={20}>
                            <button
                                type="button"
                                className={`work-grid-btn${viewMode === 'grid-2' ? ' active' : ''}`}
                                onClick={() => setViewMode('grid-2')}
                                aria-label="2 column grid view"
                                title="2-column grid"
                            >
                                <span className="work-grid-btn-fill" />
                                <span className="work-grid-btn-text">
                                    <svg width="20" height="20" viewBox="0 0 20 20">
                                        <g fill="currentColor" fillRule="nonzero">
                                            <path d="M9 0H0v9h9V0zM8 1v7H1V1h7zM20 0h-9v9h9V0zm-1 1v7h-7V1h7zM9 11H0v9h9v-9zm-1 1v7H1v-7h7zM20 11h-9v9h9v-9zm-1 1v7h-7v-7h7z" />
                                        </g>
                                    </svg>
                                </span>
                            </button>
                        </Magnetic>
                        <Magnetic strength={20}>
                            <button
                                type="button"
                                className={`work-grid-btn${viewMode === 'grid-4' ? ' active' : ''}`}
                                onClick={() => setViewMode('grid-4')}
                                aria-label="4 column grid view"
                                title="4-column grid"
                            >
                                <span className="work-grid-btn-fill" />
                                <span className="work-grid-btn-text">
                                    <svg width="20" height="20" viewBox="0 0 20 20">
                                        <g fill="currentColor" fillRule="nonzero">
                                            <path d="M4 0H0v4h4V0zm1 1v2H1V1h4zM10 0H6v4h4V0zm1 1v2H7V1h4zM16 0h-4v4h4V0zm1 1v2h-4V1h4zM4 6H0v4h4V6zm1 1v2H1V7h4zM10 6H6v4h4V6zm1 1v2H7V7h4zM16 6h-4v4h4V6zm1 1v2h-4V7h4zM4 12H0v4h4v-4zm1 1v2H1v-2h4zM10 12H6v4h4v-4zm1 1v2H7v-2h4zM16 12h-4v4h4v-4zm1 1v2h-4v-2h4z" />
                                        </g>
                                    </svg>
                                </span>
                            </button>
                        </Magnetic>
                    </div>
                </div>
                {/* secondary filters (sub-categories) */}
                {subFilters.length > 0 && (
                    <div className="work-subfilters-row">
                        {subFilters.map((tag) => (
                            <Magnetic key={tag} strength={15}>
                                <button
                                    type="button"
                                    className={`work-filter-btn${activeSubFilter === tag ? ' active' : ''}`}
                                    onClick={() => setSubFilter(activeSubFilter === tag ? null : tag)}
                                >
                                    <span className="work-filter-btn-fill" />
                                    <span className="work-filter-btn-text">{tag}</span>
                                </button>
                            </Magnetic>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
