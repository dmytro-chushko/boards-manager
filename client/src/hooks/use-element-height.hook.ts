import { RefObject, useEffect, useState } from "react";

export const useElementHeight = (element: string | RefObject<Element>): number => {
	const [elementHeight, setElementHeight] = useState<number>(0);

  useEffect(() => {
    let elementCalcHeight: number | null | undefined = 0;

		if (typeof element === "string") {
      const elementObj = document.querySelector(element);
      
			elementCalcHeight =
				elementObj &&
				elementObj.getBoundingClientRect().bottom -
					elementObj.getBoundingClientRect().top;			
    }

    if (element && typeof element === "object") {
      elementCalcHeight =
        element.current &&
				element.current?.getBoundingClientRect().bottom -
				element.current?.getBoundingClientRect().top;
    }
    
    if (elementCalcHeight) setElementHeight(elementCalcHeight);
	}, [element]);

	return elementHeight ? elementHeight / 16 : 0;
};
