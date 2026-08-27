'use client';

import React, { useEffect, useState } from 'react';
import ConnectForm from '../components/connect-form';
import Footer from '../components/contact';
import './book-meeting.css';

interface AvailableSlot {
	startTimeUtc: string;
	formattedTimeVisitor: string;
	formattedTimeHost: string;
}

interface ConfirmedBooking {
	eventId: string;
	meetLink: string;
	summary: string;
	startTimeUtc: string;
	endTimeUtc: string;
}

const COMMON_TIMEZONES = [
	{ value: 'Asia/Kolkata', label: 'India Standard Time (IST - Asia/Kolkata)' },
	{ value: 'America/New_York', label: 'Eastern Time (ET - America/New_York)' },
	{ value: 'America/Chicago', label: 'Central Time (CT - America/Chicago)' },
	{ value: 'America/Denver', label: 'Mountain Time (MT - America/Denver)' },
	{
		value: 'America/Los_Angeles',
		label: 'Pacific Time (PT - America/Los_Angeles)',
	},
	{
		value: 'Europe/London',
		label: 'Greenwich Mean Time (GMT / BST - Europe/London)',
	},
	{
		value: 'Europe/Paris',
		label: 'Central European Time (CET - Europe/Paris)',
	},
	{ value: 'Asia/Dubai', label: 'Gulf Standard Time (GST - Asia/Dubai)' },
	{ value: 'Asia/Singapore', label: 'Singapore Time (SGT - Asia/Singapore)' },
	{ value: 'Asia/Tokyo', label: 'Japan Standard Time (JST - Asia/Tokyo)' },
	{
		value: 'Australia/Sydney',
		label: 'Australian Eastern Time (AEST - Australia/Sydney)',
	},
	{ value: 'UTC', label: 'Universal Coordinated Time (UTC)' },
];

