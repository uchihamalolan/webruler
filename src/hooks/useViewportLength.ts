import { useLayoutEffect, useState } from "preact/hooks";
import type { Orientation } from "../types";

function getViewportLength(orientation: Orientation) {
	const width = window.innerWidth;
	const visibleSpan = width * 0.8;
	const minLength = orientation === "horizontal" ? 1200 : 1000;
	return Math.max(minLength, Math.round(visibleSpan * 2));
}

export function useViewportLength(orientation: Orientation) {
	const [viewportLength, setViewportLength] = useState(0);

	useLayoutEffect(() => {
		const updateLength = () => {
			setViewportLength(getViewportLength(orientation));
		};

		updateLength();
		window.addEventListener("resize", updateLength);
		return () => window.removeEventListener("resize", updateLength);
	}, [orientation]);

	return viewportLength;
}
