/**
 * ================================================================
 * CASE STUDY — STATIC SVG CHARTS
 * ================================================================
 * All charts are static, drawn from a fixed window, and captioned
 * with period and source by the caller. No live embeds: they break
 * when tokens expire, expose internal data, and drift away from the
 * numbers the prose describes.
 *
 * Conventions are inherited from the reference case study:
 *   viewBox "0 0 700 H"  ·  .g-line grid  ·  .g-lbl axis labels
 *   .g-name row names    ·  .g-val values ·  <title> for screen readers
 *
 * One §08 form per project — the chart shape is part of how each
 * project reads as its own product rather than one rubric restamped.
 */

import type { ChartSpec } from './case-study-types';

const ACCENT = '#5b7cfa';
const ACCENT_DIM = '#2c3a73';
const SHIP = '#3fae8b';
const WARN = '#c9973f';
const CUT = '#d0745a';

/** Stable id from the chart title, so SSR and client markup agree. */
function idFor(title: string): string {
	let h = 0;
	for (let i = 0; i < title.length; i++) {
		h = (h * 31 + title.charCodeAt(i)) | 0;
	}
	return `cht${Math.abs(h).toString(36)}`;
}

function Frame({
	title,
	height,
	children,
}: {
	title: string;
	height: number;
	children: React.ReactNode;
}) {
	const id = idFor(title);
	return (
		<svg viewBox={`0 0 700 ${height}`} role='img' aria-labelledby={id}>
			<title id={id}>{title}</title>
			{children}
		</svg>
	);
}

// ── Individual forms ────────────────────────────────────────────

function HBar({ spec }: { spec: Extract<ChartSpec, { form: 'hbar' }> }) {
	const L = 210;
	const W = 400;
	const step = 44;
	const h = spec.rows.length * step + 40;
	return (
		<Frame title={spec.title} height={h}>
			{spec.rows.map((r, i) => {
				const y = i * step + 12;
				const w = Math.max(2, (r.value / spec.max) * W);
				return (
					<g key={r.name}>
						<text className='g-name' x='0' y={y + 14}>
							{r.name}
						</text>
						<rect
							x={L}
							y={y}
							width={w}
							height='18'
							rx='3'
							fill={r.dim ? ACCENT_DIM : ACCENT}
						/>
						<text className='g-val' x={L + w + 12} y={y + 14}>
							{r.label}
						</text>
					</g>
				);
			})}
			<line
				className='g-line'
				x1={L}
				y1={spec.rows.length * step + 4}
				x2='680'
				y2={spec.rows.length * step + 4}
			/>
			<text className='g-lbl' x={L} y={spec.rows.length * step + 22}>
				0
			</text>
			<text
				className='g-lbl'
				x='680'
				y={spec.rows.length * step + 22}
				textAnchor='end'
			>
				{spec.max}
				{spec.unit ? ` ${spec.unit}` : ''}
			</text>
		</Frame>
	);
}

function LineArea({
	spec,
}: {
	spec: Extract<ChartSpec, { form: 'lineArea' }>;
}) {
	const L = 48;
	const R = 680;
	const T = 20;
	const B = 200;
	const y = (v: number) => B - (v / spec.yMax) * (B - T);
	const x = (i: number) =>
		L + (i / Math.max(1, spec.points.length - 1)) * (R - L);
	const line = spec.points.map((p, i) => `${x(i)},${y(p)}`).join(' ');
	return (
		<Frame title={spec.title} height={240}>
			{spec.yTicks.map((t) => (
				<g key={t}>
					<line className='g-line' x1={L} y1={y(t)} x2={R} y2={y(t)} />
					<text className='g-lbl' x={L - 8} y={y(t) + 4} textAnchor='end'>
						{t}
					</text>
				</g>
			))}
			<polygon
				fill={ACCENT}
				fillOpacity='0.12'
				points={`${line} ${R},${B} ${L},${B}`}
			/>
			<polyline
				fill='none'
				stroke={ACCENT}
				strokeWidth='2'
				strokeLinejoin='round'
				points={line}
			/>
			<circle
				cx={x(spec.points.length - 1)}
				cy={y(spec.points[spec.points.length - 1])}
				r='4'
				fill={ACCENT}
			/>
			{spec.threshold && (
				<>
					<line
						x1={L}
						y1={y(spec.threshold.value)}
						x2={R}
						y2={y(spec.threshold.value)}
						stroke={WARN}
						strokeWidth='1'
						strokeDasharray='4 4'
					/>
					<text
						className='g-lbl'
						x={L + 6}
						y={y(spec.threshold.value) - 6}
						fill={WARN}
					>
						{spec.threshold.label}
					</text>
				</>
			)}
			{spec.xLabels.map((lbl, i) => {
				const pos = (i / Math.max(1, spec.xLabels.length - 1)) * (R - L) + L;
				const last = i === spec.xLabels.length - 1;
				return (
					<text
						key={lbl}
						className='g-lbl'
						x={pos}
						y='222'
						textAnchor={last ? 'end' : i === 0 ? 'start' : 'middle'}
					>
						{lbl}
					</text>
				);
			})}
		</Frame>
	);
}

function PairedBars({
	spec,
}: {
	spec: Extract<ChartSpec, { form: 'pairedBars' }>;
}) {
	const L = 48;
	const T = 20;
	const B = 190;
	const slot = (680 - L) / spec.groups.length;
	const bw = Math.min(46, slot / 3);
	const y = (v: number) => B - (v / spec.yMax) * (B - T);
	return (
		<Frame title={spec.title} height={240}>
			<line className='g-line' x1={L} y1={B} x2='680' y2={B} />
			<line
				className='g-line'
				x1={L}
				y1={y(spec.yMax / 2)}
				x2='680'
				y2={y(spec.yMax / 2)}
			/>
			<text className='g-lbl' x={L - 8} y={B + 4} textAnchor='end'>
				0
			</text>
			<text className='g-lbl' x={L - 8} y={T + 4} textAnchor='end'>
				{spec.yMax}
			</text>
			{spec.groups.map((g, i) => {
				const cx = L + slot * i + slot / 2;
				return (
					<g key={g.name}>
						<rect
							x={cx - bw - 3}
							y={y(g.before)}
							width={bw}
							height={B - y(g.before)}
							rx='3'
							fill={ACCENT_DIM}
						/>
						<rect
							x={cx + 3}
							y={y(g.after)}
							width={bw}
							height={B - y(g.after)}
							rx='3'
							fill={ACCENT}
						/>
						<text
							className='g-val'
							x={cx - bw / 2 - 3}
							y={y(g.before) - 6}
							textAnchor='middle'
						>
							{g.before}
						</text>
						<text
							className='g-val'
							x={cx + bw / 2 + 3}
							y={y(g.after) - 6}
							textAnchor='middle'
						>
							{g.after}
						</text>
						<text className='g-name' x={cx} y={B + 22} textAnchor='middle'>
							{g.name}
						</text>
					</g>
				);
			})}
			<rect x={L} y='214' width='10' height='10' rx='2' fill={ACCENT_DIM} />
			<text className='g-lbl' x={L + 16} y='223'>
				{spec.beforeLabel}
			</text>
			<rect x={L + 140} y='214' width='10' height='10' rx='2' fill={ACCENT} />
			<text className='g-lbl' x={L + 156} y='223'>
				{spec.afterLabel}
			</text>
			{spec.unit && (
				<text className='g-lbl' x='680' y='223' textAnchor='end'>
					{spec.unit}
				</text>
			)}
		</Frame>
	);
}

function Funnel({ spec }: { spec: Extract<ChartSpec, { form: 'funnel' }> }) {
	const step = 46;
	const h = spec.stages.length * step + 24;
	const top = spec.stages[0].value;
	const maxW = 420;
	return (
		<Frame title={spec.title} height={h}>
			{spec.stages.map((s, i) => {
				const y = i * step + 10;
				const w = Math.max(4, (s.value / top) * maxW);
				const cx = 350;
				return (
					<g key={s.name}>
						<rect
							x={cx - w / 2}
							y={y}
							width={w}
							height='26'
							rx='3'
							fill={ACCENT}
							fillOpacity={1 - i * 0.13}
						/>
						<text className='g-name' x='0' y={y + 18}>
							{s.name}
						</text>
						<text className='g-val' x='680' y={y + 18} textAnchor='end'>
							{s.label}
						</text>
					</g>
				);
			})}
		</Frame>
	);
}

function StackedBars({
	spec,
}: {
	spec: Extract<ChartSpec, { form: 'stackedBars' }>;
}) {
	const L = 48;
	// markers sit above the plot, so the top rail drops when they are present
	const T = spec.markers?.length ? 44 : 20;
	const B = 190;
	const slot = (680 - L) / spec.columns.length;
	const bw = Math.min(44, slot * 0.55);
	const scale = (v: number) => (v / spec.yMax) * (B - T);
	// legend wraps at three per row, so a six-series chart still fits the frame
	const perRow = 3;
	const legendRows = Math.ceil(spec.series.length / perRow);
	return (
		<Frame title={spec.title} height={244 + (legendRows - 1) * 20}>
			<line className='g-line' x1={L} y1={B} x2='680' y2={B} />
			<line className='g-line' x1={L} y1={T} x2='680' y2={T} />
			{spec.markers?.map((m) => {
				const cx = L + slot * m.index + slot / 2;
				return (
					<g key={m.label}>
						<line
							x1={cx}
							y1={T}
							x2={cx}
							y2={B}
							stroke={WARN}
							strokeWidth='1'
							strokeDasharray='3 4'
						/>
						<text
							className='g-lbl'
							x={cx}
							y={T - 20}
							textAnchor='middle'
							fill={WARN}
						>
							{m.label}
						</text>
						<text
							className='g-lbl'
							x={cx}
							y={T - 7}
							textAnchor='middle'
							fill={WARN}
						>
							▾
						</text>
					</g>
				);
			})}
			<text className='g-lbl' x={L - 8} y={B + 4} textAnchor='end'>
				0
			</text>
			<text className='g-lbl' x={L - 8} y={T + 4} textAnchor='end'>
				{spec.yMax}
			</text>
			{spec.columns.map((c, i) => {
				const cx = L + slot * i + slot / 2;
				let acc = 0;
				return (
					<g key={c.name}>
						{c.values.map((v, si) => {
							const hgt = scale(v);
							acc += hgt;
							return (
								<rect
									key={spec.series[si].name}
									x={cx - bw / 2}
									y={B - acc}
									width={bw}
									height={Math.max(0, hgt)}
									fill={spec.series[si].color}
								/>
							);
						})}
						<text className='g-name' x={cx} y={B + 22} textAnchor='middle'>
							{c.name}
						</text>
					</g>
				);
			})}
			{spec.series.map((s, i) => {
				const lx = L + (i % perRow) * 205;
				const ly = 218 + Math.floor(i / perRow) * 20;
				return (
					<g key={s.name}>
						<rect x={lx} y={ly} width='10' height='10' rx='2' fill={s.color} />
						<text className='g-lbl' x={lx + 16} y={ly + 9}>
							{s.name}
						</text>
					</g>
				);
			})}
		</Frame>
	);
}

