'use client';

import { useEffect, useRef, useState } from 'react';
import Magnetic from '../components/Magnetic';
import SplashCursor from '../components/splash-cursor';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

const SUGGESTIONS = [
    'What does Pushpal do?',
    'What tech stack does he use?',
    'Tell me about his projects',
    'How can I reach him?',
];

export default function AskMeChatbot() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const endRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // Auto-resize textarea
    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
    }, [input]);

    const send = (text?: string) => {
        const msg = (text || input).trim();
        if (!msg || isTyping) return;

        setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'user', content: msg }]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { id: (Date.now() + 1).toString(), role: 'assistant', content: getResponse(msg) },
            ]);
            setIsTyping(false);
        }, 1000 + Math.random() * 800);
    };

    const hasMessages = messages.length > 0;

    return (
        <SplashCursor
            containerClassName="min-h-svh w-screen"
            usePrimaryColors={true}
            SPLAT_RADIUS={0.3}
            SPLAT_FORCE={5000}
            BACK_COLOR={{ r: 0, g: 0, b: 0 }}
            TRANSPARENT={false}
        >
            <div className="askme">
                {/* Empty state / Welcome */}
                {!hasMessages && (
                    <div className="askme-welcome">
                        <div className="askme-logo">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <h1 className="askme-welcome-title">What would you like to know about Pushpal?</h1>
                        <div className="askme-chips">
                            {SUGGESTIONS.map((q) => (
                                <Magnetic key={q} strength={12}>
                                    <button type="button" className="askme-chip" onClick={() => send(q)}>
                                        <span className="askme-chip-text">{q}</span>
                                        <svg className="askme-chip-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M7 17L17 7M17 7H7M17 7v10" />
                                        </svg>
                                    </button>
                                </Magnetic>
                            ))}
                        </div>
                    </div>
                )}

                {/* Messages */}
                {hasMessages && (
                    <div className="askme-messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`askme-row ${msg.role === 'user' ? 'askme-row-user' : 'askme-row-bot'}`}>
                                <div className="askme-row-inner">
                                    {msg.role === 'assistant' && (
                                        <div className="askme-icon">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="askme-content">
                                        <p>{msg.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="askme-row askme-row-bot">
                                <div className="askme-row-inner">
                                    <div className="askme-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                        </svg>
                                    </div>
                                    <div className="askme-content">
                                        <div className="askme-dots">
                                            <span /><span /><span />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={endRef} />
                    </div>
                )}

                {/* Input bar — pinned at bottom */}
                <div className="askme-bottom">
                    <div className="askme-input-bar">
                        <textarea
                            ref={textareaRef}
                            className="askme-textarea"
                            placeholder="Ask anything about Pushpal..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    send();
                                }
                            }}
                            rows={1}
                        />
                        <Magnetic strength={25}>
                            <button
                                type="button"
                                className={`askme-send ${input.trim() ? 'active' : ''}`}
                                onClick={() => send()}
                                disabled={!input.trim() || isTyping}
                                aria-label="Send"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 19V5M5 12l7-7 7 7" />
                                </svg>
                            </button>
                        </Magnetic>
                    </div>
                    <p className="askme-footer">AI assistant that knows about Pushpal. Responses are simulated.</p>
                </div>

                <style>{`
					.askme {
						min-height: 100svh;
						width: 100%;
						display: flex;
						flex-direction: column;
						position: relative;
					}

					/* ── Welcome (empty state) ── */
					.askme-welcome {
						flex: 1;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						padding: 6rem 1.5rem 10rem;
						text-align: center;
						gap: 1.5rem;
					}

					.askme-logo {
						width: 56px;
						height: 56px;
						border-radius: 50%;
						background: rgba(255,255,255,0.05);
						border: 1px solid rgba(255,255,255,0.1);
						display: flex;
						align-items: center;
						justify-content: center;
						color: rgba(255,255,255,0.7);
					}

					.askme-welcome-title {
						font-size: clamp(1.4rem, 3vw, 2rem);
						font-weight: 600;
						color: #fff;
						margin: 0;
						letter-spacing: -0.025em;
						max-width: 500px;
						line-height: 1.25;
					}

					.askme-chips {
						display: grid;
						grid-template-columns: repeat(2, 1fr);
						gap: 0.5rem;
						max-width: 480px;
						width: 100%;
						margin-top: 0.5rem;
					}

					.askme-chip {
						display: flex;
						align-items: center;
						justify-content: space-between;
						gap: 0.5rem;
						padding: 0.85rem 1rem;
						border-radius: 14px;
						border: 1px solid rgba(255,255,255,0.08);
						background: rgba(255,255,255,0.03);
						color: rgba(255,255,255,0.6);
						font-size: 0.8rem;
						text-align: left;
						cursor: pointer;
						transition: all 0.25s ease;
						font-family: inherit;
						line-height: 1.35;
					}

					.askme-chip:hover {
						background: rgba(255,255,255,0.07);
						border-color: rgba(255,255,255,0.15);
						color: #fff;
					}

					.askme-chip-arrow {
						flex-shrink: 0;
						opacity: 0;
						transition: opacity 0.2s ease;
					}

					.askme-chip:hover .askme-chip-arrow {
						opacity: 0.6;
					}

					/* ── Messages ── */
					.askme-messages {
						flex: 1;
						overflow-y: auto;
						padding: 6rem 0 10rem;
						scrollbar-width: none;
					}

					.askme-messages::-webkit-scrollbar { display: none; }

					.askme-row {
						padding: 1.25rem 0;
						animation: askme-fadein 0.3s ease;
					}

					@keyframes askme-fadein {
						from { opacity: 0; transform: translateY(6px); }
						to { opacity: 1; transform: translateY(0); }
					}

					.askme-row-bot {
						background: rgba(255,255,255,0.02);
					}

					.askme-row-inner {
						max-width: 680px;
						margin: 0 auto;
						padding: 0 1.5rem;
						display: flex;
						gap: 1rem;
						align-items: flex-start;
					}

					.askme-icon {
						flex-shrink: 0;
						width: 30px;
						height: 30px;
						border-radius: 50%;
						border: 1px solid rgba(255,255,255,0.12);
						display: flex;
						align-items: center;
						justify-content: center;
						color: rgba(255,255,255,0.7);
						margin-top: 2px;
					}

					.askme-content {
						flex: 1;
						min-width: 0;
					}

					.askme-content p {
						margin: 0;
						font-size: 0.925rem;
						line-height: 1.7;
						color: rgba(255,255,255,0.88);
						font-weight: 300;
					}

					.askme-row-user .askme-content p {
						color: #fff;
						font-weight: 400;
					}

					.askme-row-user .askme-row-inner {
						justify-content: flex-end;
					}

					/* ── Typing dots ── */
					.askme-dots {
						display: flex;
						gap: 5px;
						padding: 4px 0;
					}

					.askme-dots span {
						width: 7px;
						height: 7px;
						border-radius: 50%;
						background: rgba(255,255,255,0.35);
						animation: askme-dot 1.4s ease-in-out infinite;
					}

					.askme-dots span:nth-child(2) { animation-delay: 0.15s; }
					.askme-dots span:nth-child(3) { animation-delay: 0.3s; }

					@keyframes askme-dot {
						0%, 60%, 100% { transform: translateY(0); }
						30% { transform: translateY(-6px); }
					}

					/* ── Bottom input ── */
					.askme-bottom {
						position: fixed;
						bottom: 0;
						left: 0;
						right: 0;
						z-index: 20;
						padding: 0 1rem 1.25rem;
						background: linear-gradient(to top, #000 60%, transparent);
						pointer-events: none;
					}

					.askme-input-bar {
						max-width: 680px;
						margin: 0 auto;
						display: flex;
						align-items: flex-end;
						gap: 0.5rem;
						background: rgba(255,255,255,0.06);
						border: 1px solid rgba(255,255,255,0.1);
						border-radius: 24px;
						padding: 0.5rem 0.65rem 0.5rem 1.25rem;
						pointer-events: auto;
						transition: border-color 0.3s ease, box-shadow 0.3s ease;
					}

					.askme-input-bar:focus-within {
						border-color: rgba(255,255,255,0.2);
						box-shadow: 0 0 0 1px rgba(255,255,255,0.05);
					}

					.askme-textarea {
						flex: 1;
						background: transparent;
						border: none;
						outline: none;
						color: #fff;
						font-size: 0.9rem;
						font-weight: 300;
						line-height: 1.5;
						resize: none;
						min-height: 24px;
						max-height: 200px;
						font-family: inherit;
						padding: 6px 0;
					}

					.askme-textarea::placeholder {
						color: rgba(255,255,255,0.3);
					}

					.askme-send {
						flex-shrink: 0;
						width: 34px;
						height: 34px;
						border-radius: 50%;
						border: none;
						background: rgba(255,255,255,0.08);
						color: rgba(255,255,255,0.3);
						display: flex;
						align-items: center;
						justify-content: center;
						cursor: pointer;
						transition: all 0.2s ease;
					}

					.askme-send.active {
						background: #fff;
						color: #000;
					}

					.askme-send:disabled {
						cursor: not-allowed;
					}

					.askme-footer {
						text-align: center;
						font-size: 0.65rem;
						color: rgba(255,255,255,0.2);
						margin: 0.6rem 0 0;
						pointer-events: auto;
					}

					/* ── Responsive ── */
					@media screen and (max-width: 640px) {
						.askme-chips {
							grid-template-columns: 1fr;
						}

						.askme-row-inner {
							padding: 0 1rem;
						}

						.askme-welcome {
							padding: 5rem 1rem 9rem;
						}
					}
				`}</style>
            </div>
        </SplashCursor>
    );
}

