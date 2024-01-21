import { DetailedHTMLProps, LiHTMLAttributes } from "react";
import { Substitute } from "styled-components/dist/types";
import { I$Entity } from "./I$Entity";

export type ItemProps = Substitute<
	DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>,
	I$Entity
>;