function Dumbbell({
	spec,
}: {
	spec: Extract<ChartSpec, { form: 'dumbbell' }>;
}) {
	const L = 210;
	const W = 400;
	const step = 46;
	const h = spec.rows.length * step + 40;
	const px = (v: number) => L + (v / spec.max) * W;
	return (
		<Frame title={spec.title} height={h}>
			{spec.rows.map((r, i) => {
				const y = i * step + 20;
				return (
					<g key={r.name}>
						<text className='g-name' x='0' y={y + 5}>
							{r.name}
						</text>
						<line
							x1={px(r.from)}
							y1={y}
							x2={px(r.to)}
							y2={y}
							stroke={ACCENT_DIM}
							strokeWidth='2'
						/>
						<circle cx={px(r.from)} cy={y} r='5' fill={ACCENT_DIM} />
						<circle cx={px(r.to)} cy={y} r='5' fill={ACCENT} />
						<text
							className='g-val'
							x={px(r.from)}
							y={y - 12}
							textAnchor='middle'
						>
							{r.from}
						</text>
						<text className='g-val' x={px(r.to)} y={y - 12} textAnchor='middle'>
							{r.to}
						</text>
					</g>
				);
			})}
			<line
				className='g-line'
				x1={L}
				y1={spec.rows.length * step + 8}
				x2='680'
				y2={spec.rows.length * step + 8}
			/>
			<text className='g-lbl' x={L} y={spec.rows.length * step + 26}>
				0
			</text>
			<text
				className='g-lbl'
				x='680'
				y={spec.rows.length * step + 26}
				textAnchor='end'
			>
				{spec.max}
				{spec.unit ? ` ${spec.unit}` : ''}
			</text>
		</Frame>
	);
}

function GroupedHBar({
	spec,
}: {
	spec: Extract<ChartSpec, { form: 'groupedHBar' }>;
}) {
	const L = 200;
	const W = 400;
	const step = 58;
	const h = spec.rows.length * step + 46;
	return (
		<Frame title={spec.title} height={h}>
			{spec.rows.map((r, i) => {
				const y = i * step + 10;
				const wa = Math.max(2, (r.a / spec.max) * W);
				const wb = Math.max(2, (r.b / spec.max) * W);
				return (
					<g key={r.name}>
						<text className='g-name' x='0' y={y + 20}>
							{r.name}
						</text>
						<rect x={L} y={y} width={wa} height='15' rx='2' fill={ACCENT_DIM} />
						<text className='g-val' x={L + wa + 10} y={y + 12}>
							{r.a}
						</text>
						<rect
							x={L}
							y={y + 20}
							width={wb}
							height='15'
							rx='2'
							fill={ACCENT}
						/>
						<text className='g-val' x={L + wb + 10} y={y + 32}>
							{r.b}
						</text>
					</g>
				);
			})}
			<line
				className='g-line'
				x1={L}
				y1={spec.rows.length * step + 2}
				x2='680'
				y2={spec.rows.length * step + 2}
			/>
			<rect
				x={L}
				y={spec.rows.length * step + 14}
				width='10'
				height='10'
				rx='2'
				fill={ACCENT_DIM}
			/>
			<text className='g-lbl' x={L + 16} y={spec.rows.length * step + 23}>
				{spec.seriesNames[0]}
			</text>
			<rect
				x={L + 190}
				y={spec.rows.length * step + 14}
				width='10'
				height='10'
				rx='2'
				fill={ACCENT}
			/>
			<text className='g-lbl' x={L + 206} y={spec.rows.length * step + 23}>
				{spec.seriesNames[1]}
			</text>
			{spec.unit && (
				<text
					className='g-lbl'
					x='680'
					y={spec.rows.length * step + 23}
					textAnchor='end'
				>
					{spec.unit}
				</text>
			)}
		</Frame>
	);
}

function Slope({ spec }: { spec: Extract<ChartSpec, { form: 'slope' }> }) {
	const LX = 210;
	const RX = 560;
	const T = 24;
	const B = 190;
	const y = (v: number) => B - (v / spec.yMax) * (B - T);
	return (
		<Frame title={spec.title} height={230}>
			<line className='g-line' x1={LX} y1={T - 8} x2={LX} y2={B + 8} />
			<line className='g-line' x1={RX} y1={T - 8} x2={RX} y2={B + 8} />
			{spec.lines.map((l) => (
				<g key={l.name}>
					<text className='g-name' x='0' y={y(l.from) + 5}>
						{l.name}
					</text>
					<line
						x1={LX}
						y1={y(l.from)}
						x2={RX}
						y2={y(l.to)}
						stroke={ACCENT}
						strokeWidth='2'
					/>
					<circle cx={LX} cy={y(l.from)} r='4' fill={ACCENT_DIM} />
					<circle cx={RX} cy={y(l.to)} r='4' fill={ACCENT} />
					<text className='g-val' x={RX + 12} y={y(l.to) + 5}>
						{l.to}
						{spec.unit ? ` ${spec.unit}` : ''}
					</text>
					<text
						className='g-val'
						x={LX - 12}
						y={y(l.from) + 5}
						textAnchor='end'
					>
						{l.from}
					</text>
				</g>
			))}
			<text className='g-lbl' x={LX} y={B + 28} textAnchor='middle'>
				{spec.leftLabel}
			</text>
			<text className='g-lbl' x={RX} y={B + 28} textAnchor='middle'>
				{spec.rightLabel}
			</text>
		</Frame>
	);
}

