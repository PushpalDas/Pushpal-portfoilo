import { NextResponse } from 'next/server';
import { DurableStore } from '../../../lib/booking/durable-store';
import {
	getAvailableSlots,
	isCalendarConfigured,
} from '../../../lib/booking/calendar-service';

export const runtime = 'nodejs';

export async function GET(request: Request) {
	try {
		// Rate limiting per IP
		const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
		const rate = DurableStore.checkRateLimit(`avail_${ip}`, 30, 60 * 1000);
		if (!rate.allowed) {
			return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
		}

		if (!isCalendarConfigured()) {
			return NextResponse.json({
				configured: false,
				slots: [],
				message:
					'Google Calendar integration is not configured. Booking is currently unavailable.',
			});
		}

		const { searchParams } = new URL(request.url);
		const dateStr = searchParams.get('date'); // YYYY-MM-DD
		const timezone = searchParams.get('timezone') || 'UTC';
		const duration = parseInt(searchParams.get('duration') || '30', 10) as
			| 15
			| 30;

		if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
			return NextResponse.json(
				{ error: 'Invalid or missing date parameter (YYYY-MM-DD required)' },
				{ status: 400 },
			);
		}

		if (duration !== 15 && duration !== 30) {
			return NextResponse.json(
				{ error: 'Duration must be 15 or 30 minutes' },
				{ status: 400 },
			);
		}

		const slots = await getAvailableSlots(dateStr, timezone, duration);
		return NextResponse.json({
			configured: true,
			date: dateStr,
			timezone,
			duration,
			slots,
		});
	} catch (err: any) {
		if (err.message === 'CALENDAR_NOT_CONFIGURED') {
			return NextResponse.json({
				configured: false,
				slots: [],
				message:
					'Google Calendar integration is not configured. Booking is currently unavailable.',
			});
		}
		console.error('Availability API error:', err.message || err);
		return NextResponse.json(
			{ error: 'Failed to retrieve available slots' },
			{ status: 500 },
		);
	}
}
