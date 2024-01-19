import styled, { css } from "styled-components";

import { COLOR, COMMON, FONT } from "styles";

interface IButton {
	$width?: string;
	$height?: string;
}

export const Button = styled.button<IButton>`
	position: relative;

	display: flex;
	align-items: center;
	justify-content: center;

	${({ $width }) =>
		$width &&
		css`
			width: ${$width};
		`}
	${({ $height }) =>
		$height &&
		css`
			height: ${$height};
		`}

	color: ${FONT.COLOR.SECONDARY};
	stroke: currentColor;
	border-radius: ${COMMON.BORDER_RADIUS};
	background-color: ${COLOR.BGC.SECONDARY};

	&:disabled {
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

export const ButtonCover = styled.div`
	position: absolute;
	top: 0;
	left: 0;

	width: 100%;
	height: 100%;

	background-color: transparent;
`;
