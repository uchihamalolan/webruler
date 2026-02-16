import type { Tick, TickKind, Unit } from "../types";

export function getTicks(
	unit: Unit,
	viewportLength: number,
	pxPerCm: number,
	pxPerInch: number,
): Tick[] {
	if (!viewportLength) {
		return [];
	}

	const list: Tick[] = [];

	if (unit === "cm") {
		const step = pxPerCm / 10;
		const max = Math.floor(viewportLength / step);
		for (let i = 0; i <= max; i += 1) {
			let kind: TickKind = "mm";
			let label: string | null = null;

			if (i % 10 === 0) {
				kind = "cm";
				label = String(i / 10);
			} else if (i % 5 === 0) {
				kind = "half-cm";
			}

			list.push({ position: i * step, kind, label });
		}
		return list;
	}

	const step = pxPerInch / 8;
	const max = Math.floor(viewportLength / step);
	for (let i = 0; i <= max; i += 1) {
		let kind: TickKind = "eighth-inch";
		let label: string | null = null;

		if (i % 8 === 0) {
			kind = "inch";
			label = String(i / 8);
		} else if (i % 4 === 0) {
			kind = "half-inch";
		} else if (i % 2 === 0) {
			kind = "quarter-inch";
		}

		list.push({ position: i * step, kind, label });
	}

	return list;
}
