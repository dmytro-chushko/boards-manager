import styled from "styled-components";
import { COLOR, COMMON, SIZE } from "styles";
import { Button } from "styles/ui/button.styled";
import { FlexWrapper } from "styles/ui/container.styled";
import { StyledInput } from "styles/ui/input.styled";

export const StyledForm = styled(FlexWrapper)`
	align-items: stretch;
	gap: ${SIZE.GENERAL.M};
	width: 30rem;
`;
export const SearchInput = styled(StyledInput)`
	flex-grow: 1;

	background-color: ${COLOR.BGC.PRIMARY};
`;

export const SearchButton = styled(Button)`
	padding: ${SIZE.GENERAL.XS};

	box-shadow: ${COMMON.INPUT_BORDER};
	border-radius: ${COMMON.BORDER_INNER_RADIUS};
`;
