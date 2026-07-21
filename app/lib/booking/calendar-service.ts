import crypto from 'node:crypto';
import { google } from 'googleapis';
import { DurableStore } from './durable-store';

const BOOKING_TIME_ZONE = process.env.BOOKING_TIME_ZONE || 'Asia/Kolkata';

export interface BookingPayload {
	name: string;
	email: string;
	visitorTimezone: string;
	durationMinutes: 15 | 30;
	startTimeUtc: string; // ISO 8601 UTC string
	notes?: string;
	idempotencyKey?: string;
}

export interface AvailableSlot {
	startTimeUtc: string;
	formattedTimeVisitor: string;
	formattedTimeHost: string;
}

function getOAuth2Client() {
	const clientId = process.env.GOOGLE_CLIENT_ID;
	const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
	const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
	const redirectUri =
		process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/oauth2callback';

	if (!clientId || !clientSecret || !refreshToken) {
		return null;
	}

	const oauth2Client = new google.auth.OAuth2(
		clientId,
		clientSecret,
		redirectUri,
	);
	oauth2Client.setCredentials({ refresh_token: refreshToken });
	return oauth2Client;
}

export function isCalendarConfigured(): boolean {
	return Boolean(
		process.env.GOOGLE_CLIENT_ID &&
			process.env.GOOGLE_CLIENT_SECRET &&
			process.env.GOOGLE_REFRESH_TOKEN,
	);
}

/**
 * Generate 15-minute interval chunk keys for a given start and end time in UTC.
 * Includes 15-minute buffer intervals before and after.
 */
function getAffectedChunkKeys(
	startUtcMs: number,
	durationMinutes: number,
	bufferMinutes = 15,
): string[] {
	const keys: string[] = [];
	const bufferBeforeMs = bufferMinutes * 60 * 1000;
	const bufferAfterMs = bufferMinutes * 60 * 1000;
	const totalStartMs = startUtcMs - bufferBeforeMs;
	const totalEndMs = startUtcMs + durationMinutes * 60 * 1000 + bufferAfterMs;

	// Align to 15-min boundary
	let currentMs =
		Math.floor(totalStartMs / (15 * 60 * 1000)) * (15 * 60 * 1000);
	while (currentMs < totalEndMs) {
		const chunkDate = new Date(currentMs);
		const key = `slot_lock_${chunkDate.toISOString().slice(0, 16)}`;
		keys.push(key);
		currentMs += 15 * 60 * 1000;
	}

	return keys;
}

/**
 * Check working hours policy (21:00 to 22:00 Asia/Kolkata - 9:00 PM to 10:00 PM IST).
 * With 15-min edge buffer:
 * 15-min call: 21:15 to 21:30 start time
 * 30-min call: 21:15 to 21:15 start time
 */
function isWithinWorkingHours(
	startUtc: Date,
	durationMinutes: number,
): boolean {
	// Format to Asia/Kolkata components
	const formatter = new Intl.DateTimeFormat('en-US', {
		timeZone: BOOKING_TIME_ZONE,
		hour12: false,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	});

	const parts = formatter.formatToParts(startUtc);
	const partMap: Record<string, string> = {};
	for (const p of parts) {
		if (p.type !== 'literal') partMap[p.type] = p.value;
	}

	const hour = parseInt(partMap.hour, 10);
	const minute = parseInt(partMap.minute, 10);
	const startMinuteOfDay = hour * 60 + minute;
	const endMinuteOfDay = startMinuteOfDay + durationMinutes;

	// 09:15 PM is 1275 minutes from midnight
	// 10:00 PM is 1320 minutes from midnight
	// 09:45 PM is 1305 minutes from midnight
	const minStartMinute = 21 * 60 + 15; // 09:15 PM (1275 min)
	const maxEndMinute = 22 * 60 - 15; // 09:45 PM end time / 10:00 PM boundary (1305 min)

	if (startMinuteOfDay < minStartMinute) return false;
	if (endMinuteOfDay > maxEndMinute) return false;

	return true;
}

