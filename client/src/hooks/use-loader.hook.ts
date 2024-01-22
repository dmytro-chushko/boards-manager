import { useEffect } from "react";

import { useAppDispatch } from "redux-dir/hooks";
import { setIsLoading } from "redux-dir/reducers/is-loading.reducer";

export const useLoader = (isLoading: boolean): void => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setIsLoading(isLoading));
	}, [dispatch, isLoading]);
};
