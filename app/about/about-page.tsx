'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import Contact from '../components/contact';
import './about.css';
import AboutHeader from './about-header';

gsap.registerPlugin(ScrollTrigger);

// Roles, companies and dates deliberately live on /experience, not here.
export default function AboutPage() {
	const pageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			for (const block of gsap.utils.toArray<HTMLElement>('.about-reveal')) {
				gsap.from(block, {
					y: 24,
					opacity: 0,
					duration: 0.9,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: block,
						start: 'top 88%',
						toggleActions: 'play none none reset',
					},
				});
			}
		}, pageRef);

		return () => ctx.revert();
	}, []);

	return (
		<div ref={pageRef} className='about-page'>
			<AboutHeader />

			<div className='about-content-wrap'>
				<div className='about-container'>
					<section className='about-section about-reveal'>
						<p className='about-section-label'>Curiosity came first</p>
						<p>
							As a child I wanted to know how each person builds a whole reality
							out of their own thoughts. I reasoned my way around that question
							for years and kept arriving back where I started.
						</p>
						<p>
							A camera helped. Through a lens I could borrow someone else&apos;s
							way of seeing, one frame at a time. I wanted to be a
							cinematographer.
						</p>
						<p>
							I chose engineering instead. In a lower-middle-class home the
							daily bread decides, and I made the choice with open eyes. What I
							kept was the lens. It turned out you can point it at circuits, and
							at people.
						</p>
					</section>

					<section className='about-section about-reveal'>
						<p className='about-section-label'>Learning what to build</p>
						<p>
							In college I fell for electronics — the plain fact of electrons
							moving, and what a person can make them do. I went looking for
							someone who loved this from the other side, the artistic side, and
							found Steve Jobs. One thing from his story stayed: he trusted his
							read of what people would want before they could say it. I
							recognised that instinct. I have run on it since — across ideas,
							design, business, and people.
						</p>
						<p>
							Then came the years with boards on a bench. Troubleshooting, the
							patience of finding out why a thing does not work, the first
							product that was mine end to end: what it should do, why, and
							whether it was good enough to ship.
						</p>
					</section>

					<p className='about-pull about-reveal'>
						I liked building. I love deciding what gets built, and why.
					</p>

					<section className='about-section about-reveal'>
						<p className='about-section-label'>How I work</p>
						<p>
							Hardware, embedded systems, semiconductors, AI — and today,
							wearable silicon and the Internet of Bodies at Ixana.
						</p>
						<p>
							The work is deciding what matters and what can wait, holding the
							line between engineering and the business, and staying with a
							product until it ships. I own efficiency, our AI programs,
							products, and patents.
						</p>
						<p>
							The rigour comes from two places: a Six Sigma Black Belt, and time
							in a lab learning that a board tells the truth even when the plan
							doesn&apos;t.
						</p>
					</section>

					<section className='about-section about-reveal'>
						<p className='about-section-label'>What I keep going back to</p>
						<p>
							Christensen&apos;s <em>The Innovator&apos;s Dilemma</em> explains
							why careful companies, doing everything right for their best
							customers, still get overtaken. I think about it whenever a
							roadmap starts to feel safe. Miller&apos;s <em>Chip War</em> is
							the other one — a useful reminder that in deep tech, the thing you
							are building is also the thing countries are counting.
						</p>
					</section>

					<section className='about-section about-reveal'>
						<p className='about-section-label'>The other lens</p>
						<p>
							I still photograph. The year I graduated I trained under Asit
							Poddar, a Kolkata artist. Satyajit Ray taught me how to see: a
							small, ordinary detail carries more than a speech.
						</p>
						<p>
							So I got the cinematographer&apos;s life sideways. The lens is
							mine. The frame holds people and problems instead of film.
						</p>
					</section>

					<section className='about-section about-reveal'>
						<p className='about-section-label'>If any of this resonates</p>
						<p>
							I want to keep building things that solve problems that actually
							matter, with people who care how it&apos;s done. Electrons, and a
							frame. That is still all it is.
						</p>
						<p>
							If you&apos;re working on something in that direction, write to me
							— I&apos;d like to hear about it.
						</p>
						<div className='about-close-links'>
							<a className='about-link' href='mailto:pushpaldas2001@gmail.com'>
								pushpaldas2001@gmail.com
							</a>
							<span className='about-link-sep'>/</span>
							<a
								className='about-link'
								href='https://www.linkedin.com/in/pushpaldas/'
								target='_blank'
								rel='noopener noreferrer'
							>
								LinkedIn
							</a>
						</div>
					</section>
				</div>
			</div>

			<Contact />
		</div>
	);
}
