/**
 * Lists product-category work grouped by status, in grid sort order.
 *
 *   node scripts/work-by-status.js [status] [--outcomes]
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const rel = (...p) => path.join(ROOT, ...p);

const src = fs.readFileSync(rel('app/work/constants.ts'), 'utf8');
const v2 = JSON.parse(fs.readFileSync(rel('data/case-studies-v2.json'), 'utf8'));

const LABEL = {
  production: 'IN PRODUCTION',
  internal: 'SHIPPED INTERNALLY',
  'customer-testing': 'IN CUSTOMER TESTING',
  prototype: 'PROTOTYPE',
  research: 'RESEARCH',
  null: 'NO BADGE',
};
const MEANING = {
  production: 'Shipped, real customers, still running',
  internal: 'Live inside the company, not a commercial product',
  'customer-testing': 'With real users, not yet GA',
  prototype: 'Working build, never went to users',
  research: 'Exploration, study, or feasibility work',
  null: 'Coursework, small experiments',
};
const ORDER = ['production', 'internal', 'customer-testing', 'prototype', 'research', 'null'];

const body = src.slice(src.indexOf('export const workItems'), src.indexOf('export const filters'));
const blocks = body.split(/\n\t\},?\n/).filter((b) => b.includes('title:'));

const field = (block, key) => {
  const m = block.match(new RegExp(`${key}:\\s*(?:'((?:[^'\\\\]|\\\\.)*)'|null)`));
  if (!m) return undefined;
  return m[1] === undefined ? null : m[1].replace(/\\'/g, "'").trim();
};

const items = blocks
  .map((b, index) => ({
    index,
    title: field(b, 'title'),
    company: field(b, 'company'),
    year: field(b, 'year'),
    domain: field(b, 'domain'),
    status: field(b, 'status'),
    outcome: field(b, 'outcome'),
    slug: field(b, 'slug'),
    category: field(b, 'category'),
  }))
  .filter((i) => i.category === 'product');

const yearOf = (i) => parseInt((i.year || '').replace(/\D/g, '')) || 0;

const filter = process.argv[2];

let shown = 0;
for (const status of ORDER) {
  if (filter && filter !== status) continue;
  const group = items
    .filter((i) => (i.status ?? 'null') === status)
    .sort((a, b) => yearOf(b) - yearOf(a) || a.index - b.index);
  if (!group.length) continue;
  shown += group.length;

  console.log('');
  console.log(`\x1b[1m${LABEL[status]}\x1b[0m  \x1b[2m(${group.length})\x1b[0m`);
  console.log(`\x1b[2m${MEANING[status]}\x1b[0m`);
  console.log('\x1b[2m' + '─'.repeat(78) + '\x1b[0m');

  for (const i of group) {
    const mark = i.slug ? '\x1b[36m*\x1b[0m' : ' ';
    console.log(`${mark} ${i.title}`);
    console.log(`   \x1b[2m${i.company} · ${i.year} · ${i.domain}\x1b[0m`);
    if (process.argv.includes('--outcomes')) console.log(`   ${i.outcome}`);
  }
}

console.log('');
console.log('\x1b[2m' + '═'.repeat(78) + '\x1b[0m');
const counts = ORDER.map((s) => [s, items.filter((i) => (i.status ?? 'null') === s).length]).filter((r) => r[1]);
console.log(
  `${shown} product projects   ` +
    counts.map(([s, n]) => `${LABEL[s].toLowerCase()} ${n}`).join('  ·  '),
);
console.log(
  `\x1b[36m*\x1b[0m = has a full case study (${items.filter((i) => i.slug && v2[i.slug]).length} of ${items.length})`,
);
