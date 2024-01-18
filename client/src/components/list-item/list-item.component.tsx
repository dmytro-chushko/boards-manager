import { Children, FC, ReactElement, cloneElement, useState } from "react";

import { ReactComponent as Edit } from "assets/edit.svg";
import { ReactComponent as Trash } from "assets/trash.svg";

import { Button } from "styles/ui/button.styled";
import { ButtonsWrapper } from "styles/ui/container.styled";
import { StyledItem } from "./list-item.styled";
import { ENTITY } from "utils/consts";
import { SetState } from "types";
import { useRemoveBoardMutation } from "redux-dir/api/board-api";
import { toast } from "react-toastify";
import { Loader } from "components/loader";

interface IListItemProps {
	id: string;
	entity: ENTITY;
	children: ReactElement[];
}

export interface IListItemChildrenProps {
	isEdit?: boolean;
	setIsEdit?: SetState<boolean>;
}

export const ListItem: FC<IListItemProps> = ({ id, entity, children }) => {
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [removeBoard, { isLoading }] = useRemoveBoardMutation();
	const buttons = [
		{
			icon: <Edit />,
			handleClick: () => setIsEdit(!isEdit),
		},
		{
			icon: <Trash />,
			handleClick: {
				[ENTITY.BOARD]: async () => {
					const response = await removeBoard(id);
					if ("data" in response) toast.success(response.data.message);
				},
				[ENTITY.CARD]: () => console.log("click"),
			},
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
						onClick={
							typeof handleClick === "object"
								? handleClick[entity]
								: handleClick
						}
					>
						{icon}
					</Button>
				))}
			</ButtonsWrapper>
			<Loader isShown={isLoading} />
		</StyledItem>
	);
};
