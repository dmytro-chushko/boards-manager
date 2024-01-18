import { STATUS_VALUE } from "utils/consts";

export interface ICard {
	id: string;
	title: string;
	decription: string;
	order: number;
	status: STATUS_VALUE;
	createdAt: string;
	updatedAt: string;
}
