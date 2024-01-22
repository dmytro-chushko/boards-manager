import { FC } from "react";
import { RotatingLines } from "react-loader-spinner";

import { ModalWindow } from "components/modal-window";

import { COMMON } from "styles";

interface ILoader {
	isShown: boolean;
}

export const Loader: FC<ILoader> = ({ isShown }) => {
	return (
		<ModalWindow isOpen={isShown}>
			<RotatingLines
				strokeColor={COMMON.LOADER.COLOR}
				strokeWidth={COMMON.LOADER.STROKE_WIDTH}
				animationDuration={COMMON.LOADER.DURATION}
				width={COMMON.LOADER.WIDTH}
				visible={true}
			/>
		</ModalWindow>
	);
};
