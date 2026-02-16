import styles from "./CalibrationPanel.module.css";
import type { Unit } from "../types";

type CalibrationPanelProps = {
	referenceLinePx: number;
	actualLengthInput: string;
	calibrationUnit: Unit;
	onActualLengthChange: (value: string) => void;
	onCalibrationUnitChange: (unit: Unit) => void;
	onApply: () => void;
	onCancel: () => void;
};

export function CalibrationPanel({
	referenceLinePx,
	actualLengthInput,
	calibrationUnit,
	onActualLengthChange,
	onCalibrationUnitChange,
	onApply,
	onCancel,
}: CalibrationPanelProps) {
	return (
		<section className={styles.calibrationCard} aria-label="Calibration">
			<h3>Calibration</h3>
			<p>
				Measure this line using a physical ruler and enter what you actually see for better
				accuracy.
			</p>
			<div
				className={styles.testLine}
				style={{ inlineSize: `${referenceLinePx}px` }}
				aria-hidden="true"
			/>
			<div className={styles.calibrationControls}>
				<label>
					<span>Actual length</span>
					<input
						className={styles.input}
						type="number"
						inputMode="decimal"
						min="0.01"
						step="0.01"
						value={actualLengthInput}
						onInput={(event) => onActualLengthChange(event.currentTarget.value)}
					/>
				</label>
				<label>
					<span>Unit</span>
					<select
						className={styles.input}
						value={calibrationUnit}
						onChange={(event) =>
							onCalibrationUnitChange(event.currentTarget.value as Unit)
						}
					>
						<option value="cm">cm</option>
						<option value="inch">inch</option>
					</select>
				</label>
			</div>
			<div className={styles.buttonRow}>
				<button type="button" className={`${styles.button} ${styles.active}`} onClick={onApply}>
					Apply
				</button>
				<button type="button" className={styles.button} onClick={onCancel}>
					Cancel
				</button>
			</div>
		</section>
	);
}