export async function getAvailableSlots(
	dateStr: string, // YYYY-MM-DD
	visitorTimezone = 'UTC',
	durationMinutes: 15 | 30 = 30,
): Promise<AvailableSlot[]> {
	if (!isCalendarConfigured()) {
		throw new Error('CALENDAR_NOT_CONFIGURED');
	}

	const oauth2Client = getOAuth2Client();
	if (!oauth2Client) {
		throw new Error('CALENDAR_NOT_CONFIGURED');
	}

	const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

	// Define day boundary in BOOKING_TIME_ZONE (9:00 PM to 10:00 PM IST)
	const dayStartStr = `${dateStr}T21:00:00`;
	const dayEndStr = `${dateStr}T22:00:00`;

	// Query FreeBusy with 10s timeout and error fallback
	let busyIntervals: { startMs: number; endMs: number }[] = [];
	try {
		const freeBusyRes = await calendar.freebusy.query(
			{
				requestBody: {
					timeMin: new Date(`${dayStartStr}+05:30`).toISOString(),
					timeMax: new Date(`${dayEndStr}+05:30`).toISOString(),
					timeZone: BOOKING_TIME_ZONE,
					items: [{ id: 'primary' }],
				},
			},
			{ timeout: 10000 }
		);

		busyIntervals = (freeBusyRes.data.calendars?.primary?.busy || []).map(
			(b) => ({
				startMs: new Date(b.start!).getTime(),
				endMs: new Date(b.end!).getTime(),
			}),
		);
	} catch (err: any) {
		console.warn('Google FreeBusy query network warning:', err?.message || err);
	}

	const slots: AvailableSlot[] = [];
	const nowMs = Date.now();
	const leadTimeMs = 2 * 60 * 60 * 1000; // 2 hours minimum lead time
	const horizonMs = 30 * 24 * 60 * 60 * 1000; // 30 days max horizon

	// Generate potential 15-minute increment slots throughout working hours (21:15 to 21:30/21:15)
	const baseDate = new Date(`${dateStr}T00:00:00+05:30`);
	const startLimitMs = baseDate.getTime() + (21 * 60 + 15) * 60 * 1000; // 09:15 PM
	const endLimitMs =
		baseDate.getTime() + (22 * 60 - 15 - durationMinutes) * 60 * 1000; // Last start time

	const visitorFormatter = new Intl.DateTimeFormat('en-US', {
		timeZone: visitorTimezone,
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	});

	const hostFormatter = new Intl.DateTimeFormat('en-US', {
		timeZone: BOOKING_TIME_ZONE,
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	});

	for (
		let currentStartMs = startLimitMs;
		currentStartMs <= endLimitMs;
		currentStartMs += 15 * 60 * 1000
	) {
		const slotEndMs = currentStartMs + durationMinutes * 60 * 1000;
		const slotStartDate = new Date(currentStartMs);

		// 1. Lead time check
		if (currentStartMs < nowMs + leadTimeMs) continue;
		// 2. Horizon check
		if (currentStartMs > nowMs + horizonMs) continue;
		// 3. Working hours check
		if (!isWithinWorkingHours(slotStartDate, durationMinutes)) continue;

		// 4. FreeBusy check + 15 min buffer rule around busy events
		const bufferMs = 15 * 60 * 1000;
		const bufferedSlotStart = currentStartMs - bufferMs;
		const bufferedSlotEnd = slotEndMs + bufferMs;

		const isBusy = busyIntervals.some(
			(busy) =>
				bufferedSlotStart < busy.endMs && bufferedSlotEnd > busy.startMs,
		);
		if (isBusy) continue;

		// 5. DurableStore chunk lock check
		const chunkKeys = getAffectedChunkKeys(currentStartMs, durationMinutes);
		if (DurableStore.isAnyChunkLocked(chunkKeys)) continue;

		// Valid slot!
		slots.push({
			startTimeUtc: slotStartDate.toISOString(),
			formattedTimeVisitor: visitorFormatter.format(slotStartDate),
			formattedTimeHost: hostFormatter.format(slotStartDate),
		});
	}

	return slots;
}

