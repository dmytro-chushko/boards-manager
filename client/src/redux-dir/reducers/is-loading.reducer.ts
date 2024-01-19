import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "redux-dir/store";
import { REDUCER_PATH } from "utils/consts";

const initialState: { isLoading: boolean } = {
	isLoading: false,
};

export const loaderStatus = createSlice({
	name: REDUCER_PATH.IS_EDIT,
	initialState,
	reducers: {
		setIsLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		},
	},
});

export const { setIsLoading } = loaderStatus.actions;
export const getIsLoading = (state: RootState) => state.loaderStatus.isLoading;
