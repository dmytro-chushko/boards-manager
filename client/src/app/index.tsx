import React, { FC } from "react";
import { ToastContainer } from "react-toastify";

import { MainRouter } from "router";

import "react-toastify/dist/ReactToastify.min.css";
import { Loader } from "components";
import { useAppSelector } from "redux-dir/hooks";
import { getIsLoading } from "redux-dir/reducers/is-loading.reducer";

export const App: FC = () => {
	const isLoading = useAppSelector(getIsLoading);

	return (
		<>
			<Loader isShown={isLoading} />
			<MainRouter />
			<ToastContainer />
		</>
	);
};
