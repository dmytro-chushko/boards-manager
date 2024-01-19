import { FC } from "react";
import { StyledParagaph, StyledTitle } from "styles/ui/typography.styled";
import { ICard } from "types";
import { ENTITY, MAX_CHAR } from "utils/consts";
import { modifyString } from "utils/helpers";

interface ICardContent {
	card: ICard;
}

export const CardContent: FC<ICardContent> = ({ card }) => {
	const { title, description } = card;
	const modifiedTitle = modifyString(title, MAX_CHAR.TITLE);
	const modifiedDescr = modifyString(description, MAX_CHAR.DESCR);

	return (
		<div>
			<StyledTitle $entity={ENTITY.CARD}>{modifiedTitle}</StyledTitle>
			<StyledParagaph $entity={ENTITY.CARD}>{modifiedDescr}</StyledParagaph>
		</div>
	);
};
