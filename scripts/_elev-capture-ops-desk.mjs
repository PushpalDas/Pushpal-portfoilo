// Captures the Ops Orchestrator case-study screens from the running demo, so
// every image on the page is the state its own link opens. Same pattern as
// _elev-capture-calsync.mjs. Run from the repo root:
//
//   node scripts/_elev-capture-ops-desk.mjs
//
// The board and gallery links in data/case-studies-v2.json must match the
// query strings below — change one, change the other.

import path from 'node:path';
import { chromium } from 'playwright';

const repo = 'C:/Users/PushpalDas/OneDrive/pushpal';
const demo =
	'file:///' +
	path.posix.join(
		repo.replace(/\\/g, '/'),
		'public/demo/procurement-desk.html',
	);
const out = repo + '/public/static/images/project/';

// A third element names a card heading to scroll into view first — inside
// the drawer when the shot opens one, otherwise on the page — so the frame
// shows the part of the screen the caption talks about.
const shots = [
	// §06 shot — the umbrella screen
	['?view=board&as=owen', 'ixana-ops-board.jpg'],
	// gallery — the two new streams
	[
		'?view=shipments&id=SHIP-2026-000112&open=card&as=owen',
		'ixana-ops-shipment-card.jpg',
	],
	[
		'?view=shipments&id=SHIP-2026-000113&open=desk&as=elena',
		'ixana-ops-shipping-desk.jpg',
		'Approval',
	],
	[
		'?view=presentations&asof=25%20Aug%202026&as=maya',
		'ixana-ops-presentations.jpg',
		'Run the 08:00 job',
	],
	// gallery — the procurement screens, recaptured because the chrome changed
	[
		'?view=submit&as=nadia&item=Probe%20card%20for%20the%20YR31%20test%20programme&amount=18400&try=1',
		'ixana-procurement-submit.jpg',
	],
	['?view=queue&as=dana', 'ixana-procurement-queue.jpg'],
	['?view=gates&as=owen', 'ixana-procurement-gates.jpg'],
	// kept fresh for anything else that still links them
	['?view=request&id=PR-2043&as=nadia', 'ixana-procurement-request.jpg'],
	['?view=ageing&as=priya', 'ixana-procurement-ageing.jpg'],
	['?view=exceptions&as=dana', 'ixana-procurement-exceptions.jpg'],
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
for (const [q, file, heading] of shots) {
	await page.goto(demo + q, { waitUntil: 'networkidle' });
	await page.evaluate(() => document.fonts.ready);
	// the drawer slides in over 350ms; let it settle before the frame
	await page.waitForTimeout(650);
	if (heading) {
		await page.evaluate((h) => {
			const drawer = document.querySelector('#drawer');
			const inDrawer = drawer.classList.contains('show');
			const root = inDrawer ? drawer : document;
			const card = Array.from(root.querySelectorAll('.card > h3')).find((el) =>
				el.textContent.trim().startsWith(h),
			);
			if (!card) return;
			const top = card.closest('.card');
			if (inDrawer) drawer.scrollTop = top.offsetTop - 18;
			else {
				// the top bar is sticky, so leave room for it above the card
				const bar = document
					.querySelector('.topbar')
					.getBoundingClientRect().height;
				window.scrollTo(
					0,
					top.getBoundingClientRect().top + window.scrollY - bar - 16,
				);
			}
		}, heading);
		await page.waitForTimeout(150);
	}
	await page.screenshot({ path: out + file, type: 'jpeg', quality: 84 });
	console.log('captured', file);
}
await browser.close();
if (errors.length) {
	console.error('page errors:', errors);
	process.exit(1);
}
console.log('done');
