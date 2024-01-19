import { FC } from "react";
import { useParams } from "react-router-dom";

import { useCreateBoardMutation } from "redux-dir/api/board-api";
import { useCreateCardMutation } from "redux-dir/api/card-api";
import { ENTITY } from "utils/consts";
import { ReactComponent as AddIcon } from "assets/plus.svg";

import { Button } from "styles/ui/button.styled";
import { SIZE } from "styles";
import { useLoader } from "hooks";

interface ICreationButtonProps {
	entity: ENTITY;
}

export const CreationButton: FC<ICreationButtonProps> = ({ entity }) => {
	const { id } = useParams();
	const [createBoard, { isLoading: isLoadingBoardCreation }] =
		useCreateBoardMutation();
	const [createCard, { isLoading: isLoadingCardCreation }] =
		useCreateCardMutation();

	const entities = {
		[ENTITY.BOARD]: {
			handler: async () => await createBoard(),
			isLoading: isLoadingBoardCreation,
		},
		[ENTITY.CARD]: {
			handler: async () => await createCard(id || ""),
			isLoading: isLoadingCardCreation,
		},
	};

	useLoader(entities[entity].isLoading);

	return (
		<Button
			$width={SIZE.CONTROL_BUTTON.WIDTH}
			$height={SIZE.CONTROL_BUTTON.HEIGHT}
			type="button"
			onClick={entities[entity].handler}
		>
			<AddIcon />
		</Button>
	);
};
