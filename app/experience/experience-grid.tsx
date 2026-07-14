'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { ExperienceItem } from './types';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceGridProps {
    items: ExperienceItem[];
    gridColumns?: 2 | 4;
}

export default function ExperienceGrid({ items, gridColumns = 2 }: ExperienceGridProps) {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tiles = gridRef.current?.querySelectorAll('.experience-tile');
            if (tiles) {
                gsap.from(tiles, {
                    y: 60,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reset',
                    },
                });
            }
        }, gridRef);

        return () => ctx.revert();
    }, [items]);

    return (
        <section className="experience-grid-section" ref={gridRef}>
            <div className="experience-grid-container">
                <ul className={`experience-grid-items experience-grid-${gridColumns}`}>
                    {items.map((item) => (
                        <li key={item.title} className="experience-tile">
                            <div className="experience-tile-wrap">
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="experience-tile-link"
                                >
                                    <div className="experience-tile-image-col">
                                        <div className="experience-tile-image">
                                            <div
                                                className="experience-tile-image-bg"
                                                style={{ backgroundColor: item.color }}
                                            />
                                            {item.icon ? (
                                                <div className="experience-tile-icon-display">
                                                    {item.icon}
                                                </div>
                                            ) : (
                                                <Image
                                                    src={`/static/images/project/${item.src}`}
                                                    alt={item.title}
                                                    fill
                                                    className="experience-tile-img"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="timeline-row-title">{item.company}</div>
                                    <div className="experience-tile-title-col">
                                        <h4>
                                            <span>{item.title}</span>
                                        </h4>
                                        <div className="experience-tile-stripe" />
                                    </div>
                                    <div className="experience-tile-info-col">
                                        <p>{item.services}</p>
                                    </div>
                                    {gridColumns === 2 && (
                                        <div className="experience-tile-info-col">
                                            <p>{item.year}</p>
                                        </div>
                                    )}
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
