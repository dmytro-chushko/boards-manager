import styled, { css } from "styled-components";

import { FONT, SIZE } from "styles";
import { I$Entity } from "types";
import { ENTITY } from "utils/consts";

export const StyledParagaph = styled.p<I$Entity>`
	padding: ${SIZE.GENERAL.XS};

	${({ $entity }) => {
		const entities = {
			[ENTITY.BOARD]: {
				color: FONT.COLOR.SECONDARY,
			},
			[ENTITY.CARD]: {
				color: FONT.COLOR.PRIMARY,
			},
		};

		return css`
			color: ${entities[$entity].color};
		`;
	}}
`;

export const StyledTitle = styled(StyledParagaph)`
	font-size: ${FONT.SIZE.MEDIUM};
	font-weight: ${FONT.WEIGHT.BOLD};
`;
