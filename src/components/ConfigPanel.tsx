import type { Orientation, Theme, Unit } from "../types";
import styles from "./ConfigPanel.module.css";

type ConfigPanelProps = {
	unit: Unit;
	orientation: Orientation;
	theme: Theme;
	onClose: () => void;
	onUnitChange: (unit: Unit) => void;
	onOrientationChange: (orientation: Orientation) => void;
	onThemeChange: (theme: Theme) => void;
	onOpenCalibration: () => void;
};

export function ConfigPanel({
	unit,
	orientation,
	theme,
	onClose,
	onUnitChange,
	onOrientationChange,
	onThemeChange,
	onOpenCalibration,
}: ConfigPanelProps) {
	return (
		<section className={styles.configPanel} aria-label="Ruler settings">
			<div className={styles.panelHeader}>
				<h2>Settings</h2>
				<button
					type="button"
					className={`${styles.button} ${styles.closeButton}`}
					onClick={onClose}
					aria-label="Close settings"
				>
					×
				</button>
			</div>

			<label className={styles.controlGroup}>
				<span>Unit</span>
				<select
					className={styles.input}
					value={unit}
					onChange={(event) => onUnitChange(event.currentTarget.value as Unit)}
				>
					<option value="cm">Centimeters</option>
					<option value="inch">Inches</option>
				</select>
			</label>

			<div className={styles.controlGroup}>
				<span>Theme</span>
				<div className={styles.buttonRow}>
					<button
						type="button"
						className={`${styles.button} ${theme === "frappe" ? styles.active : ""}`}
						onClick={() => onThemeChange("frappe")}
					>
						Dark (Frappe)
					</button>
					<button
						type="button"
						className={`${styles.button} ${theme === "latte" ? styles.active : ""}`}
						onClick={() => onThemeChange("latte")}
					>
						Light (Latte)
					</button>
				</div>
			</div>

			<div className={styles.controlGroup}>
				<span>Orientation</span>
				<div className={styles.buttonRow}>
					<button
						type="button"
						className={`${styles.button} ${orientation === "horizontal" ? styles.active : ""}`}
						onClick={() => onOrientationChange("horizontal")}
					>
						Horizontal
					</button>
					<button
						type="button"
						className={`${styles.button} ${orientation === "vertical" ? styles.active : ""}`}
						onClick={() => onOrientationChange("vertical")}
					>
						Vertical
					</button>
				</div>
			</div>

			<button
				type="button"
				className={`${styles.button} ${styles.calibrateTrigger}`}
				onClick={onOpenCalibration}
			>
				Calibrate
			</button>
		</section>
	);
}
