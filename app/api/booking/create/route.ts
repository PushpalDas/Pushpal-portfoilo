import { NextResponse } from 'next/server';
import { DurableStore } from '../../../lib/booking/durable-store';
import {
	createBooking,
	isCalendarConfigured,
} from '../../../lib/booking/calendar-service';

export const runtime = 'nodejs';

export async function POST(request: Request) {
	try {
		// Rate limiting per IP (max 5 bookings per hour)
		const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
		const rate = DurableStore.checkRateLimit(`create_${ip}`, 5, 60 * 60 * 1000);
		if (!rate.allowed) {
			return NextResponse.json(
				{ error: 'Too many booking attempts. Please try again later.' },
				{ status: 429 },
			);
		}

		if (!isCalendarConfigured()) {
			return NextResponse.json(
				{
					error:
						'Booking is currently unavailable because Google Calendar is not configured.',
				},
				{ status: 503 },
			);
		}

		const idempotencyKey = request.headers.get('idempotency-key') || undefined;

		const body = await request.json();
		const {
			name,
			email,
			visitorTimezone,
			durationMinutes,
			startTimeUtc,
			notes,
			botCheck,
		} = body;

		// Honeypot bot protection
		if (botCheck && String(botCheck).trim().length > 0) {
			// Silently fail for bots
			return NextResponse.json({ success: true, message: 'Booking received' });
		}

		// Input validation
		if (
			!name ||
			typeof name !== 'string' ||
			name.trim().length < 2 ||
			name.length > 100
		) {
			return NextResponse.json(
				{ error: 'Please provide a valid name (2-100 characters).' },
				{ status: 400 },
			);
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
			return NextResponse.json(
				{ error: 'Please provide a valid email address.' },
				{ status: 400 },
			);
		}

		const duration = parseInt(String(durationMinutes), 10);
		if (duration !== 15 && duration !== 30) {
			return NextResponse.json(
				{ error: 'Meeting duration must be 15 or 30 minutes.' },
				{ status: 400 },
			);
		}

		if (!startTimeUtc || isNaN(Date.parse(startTimeUtc))) {
			return NextResponse.json(
				{ error: 'Invalid start time selected.' },
				{ status: 400 },
			);
		}

		const cleanNotes = notes ? String(notes).trim().slice(0, 500) : '';

		const result = await createBooking({
			name: name.trim(),
			email: email.trim().toLowerCase(),
			visitorTimezone: visitorTimezone || 'UTC',
			durationMinutes: duration as 15 | 30,
			startTimeUtc,
			notes: cleanNotes,
			idempotencyKey,
		});

		return NextResponse.json(result);
	} catch (err: any) {
		if (err.message === 'SLOT_ALREADY_BOOKED') {
			return NextResponse.json(
				{
					error:
						'This time slot is no longer available. Please select another slot.',
				},
				{ status: 409 },
			);
		}
		if (err.message === 'LEAD_TIME_VIOLATION') {
			return NextResponse.json(
				{ error: 'Meetings must be booked at least 2 hours in advance.' },
				{ status: 400 },
			);
		}
		if (err.message === 'WORKING_HOURS_VIOLATION') {
			return NextResponse.json(
				{ error: 'Selected slot falls outside available working hours.' },
				{ status: 400 },
			);
		}
		if (err.message === 'CALENDAR_NOT_CONFIGURED') {
			return NextResponse.json(
				{ error: 'Google Calendar integration is not configured.' },
				{ status: 503 },
			);
		}

		console.error('Booking Creation Error:', err.message || err);
		return NextResponse.json(
			{ error: 'Unable to schedule meeting at this time. Please try again.' },
			{ status: 500 },
		);
	}
}
