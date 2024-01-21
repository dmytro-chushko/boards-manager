import styled from "styled-components";
import { SIZE } from "styles";
import { FlexWrapper } from "styles/ui/container.styled";

export const ColumnList = styled(FlexWrapper)`
	justify-content: space-around;
	height: 100%;
	padding-bottom: ${SIZE.GENERAL.M};
`;
