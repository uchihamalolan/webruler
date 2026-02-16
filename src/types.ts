export type Unit = "cm" | "inch";

export type Orientation = "horizontal" | "vertical";
export type Theme = "frappe" | "latte";

export type TickKind =
	| "cm"
	| "half-cm"
	| "mm"
	| "inch"
	| "half-inch"
	| "quarter-inch"
	| "eighth-inch";

export type Tick = {
	position: number;
	kind: TickKind;
	label: string | null;
};
