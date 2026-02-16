import { useEffect, useMemo, useState } from "preact/hooks";
import styles from "./app.module.css";
import { CalibrationPanel } from "./components/CalibrationPanel";
import { ConfigPanel } from "./components/ConfigPanel";
import { RulerView } from "./components/RulerView";
import { useCalibration } from "./hooks/useCalibration";
import { useDpi } from "./hooks/useDpi";
import { useSettings } from "./hooks/useSettings";
import { useViewportLength } from "./hooks/useViewportLength";
import { getTicks } from "./lib/ruler";

export function App() {
	const [isConfigOpen, setIsConfigOpen] = useState(true);
	const { unit, orientation, theme, scale, setUnit, setOrientation, setTheme, setScale } =
		useSettings();

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
	}, [theme]);

	const dpi = useDpi();
	const viewportLength = useViewportLength(orientation);
	const {
		isCalibrationOpen,
		calibrationUnit,
		actualLengthInput,
		referenceLinePx,
		openCalibration,
		closeCalibration,
		setCalibrationUnit,
		setActualLengthInput,
		applyCalibration,
	} = useCalibration(dpi, unit, setScale);

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
