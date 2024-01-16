import React, { FC } from "react";
import { ToastContainer } from "react-toastify";

import { MainRouter } from "router";

import "react-toastify/dist/ReactToastify.min.css";

export const App: FC = () => {
	return (
		<>
			<MainRouter />
			<ToastContainer />
		</>
	);
};
