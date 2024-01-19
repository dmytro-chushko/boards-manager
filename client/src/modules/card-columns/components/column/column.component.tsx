import { FC } from "react";

import { ENTITY } from "utils/consts";
import { ICard } from "types";

import { ColumnContainer, StyledColumn } from "./column.styled";
import { StyledTitle } from "styles/ui/typography.styled";
import { ListItem } from "components";
import { CardContent } from "../card-content";

interface IColumn {
	title: string;
	cards: ICard[];
}

export const Column: FC<IColumn> = ({ title, cards }) => {
	return (
		<ColumnContainer>
			<StyledTitle $entity={ENTITY.CARD}>{title}</StyledTitle>
			<StyledColumn>
				{cards &&
					cards.map(card => (
						<ListItem key={card.id} id={card.id} entity={ENTITY.CARD}>
							<CardContent card={card} />
						</ListItem>
					))}
			</StyledColumn>
		</ColumnContainer>
	);
};
