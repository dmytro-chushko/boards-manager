import React, { FC } from "react";
import { ToastContainer } from "react-toastify";

import { MainRouter } from "router";

export const App: FC = () => {
	return (
		<>
			<MainRouter />
			<ToastContainer />
		</>
	);
};
