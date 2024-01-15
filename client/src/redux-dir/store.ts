import { configureStore } from "@reduxjs/toolkit";

import { boardApi } from "./api/board-api";
import { errorHandler } from "./middlewares/erorr-handler.middleware";

export const store = configureStore({
	reducer: {
		[boardApi.reducerPath]: boardApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(boardApi.middleware).concat(errorHandler),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
