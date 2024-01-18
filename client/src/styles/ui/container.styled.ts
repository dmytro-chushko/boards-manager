import styled from "styled-components";
import { FONT, SIZE } from "styles";

export const Container = styled.main`
	padding-left: ${SIZE.GENERAL.M};
	padding-right: ${SIZE.GENERAL.M};
`;

export const Header = styled.header`
	margin-bottom: ${SIZE.GENERAL.XS};
	padding-left: ${SIZE.GENERAL.M};
	padding-right: ${SIZE.GENERAL.M};
`;

export const Section = styled.section`
	&:not(:last-of-type) {
		margin-bottom: ${SIZE.GENERAL.XS};
	}
`;

export const ButtonsWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: end;
	gap: ${SIZE.GENERAL.XS};
`;

export const FormContainer = styled.form`
	margin-bottom: ${SIZE.GENERAL.XS};
`;

export const ErrorContainer = styled.p`
	padding: ${SIZE.GENERAL.XXS};

	font-size: ${FONT.SIZE.SMALL};

	color: ${FONT.COLOR.ERROR};
`;

export const FlexWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
