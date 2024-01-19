import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "redux-dir/base-query";
import { ICard, IUpdateCard } from "types";
import { QUERY_URL, REDUCER_PATH } from "utils/consts";

export const cardApi = createApi({
	reducerPath: REDUCER_PATH.CARD_API,
	baseQuery: baseQuery(QUERY_URL.CARD),
	tagTypes: ["Card"],
	endpoints: builder => ({
		getAllCardsByBoard: builder.query<ICard[], string>({
			query: id => ({ url: id }),
			providesTags: ["Card"],
		}),
		createCard: builder.mutation<ICard, string>({
			query: id => ({
				url: id,
				method: "POST",
			}),
			invalidatesTags: ["Card"],
		}),
		updateCard: builder.mutation<{ message: string }, IUpdateCard>({
			query: ({ id, ...body }) => ({
				url: id,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["Card"],
		}),
		removeCard: builder.mutation<{ message: string }, string>({
			query: id => ({
				url: id,
				method: "DELETE",
			}),
			invalidatesTags: ["Card"],
		}),
	}),
});

export const {
	useGetAllCardsByBoardQuery,
	useCreateCardMutation,
	useUpdateCardMutation,
	useRemoveCardMutation,
} = cardApi;
