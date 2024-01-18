import { FC } from "react";

import { ListItem } from "components";
import { Loader } from "components";
import { useGetAllBoardsQuery } from "redux-dir/api/board-api";

import { StyledList } from "./board-list.styled";
import { BoardContent } from "./components/board-content";
import { ENTITY } from "utils/consts";
import { BoardStatus } from "./components/board-status";

export const BoardList: FC = () => {
	const { data, isLoading: isLoader } = useGetAllBoardsQuery();

	return (
		<div>
			<Loader isShown={isLoader} />
			<StyledList>
				{data &&
					data.length &&
					data?.map(({ id, title, cards }) => (
						<ListItem key={id} id={id} entity={ENTITY.BOARD}>
							<BoardContent id={id} title={title} />
							<BoardStatus cards={cards} />
						</ListItem>
					))}
			</StyledList>
		</div>
	);
};
