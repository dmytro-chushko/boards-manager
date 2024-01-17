import {
	Middleware,
	MiddlewareAPI,
	isRejectedWithValue,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const errorHandler: Middleware =
	(api: MiddlewareAPI) => next => action => {
		if (isRejectedWithValue(action)) {
			if ("data" in action.error) {
				toast.error((action.error.data as { message: string }).message);
			}

			console.log(action.error);
			toast.error(action.error.message);
		}

		return next(action);
	};
