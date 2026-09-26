// Captures the Finance orchestrator screens for its case study from the
// XANA demo running locally, so every image is the state its own link
// opens. The case study links /demo/finance-desk/<screen>?…, which
// redirects to the Wiki's /finance/<screen>?…; the same paths are captured
// here from the dev server. Same pattern as _elev-capture-patent-spend.mjs:
//
//   (in Changes-archive/dummy, or a clone)  npx next dev -p 3011
//   (repo root)                             node scripts/_elev-capture-finance.mjs
//
// Pass a different origin as the first argument to capture from elsewhere.

import { chromium } from 'playwright';

const origin = process.argv[2] ?? 'http://localhost:3011';
const out =
	'C:/Users/PushpalDas/OneDrive/pushpal/public/static/images/project/';

const shots = [
	// card image + evidence link — the overview, untouched landing state
	['/finance', 'ixana-finance-overview.jpg', 'Spend, twelve months'],
	// §06 shot — the packaging invoice with three findings on it, drawer open
	[
		'/finance/ap?id=INV-0236',
		'ixana-finance-ap-finding.jpg',
		'Agent findings on this invoice',
	],
	// §06 gallery — each the state its link opens
	[
		'/finance/ap?as=dana&id=INV-0254&try=approve',
		'ixana-finance-ap-sod.jpg',
		'Whoever creates or edits an invoice',
	],
	[
		'/finance/reconcile?tab=bank&filter=suggested',
		'ixana-finance-reconcile.jpg',
		'Three passes',
	],
	[
		'/finance/funds?fund=award-r01&verdict=unallowable',
		'ixana-finance-funds.jpg',
		'Propose reclass',
	],
	['/finance/close?asof=2026-08-05', 'ixana-finance-close.jpg', 'readiness'],
	['/finance/agents', 'ixana-finance-agents.jpg', 'The contract'],
	['/finance/audit', 'ixana-finance-audit.jpg', 'Verify chain'],
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => {
	if (m.type() === 'error') errors.push(m.text());
});
for (const [path, file, waitFor] of shots) {
	await page.goto(origin + path, { waitUntil: 'networkidle' });
	await page.evaluate(() => document.fonts.ready);
	await page
		.getByText(waitFor, { exact: false })
		.first()
		.waitFor({ timeout: 60000 });
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
