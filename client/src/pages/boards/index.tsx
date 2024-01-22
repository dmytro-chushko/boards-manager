import { FC } from "react";

import { CreationButton } from "components";
import { BoardList } from "modules";
import { ENTITY } from "utils/consts";

import { Container, Section } from "styles/ui/container.styled";

export const Boards: FC = () => {
	return (
		<Container>
			<Section>
				<CreationButton entity={ENTITY.BOARD} />
			</Section>
			<Section>
				<BoardList />
			</Section>
		</Container>
	);
};
