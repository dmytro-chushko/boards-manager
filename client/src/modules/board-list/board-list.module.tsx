import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { ListItem } from "components";
import {
	useGetAllBoardsQuery,
	useRemoveBoardMutation,
} from "redux-dir/api/board-api";

import { StyledList } from "./board-list.styled";
import { BoardContent } from "./components/board-content";
import { ENTITY } from "utils/consts";
import { BoardStatus } from "./components/board-status";
import { useLoader } from "hooks";

export const BoardList: FC = () => {
	const { t } = useTranslation();
	const { data, isLoading } = useGetAllBoardsQuery();
	const [
		removeBoard,
		{ isLoading: isBoardRemoving, isSuccess: isBoardRemoved },
	] = useRemoveBoardMutation();

	const handleDelete = async (id: string) => await removeBoard(id);

	useLoader(isLoading || isBoardRemoving);

	useEffect(() => {
		isBoardRemoved &&
			toast.success(t("notification.deleting", { entity: ENTITY.BOARD }));
	}, [isBoardRemoved, t]);

	return (
		<div>
			<StyledList>
				{data &&
					data.length &&
					data?.map(({ id, title, cards }) => (
						<ListItem
							key={id}
							id={id}
							entity={ENTITY.BOARD}
							handleDelete={() => handleDelete(id)}
						>
							<BoardContent id={id} title={title} />
							<BoardStatus cards={cards} />
						</ListItem>
					))}
			</StyledList>
		</div>
	);
};
