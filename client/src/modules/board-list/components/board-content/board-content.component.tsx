import { FC, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { IListItemChildrenProps } from "components/list-item/list-item.component";
import { useDebounce, useOuterClick } from "hooks";
import { IUpdateBoardForm } from "types";
import { ENTITY, MAX_CHAR } from "utils/consts";
import { modifyString } from "utils/helpers";
import { useUpdateBoardSchema } from "utils/validation";
import { ReactComponent as Enter } from "assets/enter.svg";

import { StyledInput } from "styles/ui/input.styled";
import { StyledTitle } from "styles/ui/typography.styled";
import {
	ErrorContainer,
	FlexWrapper,
	FormContainer,
} from "styles/ui/container.styled";
import { useUpdateBoardMutation } from "redux-dir/api/board-api";
import { Button } from "styles/ui/button.styled";
import { useNavigate } from "react-router-dom";

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

	useOuterClick<HTMLDivElement>(editBoxRef, handleOuterClick);

	useEffect(() => {
		setFocus("title");
	}, [setFocus, isEdit]);

	useEffect(() => {
		if (isEdit) {
			handleSubmit(onSubmit, errors => console.log(errors))();
		}
	}, [inputTitle]);

	return (
		<>
			{isEdit ? (
				<div ref={editBoxRef}>
					<FormContainer onSubmit={handleSubmit(data => console.log(data))}>
						<StyledInput
							type="text"
							$isError={!!errors.title}
							defaultValue={modifiedTitle}
							{...register("title")}
						/>
						{errors.title && (
							<ErrorContainer>{errors.title.message}</ErrorContainer>
						)}
					</FormContainer>
				</div>
			) : (
				<FlexWrapper>
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
			)}
		</>
	);
};
