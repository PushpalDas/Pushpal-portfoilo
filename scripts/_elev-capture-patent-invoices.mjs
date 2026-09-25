// Captures the two invoice surfaces for the Patent program operations case
// study from the deployed XANA demo, after the header lost its separate
// "Upload Invoice" entry: approval with the auto-matched invoice open, and
// the upload half of the same section. Same size as the other invoice shots.
//
//   node scripts/_elev-capture-patent-invoices.mjs [origin]

import { chromium } from 'playwright';

const origin = process.argv[2] ?? 'https://xana-nine.vercel.app';
const out =
	'C:/Users/PushpalDas/OneDrive/pushpal/public/static/images/project/';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1568, height: 1045 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));

await page.goto(origin + '/patents/invoices', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

// Approval: the awaiting-decision invoice, opened with its auto-match warning.
await page.waitForSelector('text=Matched automatically', { timeout: 60000 });
await page.waitForTimeout(900);
await page.screenshot({ path: out + 'ixana-patent-approval.jpg', type: 'jpeg', quality: 84 });
console.log('captured ixana-patent-approval.jpg');

// Upload: close the invoice card, switch to the upload tab.
await page.keyboard.press('Escape');
await page.waitForTimeout(400);
await page.getByText('Upload an invoice', { exact: false }).first().click();
await page.waitForSelector('text=INVOICE PDF', { timeout: 30000 }).catch(() => page.waitForSelector('text=Invoice PDF', { timeout: 30000 }));
await page.waitForTimeout(900);
await page.screenshot({ path: out + 'ixana-patent-upload.jpg', type: 'jpeg', quality: 84 });
console.log('captured ixana-patent-upload.jpg');

await browser.close();
if (errors.length) {
	console.error('page errors:', errors);
	process.exit(1);
}
console.log('done');
