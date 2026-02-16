import { useLayoutEffect, useState } from "preact/hooks";

export function useDpi() {
	const [dpi, setDpi] = useState(96);

	useLayoutEffect(() => {
		const el = document.createElement("div");
		el.style.width = "1in";
		el.style.height = "1in";
		el.style.position = "absolute";
		el.style.visibility = "hidden";
		document.body.appendChild(el);
		const detectedDpi = el.offsetWidth;
		document.body.removeChild(el);
		setDpi(detectedDpi || 96);
	}, []);

	return dpi;
}
