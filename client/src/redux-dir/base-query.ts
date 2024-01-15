import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query";

import { QUERY_URL } from "utils/consts";

export const baseQuery = (
	url: QUERY_URL,
): BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError,
	{},
	FetchBaseQueryMeta
> =>
	fetchBaseQuery({
		baseUrl: `${process.env.REACT_APP_BASE_URL}/${url}`,
	});
