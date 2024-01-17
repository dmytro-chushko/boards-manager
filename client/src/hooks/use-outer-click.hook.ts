import { RefObject, useEffect } from "react";

export const useOuterClick = <T extends HTMLElement>(
	containerRef: RefObject<T>,
	handler: () => void,
) => {
	const handleOuterClick = (e: Event) => {
		if (
			containerRef.current &&
			!containerRef.current.contains(e.target as Element)
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
