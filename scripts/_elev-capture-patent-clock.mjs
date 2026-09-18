// Captures the drafting-clock screens for the Patent program operations case
// study from the running demo, so each image is the state its own link opens.
// Same pattern as _elev-capture-ops-desk.mjs. Run from the repo root:
//
//   node scripts/_elev-capture-patent-clock.mjs

import path from 'node:path';
import { chromium } from 'playwright';

const repo = 'C:/Users/PushpalDas/OneDrive/pushpal';
const demo =
	'file:///' +
	path.posix.join(repo.replace(/\\/g, '/'), 'public/demo/patent-clock.html');
const out = repo + '/public/static/images/project/';

const shots = [
	// §06 shot — the grid
	['?view=timeline', 'ixana-patent-clock.jpg'],
	// gallery — the stage card with its cited reasons for delay
	['?view=timeline&id=P-19&stage=5&open=card', 'ixana-patent-clock-card.jpg'],
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
for (const [q, file] of shots) {
	await page.goto(demo + q, { waitUntil: 'networkidle' });
	await page.evaluate(() => document.fonts.ready);
	await page.waitForTimeout(650);
	// the grid is the subject: scroll so the filter row sits under the
	// sticky top bar and the table fills the frame
	if (!q.includes('open=card')) {
		await page.evaluate(() => {
			const bar = document.querySelector('.topbar').getBoundingClientRect().height;
			const f = document.querySelector('.filters');
			window.scrollTo(0, f.getBoundingClientRect().top + window.scrollY - bar - 12);
		});
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
