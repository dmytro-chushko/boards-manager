import {
	Children,
	FC,
	ReactElement,
	cloneElement,
	useEffect,
	useState,
} from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { ReactComponent as Edit } from "assets/edit.svg";
import { ReactComponent as Trash } from "assets/trash.svg";
import { BUTTON_LABEL, ENTITY } from "utils/consts";
import { SetState } from "types";
import { useRemoveBoardMutation } from "redux-dir/api/board-api";
import { useRemoveCardMutation } from "redux-dir/api/card-api";
import { useLoader } from "hooks";

import { Button, ButtonCover } from "styles/ui/button.styled";
import { ButtonsWrapper } from "styles/ui/container.styled";
import { StyledItem } from "./list-item.styled";

interface IListItemProps {
	id: string;
	entity: ENTITY;
	children: ReactElement[] | ReactElement;
}

export interface IListItemChildrenProps {
	isEdit?: boolean;
	setIsEdit?: SetState<boolean>;
}

export const ListItem: FC<IListItemProps> = ({ id, entity, children }) => {
	const { t } = useTranslation();
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [
		removeBoard,
		{ isLoading: isBoardRemoving, isSuccess: isBoardRemoved },
	] = useRemoveBoardMutation();
	const [removeCard, { isLoading: isCardRemoving, isSuccess: isCardRemoved }] =
		useRemoveCardMutation();
	const buttons = [
		{
			icon: <Edit />,
			label: BUTTON_LABEL.EDIT,
			handleClick: () => setIsEdit(!isEdit),
		},
		{
			icon: <Trash />,
			label: BUTTON_LABEL.DELETE,
			handleClick: {
				[ENTITY.BOARD]: async () => {
					await removeBoard(id);
				},
				[ENTITY.CARD]: async () => {
					await removeCard(id);
				},
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

	useEffect(() => {
		isBoardRemoved &&
			toast.success(t("notfication.deleting", { entity: ENTITY.BOARD }));
		isCardRemoved &&
			toast.success(t("notfication.deleting", { entity: ENTITY.CARD }));
	}, [isBoardRemoved, isCardRemoved, t]);

	useLoader(isBoardRemoving || isCardRemoving);

	return (
		<StyledItem $entity={entity}>
			{renderChildren()}
			<ButtonsWrapper>
				{buttons.map(({ icon, label, handleClick }, i) => (
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
						<ButtonCover data-label={label + id} />
					</Button>
				))}
			</ButtonsWrapper>
		</StyledItem>
	);
};
