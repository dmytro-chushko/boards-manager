import styled from "styled-components";
import { COLOR, COMMON, FONT, SIZE } from "styles";

export const StyledButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: ${SIZE.CREATION_BUTTON.WIDTH};
	height: ${SIZE.CREATION_BUTTON.HEIGHT};

	color: ${FONT.COLOR.SECONDARY};
	stroke: currentColor;
	border-radius: ${COMMON.BORDER_RADIUS};
	background-color: ${COLOR.BGC.SECONDARY};

	:disabled {
		color: ${FONT.COLOR.DISABLED};
		cursor: default;
	}

	@media (hover: hover) {
		&:hover {
			transform: scale(1.3);
			background-color: ${COLOR.BGC.ACCENT};
		}
	}

	&:active:not([disabled]) {
		transform: scale(1.1);
	}
`;
