// P5 QA for the Finance orchestrator against a running Wiki: every state in
// docs/finance/demo-script.md opened in order with zero page and console
// errors, an accessibility pass on each (every image has alt text, every
// button and link has a name, every form control has a label, one h1, no
// horizontal overflow at 360 px), and a recording of the ten-minute walk
// saved beside the walkthroughs.
//
//   node scripts/_elev-finance-qa.mjs [origin] [--record]
//
// origin defaults to http://localhost:3011 (the Wiki dev server); pass the
// deployed origin to check production. --record writes a .webm.

import { mkdirSync, readdirSync, renameSync } from 'node:fs';
import { chromium } from 'playwright';

const origin =
	process.argv[2] && !process.argv[2].startsWith('--')
		? process.argv[2]
		: 'http://localhost:3011';
const record = process.argv.includes('--record');
const OUT = 'C:/Users/PushpalDas/OneDrive/pushpal/docs/finance/walkthrough/P5';
mkdirSync(OUT, { recursive: true });

// The demo script, in order.
const STATES = [
	['/finance', 'Spend, twelve months'],
	['/finance/bills?id=INV-0236', 'Watcher findings on this invoice'],
	[
		'/finance/bills?as=dana&id=INV-0254&try=approve',
		'Whoever creates or edits an invoice',
	],
	['/finance/tie-out?tab=bank&filter=suggested', 'exact reference'],
	['/finance/pots?fund=award-r01&verdict=unallowable', 'Propose reclass'],
	['/finance/month-end?asof=2026-08-05', 'readiness'],
	['/finance/watchers', 'The contract'],
	['/finance/audit', 'Verify chain'],
	['/finance/books?source=patents.invoices', 'patents'],
	['/finance/hygiene', 'Chart of accounts'],
	['/finance?view=bills&id=INV-0236', 'Watcher findings on this invoice'],
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
	viewport: { width: 1440, height: 900 },
	colorScheme: 'dark',
	...(record
		? { recordVideo: { dir: OUT, size: { width: 1440, height: 900 } } }
		: {}),
});
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
page.on('console', (m) => {
	if (m.type() === 'error') errors.push(`console: ${m.text().slice(0, 160)}`);
});

const a11y = async (label) => {
	const r = await page.evaluate(() => {
		const out = [];
		document.querySelectorAll('img').forEach((i) => {
			if (!i.hasAttribute('alt'))
				out.push(`img without alt: ${i.src.slice(0, 60)}`);
		});
		document.querySelectorAll('button, a[href]').forEach((b) => {
			const name = (
				b.getAttribute('aria-label') ||
				b.textContent ||
				b.getAttribute('title') ||
				''
			).trim();
			if (!name) out.push(`${b.tagName.toLowerCase()} without a name`);
		});
		document.querySelectorAll('input, select, textarea').forEach((c) => {
			const id = c.id;
			const labelled =
				c.getAttribute('aria-label') ||
				c.getAttribute('aria-labelledby') ||
				(id && document.querySelector(`label[for="${id}"]`)) ||
				c.closest('label');
			if (!labelled && c.type !== 'hidden')
				out.push(
					`control without a label: ${c.name || c.placeholder || c.type}`,
				);
		});
		const h1 = document.querySelectorAll('h1').length;
		if (h1 !== 1) out.push(`${h1} h1 elements`);
		return out;
	});
	if (r.length) console.log(`a11y ${label}:`, r.slice(0, 6));
	return r.length;
};

let a11yIssues = 0;
for (const [path, waitFor] of STATES) {
	await page.goto(origin + path, { waitUntil: 'networkidle' });
	await page
		.getByText(waitFor, { exact: false })
		.first()
		.waitFor({ timeout: 60000 });
	await page.waitForTimeout(record ? 4000 : 400);
	a11yIssues += await a11y(path);
	if (path === '/finance/audit') {
		await page.getByRole('button', { name: 'Verify chain' }).click();
		await page.waitForTimeout(record ? 2500 : 300);
		await page.getByRole('button', { name: 'Simulate a tamper' }).click();
		await page.waitForTimeout(record ? 2500 : 300);
	}
	if (path === '/finance') {
		await page.getByLabel('Ask the books').fill('What does Priya earn?');
		await page.getByRole('button', { name: 'Ask', exact: true }).click();
		await page
			.getByText('Refused', { exact: false })
			.first()
			.waitFor({ timeout: 15000 });
		await page.waitForTimeout(record ? 3000 : 300);
		await page
			.getByLabel('Ask the books')
			.fill('How much of Award R-01 is used?');
		await page.getByRole('button', { name: 'Ask', exact: true }).click();
		await page
			.getByText('Answer · synthetic ledger', { exact: false })
			.first()
			.waitFor({ timeout: 15000 });
		await page.waitForTimeout(record ? 3000 : 300);
	}
	if (path === '/finance/bills?id=INV-0236') {
		await page.getByRole('button', { name: 'Release payment' }).click();
		await page.waitForTimeout(record ? 3000 : 300);
	}
	console.log('ok', path);
}

// Phone width on the densest screens.
await page.setViewportSize({ width: 360, height: 780 });
for (const path of [
	'/finance',
	'/finance/bills?id=INV-0236',
	'/finance/watchers',
	'/finance/pots',
]) {
	await page.goto(origin + path, { waitUntil: 'networkidle' });
	await page.waitForTimeout(400);
	const overflow = await page.evaluate(
		() =>
			document.documentElement.scrollWidth >
			document.documentElement.clientWidth + 1,
	);
	if (overflow) a11yIssues += 1;
	console.log('360px', path, overflow ? 'OVERFLOW' : 'ok');
}

await ctx.close();
await browser.close();
if (record) {
	const webm = readdirSync(OUT).find(
		(f) => f.endsWith('.webm') && !f.startsWith('finance-demo'),
	);
	if (webm)
		renameSync(`${OUT}/${webm}`, `${OUT}/finance-demo-walkthrough.webm`);
	console.log('recording', `${OUT}/finance-demo-walkthrough.webm`);
}
console.log('errors', errors.length, errors.slice(0, 5));
console.log('a11y issues', a11yIssues);
process.exit(errors.length || a11yIssues ? 1 : 0);
