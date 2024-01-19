import { FC, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { IListItemChildrenProps } from "components/list-item/list-item.component";
import { useDebounce, useOuterClick } from "hooks";
import { IUpdateBoardForm } from "types";
import { BUTTON_LABEL, ENTITY, MAX_CHAR } from "utils/consts";
import { modifyString } from "utils/helpers";
import { useUpdateBoardSchema } from "utils/validation";
import { ReactComponent as Enter } from "assets/enter.svg";

import { StyledInput } from "styles/ui/input.styled";
import { StyledTitle } from "styles/ui/typography.styled";
import { ErrorContainer, FlexWrapper } from "styles/ui/container.styled";
import { useUpdateBoardMutation } from "redux-dir/api/board-api";
import { Button } from "styles/ui/button.styled";
import { useNavigate } from "react-router-dom";
import { SIZE } from "styles";

interface IBoardContent extends IListItemChildrenProps {
	id: string;
	title: string;
}

export const BoardContent: FC<IBoardContent> = ({
	id,
	title,
	isEdit,
	setIsEdit,
}) => {
	const navigate = useNavigate();
	const [updateBoard] = useUpdateBoardMutation();
	const editBoxRef = useRef<HTMLDivElement>(null);
	const schema = useUpdateBoardSchema();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setFocus,
		watch,
	} = useForm<IUpdateBoardForm>({
		resolver: yupResolver(schema),
	});
	const modifiedTitle = modifyString(title, MAX_CHAR.TITLE);
	const inputTitle = useDebounce(watch("title"), 500);

	const handleOuterClick = () => setIsEdit && setIsEdit(false);

	const onSubmit = async ({ title }: IUpdateBoardForm) => {
		await updateBoard({ id, title });
	};

	const handleGoToBoard = () => navigate(`/${id}`);

	useOuterClick<HTMLDivElement>(
		editBoxRef,
		handleOuterClick,
		BUTTON_LABEL.EDIT + id,
	);

	useEffect(() => {
		setFocus("title");
	}, [setFocus, isEdit]);

	useEffect(() => {
		if (isEdit) {
			handleSubmit(onSubmit)();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputTitle]);

	return isEdit ? (
		<div ref={editBoxRef} style={{ marginBottom: SIZE.GENERAL.XS }}>
			<form>
				<StyledInput
					type="text"
					$isError={!!errors.title}
					defaultValue={modifiedTitle}
					{...register("title")}
				/>
				{errors.title && (
					<ErrorContainer>{errors.title.message}</ErrorContainer>
				)}
			</form>
		</div>
	) : (
		<FlexWrapper style={{ marginBottom: SIZE.GENERAL.XS }}>
			<StyledTitle $entity={ENTITY.BOARD}>{modifiedTitle}</StyledTitle>
			<Button
				type="button"
				$width="2rem"
				$height="2rem"
				onClick={handleGoToBoard}
			>
				<Enter />
			</Button>
		</FlexWrapper>
	);
};
