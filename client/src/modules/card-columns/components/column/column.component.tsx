import { FC, useRef } from "react";

import { ENTITY } from "utils/consts";
import { ICard } from "types";

import { ColumnContainer, StyledColumn } from "./column.styled";
import { StyledTitle } from "styles/ui/typography.styled";
import { ListItem } from "components";
import { CardContent } from "../card-content";
import { useChekScroll, useElementHeight } from "hooks";

interface IColumn {
	title: string;
	cards: ICard[];
}

export const Column: FC<IColumn> = ({ title, cards }) => {
	const columnRef = useRef<HTMLUListElement>(null);
	const columnHeight = useElementHeight(columnRef);
	const isScroll = useChekScroll(columnRef);

	return (
		<ColumnContainer>
			<StyledTitle $entity={ENTITY.CARD}>{title}</StyledTitle>
			<StyledColumn
				as="ul"
				ref={columnRef}
				$decreaseIn={`${columnHeight}rem`}
				$isScroll={isScroll}
			>
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
