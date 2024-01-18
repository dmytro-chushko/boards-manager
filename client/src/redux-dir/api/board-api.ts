import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "redux-dir/base-query";
import { IBoard, IUpdateBoard } from "types";
import { QUERY_URL, REDUCER_PATH } from "utils/consts";

export const boardApi = createApi({
	reducerPath: REDUCER_PATH.BOARD_API,
	baseQuery: baseQuery(QUERY_URL.BOARD),
	tagTypes: ["Board"],
	endpoints: builder => ({
		getAllBoards: builder.query<IBoard[], void>({
			query: () => ({ url: "" }),
			providesTags: ["Board"],
		}),
		getBoardById: builder.query<IBoard, string>({
			query: id => ({ url: id }),
			providesTags: ["Board"],
		}),
		createBoard: builder.mutation<IBoard, void>({
			query: () => ({
				url: "",
				method: "POST",
			}),
			invalidatesTags: ["Board"],
		}),
		updateBoard: builder.mutation<{ message: string }, IUpdateBoard>({
			query: ({ id, ...body }) => ({
				url: id,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Board"],
		}),
		removeBoard: builder.mutation<{ message: string }, string>({
			query: id => ({
				url: id,
				method: "DELETE",
			}),
			invalidatesTags: ["Board"],
		}),
	}),
});

export const {
	useGetAllBoardsQuery,
	useGetBoardByIdQuery,
	useCreateBoardMutation,
	useUpdateBoardMutation,
	useRemoveBoardMutation,
} = boardApi;
