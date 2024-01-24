import { FC, useRef } from "react";

import { CreationButton } from "components";
import { ENTITY, ROUTE } from "utils/consts";
import { CardColumns } from "modules/card-columns";
import { BackButton } from "components/back-button";
import { useElementHeight } from "hooks";

import {
	FullHeightContainer,
	RightFlexWrapper,
	Section,
} from "styles/ui/container.styled";

import { SIZE } from "styles";

export const BoardDetails: FC = () => {
	const containerRef = useRef(null);
	const headerHeight = useElementHeight(containerRef);

	return (
		<FullHeightContainer
			ref={containerRef}
			$setHeight={`${headerHeight}rem`}
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
