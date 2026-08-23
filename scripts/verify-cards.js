/**
 * Checks every card in app/work/constants.ts: completeness, valid status,
 * image resolves, slug wiring, and grid sort order in all three filter views.
 *
 *   node scripts/verify-cards.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const rel = (...p) => path.join(ROOT, ...p);

const src = fs.readFileSync(rel('app/work/constants.ts'), 'utf8');
const v2 = JSON.parse(fs.readFileSync(rel('data/case-studies-v2.json'), 'utf8'));
const v1 = JSON.parse(fs.readFileSync(rel('data/case-studies.json'), 'utf8'));

const VALID = ['production', 'internal', 'customer-testing', 'prototype', 'research'];
const STATUS_RANK = { production: 1, internal: 2, 'customer-testing': 3, prototype: 4, research: 5, null: 6 };

// Parse the work items out of the source array.
const body = src.slice(src.indexOf('export const workItems'), src.indexOf('export const filters'));
const blocks = body.split(/\n\t\},?\n/).filter((b) => b.includes('title:'));

const field = (block, key) => {
  const m = block.match(new RegExp(`${key}:\\s*(?:'((?:[^'\\\\]|\\\\.)*)'|null)`));
  if (!m) return undefined;
  return m[1] === undefined ? null : m[1].replace(/\\'/g, "'");
};

const problems = [];
const items = [];

for (const b of blocks) {
  const item = {
    title: field(b, 'title'),
    company: field(b, 'company'),
    year: field(b, 'year'),
    domain: field(b, 'domain'),
    status: field(b, 'status'),
    outcome: field(b, 'outcome'),
    image: field(b, 'image'),
    slug: field(b, 'slug'),
    category: field(b, 'category'),
  };
  items.push(item);
  const t = (item.title || '(untitled)').slice(0, 46);

  if (!item.image || !fs.existsSync(rel('public/static/images/project', item.image)))
    problems.push(`${t}: image missing — ${item.image}`);
  if (item.status !== null && !VALID.includes(item.status))
    problems.push(`${t}: invalid status "${item.status}"`);
  for (const k of ['company', 'year', 'domain', 'outcome'])
    if (!item[k] || /TODO/.test(item[k])) problems.push(`${t}: ${k} missing or TODO`);
  if (!['product', 'engineering'].includes(item.category))
    problems.push(`${t}: invalid category "${item.category}"`);
  if (/\((in production|prototype|research|shipped|in progress)/i.test(item.title || ''))
    problems.push(`${t}: status parenthetical in title`);
  if (item.outcome && item.outcome.trim().split(/(?<=[.!?])\s+/).filter(Boolean).length > 1)
    problems.push(`${t}: outcome is more than one sentence`);
  if (item.domain && item.domain.split(/\s+/).length > 3)
    problems.push(`${t}: domain is more than 3 words`);
  if (item.slug && !v2[item.slug] && !v1[item.slug])
    problems.push(`${t}: slug "${item.slug}" has no case study`);
}

// every v2 case study must be reachable from a card
for (const slug of Object.keys(v2))
  if (!items.some((i) => i.slug === slug)) problems.push(`case study "${slug}" is not linked from any card`);

// sort order holds in every filter view
const sorted = items
  .map((item, index) => ({ item, index }))
  .sort((a, b) => {
    const ra = STATUS_RANK[a.item.status ?? 'null'];
    const rb = STATUS_RANK[b.item.status ?? 'null'];
    if (ra !== rb) return ra - rb;
    const ya = parseInt((a.item.year || '').replace(/\D/g, '')) || 0;
    const yb = parseInt((b.item.year || '').replace(/\D/g, '')) || 0;
    if (ya !== yb) return yb - ya;
    return a.index - b.index;
  })
  .map((w) => w.item);

for (const view of ['all', 'product', 'engineering']) {
  const list = view === 'all' ? sorted : sorted.filter((i) => i.category === view);
  for (let i = 1; i < list.length; i++) {
    const ra = STATUS_RANK[list[i - 1].status ?? 'null'];
    const rb = STATUS_RANK[list[i].status ?? 'null'];
    if (ra > rb) problems.push(`sort broken in "${view}" view at ${list[i].title.slice(0, 30)}`);
    if (ra === rb) {
      const ya = parseInt((list[i - 1].year || '').replace(/\D/g, '')) || 0;
      const yb = parseInt((list[i].year || '').replace(/\D/g, '')) || 0;
      if (ya < yb) problems.push(`year order broken in "${view}" at ${list[i].title.slice(0, 30)}`);
    }
  }
}

const counts = {};
for (const i of items) counts[i.status ?? 'null'] = (counts[i.status ?? 'null'] || 0) + 1;

console.log(`Work items: ${items.length}`);
console.log('Status distribution:', counts);
console.log(`Cards linked to a case study: ${items.filter((i) => i.slug).length}`);
console.log(
  problems.length ? `\n=== CARD PROBLEMS (${problems.length}) ===\n  ! ` + problems.join('\n  ! ') : '\nAll card checks passed.',
);
