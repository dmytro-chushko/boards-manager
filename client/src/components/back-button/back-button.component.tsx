import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Back } from "assets/back.svg";

import { SIZE } from "styles";
import { Button } from "styles/ui/button.styled";

interface IBackButton {
	path: string;
}

export const BackButton: FC<IBackButton> = ({ path }) => {
	const navigate = useNavigate();

	const handleClick = () => navigate(path);

	return (
		<Button
			type="button"
			$width={SIZE.CONTROL_BUTTON.WIDTH}
			$height={SIZE.CONTROL_BUTTON.HEIGHT}
			onClick={handleClick}
		>
			<Back/>
		</Button>
	);
};
