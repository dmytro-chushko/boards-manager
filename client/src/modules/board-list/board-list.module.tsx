import { FC } from "react";

import { ListItem } from "components";
import { Loader } from "components";
import { useGetAllBoardsQuery } from "redux-dir/api/board-api";

import { StyledList } from "./board-list.styled";

export const BoardList: FC = () => {
	const { data, isLoading } = useGetAllBoardsQuery();

	return (
		<div>
			<Loader isShown={isLoading} />
			<StyledList>
				{data &&
					data.length &&
					data?.map(({ id, title }) => <ListItem key={id} title={title} />)}
			</StyledList>
		</div>
	);
};
