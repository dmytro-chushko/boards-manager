import { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "styles/ui/container.styled";

export const BoardSearch: FC = () => {
	return (
		<>
			<Header>Board search</Header>
			<Suspense fallback={<div>Loading page...</div>}>
				<Outlet />
			</Suspense>
		</>
	);
};
