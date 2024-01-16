import { BrowserRouter, Routes, Route } from "react-router-dom";

import { BoardDetails, Boards } from "pages";
import { BoardSearch } from "modules";
import { ROUTE } from "utils/consts";

export const MainRouter = () => (
	<BrowserRouter>
		<Routes>
			<Route path={ROUTE.BOARDS} element={<BoardSearch />}>
				<Route index element={<Boards />} />
				<Route path={ROUTE.BOARDS_DETAILS} element={<BoardDetails />} />
			</Route>
		</Routes>
	</BrowserRouter>
);
