import { useMemo, useEffect, FC } from "react";
import { createPortal } from "react-dom";

import { Backdrop } from "./modal-window.styled";

interface IModalWindow {
	children: React.ReactNode;
	isOpen: boolean;
	onClose?: () => void;
}

const modalRootElement = document.querySelector("#modal");

export const ModalWindow: FC<IModalWindow> = ({
	children,
	isOpen,
	onClose,
}) => {
	const element = useMemo(() => document.createElement("div"), []);

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if ((e.target as HTMLDivElement).dataset.backdrop) {
			return onClose ? onClose() : undefined;
		}
	};

	useEffect(() => {
		modalRootElement?.appendChild(element);

		return () => {
			modalRootElement?.removeChild(element);
		};
	}, [element]);

	return createPortal(
		<Backdrop $isOpen={isOpen} onClick={handleClick} data-backdrop={true}>
			{children}
		</Backdrop>,
		element,
	);
};
