import { FC } from "react";

import { ReactComponent as Edit } from "assets/edit.svg";
import { ReactComponent as Trash } from "assets/trash.svg";

import { Button } from "styles/ui/button.styled";
import { ButtonsWrapper } from "styles/ui/container.styled";
import { StyledItem } from "./list-item.styled";
import { ENTITY } from "utils/consts";

interface IListItemProps {
	title: string;
}

export const ListItem: FC<IListItemProps> = ({ title }) => {
	const buttons = [
		{
			icon: <Edit />,
		},
		{
			icon: <Trash />,
		},
	];

	return (
		<StyledItem $entity={ENTITY.BOARD}>
			<p>{title}</p>
			<ButtonsWrapper>
				{buttons.map(({ icon }, i) => (
					<Button key={i} $width="2rem" $height="2rem" type="button">
						{icon}
					</Button>
				))}
			</ButtonsWrapper>
		</StyledItem>
	);
};
