import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "redux-dir/store";
import { REDUCER_PATH } from "utils/consts";

const initialState: { isEdit: boolean } = {
	isEdit: false,
};

export const editEntity = createSlice({
	name: REDUCER_PATH.IS_EDIT,
	initialState,
	reducers: {
		setIsEdit(state, action: PayloadAction<boolean>) {
			state.isEdit = action.payload;
		},
	},
});

export const { setIsEdit } = editEntity.actions;
export const getIsEdit = (state: RootState) => state.editEntity.isEdit;