function StackedArea({
	spec,
}: {
	spec: Extract<ChartSpec, { form: 'stackedArea' }>;
}) {
	const L = 48;
	const R = 680;
	const T = 20;
	const B = 190;
	const n = spec.xLabels.length;
	const x = (i: number) => L + (i / Math.max(1, n - 1)) * (R - L);
	const y = (v: number) => B - (v / spec.yMax) * (B - T);
	const totals = new Array(n).fill(0);
	return (
		<Frame title={spec.title} height={236}>
			<line className='g-line' x1={L} y1={B} x2={R} y2={B} />
			<line
				className='g-line'
				x1={L}
				y1={y(spec.yMax / 2)}
				x2={R}
				y2={y(spec.yMax / 2)}
			/>
			<text className='g-lbl' x={L - 8} y={B + 4} textAnchor='end'>
				0
			</text>
			<text className='g-lbl' x={L - 8} y={T + 4} textAnchor='end'>
				{spec.yMax}
			</text>
			{spec.series.map((s) => {
				const lower = [...totals];
				const upper = totals.map((t, i) => t + s.points[i]);
				for (let i = 0; i < n; i++) totals[i] = upper[i];
				const top = upper.map((v, i) => `${x(i)},${y(v)}`).join(' ');
				// walk the lower edge back to close the band
				const bottom = lower
					.map((_, i) => `${x(n - 1 - i)},${y(lower[n - 1 - i])}`)
					.join(' ');
				return (
					<polygon
						key={s.name}
						points={`${top} ${bottom}`}
						fill={s.color}
						fillOpacity='0.55'
					/>
				);
			})}
			{spec.xLabels.map((lbl, i) => (
				<text
					key={lbl}
					className='g-lbl'
					x={x(i)}
					y={B + 20}
					textAnchor={i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'}
				>
					{lbl}
				</text>
			))}
			{spec.series.map((s, i) => (
				<g key={s.name}>
					<rect
						x={L + i * 150}
						y='212'
						width='10'
						height='10'
						rx='2'
						fill={s.color}
					/>
					<text className='g-lbl' x={L + i * 150 + 16} y='221'>
						{s.name}
					</text>
				</g>
			))}
		</Frame>
	);
}

function BarsThreshold({
	spec,
}: {
	spec: Extract<ChartSpec, { form: 'barsThreshold' }>;
}) {
	const L = 48;
	const T = 24;
	const B = 190;
	const slot = (680 - L) / spec.columns.length;
	const bw = Math.min(40, slot * 0.5);
	const y = (v: number) => B - (v / spec.yMax) * (B - T);
	return (
		<Frame title={spec.title} height={240}>
			<line className='g-line' x1={L} y1={B} x2='680' y2={B} />
			<text className='g-lbl' x={L - 8} y={B + 4} textAnchor='end'>
				0
			</text>
			<text className='g-lbl' x={L - 8} y={T + 4} textAnchor='end'>
				{spec.yMax}
			</text>
			{spec.columns.map((c, i) => {
				const cx = L + slot * i + slot / 2;
				const under = c.value <= spec.threshold.value;
				return (
					<g key={c.name}>
						<rect
							x={cx - bw / 2}
							y={y(c.value)}
							width={bw}
							height={B - y(c.value)}
							rx='3'
							fill={under ? ACCENT : WARN}
						/>
						<text
							className='g-val'
							x={cx}
							y={y(c.value) - 6}
							textAnchor='middle'
						>
							{c.value}
						</text>
						<text className='g-name' x={cx} y={B + 22} textAnchor='middle'>
							{c.name}
						</text>
					</g>
				);
			})}
			<line
				x1={L}
				y1={y(spec.threshold.value)}
				x2='680'
				y2={y(spec.threshold.value)}
				stroke={WARN}
				strokeWidth='1'
				strokeDasharray='4 4'
			/>
			<text
				className='g-lbl'
				x='680'
				y={y(spec.threshold.value) - 6}
				textAnchor='end'
				fill={WARN}
			>
				{spec.threshold.label}
			</text>
			{spec.unit && (
				<text className='g-lbl' x='680' y='232' textAnchor='end'>
					{spec.unit}
				</text>
			)}
		</Frame>
	);
}

function DualLine({
	spec,
}: {
	spec: Extract<ChartSpec, { form: 'dualLine' }>;
}) {
	const L = 48;
	const R = 680;
	const T = 20;
	const B = 190;
	const n = spec.xLabels.length;
	const x = (i: number) => L + (i / Math.max(1, n - 1)) * (R - L);
	const y = (v: number) => B - (v / spec.yMax) * (B - T);
	return (
		<Frame title={spec.title} height={236}>
			<line className='g-line' x1={L} y1={B} x2={R} y2={B} />
			<line
				className='g-line'
				x1={L}
				y1={y(spec.yMax / 2)}
				x2={R}
				y2={y(spec.yMax / 2)}
			/>
			<line className='g-line' x1={L} y1={T} x2={R} y2={T} />
			<text className='g-lbl' x={L - 8} y={B + 4} textAnchor='end'>
				0
			</text>
			<text
				className='g-lbl'
				x={L - 8}
				y={y(spec.yMax / 2) + 4}
				textAnchor='end'
			>
				{Math.round(spec.yMax / 2)}
			</text>
			<text className='g-lbl' x={L - 8} y={T + 4} textAnchor='end'>
				{spec.yMax}
			</text>
			{spec.series.map((s) => (
				<g key={s.name}>
					<polyline
						fill='none'
						stroke={s.color}
						strokeWidth='2'
						strokeLinejoin='round'
						points={s.points.map((p, i) => `${x(i)},${y(p)}`).join(' ')}
					/>
					<circle cx={x(n - 1)} cy={y(s.points[n - 1])} r='4' fill={s.color} />
				</g>
			))}
			{spec.xLabels.map((lbl, i) => (
				<text
					key={lbl}
					className='g-lbl'
					x={x(i)}
					y={B + 20}
					textAnchor={i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'}
				>
					{lbl}
				</text>
			))}
			{spec.series.map((s, i) => (
				<g key={s.name}>
					<rect
						x={L + i * 180}
						y='212'
						width='10'
						height='10'
						rx='2'
						fill={s.color}
					/>
					<text className='g-lbl' x={L + i * 180 + 16} y='221'>
						{s.name}
					</text>
				</g>
			))}
		</Frame>
	);
}

function Histogram({
	spec,
}: {
	spec: Extract<ChartSpec, { form: 'histogram' }>;
}) {
	const L = 48;
	const T = 24;
	const B = 186;
	const slot = (680 - L) / spec.bins.length;
	const bw = slot * 0.78;
	const y = (v: number) => B - (v / spec.yMax) * (B - T);
	return (
		<Frame title={spec.title} height={236}>
			<line className='g-line' x1={L} y1={B} x2='680' y2={B} />
			<text className='g-lbl' x={L - 8} y={B + 4} textAnchor='end'>
				0
			</text>
			<text className='g-lbl' x={L - 8} y={T + 4} textAnchor='end'>
				{spec.yMax}
			</text>
			{spec.bins.map((b, i) => {
				const bx = L + slot * i + (slot - bw) / 2;
				return (
					<g key={b.name}>
						<rect
							x={bx}
							y={y(b.value)}
							width={bw}
							height={B - y(b.value)}
							fill={ACCENT}
							fillOpacity='0.85'
						/>
						<text
							className='g-val'
							x={bx + bw / 2}
							y={y(b.value) - 6}
							textAnchor='middle'
						>
							{b.value}
						</text>
						<text
							className='g-lbl'
							x={bx + bw / 2}
							y={B + 18}
							textAnchor='middle'
						>
							{b.name}
						</text>
					</g>
				);
			})}
			{spec.ceiling && (
				<>
					<line
						x1={L + slot * spec.ceiling.index}
						y1={T - 8}
						x2={L + slot * spec.ceiling.index}
						y2={B}
						stroke={WARN}
						strokeWidth='1'
						strokeDasharray='4 4'
					/>
					<text
						className='g-lbl'
						x={L + slot * spec.ceiling.index + 6}
						y={T - 2}
						fill={WARN}
					>
						{spec.ceiling.label}
					</text>
				</>
			)}
			<text className='g-lbl' x='680' y={B + 36} textAnchor='end'>
				{spec.xTitle}
			</text>
		</Frame>
	);
}

function GateBars({
	spec,
}: {
	spec: Extract<ChartSpec, { form: 'gateBars' }>;
}) {
	const L = 250;
	const W = 330;
	const step = 52;
	const h = spec.rows.length * step + 30;
	return (
		<Frame title={spec.title} height={h}>
			{spec.rows.map((r, i) => {
				const y = i * step + 14;
				const w = Math.max(2, (r.value / r.max) * W);
				const tx = L + (r.target / r.max) * W;
				return (
					<g key={r.name}>
						<text className='g-name' x='0' y={y + 14}>
							{r.name}
						</text>
						<rect
							x={L}
							y={y}
							width={w}
							height='18'
							rx='3'
							fill={r.pass ? SHIP : CUT}
							fillOpacity='0.85'
						/>
						<line
							x1={tx}
							y1={y - 5}
							x2={tx}
							y2={y + 23}
							stroke={WARN}
							strokeWidth='1.5'
						/>
						<text className='g-val' x={L + W + 14} y={y + 14}>
							{r.label}
						</text>
						<text
							className='g-lbl'
							x={tx}
							y={y + 36}
							textAnchor='middle'
							fill={WARN}
						>
							{r.targetLabel}
						</text>
					</g>
				);
			})}
		</Frame>
	);
}

function Curve({ spec }: { spec: Extract<ChartSpec, { form: 'curve' }> }) {
	const L = 56;
	const R = 660;
	const T = 22;
	const B = 186;
	const n = spec.points.length;
	const x = (i: number) => L + (i / Math.max(1, n - 1)) * (R - L);
	const y = (v: number) => B - (v / spec.yMax) * (B - T);
	return (
		<Frame title={spec.title} height={232}>
			<line className='g-line' x1={L} y1={B} x2={R} y2={B} />
			<line
				className='g-line'
				x1={L}
				y1={y(spec.yMax / 2)}
				x2={R}
				y2={y(spec.yMax / 2)}
			/>
			<text className='g-lbl' x={L - 8} y={B + 4} textAnchor='end'>
				0
			</text>
			<text className='g-lbl' x={L - 8} y={T + 4} textAnchor='end'>
				{spec.yMax}
			</text>
			<polyline
				fill='none'
				stroke={ACCENT}
				strokeWidth='2'
				strokeLinejoin='round'
				points={spec.points.map((p, i) => `${x(i)},${y(p)}`).join(' ')}
			/>
			{spec.points.map((p, i) => (
				<circle key={spec.xLabels[i]} cx={x(i)} cy={y(p)} r='3' fill={ACCENT} />
			))}
			{spec.ceiling && (
				<>
					<line
						x1={L}
						y1={y(spec.ceiling.value)}
						x2={R}
						y2={y(spec.ceiling.value)}
						stroke={WARN}
						strokeWidth='1'
						strokeDasharray='4 4'
					/>
					<text
						className='g-lbl'
						x={R}
						y={y(spec.ceiling.value) - 6}
						textAnchor='end'
						fill={WARN}
					>
						{spec.ceiling.label}
					</text>
				</>
			)}
			{spec.xLabels.map((lbl, i) => (
				<text
					key={lbl}
					className='g-lbl'
					x={x(i)}
					y={B + 20}
					textAnchor='middle'
				>
					{lbl}
				</text>
			))}
			<text className='g-lbl' x={L - 8} y='214' textAnchor='start'>
				{spec.yUnit}
			</text>
		</Frame>
	);
}

function Scatter({ spec }: { spec: Extract<ChartSpec, { form: 'scatter' }> }) {
	const L = 56;
	const R = 660;
	const T = 20;
	const B = 186;
	const x = (v: number) => L + (v / spec.xMax) * (R - L);
	const y = (v: number) => B - (v / spec.yMax) * (B - T);
	const colors = [ACCENT, SHIP, WARN];
	return (
		<Frame title={spec.title} height={232}>
			<line className='g-line' x1={L} y1={B} x2={R} y2={B} />
			<line className='g-line' x1={L} y1={T} x2={L} y2={B} />
			<line
				className='g-line'
				x1={L}
				y1={y(spec.yMax / 2)}
				x2={R}
				y2={y(spec.yMax / 2)}
			/>
			<text className='g-lbl' x={L - 8} y={B + 4} textAnchor='end'>
				0
			</text>
			<text className='g-lbl' x={L - 8} y={T + 4} textAnchor='end'>
				{spec.yMax}
			</text>
			{spec.points.map((p) => (
				<circle
					key={`${p.x}-${p.y}`}
					cx={x(p.x)}
					cy={y(p.y)}
					r='4'
					fill={colors[p.group ?? 0]}
					fillOpacity='0.8'
				/>
			))}
			<text className='g-lbl' x={R} y={B + 20} textAnchor='end'>
				{spec.xTitle}
			</text>
			<text className='g-lbl' x={L} y={T - 6}>
				{spec.yTitle}
			</text>
		</Frame>
	);
}

function DotPlot({ spec }: { spec: Extract<ChartSpec, { form: 'dotplot' }> }) {
	const L = 210;
	const W = 380;
	const step = 38;
	const h = spec.rows.length * step + 44;
	const px = (v: number) => L + (v / spec.max) * W;
	return (
		<Frame title={spec.title} height={h}>
			{spec.threshold && (
				<>
					<line
						x1={px(spec.threshold.value)}
						y1='4'
						x2={px(spec.threshold.value)}
						y2={spec.rows.length * step + 4}
						stroke={WARN}
						strokeWidth='1'
						strokeDasharray='4 4'
					/>
					<text
						className='g-lbl'
						x={px(spec.threshold.value) + 6}
						y={spec.rows.length * step + 20}
						fill={WARN}
					>
						{spec.threshold.label}
					</text>
				</>
			)}
			{spec.rows.map((r, i) => {
				const y = i * step + 22;
				return (
					<g key={r.name}>
						<text className='g-name' x='0' y={y + 4}>
							{r.name}
						</text>
						<line className='g-line' x1={L} y1={y} x2={L + W} y2={y} />
						<circle cx={px(r.value)} cy={y} r='5' fill={ACCENT} />
						<text className='g-val' x={L + W + 14} y={y + 4}>
							{r.value}
						</text>
						<text className='g-lbl' x='680' y={y + 4} textAnchor='end'>
							n={r.n}
						</text>
					</g>
				);
			})}
			<text
				className='g-lbl'
				x='680'
				y={spec.rows.length * step + 34}
				textAnchor='end'
			>
				0 – {spec.max}
				{spec.unit ? ` ${spec.unit}` : ''}
			</text>
		</Frame>
	);
}

function Cumulative({
	spec,
}: {
	spec: Extract<ChartSpec, { form: 'cumulative' }>;
}) {
	const L = 52;
	const R = 680;
	const T = 20;
	const B = 190;
	const n = spec.points.length;
	const x = (i: number) => L + (i / Math.max(1, n - 1)) * (R - L);
	const y = (v: number) => B - (v / spec.yMax) * (B - T);
	// step path — cumulative units land as discrete batches, not a smooth ramp
	const steps: string[] = [];
	spec.points.forEach((p, i) => {
		if (i === 0) steps.push(`${x(i)},${y(p)}`);
		else {
			steps.push(`${x(i)},${y(spec.points[i - 1])}`);
			steps.push(`${x(i)},${y(p)}`);
		}
	});
	const path = steps.join(' ');
	return (
		<Frame title={spec.title} height={236}>
			<line className='g-line' x1={L} y1={B} x2={R} y2={B} />
			<line
				className='g-line'
				x1={L}
				y1={y(spec.yMax / 2)}
				x2={R}
				y2={y(spec.yMax / 2)}
			/>
			<line className='g-line' x1={L} y1={T} x2={R} y2={T} />
			<text className='g-lbl' x={L - 8} y={B + 4} textAnchor='end'>
				0
			</text>
			<text
				className='g-lbl'
				x={L - 8}
				y={y(spec.yMax / 2) + 4}
				textAnchor='end'
			>
				{Math.round(spec.yMax / 2)}
			</text>
			<text className='g-lbl' x={L - 8} y={T + 4} textAnchor='end'>
				{spec.yMax}
			</text>
			<polygon
				fill={ACCENT}
				fillOpacity='0.14'
				points={`${path} ${R},${B} ${L},${B}`}
			/>
			<polyline fill='none' stroke={ACCENT} strokeWidth='2' points={path} />
			<circle cx={x(n - 1)} cy={y(spec.points[n - 1])} r='4' fill={ACCENT} />
			{spec.threshold && (
				<>
					<line
						x1={L}
						y1={y(spec.threshold.value)}
						x2={R}
						y2={y(spec.threshold.value)}
						stroke={WARN}
						strokeWidth='1'
						strokeDasharray='4 4'
					/>
					<text
						className='g-lbl'
						x={L + 6}
						y={y(spec.threshold.value) - 6}
						fill={WARN}
					>
						{spec.threshold.label}
					</text>
				</>
			)}
			{spec.xLabels.map((lbl, i) => (
				<text
					key={lbl}
					className='g-lbl'
					x={x(i)}
					y={B + 22}
					textAnchor={i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'}
				>
					{lbl}
				</text>
			))}
		</Frame>
	);
}

function Survival({
	spec,
}: {
	spec: Extract<ChartSpec, { form: 'survival' }>;
}) {
	const L = 52;
	const R = 620;
	const T = 22;
	const B = 190;
	const n = spec.xLabels.length;
	const x = (i: number) => L + (i / Math.max(1, n - 1)) * (R - L);
	// y is always a share of the cohort, so the axis is fixed at 0–100
	const y = (v: number) => B - (v / 100) * (B - T);
	// step path — a matter leaves the waiting population on a day, not gradually
	const stepPath = (points: number[]) => {
		const out: string[] = [];
		points.forEach((p, i) => {
			if (i === 0) out.push(`${x(i)},${y(p)}`);
			else {
				out.push(`${x(i)},${y(points[i - 1])}`);
				out.push(`${x(i)},${y(p)}`);
			}
		});
		return out.join(' ');
	};
	return (
		<Frame title={spec.title} height={268}>
			{[0, 25, 50, 75, 100].map((v) => (
				<g key={v}>
					<line className='g-line' x1={L} y1={y(v)} x2={R} y2={y(v)} />
					<text className='g-lbl' x={L - 8} y={y(v) + 4} textAnchor='end'>
						{v}%
					</text>
				</g>
			))}
			{/* the agreed waiting limit — anything still above this line is late */}
			<line
				x1={x(spec.threshold.index)}
				y1={T}
				x2={x(spec.threshold.index)}
				y2={B}
				stroke={WARN}
				strokeWidth='1'
				strokeDasharray='4 4'
			/>
			<text
				className='g-lbl'
				x={x(spec.threshold.index) + 6}
				y={T + 12}
				fill={WARN}
			>
				{spec.threshold.label}
			</text>
			{spec.series.map((s) => (
				<polyline
					key={s.name}
					fill='none'
					stroke={s.color}
					strokeWidth='2'
					strokeLinejoin='round'
					points={stepPath(s.points)}
				/>
			))}
			{spec.medians.map((m) => {
				const s = spec.series.find((v) => v.name === m.name);
				if (!s) return null;
				return (
					<g key={`${m.name}-median`}>
						<circle
							cx={x(m.index)}
							cy={y(50)}
							r='4.5'
							fill='none'
							stroke={s.color}
							strokeWidth='2'
						/>
						<text
							className='g-lbl'
							x={x(m.index)}
							y={y(50) - 10}
							textAnchor='middle'
							fill={s.color}
						>
							{m.label}
						</text>
					</g>
				);
			})}
			{spec.xLabels.map((lbl, i) => (
				<text
					key={lbl}
					className='g-lbl'
					x={x(i)}
					y={B + 22}
					textAnchor={i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'}
				>
					{lbl}
				</text>
			))}
			<text className='g-lbl' x={(L + R) / 2} y={B + 44} textAnchor='middle'>
				{spec.xTitle}
			</text>
			{spec.series.map((s, i) => (
				<g key={`${s.name}-key`}>
					<rect
						x={R + 20}
						y={T + 8 + i * 26}
						width='16'
						height='3'
						rx='1.5'
						fill={s.color}
					/>
					<text className='g-lbl' x={R + 20} y={T + 30 + i * 26}>
						{s.name}
					</text>
				</g>
			))}
		</Frame>
	);
}

function Pareto({ spec }: { spec: Extract<ChartSpec, { form: 'pareto' }> }) {
	const L = 48;
	const R = 636;
	const T = 26;
	const B = 186;
	const total = spec.bars.reduce((a, b) => a + b.value, 0);
	const slot = (R - L) / spec.bars.length;
	const bw = slot * 0.62;
	const y = (v: number) => B - (v / spec.yMax) * (B - T);
	// cumulative share rides a second axis pinned to 100% at the top
	const yPct = (p: number) => B - (p / 100) * (B - T);
	let acc = 0;
	const cum = spec.bars.map((b) => {
		acc += b.value;
		return (acc / total) * 100;
	});
	const cx = (i: number) => L + slot * i + slot / 2;

	return (
		<Frame title={spec.title} height={238}>
			<line className='g-line' x1={L} y1={B} x2={R} y2={B} />
			<text className='g-lbl' x={L - 8} y={B + 4} textAnchor='end'>
				0
			</text>
			<text className='g-lbl' x={L - 8} y={T + 4} textAnchor='end'>
				{spec.yMax}
			</text>
			<text className='g-lbl' x={R + 10} y={B + 4}>
				0%
			</text>
			<text className='g-lbl' x={R + 10} y={T + 4}>
				100%
			</text>

			{spec.cutoff && (
				<>
					<line
						x1={L}
						y1={yPct(spec.cutoff.value)}
						x2={R}
						y2={yPct(spec.cutoff.value)}
						stroke={WARN}
						strokeWidth='1'
						strokeDasharray='4 4'
					/>
					<text
						className='g-lbl'
						x={L + 6}
						y={yPct(spec.cutoff.value) - 6}
						fill={WARN}
					>
						{spec.cutoff.label}
					</text>
				</>
			)}

			{spec.bars.map((b, i) => (
				<g key={b.name}>
					<rect
						x={cx(i) - bw / 2}
						y={y(b.value)}
						width={bw}
						height={B - y(b.value)}
						rx='2'
						fill={ACCENT}
						fillOpacity={0.9 - i * 0.09}
					/>
					<text
						className='g-val'
						x={cx(i)}
						y={y(b.value) - 6}
						textAnchor='middle'
					>
						{b.value}
					</text>
					<text className='g-lbl' x={cx(i)} y={B + 18} textAnchor='middle'>
						{b.name}
					</text>
				</g>
			))}

			<polyline
				fill='none'
				stroke={SHIP}
				strokeWidth='2'
				strokeLinejoin='round'
				points={cum.map((p, i) => `${cx(i)},${yPct(p)}`).join(' ')}
			/>
			{cum.map((p, i) => (
				<circle
					key={spec.bars[i].name}
					cx={cx(i)}
					cy={yPct(p)}
					r='3.5'
					fill={SHIP}
				/>
			))}

			<rect x={L} y='214' width='10' height='10' rx='2' fill={ACCENT} />
			<text className='g-lbl' x={L + 16} y='223'>
				{spec.unit ?? 'count'}
			</text>
			<rect x={L + 150} y='214' width='10' height='10' rx='2' fill={SHIP} />
			<text className='g-lbl' x={L + 166} y='223'>
				cumulative share
			</text>
		</Frame>
	);
}

function Heatmap({ spec }: { spec: Extract<ChartSpec, { form: 'heatmap' }> }) {
	const L = 190;
	const T = 34;
	const cellW = Math.min(104, (660 - L) / spec.cols.length);
	const cellH = 40;
	const gap = 3;
	const h = T + spec.rows.length * cellH + 46;

	return (
		<Frame title={spec.title} height={h}>
			{spec.cols.map((c, j) => (
				<text
					key={c}
					className='g-lbl'
					x={L + j * cellW + cellW / 2}
					y={T - 12}
					textAnchor='middle'
				>
					{c}
				</text>
			))}

			{spec.rows.map((r, i) => (
				<g key={r}>
					<text className='g-name' x='0' y={T + i * cellH + cellH / 2 + 5}>
						{r}
					</text>
					{spec.cols.map((c, j) => {
						const v = spec.cells[i][j];
						// floor the alpha so a low cell still reads as a cell, not a gap
						const alpha = 0.12 + 0.78 * (v / spec.max);
						return (
							<g key={c}>
								<rect
									x={L + j * cellW}
									y={T + i * cellH}
									width={cellW - gap}
									height={cellH - gap}
									rx='3'
									fill={ACCENT}
									fillOpacity={alpha}
								/>
								<text
									className='g-val'
									x={L + j * cellW + (cellW - gap) / 2}
									y={T + i * cellH + cellH / 2 + 4}
									textAnchor='middle'
								>
									{v}
									{spec.unit ?? ''}
								</text>
							</g>
						);
					})}
				</g>
			))}

			{spec.legend && (
				<text className='g-lbl' x='0' y={h - 12}>
					{spec.legend}
				</text>
			)}
		</Frame>
	);
}

function StackedHBar({
	spec,
}: {
	spec: Extract<ChartSpec, { form: 'stackedHBar' }>;
}) {
	const L = 130;
	const W = 420;
	const step = 62;
	const barH = 26;
	const h = spec.rows.length * step + 44;
	const px = (v: number) => (v / spec.max) * W;

	return (
		<Frame title={spec.title} height={h}>
			{spec.rows.map((r, i) => {
				const y = i * step + 14;
				let acc = 0;
				return (
					<g key={r.name}>
						<text className='g-name' x='0' y={y + barH / 2 + 5}>
							{r.name}
						</text>
						{r.values.map((v, j) => {
							const x = L + px(acc);
							const w = px(v);
							acc += v;
							if (w <= 0) return null;
							return (
								<rect
									key={spec.series[j].name}
									x={x}
									y={y}
									width={Math.max(1, w - 1)}
									height={barH}
									rx='2'
									fill={spec.series[j].color}
								/>
							);
						})}
						<text className='g-val' x={L + px(acc) + 12} y={y + barH / 2 + 5}>
							{r.label}
						</text>
					</g>
				);
			})}

			<line
				className='g-line'
				x1={L}
				y1={spec.rows.length * step + 2}
				x2={L + W}
				y2={spec.rows.length * step + 2}
			/>
			{spec.series.map((s, i) => {
				// two legend columns, so long phase names do not collide
				const col = i % 2;
				const row = Math.floor(i / 2);
				return (
					<g key={s.name}>
						<rect
							x={L + col * 215}
							y={spec.rows.length * step + 12 + row * 15}
							width='9'
							height='9'
							rx='2'
							fill={s.color}
						/>
						<text
							className='g-lbl'
							x={L + col * 215 + 14}
							y={spec.rows.length * step + 20 + row * 15}
						>
							{s.name}
						</text>
					</g>
				);
			})}
			{spec.unit && (
				<text className='g-lbl' x='0' y={spec.rows.length * step + 20}>
					{spec.unit}
				</text>
			)}
		</Frame>
	);
}

function Diverging({
	spec,
}: {
	spec: Extract<ChartSpec, { form: 'diverging' }>;
}) {
	const L = 200;
	const W = 300;
	const zero = L + W / 2;
	const half = W / 2;
	const step = 42;
	const h = spec.rows.length * step + 40;
	const px = (v: number) => (Math.abs(v) / spec.max) * half;

	return (
		<Frame title={spec.title} height={h}>
			<line
				className='g-line'
				x1={zero}
				y1='4'
				x2={zero}
				y2={spec.rows.length * step + 4}
			/>
			{spec.rows.map((r, i) => {
				const y = i * step + 12;
				const w = Math.max(2, px(r.value));
				const x = r.value < 0 ? zero - w : zero;
				return (
					<g key={r.name}>
						<text className='g-name' x='0' y={y + 14}>
							{r.name}
						</text>
						<rect
							x={x}
							y={y}
							width={w}
							height='18'
							rx='3'
							fill={r.good ? SHIP : CUT}
							fillOpacity='0.9'
						/>
						<text
							className='g-val'
							x={r.value < 0 ? x - 10 : x + w + 10}
							y={y + 14}
							textAnchor={r.value < 0 ? 'end' : 'start'}
						>
							{r.label}
						</text>
					</g>
				);
			})}
			<text
				className='g-lbl'
				x={zero}
				y={spec.rows.length * step + 24}
				textAnchor='middle'
			>
				0
			</text>
			<text
				className='g-lbl'
				x={zero - half}
				y={spec.rows.length * step + 24}
				textAnchor='middle'
			>
				−{spec.max}
				{spec.unit ?? ''}
			</text>
			<text
				className='g-lbl'
				x={zero + half}
				y={spec.rows.length * step + 24}
				textAnchor='middle'
			>
				+{spec.max}
				{spec.unit ?? ''}
			</text>
		</Frame>
	);
}

function ThresholdCurves({
	spec,
}: {
	spec: Extract<ChartSpec, { form: 'thresholdCurves' }>;
}) {
	const L = 56;
	const R = 620;
	const T = 22;
	const B = 186;
	const n = spec.xLabels.length;
	const x = (i: number) => L + (i / Math.max(1, n - 1)) * (R - L);
	const y = (v: number) => B - (v / spec.yMax) * (B - T);
	const ty = y(spec.threshold.value);

	return (
		<Frame title={spec.title} height={238}>
			{/* everything under the threshold is inside budget */}
			<rect
				x={L}
				y={ty}
				width={R - L}
				height={B - ty}
				fill={SHIP}
				fillOpacity='0.08'
			/>
			<line className='g-line' x1={L} y1={B} x2={R} y2={B} />
			<text className='g-lbl' x={L - 8} y={B + 4} textAnchor='end'>
				0
			</text>
			<text className='g-lbl' x={L - 8} y={T + 4} textAnchor='end'>
				{spec.yMax}
			</text>
			<line
				x1={L}
				y1={ty}
				x2={R}
				y2={ty}
				stroke={WARN}
				strokeWidth='1'
				strokeDasharray='4 4'
			/>
			<text className='g-lbl' x={R + 8} y={ty + 4} fill={WARN}>
				{spec.threshold.label}
			</text>

			{spec.series.map((s) => (
				<g key={s.name}>
					<polyline
						fill='none'
						stroke={s.color}
						strokeWidth='2'
						strokeLinejoin='round'
						points={s.points
							.map((p, i) => `${x(i)},${y(Math.min(p, spec.yMax))}`)
							.join(' ')}
					/>
					{s.points.map((p, i) => (
						<g key={spec.xLabels[i]}>
							<circle
								cx={x(i)}
								cy={y(Math.min(p, spec.yMax))}
								r='3.5'
								fill={s.color}
							/>
							<text
								className='g-val'
								x={x(i)}
								y={y(Math.min(p, spec.yMax)) - 9}
								textAnchor='middle'
							>
								{p}
							</text>
						</g>
					))}
				</g>
			))}

			{spec.xLabels.map((lbl, i) => (
				<text
					key={lbl}
					className='g-lbl'
					x={x(i)}
					y={B + 20}
					textAnchor='middle'
				>
					{lbl}
				</text>
			))}
			<text className='g-lbl' x={L - 8} y='212'>
				{spec.yUnit}
			</text>
			{spec.series.map((s, i) => (
				<g key={s.name}>
					<rect
						x={L + i * 190}
						y='216'
						width='10'
						height='10'
						rx='2'
						fill={s.color}
					/>
					<text className='g-lbl' x={L + i * 190 + 16} y='225'>
						{s.name}
					</text>
				</g>
			))}
		</Frame>
	);
}

function Waffle({ spec }: { spec: Extract<ChartSpec, { form: 'waffle' }> }) {
	const L = 56;
	const cell = 26;
	const gap = 5;
	const rows = Math.ceil(spec.total / spec.perRow);
	const h = rows * (cell + gap) + 62;
	const cells = Array.from({ length: spec.total }, (_, i) => ({
		id: `r${Math.floor(i / spec.perRow)}c${i % spec.perRow}`,
		row: Math.floor(i / spec.perRow),
		col: i % spec.perRow,
		filled: i < spec.value,
	}));

	return (
		<Frame title={spec.title} height={h}>
			{cells.map(({ id, row: r, col: c, filled }) => {
				return (
					<rect
						key={id}
						x={L + c * (cell + gap)}
						y={8 + r * (cell + gap)}
						width={cell}
						height={cell}
						rx='3'
						fill={filled ? ACCENT : 'none'}
						fillOpacity={filled ? 0.85 : 1}
						stroke={filled ? 'none' : CUT}
						strokeWidth='1.5'
						strokeDasharray={filled ? undefined : '3 2'}
					/>
				);
			})}

			<rect
				x={L}
				y={rows * (cell + gap) + 24}
				width='11'
				height='11'
				rx='2'
				fill={ACCENT}
				fillOpacity='0.85'
			/>
			<text className='g-lbl' x={L + 18} y={rows * (cell + gap) + 34}>
				{spec.filledLabel}
			</text>
			<rect
				x={L + 250}
				y={rows * (cell + gap) + 24}
				width='11'
				height='11'
				rx='2'
				fill='none'
				stroke={CUT}
				strokeWidth='1.5'
				strokeDasharray='3 2'
			/>
			<text className='g-lbl' x={L + 268} y={rows * (cell + gap) + 34}>
				{spec.emptyLabel}
			</text>
		</Frame>
	);
}

function Marimekko({
	spec,
}: {
	spec: Extract<ChartSpec, { form: 'marimekko' }>;
}) {
	const L = 8;
	const W = 684;
	const plotH = 210;
	const gap = 7;
	const legendRows = Math.ceil(spec.series.length / 2);
	const h = plotH + 62 + legendRows * 15;

	const totalWeight = spec.columns.reduce((s, c) => s + c.weight, 0);
	const bandW = W - gap * (spec.columns.length - 1);

	let x = L;
	const cols = spec.columns.map((c) => {
		const w = (c.weight / totalWeight) * bandW;
		const at = x;
		x += w + gap;
		return { ...c, w, x: at };
	});

	return (
		<Frame title={spec.title} height={h}>
			{cols.map((c) => {
				const total = c.values.reduce((s, v) => s + v, 0);
				let acc = 0;
				return (
					<g key={c.name}>
						{c.values.map((v, j) => {
							const segH = (v / total) * plotH;
							const y = 8 + (acc / total) * plotH;
							acc += v;
							if (segH <= 0) return null;
							return (
								<rect
									key={spec.series[j].name}
									x={c.x}
									y={y}
									width={c.w}
									height={Math.max(1, segH - 1)}
									fill={spec.series[j].color}
								/>
							);
						})}
						<text
							className='g-name'
							x={c.x + c.w / 2}
							y={plotH + 28}
							textAnchor='middle'
						>
							{c.name}
						</text>
						<text
							className='g-lbl'
							x={c.x + c.w / 2}
							y={plotH + 43}
							textAnchor='middle'
						>
							{c.weightLabel}
						</text>
					</g>
				);
			})}

			<line
				className='g-line'
				x1={L}
				y1={plotH + 12}
				x2={L + W}
				y2={plotH + 12}
			/>

			{spec.series.map((s, i) => {
				const col = i % 2;
				const row = Math.floor(i / 2);
				return (
					<g key={s.name}>
						<rect
							x={L + col * 300}
							y={plotH + 56 + row * 15}
							width='9'
							height='9'
							rx='2'
							fill={s.color}
						/>
						<text
							className='g-lbl'
							x={L + col * 300 + 14}
							y={plotH + 64 + row * 15}
						>
							{s.name}
						</text>
					</g>
				);
			})}
		</Frame>
	);
}

function Trajectory({
	spec,
}: {
	spec: Extract<ChartSpec, { form: 'trajectory' }>;
}) {
	const L = 56;
	const R = 660;
	const T = 24;
	const B = 214;
	const x = (v: number) =>
		L + ((v - spec.xMin) / (spec.xMax - spec.xMin)) * (R - L);
	const y = (v: number) =>
		B - ((v - spec.yMin) / (spec.yMax - spec.yMin)) * (B - T);
	const path = spec.points.map((p) => `${x(p.x)},${y(p.y)}`).join(' ');

	return (
		<Frame title={spec.title} height={294}>
			{spec.target && (
				<>
					<rect
						x={L}
						y={T}
						width={x(spec.target.x) - L}
						height={y(spec.target.y) - T}
						fill={SHIP}
						fillOpacity='0.1'
						stroke={SHIP}
						strokeWidth='1'
						strokeDasharray='4 4'
					/>
					<text className='g-lbl' x={L + 8} y={T + 16} fill={SHIP}>
						{spec.target.label}
					</text>
				</>
			)}

			<line className='g-line' x1={L} y1={B} x2={R} y2={B} />
			<line className='g-line' x1={L} y1={T} x2={L} y2={B} />

			<polyline
				fill='none'
				stroke={ACCENT}
				strokeWidth='2'
				strokeLinejoin='round'
				strokeDasharray='5 4'
				points={path}
			/>

			{spec.points.map((p, i) => {
				const last = i === spec.points.length - 1;
				const flip = x(p.x) > (L + R) / 2;
				return (
					<g key={p.name}>
						<circle
							cx={x(p.x)}
							cy={y(p.y)}
							r={last ? 6 : 4.5}
							fill={last ? ACCENT : ACCENT_DIM}
						/>
						<text
							className='g-val'
							x={x(p.x) + (flip ? -12 : 12)}
							y={y(p.y) - 2}
							textAnchor={flip ? 'end' : 'start'}
						>
							{p.name}
						</text>
						<text
							className='g-lbl'
							x={x(p.x) + (flip ? -12 : 12)}
							y={y(p.y) + 13}
							textAnchor={flip ? 'end' : 'start'}
						>
							{p.note}
						</text>
					</g>
				);
			})}

			<text className='g-lbl' x={L} y={B + 20}>
				{spec.xMin}
			</text>
			<text className='g-lbl' x={R} y={B + 20} textAnchor='end'>
				{spec.xMax}
			</text>
			<text className='g-lbl' x={L} y={B + 38}>
				{spec.xTitle}
			</text>
			<text className='g-lbl' x={L} y={T - 8}>
				{spec.yTitle}
			</text>
			<text className='g-lbl' x={L - 8} y={B + 4} textAnchor='end'>
				{spec.yMin}
			</text>
			<text className='g-lbl' x={L - 8} y={T + 4} textAnchor='end'>
				{spec.yMax}
			</text>
		</Frame>
	);
}

function Strips({ spec }: { spec: Extract<ChartSpec, { form: 'strips' }> }) {
	const L = 200;
	const W = 450;
	const step = 74;
	const half = 17;
	const base = spec.rows.length * step;
	const h = base + 34;
	const x = (v: number) => L + ((v - spec.min) / (spec.max - spec.min)) * W;

	return (
		<Frame title={spec.title} height={h}>
			{spec.band && (
				<rect
					x={x(spec.band.from)}
					y='6'
					width={x(spec.band.to) - x(spec.band.from)}
					height={base - 6}
					fill={SHIP}
					fillOpacity='0.1'
					stroke={SHIP}
					strokeWidth='1'
					strokeDasharray='4 4'
				/>
			)}

			{spec.rows.map((r, i) => {
				const cy = i * step + 34;
				return (
					<g key={r.name}>
						<text className='g-name' x='0' y={cy - 4}>
							{r.name}
						</text>
						<text className='g-lbl' x='0' y={cy + 12}>
							{r.label}
						</text>
						<line className='g-line' x1={L} y1={cy} x2={L + W} y2={cy} />
						{r.values.map((v, j) => (
							<circle
								key={`${r.name}-${j}-${v}`}
								cx={x(v)}
								cy={cy + (((j * 37) % 11) - 5) * (half / 6)}
								r='3.2'
								fill={r.own ? ACCENT : ACCENT_DIM}
								fillOpacity={r.own ? 0.85 : 0.6}
							/>
						))}
					</g>
				);
			})}

			<line className='g-line' x1={L} y1={base + 2} x2={L + W} y2={base + 2} />
			<text className='g-lbl' x={L} y={base + 20}>
				{spec.min}
			</text>
			<text className='g-lbl' x={L + W} y={base + 20} textAnchor='end'>
				{spec.max}
				{spec.unit ? ` ${spec.unit}` : ''}
			</text>
			{spec.band && (
				<text
					className='g-lbl'
					x={(x(spec.band.from) + x(spec.band.to)) / 2}
					y={base + 20}
					textAnchor='middle'
					fill={SHIP}
				>
					{spec.band.label}
				</text>
			)}
		</Frame>
	);
}

function Tornado({ spec }: { spec: Extract<ChartSpec, { form: 'tornado' }> }) {
	const L = 196;
	const W = 300;
	const C = L + W / 2;
	const step = 46;
	const barH = 20;
	const base = spec.rows.length * step;
	const h = base + 34;
	const x = (v: number) => C + (v / spec.max) * (W / 2);

	return (
		<Frame title={spec.title} height={h}>
			<line className='g-line' x1={C} y1='4' x2={C} y2={base + 2} />

			{spec.rows.map((r, i) => {
				const y = i * step + 10;
				const x0 = x(Math.min(r.low, 0));
				const x1 = x(Math.max(r.high, 0));
				return (
					<g key={r.name}>
						<text className='g-name' x='0' y={y + barH - 5}>
							{r.name}
						</text>
						<rect
							x={x0}
							y={y}
							width={Math.max(2, x1 - x0)}
							height={barH}
							rx='3'
							fill={i === 0 ? ACCENT : ACCENT_DIM}
							fillOpacity={i === 0 ? 0.9 : 0.6}
						/>
						<text className='g-val' x={L + W + 14} y={y + barH - 5}>
							{r.label}
						</text>
					</g>
				);
			})}

			<text className='g-lbl' x={C} y={base + 20} textAnchor='middle'>
				{spec.baseline}
			</text>
			<text className='g-lbl' x={L} y={base + 20}>
				−{spec.max}
			</text>
			<text className='g-lbl' x={L + W} y={base + 20} textAnchor='end'>
				+{spec.max}
				{spec.unit ? ` ${spec.unit}` : ''}
			</text>
		</Frame>
	);
}

function StatusGrid({
	spec,
}: {
	spec: Extract<ChartSpec, { form: 'statusGrid' }>;
}) {
	const L = 186;
	const cell = 96;
	const gap = 7;
	const rowH = 38;
	const top = 34;
	const base = top + spec.rows.length * (rowH + gap);
	const h = base + 44;

	const fillFor = (c: string) =>
		c === 'pass' ? SHIP : c === 'marginal' ? WARN : c === 'fail' ? CUT : 'none';

	return (
		<Frame title={spec.title} height={h}>
			{spec.cols.map((c, j) => (
				<text
					key={c}
					className='g-lbl'
					x={L + j * (cell + gap) + cell / 2}
					y={top - 12}
					textAnchor='middle'
				>
					{c}
				</text>
			))}

			{spec.rows.map((r, i) => (
				<g key={r}>
					<text className='g-name' x='0' y={top + i * (rowH + gap) + 24}>
						{r}
					</text>
					{spec.cols.map((c, j) => {
						const code = spec.cells[i][j];
						const fill = fillFor(code);
						return (
							<rect
								key={`${r}-${c}`}
								x={L + j * (cell + gap)}
								y={top + i * (rowH + gap)}
								width={cell}
								height={rowH}
								rx='4'
								fill={fill === 'none' ? 'none' : fill}
								fillOpacity={fill === 'none' ? 1 : 0.75}
								stroke={fill === 'none' ? ACCENT_DIM : 'none'}
								strokeWidth='1.5'
								strokeDasharray={fill === 'none' ? '3 3' : undefined}
							/>
						);
					})}
				</g>
			))}

			{(
				[
					['pass', SHIP, spec.legend.pass],
					['marginal', WARN, spec.legend.marginal],
					['fail', CUT, spec.legend.fail],
					['none', '', spec.legend.none],
				] as const
			).map(([code, colour, label], i) => {
				const col = i % 2;
				const row = Math.floor(i / 2);
				const x = col * 330;
				const y = base + 8 + row * 17;
				return (
					<g key={code}>
						<rect
							x={x}
							y={y}
							width='11'
							height='11'
							rx='2'
							fill={colour || 'none'}
							fillOpacity={colour ? 0.75 : 1}
							stroke={colour ? 'none' : ACCENT_DIM}
							strokeWidth='1.5'
							strokeDasharray={colour ? undefined : '3 3'}
						/>
						<text className='g-lbl' x={x + 18} y={y + 10}>
							{label}
						</text>
					</g>
				);
			})}
		</Frame>
	);
}

function Bands({ spec }: { spec: Extract<ChartSpec, { form: 'bands' }> }) {
	const L = 172;
	const W = 330;
	const step = 52;
	const barH = 20;
	const top = 14;
	const base = top + spec.rows.length * step;
	const h = base + 52;
	const x = (v: number) => L + ((v - spec.min) / (spec.max - spec.min)) * W;

	return (
		<Frame title={spec.title} height={h}>
			<line
				x1={x(spec.boundary.value)}
				y1='4'
				x2={x(spec.boundary.value)}
				y2={base + 2}
				stroke={CUT}
				strokeWidth='2'
				strokeDasharray='5 4'
			/>

			{spec.rows.map((r, i) => {
				const y = top + i * step;
				return (
					<g key={r.name}>
						<text className='g-name' x='0' y={y + barH - 5}>
							{r.name}
						</text>
						<rect
							x={x(r.from)}
							y={y}
							width={Math.max(3, x(r.to) - x(r.from))}
							height={barH}
							rx='3'
							fill={r.own ? ACCENT : ACCENT_DIM}
							fillOpacity={r.own ? 0.9 : 0.6}
						/>
						<text className='g-lbl' x='0' y={y + barH + 13}>
							{r.label}
						</text>
					</g>
				);
			})}

			<line className='g-line' x1={L} y1={base + 2} x2={L + W} y2={base + 2} />

			{(spec.marks ?? []).map((m) => (
				<g key={m.label}>
					<line
						className='g-line'
						x1={x(m.value)}
						y1={base + 2}
						x2={x(m.value)}
						y2={base + 8}
					/>
					<text
						className='g-lbl'
						x={x(m.value)}
						y={base + 20}
						textAnchor='middle'
					>
						{m.label}
					</text>
				</g>
			))}

			<text className='g-lbl' x={L} y={base + 38}>
				{spec.min}
			</text>
			<text className='g-lbl' x={L + W} y={base + 38} textAnchor='end'>
				{spec.max}
				{spec.unit ? ` ${spec.unit}` : ''}
			</text>
			<text className='g-lbl' x={L + W + 16} y={top + 10} fill={CUT}>
				{spec.boundary.label}
			</text>
		</Frame>
	);
}

function Waterfall({
	spec,
}: {
	spec: Extract<ChartSpec, { form: 'waterfall' }>;
}) {
	const L = 230;
	const W = 330;
	const step = 34;
	const barH = 19;
	const base = spec.bars.length * step;
	const h = base + 30;
	const x = (v: number) => L + ((v - spec.min) / (spec.max - spec.min)) * W;

	let run = 0;
	const drawn = spec.bars.map((b) => {
		const from = b.kind === 'total' ? 0 : run;
		const to = b.kind === 'total' ? b.value : run + b.value;
		run = to;
		return { ...b, from, to };
	});

	return (
		<Frame title={spec.title} height={h}>
			{drawn.map((b, i) => {
				const y = i * step + 8;
				const x0 = x(Math.min(b.from, b.to));
				const x1 = x(Math.max(b.from, b.to));
				const fill =
					b.kind === 'total' ? ACCENT : b.kind === 'add' ? CUT : SHIP;
				return (
					<g key={b.name}>
						<text className='g-name' x='0' y={y + barH - 5}>
							{b.name}
						</text>
						<rect
							x={x0}
							y={y}
							width={Math.max(2, x1 - x0)}
							height={barH}
							rx='2'
							fill={fill}
							fillOpacity={b.kind === 'total' ? 0.9 : 0.7}
						/>
						{i < drawn.length - 1 && (
							<line
								className='g-line'
								x1={x(b.to)}
								y1={y + barH}
								x2={x(b.to)}
								y2={y + step}
							/>
						)}
						<text className='g-val' x={L + W + 14} y={y + barH - 5}>
							{b.label}
						</text>
					</g>
				);
			})}

			<line className='g-line' x1={L} y1={base + 2} x2={L + W} y2={base + 2} />
			<text className='g-lbl' x={L} y={base + 20}>
				{spec.min}
			</text>
			<text className='g-lbl' x={L + W} y={base + 20} textAnchor='end'>
				{spec.max}
				{spec.unit ? ` ${spec.unit}` : ''}
			</text>
		</Frame>
	);
}

function Intervals({
	spec,
}: {
	spec: Extract<ChartSpec, { form: 'intervals' }>;
}) {
	const L = 210;
	const W = 320;
	const step = 52;
	const base = spec.rows.length * step;
	const h = base + 32;
	const x = (v: number) => L + ((v - spec.min) / (spec.max - spec.min)) * W;

	return (
		<Frame title={spec.title} height={h}>
			<line
				x1={x(spec.threshold.value)}
				y1='4'
				x2={x(spec.threshold.value)}
				y2={base + 2}
				stroke={CUT}
				strokeWidth='2'
				strokeDasharray='5 4'
			/>

			{spec.rows.map((r, i) => {
				const cy = i * step + 24;
				const colour = r.clears ? SHIP : WARN;
				return (
					<g key={r.name}>
						<text className='g-name' x='0' y={cy + 4}>
							{r.name}
						</text>
						<line
							x1={x(r.lo)}
							y1={cy}
							x2={x(r.hi)}
							y2={cy}
							stroke={colour}
							strokeWidth='3'
							strokeLinecap='round'
							strokeOpacity='0.55'
						/>
						<line
							x1={x(r.lo)}
							y1={cy - 6}
							x2={x(r.lo)}
							y2={cy + 6}
							stroke={colour}
							strokeWidth='2'
						/>
						<line
							x1={x(r.hi)}
							y1={cy - 6}
							x2={x(r.hi)}
							y2={cy + 6}
							stroke={colour}
							strokeWidth='2'
						/>
						<circle cx={x(r.value)} cy={cy} r='5' fill={colour} />
						<text className='g-lbl' x={L} y={cy + 22}>
							{r.label}
						</text>
					</g>
				);
			})}

			<line className='g-line' x1={L} y1={base + 2} x2={L + W} y2={base + 2} />
			<text className='g-lbl' x={L} y={base + 20}>
				{spec.min}
			</text>
			<text className='g-lbl' x={L + W} y={base + 20} textAnchor='end'>
				{spec.max}
				{spec.unit ? ` ${spec.unit}` : ''}
			</text>
			<text className='g-lbl' x={L + W + 16} y='18' fill={CUT}>
				{spec.threshold.label}
			</text>
		</Frame>
	);
}

function Radar({ spec }: { spec: Extract<ChartSpec, { form: 'radar' }> }) {
	const cx = 350;
	const cy = 162;
	const r = 108;
	const n = spec.axes.length;
	const legendRows = Math.ceil(spec.series.length / 2);
	const h = 320 + legendRows * 16;

	const angle = (i: number) => (-90 + (i * 360) / n) * (Math.PI / 180);
	const pt = (i: number, frac: number) => {
		const a = angle(i);
		return [cx + r * frac * Math.cos(a), cy + r * frac * Math.sin(a)];
	};
	const poly = (values: number[]) =>
		values
			.map((v, i) => {
				const [x, y] = pt(i, v / spec.max);
				return `${x.toFixed(1)},${y.toFixed(1)}`;
			})
			.join(' ');

	return (
		<Frame title={spec.title} height={h}>
			{[0.25, 0.5, 0.75, 1].map((f) => (
				<polygon
					key={f}
					className='g-line'
					fill='none'
					points={spec.axes
						.map((_, i) => {
							const [x, y] = pt(i, f);
							return `${x.toFixed(1)},${y.toFixed(1)}`;
						})
						.join(' ')}
				/>
			))}

			{spec.axes.map((a, i) => {
				const [x, y] = pt(i, 1);
				const [lx, ly] = pt(i, 1.16);
				const anchor =
					Math.abs(lx - cx) < 12 ? 'middle' : lx > cx ? 'start' : 'end';
				return (
					<g key={a}>
						<line className='g-line' x1={cx} y1={cy} x2={x} y2={y} />
						<text className='g-lbl' x={lx} y={ly + 4} textAnchor={anchor}>
							{a}
						</text>
					</g>
				);
			})}

			{spec.series.map((s) => (
				<polygon
					key={s.name}
					points={poly(s.values)}
					fill={s.color}
					fillOpacity='0.16'
					stroke={s.color}
					strokeWidth='2'
					strokeLinejoin='round'
				/>
			))}

			{spec.series.map((s, i) => {
				const col = i % 2;
				const row = Math.floor(i / 2);
				return (
					<g key={s.name}>
						<rect
							x={40 + col * 300}
							y={296 + row * 16}
							width='11'
							height='11'
							rx='2'
							fill={s.color}
							fillOpacity='0.8'
						/>
						<text className='g-lbl' x={58 + col * 300} y={306 + row * 16}>
							{s.name}
						</text>
					</g>
				);
			})}
		</Frame>
	);
}

function Confusion({
	spec,
}: {
	spec: Extract<ChartSpec, { form: 'confusion' }>;
}) {
	const L = 168;
	const cw = 104;
	const rh = 48;
	const gap = 5;
	const top = 58;
	const n = spec.classes.length;
	const base = top + n * (rh + gap);
	const h = base + 34;

	let worst = 1;
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			if (i !== j && spec.cells[i][j] > worst) worst = spec.cells[i][j];
		}
	}

	return (
		<Frame title={spec.title} height={h}>
			<text className='g-lbl' x={L} y='16'>
				{spec.colLabel}
			</text>
			{spec.classes.map((c, j) => (
				<text
					key={c}
					className='g-lbl'
					x={L + j * (cw + gap) + cw / 2}
					y={top - 10}
					textAnchor='middle'
				>
					{c}
				</text>
			))}
			<text className='g-lbl' x='0' y='16'>
				{spec.rowLabel}
			</text>

			{spec.classes.map((rc, i) => {
				const total = spec.cells[i].reduce((s, v) => s + v, 0);
				const pct = Math.round((spec.cells[i][i] / total) * 100);
				return (
					<g key={rc}>
						<text className='g-name' x='0' y={top + i * (rh + gap) + 29}>
							{rc}
						</text>
						{spec.classes.map((cc, j) => {
							const v = spec.cells[i][j];
							const hit = i === j;
							return (
								<g key={cc}>
									<rect
										x={L + j * (cw + gap)}
										y={top + i * (rh + gap)}
										width={cw}
										height={rh}
										rx='3'
										fill={hit ? SHIP : CUT}
										fillOpacity={hit ? 0.72 : Math.max(0.08, (v / worst) * 0.6)}
									/>
									<text
										className='g-val'
										x={L + j * (cw + gap) + cw / 2}
										y={top + i * (rh + gap) + 29}
										textAnchor='middle'
									>
										{v}
									</text>
								</g>
							);
						})}
						<text
							className='g-val'
							x={L + n * (cw + gap) + 12}
							y={top + i * (rh + gap) + 29}
						>
							{pct}%
						</text>
					</g>
				);
			})}

			<text className='g-lbl' x={L + n * (cw + gap) + 12} y={top - 10}>
				{spec.marginLabel}
			</text>
			<line
				className='g-line'
				x1={L}
				y1={base + 2}
				x2={L + n * (cw + gap) - gap}
				y2={base + 2}
			/>
		</Frame>
	);
}

function Sequence({
	spec,
}: {
	spec: Extract<ChartSpec, { form: 'sequence' }>;
}) {
	const L = 40;
	const W = 620;
	const cy = 74;
	const n = spec.events.length;
	const step = W / Math.max(1, n - 1);
	const colour = (o: string) =>
		o === 'ok' ? SHIP : o === 'abort' ? WARN : CUT;

	return (
		<Frame title={spec.title} height={168}>
			<line className='g-line' x1={L} y1={cy} x2={L + W} y2={cy} />

			{spec.marker && (
				<>
					<line
						x1={L + (spec.marker.afterIndex + 0.5) * step}
						y1='24'
						x2={L + (spec.marker.afterIndex + 0.5) * step}
						y2={cy + 26}
						stroke={ACCENT}
						strokeWidth='2'
						strokeDasharray='5 4'
					/>
					<text
						className='g-lbl'
						x={L + (spec.marker.afterIndex + 0.5) * step + 8}
						y='34'
						fill={ACCENT}
					>
						{spec.marker.label}
					</text>
				</>
			)}

			{spec.events.map((e, i) => (
				<g key={e.name}>
					<circle
						cx={L + i * step}
						cy={cy}
						r='9'
						fill={colour(e.outcome)}
						fillOpacity='0.85'
					/>
					<text
						className='g-lbl'
						x={L + i * step}
						y={cy + 26}
						textAnchor='middle'
					>
						{e.name}
					</text>
				</g>
			))}

			{(
				[
					['ok', SHIP, spec.legend.ok],
					['abort', WARN, spec.legend.abort],
					['fail', CUT, spec.legend.fail],
				] as const
			).map(([k, c, label], i) => (
				<g key={k}>
					<circle
						cx={L + 6}
						cy={118 + i * 16}
						r='6'
						fill={c}
						fillOpacity='0.85'
					/>
					<text className='g-lbl' x={L + 18} y={122 + i * 16}>
						{label}
					</text>
				</g>
			))}
		</Frame>
	);
}

/**
 * Two curves with the space between them shaded: the upper is a total, the
 * lower is the part of it that was doing something useful, and the band is
 * the waste. Drawn this way because neither line alone is the finding —
 * the total falling could be a smaller team, and the lower line is flat.
 */
function GapArea({ spec }: { spec: Extract<ChartSpec, { form: 'gapArea' }> }) {
	const L = 48;
	const R = 668;
	const T = 20;
	const B = 186;
	const n = spec.xLabels.length;
	const x = (i: number) => L + (i / Math.max(1, n - 1)) * (R - L);
	const y = (v: number) => B - (v / spec.yMax) * (B - T);
	const band =
		spec.upper.points.map((p, i) => `${x(i)},${y(p)}`).join(' ') +
		' ' +
		[...spec.lower.points]
			.reverse()
			.map((p, i) => `${x(n - 1 - i)},${y(p)}`)
			.join(' ');
	const mid = Math.round((n - 1) / 2);
	return (
		<Frame title={spec.title} height={244}>
			{[0, 0.5, 1].map((f) => (
				<line
					key={f}
					className='g-line'
					x1={L}
					y1={y(spec.yMax * f)}
					x2={R}
					y2={y(spec.yMax * f)}
				/>
			))}
			{[0, 0.5, 1].map((f) => (
				<text
					key={f}
					className='g-lbl'
					x={L - 8}
					y={y(spec.yMax * f) + 4}
					textAnchor='end'
				>
					{Math.round(spec.yMax * f)}
				</text>
			))}
			<polygon points={band} fill={WARN} fillOpacity='0.22' />
			{spec.marker && (
				<g>
					<line
						x1={x(spec.marker.index) + (R - L) / (2 * (n - 1))}
						y1={T - 6}
						x2={x(spec.marker.index) + (R - L) / (2 * (n - 1))}
						y2={B}
						stroke={ACCENT_DIM}
						strokeWidth='1'
						strokeDasharray='4 4'
					/>
					<text
						className='g-lbl'
						x={x(spec.marker.index) + (R - L) / (2 * (n - 1)) + 6}
						y={T + 4}
					>
						{spec.marker.label}
					</text>
				</g>
			)}
			<polyline
				fill='none'
				stroke={CUT}
				strokeWidth='2'
				strokeLinejoin='round'
				points={spec.upper.points.map((p, i) => `${x(i)},${y(p)}`).join(' ')}
			/>
			<polyline
				fill='none'
				stroke={SHIP}
				strokeWidth='2'
				strokeLinejoin='round'
				points={spec.lower.points.map((p, i) => `${x(i)},${y(p)}`).join(' ')}
			/>
			<text
				className='g-val'
				x={x(mid)}
				y={(y(spec.upper.points[mid]) + y(spec.lower.points[mid])) / 2 + 4}
				textAnchor='middle'
			>
				{spec.gapLabel}
			</text>
			{spec.xLabels.map((lbl, i) => (
				<text
					key={lbl}
					className='g-lbl'
					x={x(i)}
					y={B + 20}
					textAnchor={i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'}
				>
					{lbl}
				</text>
			))}
			{[
				{ name: spec.upper.name, color: CUT },
				{ name: spec.lower.name, color: SHIP },
			].map((sr, i) => (
				<g key={sr.name}>
					<rect
						x={L + i * 260}
						y='222'
						width='10'
						height='10'
						rx='2'
						fill={sr.color}
					/>
					<text className='g-lbl' x={L + i * 260 + 16} y='231'>
						{sr.name}
					</text>
				</g>
			))}
			{spec.yUnit && (
				<text className='g-lbl' x={R} y='231' textAnchor='end'>
					{spec.yUnit}
				</text>
			)}
		</Frame>
	);
}

// \u2500\u2500 Dispatcher \u2500\u2500────────────────────────────────────────────────

export default function Chart({ spec }: { spec: ChartSpec }) {
	switch (spec.form) {
		case 'hbar':
			return <HBar spec={spec} />;
		case 'lineArea':
			return <LineArea spec={spec} />;
		case 'pairedBars':
			return <PairedBars spec={spec} />;
		case 'funnel':
			return <Funnel spec={spec} />;
		case 'stackedBars':
			return <StackedBars spec={spec} />;
		case 'dumbbell':
			return <Dumbbell spec={spec} />;
		case 'groupedHBar':
			return <GroupedHBar spec={spec} />;
		case 'slope':
			return <Slope spec={spec} />;
		case 'stackedArea':
			return <StackedArea spec={spec} />;
		case 'barsThreshold':
			return <BarsThreshold spec={spec} />;
		case 'dualLine':
			return <DualLine spec={spec} />;
		case 'histogram':
			return <Histogram spec={spec} />;
		case 'gateBars':
			return <GateBars spec={spec} />;
		case 'curve':
			return <Curve spec={spec} />;
		case 'scatter':
			return <Scatter spec={spec} />;
		case 'dotplot':
			return <DotPlot spec={spec} />;
		case 'cumulative':
			return <Cumulative spec={spec} />;
		case 'survival':
			return <Survival spec={spec} />;
		case 'pareto':
			return <Pareto spec={spec} />;
		case 'heatmap':
			return <Heatmap spec={spec} />;
		case 'stackedHBar':
			return <StackedHBar spec={spec} />;
		case 'diverging':
			return <Diverging spec={spec} />;
		case 'thresholdCurves':
			return <ThresholdCurves spec={spec} />;
		case 'waffle':
			return <Waffle spec={spec} />;
		case 'marimekko':
			return <Marimekko spec={spec} />;
		case 'trajectory':
			return <Trajectory spec={spec} />;
		case 'strips':
			return <Strips spec={spec} />;
		case 'tornado':
			return <Tornado spec={spec} />;
		case 'statusGrid':
			return <StatusGrid spec={spec} />;
		case 'bands':
			return <Bands spec={spec} />;
		case 'waterfall':
			return <Waterfall spec={spec} />;
		case 'intervals':
			return <Intervals spec={spec} />;
		case 'radar':
			return <Radar spec={spec} />;
		case 'confusion':
			return <Confusion spec={spec} />;
		case 'sequence':
			return <Sequence spec={spec} />;
		case 'gapArea':
			return <GapArea spec={spec} />;
		default:
			return null;
	}
}