function getResponse(q: string): string {
    const s = q.toLowerCase();

    if (s.includes('who') || s.includes('about') || s.includes('what does')) {
        return "Pushpal Das is a Software Engineer who builds things for the web. He's passionate about creating beautiful, functional user experiences and is always exploring new technologies. You can learn more on the About page.";
    }
    if (s.includes('tech') || s.includes('stack') || s.includes('language') || s.includes('tool')) {
        return "Pushpal works with TypeScript, React, Next.js, Node.js, Python, and more. He uses AWS and Azure for cloud, GSAP for animations, and Tailwind CSS for styling. Check the /uses page for a detailed breakdown of his toolkit.";
    }
    if (s.includes('project') || s.includes('built') || s.includes('work')) {
        return "Pushpal has built a variety of projects — from full-stack web applications to AI-powered tools. You can explore his featured work on the Work page, or browse /projects for the complete list with live demos and source code.";
    }
    if (s.includes('experience') || s.includes('career') || s.includes('job') || s.includes('company')) {
        return "Pushpal has professional experience as a Software Engineer building web applications and cloud-native solutions. Visit the Experience page for his full professional timeline.";
    }
    if (s.includes('contact') || s.includes('reach') || s.includes('email') || s.includes('hire') || s.includes('connect')) {
        return "You can reach Pushpal at pushpaldas2001@gmail.com. He's also on LinkedIn and GitHub — check the links in the footer, or use the 'Let's Connect' button in the navigation bar.";
    }
    if (s.includes('skill') || s.includes('good at') || s.includes('expertise') || s.includes('speciali')) {
        return "Pushpal specializes in frontend development with React & Next.js, backend services with Node.js & Python, cloud infrastructure (AWS, Azure), and crafting polished UI/UX with modern animations and design systems.";
    }
    if (s.includes('certif')) {
        return "Pushpal holds several professional certifications. Check out the Certifications page to see all his verified credentials and achievements!";
    }
    if (s.includes('hello') || s.includes('hi') || s.includes('hey') || s.includes('sup')) {
        return "Hey there! 👋 Welcome to Pushpal's portfolio. Feel free to ask me anything — his skills, projects, experience, or how to get in touch. I'm here to help you learn about him!";
    }
    if (s.includes('education') || s.includes('university') || s.includes('college') || s.includes('degree')) {
        return "You can find details about Pushpal's educational background on the About page. It covers his academic journey and how it shaped his career in software engineering.";
    }

    return "Great question! I'm a demo assistant, so my knowledge is limited — but I'd recommend exploring the portfolio to find out more. Check the About, Work, or Experience pages, or reach out directly to Pushpal at pushpaldas2001@gmail.com.";
}
