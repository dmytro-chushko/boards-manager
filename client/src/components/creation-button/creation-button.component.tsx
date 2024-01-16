import { FC } from "react";

import { useCreateBoardMutation } from "redux-dir/api/board-api";
import { ENTITY } from "utils/consts";
import { ReactComponent as AddIcon } from "assets/plus.svg";

import { Button } from "styles/ui/button.styled";
import { SIZE } from "styles";

interface ICreationButtonProps {
	entity: ENTITY;
}

export const CreationButton: FC<ICreationButtonProps> = ({ entity }) => {
	const [createBoard, { isLoading: isLoadingBoardCreation }] =
		useCreateBoardMutation();

	const entities = {
		[ENTITY.BOARD]: {
			handler: async () => await createBoard(),
			isLoading: isLoadingBoardCreation,
		},
		[ENTITY.CARD]: {
			handler: () => console.log(ENTITY.CARD),
			isLoading: false,
		},
	};

	return (
		<Button
			$width={SIZE.CREATION_BUTTON.WIDTH}
			$height={SIZE.CREATION_BUTTON.HEIGHT}
			type="button"
			onClick={entities[entity].handler}
		>
			<AddIcon />
		</Button>
	);
};
