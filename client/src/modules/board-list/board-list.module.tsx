import { FC } from "react";

import { ListItem } from "components";
import { Loader } from "components";
import { useGetAllBoardsQuery } from "redux-dir/api/board-api";

import { StyledList } from "./board-list.styled";
import { BoardContent } from "./components/board-content";

export const BoardList: FC = () => {
	const { data, isLoading: isLoader } = useGetAllBoardsQuery();

	return (
		<div>
			<Loader isShown={isLoader} />
			<StyledList>
				{data &&
					data.length &&
					data?.map(({ id, title }) => (
						<ListItem key={id}>
							<BoardContent id={id} title={title} />
						</ListItem>
					))}
			</StyledList>
		</div>
	);
};
