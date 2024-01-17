import { FC, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { IListItemChildrenProps } from "components/list-item/list-item.component";
import { useDebounce, useOuterClick } from "hooks";
import { IUpdateBoardForm } from "types";
import { ENTITY, MAX_CHAR } from "utils/consts";
import { modifyString } from "utils/helpers";
import { useUpdateBoardSchema } from "utils/validation";

import { StyledInput } from "styles/ui/input.styled";
import { StyledTitle } from "styles/ui/typography.styled";
import { FormContainer } from "styles/ui/container.styled";
import { useUpdateBoardMutation } from "redux-dir/api/board-api";

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
	const [updateBoard, { isLoading }] = useUpdateBoardMutation();
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

	useOuterClick<HTMLDivElement>(editBoxRef, handleOuterClick);

	useEffect(() => {
		setFocus("title");
	}, [setFocus, isEdit]);

	useEffect(() => {
		if (isEdit) {
			handleSubmit(onSubmit, errors => console.log(errors))();
		}
	}, [inputTitle]);

	return isEdit ? (
		<div ref={editBoxRef}>
			<FormContainer onSubmit={handleSubmit(data => console.log(data))}>
				<StyledInput
					type="text"
					$isError={!!errors}
					defaultValue={modifiedTitle}
					{...register("title")}
				/>
			</FormContainer>
		</div>
	) : (
		<StyledTitle $entity={ENTITY.BOARD}>{modifiedTitle}</StyledTitle>
	);
};