export default function BookMeetingPage() {
	// 1. Duration (15 or 30 mins)
	const [durationMinutes, setDurationMinutes] = useState<15 | 30>(30);

	// 2. Date & Timezone
	const getTomorrowDate = () => {
		const d = new Date();
		d.setDate(d.getDate() + 1);
		return d.toISOString().split('T')[0];
	};

	const [selectedDate, setSelectedDate] = useState<string>(getTomorrowDate());
	const [visitorTimezone, setVisitorTimezone] =
		useState<string>('Asia/Kolkata');

	// Detect browser timezone on mount
	useEffect(() => {
		try {
			const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
			if (detected) setVisitorTimezone(detected);
		} catch {
			// Fallback to Asia/Kolkata
		}
	}, []);

	// Min and Max date bounds
	const todayStr = new Date().toISOString().split('T')[0];
	const maxDate = new Date();
	maxDate.setDate(maxDate.getDate() + 30);
	const maxDateStr = maxDate.toISOString().split('T')[0];

	// 3. Slots & Availability State
	const [isConfigured, setIsConfigured] = useState<boolean>(true);
	const [slots, setSlots] = useState<AvailableSlot[]>([]);
	const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
	const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);

	// Fetch availability when date, timezone, or duration changes
	useEffect(() => {
		let isMounted = true;
		async function fetchAvailability() {
			setLoadingSlots(true);
			setSelectedSlot(null);
			try {
				const res = await fetch(
					`/api/booking/availability?date=${selectedDate}&timezone=${encodeURIComponent(visitorTimezone)}&duration=${durationMinutes}`,
				);
				const data = await res.json();
				if (!isMounted) return;

				if (data.configured === false) {
					setIsConfigured(false);
					setSlots([]);
				} else {
					setIsConfigured(true);
					setSlots(data.slots || []);
				}
			} catch {
				if (isMounted) {
					setSlots([]);
				}
			} finally {
				if (isMounted) setLoadingSlots(false);
			}
		}

		fetchAvailability();
		return () => {
			isMounted = false;
		};
	}, [selectedDate, visitorTimezone, durationMinutes]);

	// 4. Form State
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [notes, setNotes] = useState<string>('');
	const [botCheck, setBotCheck] = useState<string>(''); // Honeypot

	const [submitting, setSubmitting] = useState<boolean>(false);
	const [errorMsg, setErrorMsg] = useState<string>('');
	const [confirmedBooking, setConfirmedBooking] =
		useState<ConfirmedBooking | null>(null);

	// Form Submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMsg('');

		if (!selectedSlot) {
			setErrorMsg('Please select an available time slot.');
			return;
		}

		if (!name.trim() || name.trim().length < 2) {
			setErrorMsg('Please enter your name (at least 2 characters).');
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email.trim() || !emailRegex.test(email.trim())) {
			setErrorMsg('Please enter a valid email address.');
			return;
		}

		setSubmitting(true);
		try {
			const idempotencyKey = crypto.randomUUID();
			const res = await fetch('/api/booking/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Idempotency-Key': idempotencyKey,
				},
				body: JSON.stringify({
					name: name.trim(),
					email: email.trim().toLowerCase(),
					visitorTimezone,
					durationMinutes,
					startTimeUtc: selectedSlot.startTimeUtc,
					notes: notes.trim(),
					botCheck,
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || 'Failed to schedule meeting.');
			}

			setConfirmedBooking(data);
		} catch (err: any) {
			setErrorMsg(
				err.message || 'An error occurred while booking. Please try again.',
			);
		} finally {
			setSubmitting(false);
		}
	};

	const handleReset = () => {
		setConfirmedBooking(null);
		setSelectedSlot(null);
		setName('');
		setEmail('');
		setNotes('');
		setErrorMsg('');
	};

	return (
		<main className='booking-page-container'>
			<header className='booking-intro'>
				<h1 className='booking-intro-title'>Let&apos;s work together</h1>
				<p className='booking-intro-sub'>
					Have a project in mind, want to collaborate, or just want to say
					hello? I&apos;d love to hear from you.
				</p>
			</header>

			<div className='booking-wrapper'>
				{/* Unconfigured Notice */}
				{!isConfigured ? (
					<div className='booking-unconfigured-card'>
						<h2 className='booking-unconfigured-title'>
							Booking Currently Unavailable
						</h2>
						<p style={{ margin: 0, fontSize: '0.95rem' }}>
							Google Calendar integration requires administrative setup. Please
							contact Pushpal directly via the contact form.
						</p>
					</div>
				) : confirmedBooking ? (
					/* Confirmation View */
					<div className='booking-card confirmation-card'>
						<div className='success-icon'>✓</div>
						<h2 className='confirm-title'>Meeting Confirmed!</h2>
						<p className='confirm-subtitle'>
							A Google Calendar invitation and Google Meet join link have been
							sent to <strong>{email}</strong>.
						</p>

						<div className='event-details-box'>
							<div className='detail-row'>
								<span className='detail-label'>Event:</span>
								<span className='detail-val'>{confirmedBooking.summary}</span>
							</div>
							<div className='detail-row'>
								<span className='detail-label'>Date & Time:</span>
								<span className='detail-val'>
									{new Date(confirmedBooking.startTimeUtc).toLocaleString(
										'en-US',
										{
											timeZone: visitorTimezone,
											dateStyle: 'full',
											timeStyle: 'short',
										},
									)}
								</span>
							</div>
							<div className='detail-row'>
								<span className='detail-label'>Duration:</span>
								<span className='detail-val'>{durationMinutes} Minutes</span>
							</div>
							<div className='detail-row'>
								<span className='detail-label'>Timezone:</span>
								<span className='detail-val'>{visitorTimezone}</span>
							</div>
						</div>

						{confirmedBooking.meetLink && (
							<div>
								<a
									href={confirmedBooking.meetLink}
									target='_blank'
									rel='noopener noreferrer'
									className='meet-join-btn'
								>
									<span>📹 Join Google Meet</span>
								</a>
							</div>
						)}

						<div style={{ marginTop: '1.5rem' }}>
							<button type='button' onClick={handleReset} className='reset-btn'>
								Book Another Meeting
							</button>
						</div>
					</div>
				) : (
					/* Interactive Booking Workflow */
					<form onSubmit={handleSubmit} className='booking-card'>
						{/* Honeypot field for bot protection */}
						<input
							type='text'
							name='user_hp_field'
							value={botCheck}
							onChange={(e) => setBotCheck(e.target.value)}
							className='hp-field'
							tabIndex={-1}
							autoComplete='off'
						/>

						{/* Step 1: Your Details (Name & Email) - Always Visible */}
						<div style={{ marginBottom: '2rem' }}>
							<span className='section-label'>1. Your Information</span>
							<div className='controls-grid' style={{ marginBottom: 0 }}>
								<div className='form-group'>
									<label htmlFor='attendee-name' className='form-label'>
										Your Name *
									</label>
									<input
										id='attendee-name'
										type='text'
										required
										placeholder='Jane Doe'
										value={name}
										onChange={(e) => setName(e.target.value)}
										className='form-input'
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='attendee-email' className='form-label'>
										Gmail / Email Address *
									</label>
									<input
										id='attendee-email'
										type='email'
										required
										placeholder='jane@gmail.com'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className='form-input'
									/>
								</div>
							</div>
						</div>

						{/* Step 2: Duration Selection */}
						<div style={{ marginBottom: '2rem' }}>
							<span className='section-label'>2. Select Duration</span>
							<div className='duration-grid' style={{ marginBottom: 0 }}>
								<div
									className={`duration-pill ${durationMinutes === 15 ? 'active' : ''}`}
									onClick={() => setDurationMinutes(15)}
								>
									<span className='duration-val'>15 Minutes</span>
								</div>
								<div
									className={`duration-pill ${durationMinutes === 30 ? 'active' : ''}`}
									onClick={() => setDurationMinutes(30)}
								>
									<span className='duration-val'>30 Minutes</span>
								</div>
							</div>
						</div>

						{/* Step 3: Date & Timezone */}
						<div style={{ marginBottom: '2rem' }}>
							<span className='section-label'>3. Date & Timezone</span>
							<div className='controls-grid' style={{ marginBottom: 0 }}>
								<div className='form-group'>
									<label htmlFor='booking-date' className='form-label'>
										Select Date
									</label>
									<input
										id='booking-date'
										type='date'
										min={todayStr}
										max={maxDateStr}
										value={selectedDate}
										onChange={(e) => setSelectedDate(e.target.value)}
										className='form-input'
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='booking-tz' className='form-label'>
										Your Timezone
									</label>
									<select
										id='booking-tz'
										value={visitorTimezone}
										onChange={(e) => setVisitorTimezone(e.target.value)}
										className='form-select'
									>
										{!COMMON_TIMEZONES.some(
											(tz) => tz.value === visitorTimezone,
										) && (
											<option value={visitorTimezone}>{visitorTimezone}</option>
										)}
										{COMMON_TIMEZONES.map((tz) => (
											<option key={tz.value} value={tz.value}>
												{tz.label}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>

						{/* Step 4: Available Time Slots */}
						<div className='slots-section' style={{ marginBottom: '2rem' }}>
							<span className='section-label'>
								4. Select Time Slot (09:15 PM - 10:00 PM IST)
							</span>

							{loadingSlots ? (
								<div className='no-slots-msg'>
									Checking availability...
								</div>
							) : slots.length === 0 ? (
								<div className='no-slots-msg'>
									No available slots found for {selectedDate}. Please select
									another date.
								</div>
							) : (
								<div className='slots-grid'>
									{slots.map((slot) => {
										const isSelected =
											selectedSlot?.startTimeUtc === slot.startTimeUtc;
										return (
											<button
												key={slot.startTimeUtc}
												type='button'
												className={`slot-btn ${isSelected ? 'selected' : ''}`}
												onClick={() => setSelectedSlot(slot)}
											>
												{slot.formattedTimeVisitor}
											</button>
										);
									})}
								</div>
							)}
						</div>

						{/* Step 5: Notes & Submit Button */}
						<div className='details-form' style={{ paddingTop: '1rem' }}>
							<div className='form-group'>
								<label htmlFor='attendee-notes' className='form-label'>
									Meeting Topic / Agenda (Optional)
								</label>
								<textarea
									id='attendee-notes'
									rows={3}
									maxLength={500}
									placeholder='Briefly describe what you would like to discuss...'
									value={notes}
									onChange={(e) => setNotes(e.target.value)}
									className='form-textarea'
								/>
							</div>

							{errorMsg && (
								<div
									style={{
										color: '#ef4444',
										fontSize: '0.9rem',
										textAlign: 'center',
									}}
								>
									{errorMsg}
								</div>
							)}

							<button
								type='submit'
								disabled={submitting || !selectedSlot}
								className='submit-btn'
							>
								{submitting ? 'Confirming...' : 'Confirm'}
							</button>
						</div>
					</form>
				)}
			</div>

			<div className='booking-connect'>
				<ConnectForm />
			</div>

			<Footer />
		</main>
	);
}
