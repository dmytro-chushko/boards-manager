import {
	Middleware,
	MiddlewareAPI,
	isRejectedWithValue,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const errorHandler: Middleware =
	(api: MiddlewareAPI) => next => action => {
		if (isRejectedWithValue(action)) {
			if (
				typeof action === "object" &&
				"payload" in action &&
				typeof action.payload === "object" &&
				action.payload &&
				"data" in action.payload &&
				action.payload.data &&
				typeof action.payload.data === "object" &&
				"message" in action.payload.data
			) {
				toast.error((action.payload.data as { message: string }).message);
			}

			if (action.error.message === "Rejected") {
				toast.error("Something went wrong");
			}
		}
		// console.log(action);
		return next(action);
	};
