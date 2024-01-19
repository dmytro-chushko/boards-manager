import { RefObject, useEffect } from "react";

export const useOuterClick = <T extends HTMLElement>(
	containerRef: RefObject<T>,
	handler: () => void,
	exception: string = "empty",
) => {
	const handleOuterClick = (e: Event) => {
		if (
			containerRef.current &&
			!containerRef.current.contains(e.target as Element) &&
			(e.target as HTMLElement).dataset.label !== exception
		) {
			handler();
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleOuterClick);

		return () => {
			document.removeEventListener("mousedown", handleOuterClick);
		};
	});
};
