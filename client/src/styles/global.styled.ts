import { createGlobalStyle, css } from "styled-components";

import { COLOR, COMMON, FONT } from "styles";

export const customScroll = (track: string, thumb: string) => css`
	&::-webkit-scrollbar {
		width: ${track};
	}

	&::-webkit-scrollbar-track {
		background: ${COLOR.BGC.SECONDARY};
		border-radius: 0 10px 10px 0;
	}

	&::-webkit-scrollbar-thumb {
		background-color: ${COLOR.BGC.PRIMARY};
		border-radius: 10px;
		border: ${thumb} solid ${COLOR.BGC.SECONDARY};
	}
`;

export const GlobalStyle = createGlobalStyle`
  ${css`
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}

		body {
			margin: 0;

			font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI",
				"Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
				"Helvetica Neue", sans-serif;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			font-size: ${FONT.SIZE.REGULAR};

			color: ${FONT.COLOR.PRIMARY};
			background-color: ${COLOR.BGC.PRIMARY};
		}

		a {
			text-decoration: none;
			color: ${FONT.COLOR.PRIMARY};

			transition: ${COMMON.TRANSITION};
		}

		button {
			color: ${FONT.COLOR.PRIMARY};
			cursor: pointer;
			background: transparent;
			border: none;

			transition: ${COMMON.TRANSITION};
		}

		ul,
		ol {
			list-style: none;
		}

		input,
		textarea {
			border: none;
			outline: none;
		}

		img {
			display: block;
			height: auto;
			max-width: 100%;
		}
	`}
`;
