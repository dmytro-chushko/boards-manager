import { STATUS_VALUE } from "utils/consts";

export interface ICard {
	id: string;
	title: string;
	description: string;
	order: number;
	status: STATUS_VALUE;
	createdAt: string;
	updatedAt: string;
}
