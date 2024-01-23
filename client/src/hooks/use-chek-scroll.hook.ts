import { RefObject, useEffect, useState } from "react";

export const useChekScroll = <T>(
	element: RefObject<Element>,
	influencingEntity?: T,
): boolean => {
	const [isScroll, setIsScroll] = useState<boolean>(false);

	useEffect(() => {
		if (element.current) {
			const isScrollExist =
				element.current.scrollHeight > element.current.clientHeight;

			setIsScroll(isScrollExist);
		}
	}, [element, influencingEntity]);

	return isScroll;
};
