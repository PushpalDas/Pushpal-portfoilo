'use client';

import { useState } from 'react';
import Image from 'next/image';
import WorkCarousel from './work-carousel';
import './work-right-sections.css';
import { WorkContainer } from './work-container';
import { WorkLeft } from './work-left';
import { WorkRight } from './work-right';
import type { WorkTile } from './workTiles';

interface WorkContentProps {
	work: WorkTile;
	progress?: number;
}

export default function WorkContent({ work, progress = 0 }: WorkContentProps) {
	const { title, description, image, carousel, features, interested } = work;
	const [currentIndex, setCurrentIndex] = useState(0);

	const activeSlide = carousel ? carousel[currentIndex] : null;
	const displayFeatures =
		activeSlide && activeSlide.features ? activeSlide.features : features;
	const displayInterested =
		activeSlide && activeSlide.interested ? activeSlide.interested : interested;

	const hasRightSections = carousel || displayFeatures || displayInterested;

	return (
		<WorkContainer>
			<WorkLeft progress={progress}>
				<div className='text-2xl font-medium md:text-3xl xl:text-4xl'>
					{description}
				</div>
				<span className='text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl'>
					{title}
				</span>
			</WorkLeft>
			<WorkRight progress={progress}>
				{hasRightSections ? (
					<div className='work-right-layout'>
						{/* Upper section — Photo carousel */}
						<div className='work-right-upper'>
							{carousel && carousel.length > 0 ? (
								<WorkCarousel
									images={carousel}
									currentIndex={currentIndex}
									onIndexChange={setCurrentIndex}
								/>
							) : image.src ? (
								<Image
									src={image.src}
									alt={title}
									width={image.width}
									height={image.height}
								/>
							) : null}
						</div>

						{/* Lower section — Features | Who's interested? */}
						<div className='work-right-lower'>
							{displayFeatures && displayFeatures.length > 0 && (
								<div className='work-right-section'>
									<h3 className='work-right-section-title'>Features</h3>
									<div className='work-right-features-columns'>
										<ul className='work-right-features-col'>
											{displayFeatures
												.filter((_, i) => i % 2 === 0)
												.map((f, i) => (
													<li key={`feature-even-${i}`}>{f}</li>
												))}
										</ul>
										<ul className='work-right-features-col'>
											{displayFeatures
												.filter((_, i) => i % 2 === 1)
												.map((f, i) => (
													<li key={`feature-odd-${i}`}>{f}</li>
												))}
										</ul>
									</div>
								</div>
							)}
							{displayInterested && displayInterested.length > 0 && (
								<div className='work-right-section'>
									<h3 className='work-right-section-title'>
										Who&apos;s interested?
									</h3>
									<div className='work-right-interested'>
										{displayInterested.length > 1 ? (
											<>
												{/* Left Column: Research Partners (0) and Industry Partners (2) */}
												<div className='work-right-interested-col'>
													{displayInterested
														.filter((_, i) => i === 0 || i === 2)
														.map((group, gi) => (
															<div
																key={`group-left-${gi}`}
																className='work-right-interested-group'
															>
																<h4 className='work-right-interested-category'>
																	{group.category}
																</h4>
																<ul className='work-right-section-list'>
																	{group.items.map((item, ii) => (
																		<li key={`item-left-${gi}-${ii}`}>
																			{item}
																		</li>
																	))}
																</ul>
															</div>
														))}
												</div>

												{/* Right Column: Government & Defense (1) */}
												<div className='work-right-interested-col'>
													{displayInterested
														.filter((_, i) => i === 1)
														.map((group, gi) => (
															<div
																key={`group-right-${gi}`}
																className='work-right-interested-group'
															>
																<h4 className='work-right-interested-category'>
																	{group.category}
																</h4>
																<ul className='work-right-section-list'>
																	{group.items.map((item, ii) => (
																		<li key={`item-right-${gi}-${ii}`}>
																			{item}
																		</li>
																	))}
																</ul>
															</div>
														))}
												</div>
											</>
										) : (
											<div className='work-right-interested-single'>
												{displayInterested.map((group, gi) => (
													<div
														key={`group-single-${gi}`}
														className='work-right-interested-group'
													>
														{group.category && (
															<h4 className='work-right-interested-category'>
																{group.category}
															</h4>
														)}
														<ul className='work-right-section-list'>
															{group.items.map((item, ii) => (
																<li key={`item-single-${gi}-${ii}`}>{item}</li>
															))}
														</ul>
													</div>
												))}
											</div>
										)}
									</div>
								</div>
							)}
						</div>
					</div>
				) : (
					<div className='drop-shadow-2xl sm:mt-10 md:mt-24'>
						{image.src ? (
							<Image
								src={image.src}
								alt={title}
								width={image.width}
								height={image.height}
							/>
						) : null}
					</div>
				)}
			</WorkRight>
		</WorkContainer>
	);
}
