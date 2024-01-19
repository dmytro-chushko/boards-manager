import { FC } from "react";

import { CreationButton } from "components";
import { ENTITY, ROUTE } from "utils/consts";

import {
	FullHeightContainer,
	RightFlexWrapper,
	Section,
} from "styles/ui/container.styled";
import { CardColumns } from "modules/card-columns";
import { BackButton } from "components/back-button";
import { useElementHeight } from "hooks";

import { SIZE } from "styles";

export const BoardDetails: FC = () => {
	const headerHeight = useElementHeight("header");

	return (
		<FullHeightContainer
			$decreaseIn={`${headerHeight}rem - ${SIZE.GENERAL.XS}`}
			style={{ display: "flex", flexDirection: "column" }}
		>
			<Section>
				<RightFlexWrapper $gap={SIZE.GENERAL.XS}>
					<BackButton path={ROUTE.BOARDS} />
					<CreationButton entity={ENTITY.CARD} />
				</RightFlexWrapper>
			</Section>
			<Section style={{ flexGrow: "1" }}>
				<CardColumns />
			</Section>
		</FullHeightContainer>
	);
};
