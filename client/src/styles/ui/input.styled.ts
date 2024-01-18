import styled from "styled-components";
import { COMMON, SIZE } from "styles";

interface IStyledInput {
	$isError?: boolean;
}

export const StyledInput = styled.input<IStyledInput>`
	width: 100%;
	padding: ${SIZE.GENERAL.XS};

	border-radius: ${COMMON.BORDER_INNER_RADIUS};
	box-shadow: ${({ $isError }) =>
		$isError ? COMMON.INPUT_BORDER_ERROR : COMMON.INPUT_BORDER};
`;
