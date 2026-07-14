'use client';

import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function WorkHeader() {
    const headerRef = useRef<HTMLDivElement>(null);
    const line1Ref = useRef<HTMLSpanElement>(null);
    const line2Ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from([line1Ref.current, line2Ref.current], {
                y: '100%',
                duration: 1.2,
                ease: 'power3.out',
                stagger: 0.1,
                delay: 0.3,
            });
        }, headerRef);

        return () => ctx.revert();
    }, []);

    return (
        <header ref={headerRef} className="work-header-section">
            <div className="work-header-container">
                <div className="work-header-row">
                    <div className="work-header-col">
                        <h1 className="work-header-title">
                            <span className="work-header-line">
                                <span ref={line1Ref} className="work-header-line-inner">
                                    Creating next level
                                </span>
                            </span>
                            <span className="work-header-line">
                                <span ref={line2Ref} className="work-header-line-inner">
                                    digital products
                                </span>
                            </span>
                        </h1>
                    </div>
                </div>
            </div>
        </header>
    );
}
