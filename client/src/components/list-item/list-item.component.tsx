import { Children, FC, ReactElement, cloneElement, useState } from "react";

import { ReactComponent as Edit } from "assets/edit.svg";
import { ReactComponent as Trash } from "assets/trash.svg";

import { Button } from "styles/ui/button.styled";
import { ButtonsWrapper } from "styles/ui/container.styled";
import { StyledItem } from "./list-item.styled";
import { ENTITY } from "utils/consts";
import { SetState } from "types";

interface IListItemProps {
	children: ReactElement;
}

export interface IListItemChildrenProps {
	isEdit?: boolean;
	setIsEdit?: SetState<boolean>;
}

export const ListItem: FC<IListItemProps> = ({ children }) => {
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const buttons = [
		{
			icon: <Edit />,
			handleClick: () => setIsEdit(!isEdit),
		},
		{
			icon: <Trash />,
			handleClick: () => console.log("click"),
		},
	];

	const renderChildren = () => {
		return Children.map(children, child => {
			return cloneElement(child, {
				isEdit,
				setIsEdit,
			});
		});
	};

	return (
		<StyledItem $entity={ENTITY.BOARD}>
			{renderChildren()}
			<ButtonsWrapper>
				{buttons.map(({ icon, handleClick }, i) => (
					<Button
						key={i}
						$width="2rem"
						$height="2rem"
						type="button"
						onClick={handleClick}
					>
						{icon}
					</Button>
				))}
			</ButtonsWrapper>
		</StyledItem>
	);
};
