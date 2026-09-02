import { chromium } from 'playwright';
import path from 'node:path';

const repo = 'C:/Users/PushpalDas/OneDrive/pushpal';
const demo = 'file:///' + path.posix.join(repo.replace(/\\/g, '/'), 'public/demo/calendar-sync.html');
const out = repo + '/public/static/images/project/';

const shots = [
	['?view=dryrun', 'ixana-calsync-dryrun.jpg'],
	['?view=mirror&ev=g-dentist', 'ixana-calsync-mirror.jpg'],
	['?view=scope&try=ceo', 'ixana-calsync-scope.jpg'],
	['?view=log', 'ixana-calsync-log.jpg'],
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
for (const [q, file] of shots) {
	await page.goto(demo + q, { waitUntil: 'networkidle' });
	await page.evaluate(() => document.fonts.ready);
	await page.waitForTimeout(450);
	await page.screenshot({ path: out + file, type: 'jpeg', quality: 84 });
	console.log('captured', file);
}
await browser.close();
console.log('done');
