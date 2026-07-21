'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import './live-trial.css';

gsap.registerPlugin(ScrollTrigger);

interface LiveTrialStats {
	label: string;
	value: string;
	suffix?: string;
}

const stats: LiveTrialStats[] = [
	{ label: 'Years Experience', value: '5', suffix: '+' },
	{ label: 'Projects Delivered', value: '50', suffix: '+' },
	{ label: 'Happy Clients', value: '30', suffix: '+' },
	{ label: 'Tech Stack Mastered', value: '20', suffix: '+' },
];

const skills = [
	'React',
	'Next.js',
	'TypeScript',
	'Node.js',
	'Tailwind CSS',
	'GSAP',
	'GraphQL',
	'MongoDB',
];

export default function LiveTrial() {
	const containerRef = useRef<HTMLDivElement>(null);
	const statsRef = useRef<HTMLDivElement>(null);
	const skillsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Animate stats
			const statItems = statsRef.current?.querySelectorAll('.stat-item');
			if (statItems) {
				gsap.from(statItems, {
					y: 40,
					opacity: 0,
					duration: 0.8,
					stagger: 0.15,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: statsRef.current,
						start: 'top 80%',
						toggleActions: 'play none none reset',
					},
				});
			}

			// Animate skills
			const skillItems = skillsRef.current?.querySelectorAll('.skill-badge');
			if (skillItems) {
				gsap.from(skillItems, {
					scale: 0,
					opacity: 0,
					duration: 0.6,
					stagger: 0.08,
					ease: 'back.out',
					scrollTrigger: {
						trigger: skillsRef.current,
						start: 'top 80%',
						toggleActions: 'play none none reset',
					},
				});
			}
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<section className='live-trial-section' ref={containerRef}>
			<div className='live-trial-container'>
				{/* Header */}
				<div className='live-trial-header'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className='live-trial-badge'
					>
						<span className='live-indicator'>●</span> Currently Working
					</motion.div>
					<h2 className='live-trial-title'>
						<span className='title-line'>Full Stack Developer</span>
						<span className='title-line'>at Tech Company</span>
					</h2>
					<p className='live-trial-description'>
						Building scalable web applications with modern technologies and
						pushing the boundaries of what's possible.
					</p>
				</div>

				{/* Main Grid */}
				<div className='live-trial-grid'>
					{/* Left: Current Role Card */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className='live-trial-card role-card'
					>
						<div className='card-header'>
							<h3>Current Role</h3>
							<div className='role-badge'>Active</div>
						</div>
						<div className='role-content'>
							<div className='role-item'>
								<span className='role-label'>Position</span>
								<p className='role-value'>Full Stack Developer</p>
							</div>
							<div className='role-item'>
								<span className='role-label'>Company</span>
								<p className='role-value'>Your Company Name</p>
							</div>
							<div className='role-item'>
								<span className='role-label'>Focus</span>
								<p className='role-value'>Web Development & Architecture</p>
							</div>
							<div className='role-item'>
								<span className='role-label'>Start Date</span>
								<p className='role-value'>January 2024</p>
							</div>
						</div>
					</motion.div>

					{/* Right: Stats */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						ref={statsRef}
						className='live-trial-stats'
					>
						<div className='stats-grid'>
							{stats.map((stat, index) => (
								<div key={index} className='stat-item'>
									<div className='stat-value'>
										{stat.value}
										{stat.suffix && (
											<span className='stat-suffix'>{stat.suffix}</span>
										)}
									</div>
									<div className='stat-label'>{stat.label}</div>
								</div>
							))}
						</div>
					</motion.div>
				</div>

				{/* Skills Showcase */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					viewport={{ once: true }}
					ref={skillsRef}
					className='live-trial-skills'
				>
					<h3 className='skills-title'>Tech Stack</h3>
					<div className='skills-container'>
						{skills.map((skill, index) => (
							<motion.div
								key={skill}
								whileHover={{ scale: 1.05, y: -5 }}
								className='skill-badge'
							>
								{skill}
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Visual Divider */}
				<div className='live-trial-divider' />
			</div>
		</section>
	);
}
