import { FC, useEffect, useState } from "react";

import { useStatusExamples } from "hooks";

import { ColumnList } from "./card-columns.styled";
import { useGetAllCardsByBoardQuery } from "redux-dir/api/card-api";
import { useParams } from "react-router-dom";
import { Column } from "./components/column";
import { STATUS_VALUE } from "utils/consts";
import { useAppDispatch } from "redux-dir/hooks";
import { setIsLoading } from "redux-dir/reducers/is-loading.reducer";
import { IDraggedCard } from "types";

export const CardColumns: FC = () => {
	const [draggedCard, setDraggedCard] = useState<IDraggedCard>();
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const { data, isLoading } = useGetAllCardsByBoardQuery(id || "");
	const statusEx = useStatusExamples();

	useEffect(() => {
		dispatch(setIsLoading(isLoading));
	}, [isLoading, dispatch]);

	return (
		<ColumnList as="ul">
			{data &&
				Object.keys(statusEx)
					.sort((a, b) => b.localeCompare(a))
					.map(cardStatus => {
						const currentCards = data.filter(
							({ status }) => status === cardStatus,
						);
						return (
							<Column
								key={cardStatus}
								title={statusEx[cardStatus as STATUS_VALUE]}
								statusValue={cardStatus as STATUS_VALUE}
								cards={currentCards}
								draggedCard={draggedCard}
								setDraggedCard={setDraggedCard}
							/>
						);
					})}
		</ColumnList>
	);
};
