export interface Box {
	w: number;
	h: number;
}

/**
 * Justified rows, the way a contact sheet is printed: every frame keeps its
 * own ratio, each row is one height, and each full row fills the width
 * exactly. The last row keeps the target height and is left-aligned rather
 * than stretched across a half-empty line.
 */
export function justify(
	ratios: number[],
	containerW: number,
	targetH: number,
	gap: number,
): Box[] {
	const out: Box[] = [];
	let row: number[] = [];
	let sum = 0;

	const flush = (fill: boolean) => {
		const gaps = gap * (row.length - 1);
		const h = fill ? (containerW - gaps) / sum : targetH;
		for (const r of row) out.push({ w: r * h, h });
		row = [];
		sum = 0;
	};

	for (const r of ratios) {
		row.push(r);
		sum += r;
		if (sum * targetH + gap * (row.length - 1) >= containerW) {
			flush(true);
		}
	}

	if (row.length > 0) flush(false);
	return out;
}

/** Row height by breakpoint — a sheet reads denser than a hang. */
export function targetRowHeight(width: number): number {
	if (width >= 1200) return 150;
	if (width >= 900) return 130;
	return 104;
}
