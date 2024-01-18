import { ICard } from "./ICard";

export interface IBoard {
	id: string;
	title: string;
	cards: ICard[];
}
