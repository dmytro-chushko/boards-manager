import { FC } from "react";

import { ICard } from "types";
import { STATUS_LABEL, STATUS_VALUE } from "utils/consts";

interface IBoardStatusProps {
	cards: ICard[];
}

export const BoardStatus: FC<IBoardStatusProps> = ({ cards }) => {
	const statuses = cards.reduce((statuses, { status }) => {
		const statusEx = {
			[STATUS_VALUE.TODO]: STATUS_LABEL.TODO,
			[STATUS_VALUE.IN_PROGRESS]: STATUS_LABEL.IN_PROGRESS,
			[STATUS_VALUE.DONE]: STATUS_LABEL.DONE,
		};

		statuses[statusEx[status]]
			? (statuses[statusEx[status]] += 1)
			: (statuses[statusEx[status]] = 1);

		return statuses;
	}, {} as Record<STATUS_LABEL, number>);

	return (
		<ul>
			{Object.keys(statuses).map(label => (
				<li key={label}>{`${label}: ${statuses[label as STATUS_LABEL]}`}</li>
			))}
		</ul>
	);
};
