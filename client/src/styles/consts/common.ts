import { COLOR, FONT } from "styles";

export const TRANSITION = "all ease-in-out 0.2s";
export const BORDER = "2px solid #000000";
export const INPUT_BORDER = `0 0 0 0.125rem ${COLOR.BGC.SECONDARY}`;
export const INPUT_BORDER_ERROR = `0 0 0 0.125rem ${COLOR.BGC.ERROR}`;
export const DISABLED_BORDER = `2px solid ${FONT.COLOR.DISABLED}`;
export const BORDER_RADIUS = "0.5rem";
export const BORDER_INNER_RADIUS = "0.25rem";
export const INT_SHADOW = "inset 3px 3px 4px -2px rgba(0, 0, 0, 0.5)";
export const SHADOW = "5px 5px 0px 0px rgb(0,0,0)";
export const TEXT_SHADOW =
	"-1px -1px 0 rgb(0,0,0), 1px -1px 0 rgb(0,0,0), -1px 1px 0 rgb(0,0,0), 5px 5px 0px rgb(0,0,0)";
export const SUB_CONTENT_INT_SHADOW = "inset 6px 6px 0px -2px rgba(0, 0, 0)";

export const enum LOADER {
	COLOR = "#8A8A8E",
	STROKE_WIDTH = "5",
	DURATION = "0.75",
	WIDTH = "200",
}
