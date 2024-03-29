import styled, { css } from "styled-components";

import { I$Entity } from "types";
import { ENTITY } from "utils/consts";

import { COLOR, COMMON, SIZE } from "styles";

export const StyledItem = styled.li<I$Entity>`
	position: relative;
	${({ $entity }) => {
		const items = {
			[ENTITY.BOARD]: {
				padding: SIZE.GENERAL.XS,
				width: SIZE.ITEM_WIDTH.BOARD,
				bgc: COLOR.BGC.SECONDARY,
				cursor: "auto",
			},
			[ENTITY.CARD]: {
				padding: SIZE.GENERAL.XS,
				width: SIZE.ITEM_WIDTH.CARD,
				bgc: COLOR.BGC.PRIMARY,
				cursor: "grab",
			},
		};

		return css`
			padding: ${items[$entity].padding};
			width: ${items[$entity].width};
			background-color: ${items[$entity].bgc};
			cursor: ${items[$entity].cursor};
		`;
	}}

	border-radius:${COMMON.BORDER_RADIUS};
`;

export const ItemCover = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	border-radius: ${COMMON.BORDER_RADIUS};
	opacity: 0.5;
	background-color: transparent;

	transition: ${COMMON.TRANSITION};
`;
