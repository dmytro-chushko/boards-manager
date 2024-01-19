import { FC } from "react";

import { ICard } from "types";
import { useStatusExamples } from "hooks";
import { ENTITY } from "utils/consts";

import { StyledParagaph } from "styles/ui/typography.styled";

interface IBoardStatusProps {
	cards: ICard[];
}

export const BoardStatus: FC<IBoardStatusProps> = ({ cards }) => {
	const statusEx = useStatusExamples();

	const statuses = cards.reduce((statuses, { status }) => {
		statuses[statusEx[status]]
			? (statuses[statusEx[status]] += 1)
			: (statuses[statusEx[status]] = 1);

		return statuses;
	}, {} as Record<string, number>);

	return (
		<ul>
			{Object.keys(statuses)
				.sort((a, b) => b.localeCompare(a))
				.map(label => (
					<li key={label}>
						<StyledParagaph
							$entity={ENTITY.BOARD}
						>{`${label}: ${statuses[label]}`}</StyledParagaph>
					</li>
				))}
		</ul>
	);
};
