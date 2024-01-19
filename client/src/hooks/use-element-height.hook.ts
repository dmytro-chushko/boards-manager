import { useEffect, useState } from "react";

export const useElementHeight = (element: string): number => {
	const [elementHeight, setElementHeight] = useState<number>(0);

	useEffect(() => {
		const elementObj = document.querySelector(element);
		if (elementObj) setElementHeight(elementObj.scrollHeight);
	}, [element]);

	return elementHeight ? elementHeight / 16 : 0;
};
