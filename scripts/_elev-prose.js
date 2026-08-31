// Elevation-run helper: dump the prose fields of one case study with word
// counts, so trims can be planned without loading the whole entry.
//   node scripts/_elev-prose.js <slug>
const fs = require('fs');
const slug = process.argv[2];
const v2 = JSON.parse(fs.readFileSync('data/case-studies-v2.json', 'utf8'));
const cs = v2[slug];
if (!cs) { console.error('no such slug'); process.exit(1); }
const w = (s) => (s || '').trim().split(/\s+/).filter(Boolean).length;
let total = 0;
const say = (tag, t) => { total += w(t); console.log(`[${tag}] (${w(t)}w) ${t}`); };
cs.summary.forEach((s, i) => say(`summary.${i} ${s.lead}`, s.text));
cs.sections.forEach((sec, si) => {
	console.log(`\n== §${sec.num} ${sec.heading} ==`);
	(sec.body || []).forEach((t, i) => say(`s${si}.body[${i}]`, t));
	(sec.blocks || []).forEach((b, bi) => {
		if (b.kind === 'para') say(`s${si}.blocks[${bi}].para`, b.text);
		else if (b.kind === 'decisions') b.items.forEach((it, ii) => say(`s${si}.b[${bi}].item[${ii}] LEAD:${it.lead}`, it.text));
		else if (b.kind === 'definition') say(`s${si}.blocks[${bi}].definition`, b.text);
	});
	(sec.after || []).forEach((t, i) => say(`s${si}.after[${i}]`, t));
});
console.log(`\nTOTAL ${total}`);
