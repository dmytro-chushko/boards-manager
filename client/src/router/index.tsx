import { BrowserRouter, Routes, Route } from "react-router-dom";

import { BoardSearch } from "components";
import { BoardDetails, Boards } from "pages";
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
