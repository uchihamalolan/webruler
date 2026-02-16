import styles from "./RulerView.module.css";
import type { Orientation, Tick } from "../types";

type RulerViewProps = {
	orientation: Orientation;
	viewportLength: number;
	ticks: Tick[];
};

const tickKindClassName: Record<Tick["kind"], string> = {
	cm: styles.cm,
	"half-cm": styles.halfCm,
	mm: styles.mm,
	inch: styles.inch,
	"half-inch": styles.halfInch,
	"quarter-inch": styles.quarterInch,
	"eighth-inch": styles.eighthInch,
};

export function RulerView({ orientation, viewportLength, ticks }: RulerViewProps) {
	const isHorizontal = orientation === "horizontal";
	const areaClassName = isHorizontal
		? `${styles.rulerArea} ${styles.horizontalArea}`
		: `${styles.rulerArea} ${styles.verticalArea}`;
	const rulerClassName = isHorizontal
		? `${styles.ruler} ${styles.horizontalRuler}`
		: `${styles.ruler} ${styles.verticalRuler}`;

	return (
		<section className={areaClassName}>
			<div
				className={rulerClassName}
				style={
					isHorizontal
						? { inlineSize: `${viewportLength}px` }
						: { blockSize: `${viewportLength}px` }
				}
			>
				{ticks.map((tick, index) => (
					<div key={`${tick.position}-${index}`}>
						<div
							className={`${styles.tick} ${isHorizontal ? styles.horizontalTick : styles.verticalTick} ${tickKindClassName[tick.kind]}`}
							style={
								isHorizontal
									? { insetInlineStart: `${tick.position}px` }
									: { insetBlockStart: `${tick.position}px` }
							}
						/>
						{tick.label ? (
							<span
								className={`${styles.tickLabel} ${isHorizontal ? styles.horizontalLabel : styles.verticalLabel}`}
								style={
									isHorizontal
										? { insetInlineStart: `${tick.position}px` }
										: { insetBlockStart: `${tick.position}px` }
								}
							>
								{tick.label}
							</span>
						) : null}
					</div>
				))}
			</div>
		</section>
	);
}
