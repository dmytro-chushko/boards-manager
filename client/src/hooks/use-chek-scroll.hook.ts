import { RefObject, useEffect, useState } from "react";

export const useChekScroll = (element: RefObject<Element>): boolean => {
	const [isScroll, setIsScroll] = useState<boolean>(false);

	useEffect(() => {
		if (element.current) {
			const isScrollExist =
				element.current.scrollHeight > element.current.clientHeight;

			setIsScroll(isScrollExist);
		}
	}, [element]);

	return isScroll;
};
