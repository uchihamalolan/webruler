import { useEffect, useMemo, useState } from "preact/hooks";
import styles from "./app.module.css";
import { CalibrationPanel } from "./components/CalibrationPanel";
import { ConfigPanel } from "./components/ConfigPanel";
import { RulerView } from "./components/RulerView";
import { useCalibration } from "./hooks/useCalibration";
import { useDpi } from "./hooks/useDpi";
import { useViewportLength } from "./hooks/useViewportLength";
import { getTicks } from "./lib/ruler";
import type { Orientation, Theme, Unit } from "./types";

export function App() {
	const [unit, setUnit] = useState<Unit>("cm");
	const [orientation, setOrientation] = useState<Orientation>("horizontal");
	const [theme, setTheme] = useState<Theme>("frappe");
	const [isConfigOpen, setIsConfigOpen] = useState(true);

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
	}, [theme]);

	const dpi = useDpi();
	const viewportLength = useViewportLength(orientation);
	const {
		scale,
		isCalibrationOpen,
		calibrationUnit,
		actualLengthInput,
		referenceLinePx,
		openCalibration,
		closeCalibration,
		setCalibrationUnit,
		setActualLengthInput,
		applyCalibration,
	} = useCalibration(dpi, unit);

	const pxPerCm = (dpi / 2.54) * scale;
	const pxPerInch = dpi * scale;

	const ticks = useMemo(
		() => getTicks(unit, viewportLength, pxPerCm, pxPerInch),
		[unit, viewportLength, pxPerCm, pxPerInch],
	);

	return (
		<main className={styles.appShell}>
			<button
				type="button"
				className={styles.settingsButton}
				onClick={() => setIsConfigOpen(true)}
				aria-label="Open settings"
			>
				⚙
			</button>

			{isConfigOpen ? (
				<ConfigPanel
					unit={unit}
					orientation={orientation}
					theme={theme}
					onClose={() => setIsConfigOpen(false)}
					onUnitChange={setUnit}
					onOrientationChange={setOrientation}
					onThemeChange={setTheme}
					onOpenCalibration={openCalibration}
				/>
			) : null}

			<RulerView
				orientation={orientation}
				viewportLength={viewportLength}
				ticks={ticks}
			/>

			{isCalibrationOpen ? (
				<CalibrationPanel
					referenceLinePx={referenceLinePx}
					actualLengthInput={actualLengthInput}
					calibrationUnit={calibrationUnit}
					onActualLengthChange={setActualLengthInput}
					onCalibrationUnitChange={setCalibrationUnit}
					onApply={applyCalibration}
					onCancel={closeCalibration}
				/>
			) : null}
		</main>
	);
}
