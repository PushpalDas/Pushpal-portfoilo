import fs from 'node:fs';
import path from 'node:path';

interface StorageSchema {
	locks: Record<string, { expiresAt: number; eventId?: string }>;
	idempotency: Record<
		string,
		{ eventId: string; result: any; createdAt: number }
	>;
	rateLimit: Record<string, { count: number; resetAt: number }>;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'booking-store.json');

function ensureStoreExists(): StorageSchema {
	if (!fs.existsSync(DATA_DIR)) {
		fs.mkdirSync(DATA_DIR, { recursive: true });
	}
	if (!fs.existsSync(DATA_FILE)) {
		const initial: StorageSchema = {
			locks: {},
			idempotency: {},
			rateLimit: {},
		};
		fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), 'utf8');
		return initial;
	}
	try {
		const content = fs.readFileSync(DATA_FILE, 'utf8');
		return JSON.parse(content) as StorageSchema;
	} catch {
		const fallback: StorageSchema = {
			locks: {},
			idempotency: {},
			rateLimit: {},
		};
		fs.writeFileSync(DATA_FILE, JSON.stringify(fallback, null, 2), 'utf8');
		return fallback;
	}
}

function saveStore(data: StorageSchema): void {
	if (!fs.existsSync(DATA_DIR)) {
		fs.mkdirSync(DATA_DIR, { recursive: true });
	}
	const tempFile = path.join(
		DATA_DIR,
		`booking-store-${Date.now()}-${Math.random().toString(36).slice(2)}.tmp`,
	);
	fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf8');
	fs.renameSync(tempFile, DATA_FILE);
}

// Clean up expired locks and idempotency records
function pruneExpired(store: StorageSchema): boolean {
	const now = Date.now();
	let changed = false;

	for (const [key, lock] of Object.entries(store.locks)) {
		if (lock.expiresAt < now) {
			delete store.locks[key];
			changed = true;
		}
	}

	for (const [key, item] of Object.entries(store.idempotency)) {
		// Retain idempotency records for 7 days
		if (now - item.createdAt > 7 * 24 * 60 * 60 * 1000) {
			delete store.idempotency[key];
			changed = true;
		}
	}

	for (const [key, limit] of Object.entries(store.rateLimit)) {
		if (limit.resetAt < now) {
			delete store.rateLimit[key];
			changed = true;
		}
	}

	return changed;
}

export const DurableStore = {
	/**
	 * Reserve a list of 15-minute interval chunk keys atomically.
	 * Returns true if all keys were successfully reserved, false if any conflict exists.
	 */
	reserveChunks(
		chunkKeys: string[],
		ttlMs: number = 24 * 60 * 60 * 1000,
	): boolean {
		const store = ensureStoreExists();
		pruneExpired(store);
		const now = Date.now();

		// Check if any chunk is already locked
		for (const key of chunkKeys) {
			const existing = store.locks[key];
			if (existing && existing.expiresAt > now) {
				return false; // Conflict!
			}
		}

		// Lock all chunks
		for (const key of chunkKeys) {
			store.locks[key] = { expiresAt: now + ttlMs };
		}

		saveStore(store);
		return true;
	},

	/**
	 * Associate a Calendar Event ID with reserved chunk keys.
	 */
	attachEventToChunks(chunkKeys: string[], eventId: string): void {
		const store = ensureStoreExists();
		for (const key of chunkKeys) {
			if (store.locks[key]) {
				store.locks[key].eventId = eventId;
			}
		}
		saveStore(store);
	},

	/**
	 * Release chunk reservations (used on error/cancellation).
	 */
	releaseChunks(chunkKeys: string[]): void {
		const store = ensureStoreExists();
		for (const key of chunkKeys) {
			delete store.locks[key];
		}
		saveStore(store);
	},

	/**
	 * Check if any chunk key in the list is currently locked.
	 */
	isAnyChunkLocked(chunkKeys: string[]): boolean {
		const store = ensureStoreExists();
		const now = Date.now();
		for (const key of chunkKeys) {
			const existing = store.locks[key];
			if (existing && existing.expiresAt > now) {
				return true;
			}
		}
		return false;
	},

	/**
	 * Check idempotency key for pre-existing booking result.
	 */
	getIdempotentBooking(key: string): any | null {
		const store = ensureStoreExists();
		const record = store.idempotency[key];
		return record ? record.result : null;
	},

	/**
	 * Store idempotency key result.
	 */
	setIdempotentBooking(key: string, eventId: string, result: any): void {
		const store = ensureStoreExists();
		store.idempotency[key] = {
			eventId,
			result,
			createdAt: Date.now(),
		};
		saveStore(store);
	},

	/**
	 * Simple rate-limiter per IP/identifier (max requests within windowMs).
	 */
	checkRateLimit(
		identifier: string,
		maxRequests = 10,
		windowMs = 60 * 1000,
	): { allowed: boolean; remaining: number } {
		const store = ensureStoreExists();
		pruneExpired(store);
		const now = Date.now();

		let current = store.rateLimit[identifier];
		if (!current || current.resetAt < now) {
			current = { count: 0, resetAt: now + windowMs };
			store.rateLimit[identifier] = current;
		}

		current.count += 1;
		saveStore(store);

		const allowed = current.count <= maxRequests;
		const remaining = Math.max(0, maxRequests - current.count);
		return { allowed, remaining };
	},
};
