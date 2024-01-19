import { FC } from "react";

import { useCreateBoardMutation } from "redux-dir/api/board-api";
import { ENTITY } from "utils/consts";
import { ReactComponent as AddIcon } from "assets/plus.svg";

import { Button } from "styles/ui/button.styled";
import { SIZE } from "styles";
import { useLoader } from "hooks";

interface ICreationButtonProps {
	entity: ENTITY;
}

export const CreationButton: FC<ICreationButtonProps> = ({ entity }) => {
	const [createBoard, { isLoading: isLoadingBoardCreation }] =
		useCreateBoardMutation();
	const [createCard, { isLoading: isLoadingCardCreation }] =
		useCreateBoardMutation();

	const entities = {
		[ENTITY.BOARD]: {
			handler: async () => await createBoard(),
			isLoading: isLoadingBoardCreation,
		},
		[ENTITY.CARD]: {
			handler: async () => await createCard(),
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
