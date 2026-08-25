/**
 * Checks every entry in data/case-studies-v2.json against the rules in
 * app/Changes/case-study-authoring-brief.md — section structure per status,
 * word bands, required blocks, and the four differentiation axes.
 *
 *   node scripts/verify-case-studies.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const rel = (...p) => path.join(ROOT, ...p);

const v2 = JSON.parse(fs.readFileSync(rel('data/case-studies-v2.json'), 'utf8'));
const constants = fs.readFileSync(rel('app/work/constants.ts'), 'utf8');

const BANDS = {
  production: [1000, 1200],
  internal: [800, 1000],
  'customer-testing': [800, 1000],
  prototype: [500, 700],
  research: [500, 800],
};

const DROPPED = {
  prototype: ['What I cut', 'How I got it agreed', 'Tradeoffs'],
  research: ['What I cut', 'How I got it agreed', 'Tradeoffs'],
};

const words = (s) => (s || '').trim().split(/\s+/).filter(Boolean).length;

/**
 * Narrative prose only — the body copy a reviewer reads as writing.
 * Excludes structured content (tables, scope lists, callouts, doc
 * excerpts, figure captions), which is measured separately.
 * Calibration: the reference page scores 879 under this definition,
 * squarely inside its 800–1000 band.
 */
function prose(cs) {
  let n = 0;
  for (const s of cs.summary) n += words(s.text);
  for (const sec of cs.sections) {
    (sec.body || []).forEach((p) => (n += words(p)));
    (sec.after || []).forEach((p) => (n += words(p)));
    for (const b of sec.blocks || []) {
      if (b.kind === 'para') n += words(b.text);
      else if (b.kind === 'decisions') b.items.forEach((i) => (n += words(i.lead) + words(i.text)));
      else if (b.kind === 'definition') n += words(b.text);
    }
  }
  return n;
}

const problems = [];
const rows = [];
const chartForms = new Map();
const tileSets = new Map();
const evidence = new Map();
const disagreements = new Map();
const configs = new Set();

