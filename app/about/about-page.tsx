'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import SectionContainer from '../components/layouts/section-container';
import { merryWeather } from '../fonts';

export default function AboutPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="min-h-screen">
            <SectionContainer>
                <div className="py-16 md:py-24">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-20"
                    >
                        <div className="max-w-4xl mx-auto text-center">
                            <h1 className={`text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent ${merryWeather.className}`}>
                                About Me
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                Crafting digital experiences at the intersection of technology and human-centered design
                            </p>
                        </div>
                    </motion.div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                        {/* Left Column - Story */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div className="space-y-6">
                                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
                                    The Journey
                                </h2>
                                <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                                    <p>
                                        My journey began in the vibrant tech ecosystem of Bangalore, where I first discovered
                                        the magic of turning ideas into reality through code. What started as curiosity about
                                        how websites work evolved into a deep passion for creating meaningful digital experiences.
                                    </p>
                                    <p>
                                        Today, I blend my engineering expertise with product management insights and AI innovation
                                        to build solutions that matter. Whether it's developing scalable web applications,
                                        architecting AI-powered platforms, or leading cross-functional teams, I approach each
                                        challenge with the same meticulous attention to detail that defines great design.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
                                    Design Philosophy
                                </h2>
                                <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                                    <p>
                                        I believe great design is invisible. It's the seamless user experience that feels
                                        natural, the code that runs flawlessly, and the solutions that solve real problems
                                        without unnecessary complexity.
                                    </p>
                                    <p>
                                        Drawing inspiration from Apple's design principles, I focus on simplicity, elegance,
                                        and human-centered thinking. Every pixel, every interaction, every line of code
                                        serves a purpose in creating something beautiful and functional.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column - Skills & Values */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 30 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="space-y-8"
                        >
                            {/* Skills */}
                            <div className="space-y-6">
                                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
                                    Expertise
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        'Full-Stack Development',
                                        'Product Management',
                                        'AI/ML Engineering',
                                        'UI/UX Design',
                                        'System Architecture',
                                        'Team Leadership'
                                    ].map((skill, index) => (
                                        <motion.div
                                            key={skill}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
                                            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300"
                                        >
                                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {skill}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Values */}
                            <div className="space-y-6">
                                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
                                    Values
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        {
                                            title: 'Innovation',
                                            description: 'Constantly exploring new technologies and methodologies to push boundaries'
                                        },
                                        {
                                            title: 'Excellence',
                                            description: 'Delivering high-quality work that stands the test of time'
                                        },
                                        {
                                            title: 'Collaboration',
                                            description: 'Building strong relationships and working effectively with diverse teams'
                                        },
                                        {
                                            title: 'Impact',
                                            description: 'Creating solutions that make a meaningful difference'
                                        }
                                    ].map((value, index) => (
                                        <motion.div
                                            key={value.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                                            transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                                            className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800"
                                        >
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                                {value.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                                {value.description}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Call to Action */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="text-center"
                    >
                        <div className="max-w-2xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                Let's Create Something Amazing
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                I'm always excited to collaborate on projects that challenge conventions and create
                                exceptional user experiences. Whether you're looking to build something new or
                                improve something existing, I'd love to hear about it.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="/work"
                                    className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300"
                                >
                                    View My Work
                                </a>
                                <a
                                    href="/contact"
                                    className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
                                >
                                    Get In Touch
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </SectionContainer>
        </div>
    );
}