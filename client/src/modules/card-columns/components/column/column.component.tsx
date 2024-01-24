import { FC, useRef, DragEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import { ENTITY, STATUS_VALUE } from "utils/consts";
import { ICard, IDraggedCard, SetState } from "types";
import { ListItem } from "components";
import { CardContent } from "../card-content";
import { useChekScroll, useElementHeight, useLoader } from "hooks";
import {
	useRemoveCardMutation,
	useUpdateCardOrderMutation,
} from "redux-dir/api/card-api";

import { ColumnContainer, StyledColumn } from "./column.styled";
import { StyledTitle } from "styles/ui/typography.styled";
import { COLOR } from "styles";

interface IColumnProps {
	title: string;
	currentStatus: STATUS_VALUE;
	cards: ICard[];
	draggedCard?: IDraggedCard;
	setDraggedCard?: SetState<IDraggedCard | undefined>;
}

export const Column: FC<IColumnProps> = ({
	title,
	currentStatus,
	cards,
	draggedCard,
	setDraggedCard,
}) => {
	const { t } = useTranslation();
	const { id } = useParams();
	const columnRef = useRef<HTMLUListElement>(null);
	const columnHeight = useElementHeight(columnRef);
	const isScroll = useChekScroll<number | ICard[]>(
		columnRef,
		columnHeight,
		cards,
	);
	const [removeCard, { isLoading: isCardRemoving, isSuccess: isCardRemoved }] =
		useRemoveCardMutation();
	const [updateCardOrder, { isLoading: isOrderUpdating }] =
		useUpdateCardOrderMutation();

	const handleDelete = async (id: string) => await removeCard(id);

	const handleDragStart = (e: DragEvent<HTMLLIElement>, card: ICard) => {
		setDraggedCard &&
			setDraggedCard({ draggedId: card.id, draggedStatus: card.status });
	};

	const handleDragLeave = (e: DragEvent<HTMLLIElement>) => {
		if ((e.target as HTMLLIElement).dataset.draggable) {
			(e.target as HTMLLIElement).style.background = "transparent";
		}
	};

	const handleDragOver = (e: DragEvent<HTMLLIElement>) => {
		e.preventDefault();
		if ((e.target as HTMLLIElement).dataset.draggable) {
			(e.target as HTMLLIElement).style.background = COLOR.BGC.ACCENT;
		}
	};

	const handleDrop = (e: DragEvent<HTMLLIElement>, card: ICard) => {
		e.preventDefault();
		if ((e.target as HTMLLIElement).dataset.draggable) {
			(e.target as HTMLLIElement).style.background = "transparent";
		}

		if (draggedCard?.draggedId !== card.id) {
			updateCardOrder({
				id: id || "",
				...draggedCard,
				swappedId: card.id,
				swappedStatus: card.status,
			});
		}
	};

	const handleDragOverEmptyColumn = (e: DragEvent<HTMLUListElement>) => {
		e.preventDefault();
		if (!cards.length) {
			(e.target as HTMLUListElement).style.background = COLOR.BGC.ACCENT;
		}
		if ((e.target as HTMLUListElement).dataset.column) {
			(e.target as HTMLUListElement).style.background = COLOR.BGC.ACCENT;
		}
	};

	const handleDragLeaveEmptyColumn = (e: DragEvent<HTMLUListElement>) => {
		if (!cards.length || (e.target as HTMLUListElement).dataset.column) {
			(e.target as HTMLUListElement).style.background = COLOR.BGC.SECONDARY;
		}
	};

	const handleDropToEmptyColumn = (e: DragEvent<HTMLUListElement>) => {
		e.preventDefault();
		if (!cards.length || (e.target as HTMLUListElement).dataset.column) {
			(e.target as HTMLUListElement).style.background = COLOR.BGC.SECONDARY;

			if (draggedCard?.draggedStatus !== currentStatus) {
				updateCardOrder({
					id: id || "",
					...draggedCard,
					swappedId: "",
					swappedStatus: currentStatus,
				});
			}
		}
	};

	useLoader(isCardRemoving || isOrderUpdating);

	useEffect(() => {
		isCardRemoved &&
			toast.success(t("notification.deleting", { entity: ENTITY.CARD }));
	}, [isCardRemoved, t]);

	return (
		<ColumnContainer>
			<StyledTitle $entity={ENTITY.CARD}>{title}</StyledTitle>
			<StyledColumn
				as="ul"
				ref={columnRef}
				$setHeight={`${columnHeight - 1}rem`}
				$isScroll={isScroll}
				onDragOver={e => handleDragOverEmptyColumn(e)}
				onDragLeave={e => handleDragLeaveEmptyColumn(e)}
				onDrop={e => handleDropToEmptyColumn(e)}
				data-column
			>
				{cards &&
					cards
						.sort((a, b) => b.order - a.order)
						.map(card => (
							<ListItem
								key={card.id}
								id={card.id}
								entity={ENTITY.CARD}
								draggable
								onDragStart={e => handleDragStart(e, card)}
								onDragLeave={e => handleDragLeave(e)}
								onDragOver={e => handleDragOver(e)}
								onDrop={e => handleDrop(e, card)}
								handleDelete={handleDelete}
							>
								<CardContent card={card} />
							</ListItem>
						))}
			</StyledColumn>
		</ColumnContainer>
	);
};
