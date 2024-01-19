import { configureStore } from "@reduxjs/toolkit";

import { boardApi, cardApi } from "./api";
import { errorHandler } from "./middlewares/erorr-handler.middleware";
import { loaderStatus } from "./reducers/is-loading.reducer";

export const store = configureStore({
	reducer: {
		loaderStatus: loaderStatus.reducer,
		[boardApi.reducerPath]: boardApi.reducer,
		[cardApi.reducerPath]: cardApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(boardApi.middleware)
			.concat(cardApi.middleware)
			.concat(errorHandler),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
