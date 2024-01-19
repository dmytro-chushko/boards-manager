import styled from "styled-components";
import { COMMON, FONT, SIZE } from "styles";

interface IStyledInput {
	$isError?: boolean;
}

export const StyledInput = styled.input<IStyledInput>`
	width: 100%;
	padding: ${SIZE.GENERAL.XS};

	font-size: ${FONT.SIZE.MEDIUM};

	border-radius: ${COMMON.BORDER_INNER_RADIUS};
	box-shadow: ${({ $isError }) =>
		$isError ? COMMON.INPUT_BORDER_ERROR : COMMON.INPUT_BORDER};
`;

export const StyledTextArea = styled.textarea<IStyledInput>`
	width: 100%;
	padding: ${SIZE.GENERAL.XS};

	font-size: ${FONT.SIZE.REGULAR};

	border-radius: ${COMMON.BORDER_INNER_RADIUS};
	resize: none;
	box-shadow: ${({ $isError }) =>
		$isError ? COMMON.INPUT_BORDER_ERROR : COMMON.INPUT_BORDER};
`;