export async function createBooking(payload: BookingPayload) {
	if (!isCalendarConfigured()) {
		throw new Error('CALENDAR_NOT_CONFIGURED');
	}

	// 1. Idempotency Check
	if (payload.idempotencyKey) {
		const existing = DurableStore.getIdempotentBooking(payload.idempotencyKey);
		if (existing) {
			return existing;
		}
	}

	const startUtc = new Date(payload.startTimeUtc);
	const startUtcMs = startUtc.getTime();
	const durationMinutes = payload.durationMinutes;
	const endUtc = new Date(startUtcMs + durationMinutes * 60 * 1000);

	// Validate lead time & working hours
	if (startUtcMs < Date.now() + 2 * 60 * 60 * 1000) {
		throw new Error('LEAD_TIME_VIOLATION');
	}
	if (!isWithinWorkingHours(startUtc, durationMinutes)) {
		throw new Error('WORKING_HOURS_VIOLATION');
	}

	const chunkKeys = getAffectedChunkKeys(startUtcMs, durationMinutes);

	// 2. Atomic Slot Lock Reservation
	const lockAcquired = DurableStore.reserveChunks(chunkKeys);
	if (!lockAcquired) {
		throw new Error('SLOT_ALREADY_BOOKED');
	}

	const oauth2Client = getOAuth2Client();
	if (!oauth2Client) {
		DurableStore.releaseChunks(chunkKeys);
		throw new Error('CALENDAR_NOT_CONFIGURED');
	}

	const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

	try {
		// 3. Re-check FreeBusy API immediately before insertion (with 10s timeout)
		const bufferMs = 15 * 60 * 1000;
		try {
			const freeBusyRes = await calendar.freebusy.query(
				{
					requestBody: {
						timeMin: new Date(startUtcMs - bufferMs).toISOString(),
						timeMax: new Date(endUtc.getTime() + bufferMs).toISOString(),
						timeZone: BOOKING_TIME_ZONE,
						items: [{ id: 'primary' }],
					},
				},
				{ timeout: 10000 }
			);

			const busy = freeBusyRes.data.calendars?.primary?.busy || [];
			if (busy.length > 0) {
				DurableStore.releaseChunks(chunkKeys);
				throw new Error('SLOT_ALREADY_BOOKED');
			}
		} catch (fbErr: any) {
			if (fbErr.message === 'SLOT_ALREADY_BOOKED') throw fbErr;
			console.warn('Pre-check FreeBusy warning:', fbErr?.message || fbErr);
		}

		// 4. Insert Calendar Event with Google Meet conference data
		const summary = `30 min call with Pushpal & ${payload.name}`;
		const description = `Booked via website.\n\nAttendee: ${payload.name}\nEmail: ${payload.email}\nDuration: ${payload.durationMinutes} mins\nVisitor Timezone: ${payload.visitorTimezone}\n\nNotes:\n${payload.notes || 'None'}`;

		const eventRes = await calendar.events.insert(
			{
				calendarId: 'primary',
				conferenceDataVersion: 1,
				sendUpdates: 'all',
				requestBody: {
					summary,
					description,
					start: {
						dateTime: startUtc.toISOString(),
						timeZone: BOOKING_TIME_ZONE,
					},
					end: { dateTime: endUtc.toISOString(), timeZone: BOOKING_TIME_ZONE },
					attendees: [{ email: payload.email, displayName: payload.name }],
					conferenceData: {
						createRequest: {
							requestId: crypto.randomUUID(),
							conferenceSolutionKey: { type: 'hangoutsMeet' },
						},
					},
				},
			},
			{ timeout: 15000 }
		);

		const event = eventRes.data;
		const eventId = event.id || '';
		const meetLink =
			event.hangoutLink || event.conferenceData?.entryPoints?.[0]?.uri || '';

		const result = {
			success: true,
			eventId,
			meetLink,
			summary: event.summary || summary,
			startTimeUtc: startUtc.toISOString(),
			endTimeUtc: endUtc.toISOString(),
		};

		// 5. Store Event ID in lock store & Idempotency record
		DurableStore.attachEventToChunks(chunkKeys, eventId);
		if (payload.idempotencyKey) {
			DurableStore.setIdempotentBooking(
				payload.idempotencyKey,
				eventId,
				result,
			);
		}

		return result;
	} catch (err: any) {
		// Release slot lock on error
		DurableStore.releaseChunks(chunkKeys);

		if (
			err.message === 'SLOT_ALREADY_BOOKED' ||
			err.message === 'LEAD_TIME_VIOLATION' ||
			err.message === 'WORKING_HOURS_VIOLATION'
		) {
			throw err;
		}

		console.error('Google Calendar event creation error:', err.message || err);
		throw new Error('EVENT_CREATION_FAILED');
	}
}
