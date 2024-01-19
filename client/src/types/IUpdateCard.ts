import { STATUS_VALUE } from "utils/consts";

export interface IUpdateCard {
	id: string;
	title?: string;
	description?: string;
	order?: number;
	status?: STATUS_VALUE;
}
