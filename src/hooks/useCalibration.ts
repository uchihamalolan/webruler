import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import { CM_CALIBRATION_LENGTH, INCH_CALIBRATION_LENGTH } from "../lib/constants";
import type { Unit } from "../types";

type UseCalibrationResult = {
	scale: number;
	isCalibrationOpen: boolean;
	calibrationUnit: Unit;
	actualLengthInput: string;
	referenceLinePx: number;
	openCalibration: () => void;
	closeCalibration: () => void;
	setCalibrationUnit: (unit: Unit) => void;
	setActualLengthInput: (value: string) => void;
	applyCalibration: () => void;
};

export function useCalibration(dpi: number, unit: Unit): UseCalibrationResult {
	const [scale, setScale] = useState(1);
	const [isCalibrationOpen, setIsCalibrationOpen] = useState(false);
	const [calibrationUnit, setCalibrationUnit] = useState<Unit>("cm");
	const [actualLengthInput, setActualLengthInput] = useState(
		String(CM_CALIBRATION_LENGTH),
	);

	useEffect(() => {
		if (!isCalibrationOpen) {
			return;
		}

		if (calibrationUnit === "cm") {
			setActualLengthInput(String(CM_CALIBRATION_LENGTH));
			return;
		}

		setActualLengthInput(String(INCH_CALIBRATION_LENGTH));
	}, [isCalibrationOpen, calibrationUnit]);

	const referenceLinePx = useMemo(
		() =>
			calibrationUnit === "cm"
				? CM_CALIBRATION_LENGTH * (dpi / 2.54)
				: INCH_CALIBRATION_LENGTH * dpi,
		[dpi, calibrationUnit],
	);

	const openCalibration = useCallback(() => {
		setCalibrationUnit(unit);
		setIsCalibrationOpen(true);
	}, [unit]);

	const closeCalibration = useCallback(() => {
		setIsCalibrationOpen(false);
	}, []);

	const applyCalibration = useCallback(() => {
		const actualLength = Number.parseFloat(actualLengthInput);
		if (!Number.isFinite(actualLength) || actualLength <= 0) {
			return;
		}

		const expectedPx =
			calibrationUnit === "cm"
				? actualLength * (dpi / 2.54)
				: actualLength * dpi;

		if (expectedPx <= 0) {
			return;
		}

		setScale(referenceLinePx / expectedPx);
		setIsCalibrationOpen(false);
	}, [actualLengthInput, calibrationUnit, dpi, referenceLinePx]);

	return {
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
	};
}
