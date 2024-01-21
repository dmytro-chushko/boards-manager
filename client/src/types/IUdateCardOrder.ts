import { STATUS_VALUE } from "utils/consts";

export interface IUpdateCardOrder {
	id: string;
	draggedId?: string;
	swappedId?: string;
	draggedStatus?: STATUS_VALUE | "";
	swappedStatus?: STATUS_VALUE;
}