for (const [slug, cs] of Object.entries(v2)) {
  const st = cs.status;
  const band = BANDS[st];
  const wc = prose(cs);
  const headings = cs.sections.map((s) => s.heading);
  const all = JSON.stringify(cs);

  // slug wired into the grid
  if (!constants.includes(`slug: '${slug}'`)) problems.push(`${slug}: no work-item slug in constants.ts`);

  // word band
  if (wc < band[0] || wc > band[1]) problems.push(`${slug} (${st}): ${wc} words, band ${band[0]}-${band[1]}`);

  // three summary paragraphs
  if (cs.summary.length !== 3) problems.push(`${slug}: summary has ${cs.summary.length} paragraphs, expected 3`);

  // meta four fields
  const mk = Object.keys(cs.meta).join(',');
  if (mk !== 'role,team,timeline,stage') problems.push(`${slug}: meta order is ${mk}`);

  // confidentiality + footer
  if (!cs.confidentiality) problems.push(`${slug}: no confidentiality line`);
  if (!cs.sampleNote) problems.push(`${slug}: no sample-figures footer`);

  // dropped sections per status
  for (const d of DROPPED[st] || []) {
    if (headings.includes(d)) problems.push(`${slug} (${st}): section "${d}" should be dropped`);
  }
  // customer-testing extra section
  if (st === 'customer-testing' && !headings.includes('What would make me stop')) {
    problems.push(`${slug}: customer-testing needs "What would make me stop"`);
  }
  // section 08 naming
  const expect08 = { production: 'Impact and outcomes', internal: 'Impact and outcomes', 'customer-testing': 'Early signal and what I\'m watching', prototype: 'What we learned', research: 'Finding and what it changed' }[st];
  if (!headings.includes(expect08)) problems.push(`${slug} (${st}): missing outcome section "${expect08}"`);

  // sequential numbering
  cs.sections.forEach((s, i) => {
    const want = String(i + 1).padStart(2, '0');
    if (s.num !== want) problems.push(`${slug}: section ${i} numbered ${s.num}, expected ${want}`);
  });

  // exactly one config
  const cfgs = cs.sections.flatMap((s) => (s.blocks || []).filter((b) => b.kind === 'config'));
  if (cfgs.length !== 1) problems.push(`${slug}: ${cfgs.length} config lines, expected exactly 1`);
  else { if (configs.has(cfgs[0].text)) problems.push(`${slug}: duplicate config line`); configs.add(cfgs[0].text); }

  // "How it works" was removed from every page, and with it every arch block
  const archs = cs.sections.flatMap((s) => (s.blocks || []).filter((b) => b.kind === 'arch'));
  if (archs.length) problems.push(`${slug}: ${archs.length} arch blocks, expected 0`);
  if (headings.includes('How it works')) problems.push(`${slug}: "How it works" section should be removed`);

  // shot block with 3-4 callouts
  const shots = cs.sections.flatMap((s) => (s.blocks || []).filter((b) => b.kind === 'shot'));
  if (shots.length !== 1) problems.push(`${slug}: ${shots.length} shot blocks, expected 1`);
  for (const sh of shots) {
    if (sh.callouts.length < 3 || sh.callouts.length > 4) problems.push(`${slug}: shot has ${sh.callouts.length} callouts, expected 3-4`);
    if (sh.image && !fs.existsSync(rel('public', sh.image))) problems.push(`${slug}: missing shot image ${sh.image}`);
  }

  // at most one gallery, images resolve, 2-6 items
  const galleries = cs.sections.flatMap((s) => (s.blocks || []).filter((b) => b.kind === 'gallery'));
  if (galleries.length > 1) problems.push(`${slug}: ${galleries.length} gallery blocks, at most 1 allowed`);
  for (const g of galleries) {
    if (g.items.length < 1 || g.items.length > 6) problems.push(`${slug}: gallery has ${g.items.length} items, expected 1-6`);
    for (const it of g.items) {
      if (it.image) {
        if (!fs.existsSync(rel('public', it.image))) problems.push(`${slug}: missing gallery image ${it.image}`);
      } else if (!it.placeholder) problems.push(`${slug}: gallery item with neither image nor placeholder`);
    }
  }

  // threshold + guardrail named
  if (!/agreed (?:before|that|this|the)|pre-agreed|we agreed/i.test(all)) problems.push(`${slug}: no pre-agreed threshold stated`);
  if (!/guardrail/i.test(all)) problems.push(`${slug}: no guardrail named`);

  // metric definition line (full case studies)
  const defs = cs.sections.flatMap((s) => (s.blocks || []).filter((b) => b.kind === 'definition'));
  if (['production', 'internal', 'customer-testing'].includes(st) && defs.length !== 1) {
    problems.push(`${slug}: ${defs.length} "how we counted" lines, expected 1`);
  }

  // research must state a limitation
  if (st === 'research' && !/cannot tell us|could not tell|says nothing about/i.test(all)) {
    problems.push(`${slug}: research page states no limitation`);
  }
  // prototype must say it never went to users
  if (st === 'prototype' && !/never (?:went|used|released|reached|put in front)/i.test(all)) {
    problems.push(`${slug}: prototype does not say plainly it never went to users`);
  }

  // configuration must not appear in metric tiles
  const tiles = cs.sections.flatMap((s) => (s.blocks || []).filter((b) => b.kind === 'metrics')).flatMap((b) => b.items);
  const tileCount = tiles.length;
  const expectTiles = ['production', 'internal', 'customer-testing'].includes(st) ? 6 : 4;
  if (tileCount !== expectTiles) problems.push(`${slug}: ${tileCount} metric tiles, expected ${expectTiles}`);

  // ── differentiation keys ──
  const outSec = cs.sections.find((s) => s.heading === expect08);
  const form = (outSec.blocks || []).filter((b) => b.kind === 'figure').map((b) => b.chart.form).join('+');
  if (chartForms.has(form)) problems.push(`DIFF: §08 chart form "${form}" shared by ${slug} and ${chartForms.get(form)}`);
  chartForms.set(form, slug);

  const tk = tiles.map((t) => t.label).sort().join('|');
  if (tileSets.has(tk)) problems.push(`DIFF: identical metric tile set in ${slug} and ${tileSets.get(tk)}`);
  tileSets.set(tk, slug);

  const sec02 = cs.sections.find((s) => s.heading === 'The problem as people experienced it');
  const ev = (sec02.body || []).join(' ');
  const evKey = ev.slice(0, 60);
  if (evidence.has(evKey)) problems.push(`DIFF: identical §02 evidence method in ${slug} and ${evidence.get(evKey)}`);
  evidence.set(evKey, slug);

  const sec05 = cs.sections.find((s) => s.heading === 'How I got it agreed');
  if (sec05) {
    const d = (sec05.body || [])[0].slice(0, 50);
    if (disagreements.has(d)) problems.push(`DIFF: identical §05 disagreement in ${slug} and ${disagreements.get(d)}`);
    disagreements.set(d, slug);
  }

  // attribution consistency: page holds "I" or "we"
  const iCount = (all.match(/\b(I|my|me)\b/g) || []).length;
  const weCount = (all.match(/\b(we|our|us)\b/gi) || []).length;
  const voice = iCount >= weCount ? 'I' : 'we';

  rows.push({ slug, status: st, words: wc, sections: cs.sections.length, tiles: tileCount, form, voice, ev: ev.split(/[.,]/)[0].slice(0, 46) });
}

console.log('\nslug'.padEnd(62) + 'status'.padEnd(18) + 'words'.padEnd(7) + 'sec'.padEnd(5) + 'tiles'.padEnd(7) + '§08 form'.padEnd(14) + 'voice');
console.log('-'.repeat(125));
for (const r of rows.sort((a, b) => a.status.localeCompare(b.status) || a.slug.localeCompare(b.slug))) {
  console.log(r.slug.slice(0, 60).padEnd(62) + r.status.padEnd(18) + String(r.words).padEnd(7) + String(r.sections).padEnd(5) + String(r.tiles).padEnd(7) + r.form.padEnd(14) + r.voice);
}

console.log('\nDistinct §08 chart forms: ' + chartForms.size + ' across ' + rows.length + ' case studies');
console.log('Distinct metric tile sets: ' + tileSets.size);
console.log('Distinct §02 evidence methods: ' + evidence.size);
console.log('Distinct §05 disagreements: ' + disagreements.size + ' across ' + rows.filter(r => !['prototype','research'].includes(r.status)).length + ' eligible pages');

if (problems.length) {
  console.log('\n=== PROBLEMS (' + problems.length + ') ===');
  problems.forEach((p) => console.log('  ! ' + p));
} else {
  console.log('\nAll checks passed.');
}
