'use client';

import gsap from 'gsap';
import { useEffect, useRef } from 'react';

interface WorkHeaderProps {
	filters?: React.ReactNode;
}

export default function WorkHeader({ filters }: WorkHeaderProps) {
	const headerRef = useRef<HTMLDivElement>(null);
	const line1Ref = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from([line1Ref.current], {
				y: '100%',
				duration: 1.2,
				ease: 'power3.out',
				delay: 0.3,
			});
		}, headerRef);

		return () => ctx.revert();
	}, []);

	return (
		<header ref={headerRef} className='work-header-section'>
			<div className='work-header-container'>
				<div className='work-header-row'>
					<div className='work-header-col'>
						<h1 className='work-header-title'>
							<span className='work-header-line'>
								<span ref={line1Ref} className='work-header-line-inner'>
									From Silicon to AI
								</span>
							</span>
						</h1>
						<div className='work-header-subline-wrap'>
							{/* The scannable line: named tools, for a recruiter reading in
							    seconds. Every keyword here is one the case studies can back —
							    see the tags in data/case-studies.json. */}
							<p className='work-header-stack'>
								Product management · Program management · Project management ·
								RTL · AMS · Embedded firmware · Body area networks · Python ·
								FastAPI · NumPy · Next.js · React · Three.js · PostgreSQL ·
								Azure AD · JWT · RAG · Dense retrieval (bge-m3) · LLM re-ranking
								· nDCG evaluation · Multi-agent LLM systems · Microsoft Graph ·
								ClickUp API · Google Calendar API · Webhooks · n8n · Excel and
								Google Sheets dashboards
							</p>
							<p className='work-header-subline'>
								Silicon delivery, embedded firmware and board bring-up, RAG
								retrieval and evaluation, multi-agent LLM systems, and the
								internal platforms built around them.
							</p>
							<p className='work-header-sample-note'>
								Sample portfolio — body area network silicon, RAG platforms and
								internal tools. Figures on the cards and case study pages are
								invented placeholders, and screens are recreations.
							</p>
						</div>
					</div>
					{filters && <div className='work-header-filters'>{filters}</div>}
				</div>
			</div>
		</header>
	);
}
