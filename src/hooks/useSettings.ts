import { useCallback, useEffect, useState } from "preact/hooks";
import type { Orientation, Theme, Unit } from "../types";

const SETTINGS_STORAGE_KEY = "webrule:settings";
const SETTINGS_VERSION = 1;

type Settings = {
	unit: Unit;
	orientation: Orientation;
	theme: Theme;
	scale: number;
};

type PersistedSettings = {
	version: number;
	settings: Settings;
};

const defaultSettings: Settings = {
	unit: "cm",
	orientation: "horizontal",
	theme: "frappe",
	scale: 1,
};

function isUnit(value: unknown): value is Unit {
	return value === "cm" || value === "inch";
}

function isOrientation(value: unknown): value is Orientation {
	return value === "horizontal" || value === "vertical";
}

function isTheme(value: unknown): value is Theme {
	return value === "frappe" || value === "latte";
}

function isScale(value: unknown): value is number {
	return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function parsePersistedSettings(value: unknown): Settings | null {
	if (!value || typeof value !== "object") {
		return null;
	}

	const data = value as Partial<PersistedSettings>;
	if (data.version !== SETTINGS_VERSION || !data.settings) {
		return null;
	}

	const { settings } = data;
	if (
		!isUnit(settings.unit) ||
		!isOrientation(settings.orientation) ||
		!isTheme(settings.theme) ||
		!isScale(settings.scale)
	) {
		return null;
	}

	return settings;
}

function readSettings(): Settings {
	if (typeof window === "undefined") {
		return defaultSettings;
	}

	try {
		const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
		if (!raw) {
			return defaultSettings;
		}

		const parsed = parsePersistedSettings(JSON.parse(raw));
		return parsed ?? defaultSettings;
	} catch {
		return defaultSettings;
	}
}

export function useSettings() {
	const [settings, setSettings] = useState<Settings>(() => readSettings());

	useEffect(() => {
		const payload: PersistedSettings = {
			version: SETTINGS_VERSION,
			settings,
		};
		window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(payload));
	}, [settings]);

	const setUnit = useCallback((unit: Unit) => {
		setSettings((current) => ({ ...current, unit }));
	}, []);

	const setOrientation = useCallback((orientation: Orientation) => {
		setSettings((current) => ({ ...current, orientation }));
	}, []);

	const setTheme = useCallback((theme: Theme) => {
		setSettings((current) => ({ ...current, theme }));
	}, []);

	const setScale = useCallback((scale: number) => {
		setSettings((current) => ({ ...current, scale }));
	}, []);

	return {
		...settings,
		setUnit,
		setOrientation,
		setTheme,
		setScale,
	};
}
