import styled, { css } from "styled-components";
import { COLOR, COMMON, SIZE } from "styles";
import { I$Entity } from "types";
import { ENTITY } from "utils/consts";

export const StyledItem = styled.li<I$Entity>`
	${({ $entity }) => {
		const items = {
			[ENTITY.BOARD]: {
				padding: SIZE.GENERAL.XS,
				width: SIZE.ITEM_WIDTH.BOARD,
				bgc: COLOR.BGC.SECONDARY,
			},
			[ENTITY.CARD]: {
				padding: SIZE.GENERAL.XS,
				width: SIZE.ITEM_WIDTH.CARD,
				bgc: COLOR.BGC.PRIMARY,
			},
		};

		return css`
			padding: ${items[$entity].padding};
			width: ${items[$entity].width};
			background-color: ${items[$entity].bgc};
		`;
	}}

	border-radius:${COMMON.BORDER_RADIUS};
`;
