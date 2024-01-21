import {
	Children,
	DragEventHandler,
	FC,
	ReactElement,
	cloneElement,
	useState,
} from "react";

import { ReactComponent as Edit } from "assets/edit.svg";
import { ReactComponent as Trash } from "assets/trash.svg";
import { BUTTON_LABEL, ENTITY } from "utils/consts";
import { ItemProps, SetState } from "types";

import { Button, ButtonCover } from "styles/ui/button.styled";
import { ButtonsWrapper } from "styles/ui/container.styled";
import { ItemCover, StyledItem } from "./list-item.styled";

interface IListItemProps {
	id: string;
	entity: ENTITY;
	draggable?: boolean;
	onDragStart?: DragEventHandler<HTMLLIElement>;
	onDragLeave?: DragEventHandler<HTMLLIElement>;
	onDragEnd?: DragEventHandler<HTMLLIElement>;
	onDragOver?: DragEventHandler<HTMLLIElement>;
	onDrop?: DragEventHandler<HTMLLIElement>;
	handleDelete?: (id: string) => void;
	children: ReactElement[] | ReactElement;
}

export interface IListItemChildrenProps {
	isEdit?: boolean;
	setIsEdit?: SetState<boolean>;
}

export const ListItem: FC<IListItemProps> = ({
	id,
	entity,
	draggable,
	onDragStart,
	onDragLeave,
	onDragEnd,
	onDragOver,
	onDrop,
	handleDelete,
	children,
}) => {
	const [isEdit, setIsEdit] = useState<boolean>(false);

	const itemProps: ItemProps = {
		$entity: entity,
		draggable,
	};

	if (draggable) {
		itemProps.onDragStart = onDragStart;
		itemProps.onDragLeave = onDragLeave;
		itemProps.onDragEnd = onDragEnd;
		itemProps.onDragOver = onDragOver;
		itemProps.onDrop = onDrop;
	}

	const renderChildren = () => {
		return Children.map(children, child => {
			return cloneElement(child, {
				isEdit,
				setIsEdit,
			});
		});
	};

	return (
		<StyledItem {...itemProps}>
			{draggable && <ItemCover data-draggable />}
			{renderChildren()}
			<ButtonsWrapper>
				<Button
					$width="2rem"
					$height="2rem"
					type="button"
					onClick={() => setIsEdit(!isEdit)}
				>
					<Edit />
					<ButtonCover data-label={BUTTON_LABEL.EDIT + id} />
				</Button>
				<Button
					$width="2rem"
					$height="2rem"
					type="button"
					onClick={() => handleDelete && handleDelete(id)}
				>
					<Trash />
					<ButtonCover data-label={BUTTON_LABEL.DELETE + id} />
				</Button>
			</ButtonsWrapper>
		</StyledItem>
	);
};
