import styled from "styled-components";
import { COLOR, COMMON, SIZE } from "styles";

export const ColumnContainer = styled.li`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${SIZE.GENERAL.M};
	height: 100%;
	width: 20rem;
`;

export const StyledColumn = styled.ul`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${SIZE.GENERAL.XS};
	width: 100%;
	padding: ${SIZE.GENERAL.XS};

	background-color: ${COLOR.BGC.SECONDARY};
	border-radius: ${COMMON.BORDER_RADIUS};
`;
