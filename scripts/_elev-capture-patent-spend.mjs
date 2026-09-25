// Captures the spend-by-patent screen for the Patent program operations case
// study from the XANA demo running locally, so the image is the state its own
// link opens: /patents/spend with nothing selected — the Spend view, all firms,
// ranked by total. Same pattern as _elev-capture-patent-clock.mjs, but the
// subject is a Next app rather than a single file, so start it first:
//
//   (in Changes-archive/dummy)  npx next dev -p 3011
//   (repo root)                 node scripts/_elev-capture-patent-spend.mjs
//
// Pass a different origin as the first argument to capture from elsewhere.

import { chromium } from 'playwright';

const origin = process.argv[2] ?? 'http://localhost:3011';
const out =
	'C:/Users/PushpalDas/OneDrive/pushpal/public/static/images/project/';

const shots = [
	// §06 gallery — the Spend view, untouched landing state of /patents/spend
	['/patents/spend', 'ixana-patent-spend.jpg'],
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
for (const [path, file] of shots) {
	await page.goto(origin + path, { waitUntil: 'networkidle' });
	await page.evaluate(() => document.fonts.ready);
	// the bars are drawn once the payload lands; wait for the first one
	await page.waitForSelector('text=Total paid to date', { timeout: 60000 });
	await page.waitForTimeout(900);
	await page.screenshot({ path: out + file, type: 'jpeg', quality: 84 });
	console.log('captured', file);
}
await browser.close();
if (errors.length) {
	console.error('page errors:', errors);
	process.exit(1);
}
console.log('done');
