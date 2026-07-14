'use client';

import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function CertificationsHeader() {
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
        <header ref={headerRef} className="certifications-header-section">
            <div className="certifications-header-container">
                <div className="certifications-header-row">
                    <div className="certifications-header-col">
                        <h1 className="certifications-header-title">
                            <span className="certifications-header-line">
                                <span ref={line1Ref} className="certifications-header-line-inner">
                                    Verified credentials
                                </span>
                            </span>
                            <span className="certifications-header-line">
                                <span ref={line2Ref} className="certifications-header-line-inner">
                                    and achievements
                                </span>
                            </span>
                        </h1>
                    </div>
                </div>
            </div>
        </header>
    );
}
