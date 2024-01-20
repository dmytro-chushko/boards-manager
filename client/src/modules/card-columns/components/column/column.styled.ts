import styled, { css } from "styled-components";
import { COLOR, COMMON, SIZE } from "styles";
import { customScroll } from "styles/global.styled";
import { FullHeightContainer } from "styles/ui/container.styled";

export const ColumnContainer = styled.li`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${SIZE.GENERAL.M};
	height: 100%;
	width: 20rem;
`;

interface IStyledColumn {
	$isScroll?: boolean;
}

export const StyledColumn = styled(FullHeightContainer)<IStyledColumn>`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${SIZE.GENERAL.XS};
	width: 100%;
	padding: ${SIZE.GENERAL.XS};

	${({ $isScroll }) =>
		$isScroll &&
		css`
			padding-right: 0;
		`};

	background-color: ${COLOR.BGC.SECONDARY};
	border-radius: ${COMMON.BORDER_RADIUS};
	overflow-y: auto;

	${customScroll(SIZE.COLUMN_SCROLL.TRACK, SIZE.COLUMN_SCROLL.THUMB)}
`;
