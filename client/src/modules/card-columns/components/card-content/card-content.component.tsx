import { FC, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ICard, IUpdateCardForm } from "types";
import { BUTTON_LABEL, ENTITY, MAX_CHAR } from "utils/consts";
import { modifyString } from "utils/helpers";
import { IListItemChildrenProps } from "components/list-item/list-item.component";

import { StyledParagaph, StyledTitle } from "styles/ui/typography.styled";
import { useUpdateCardSchema } from "utils/validation";
import { useDebounce, useOuterClick } from "hooks";
import { StyledInput, StyledTextArea } from "styles/ui/input.styled";
import { ErrorContainer } from "styles/ui/container.styled";
import { useUpdateCardMutation } from "redux-dir/api/card-api";
import { FormWrapper, StyledForm } from "./card-content.styled";

interface ICardContent extends IListItemChildrenProps {
	card: ICard;
}

export const CardContent: FC<ICardContent> = ({ card, isEdit, setIsEdit }) => {
	const [updateCard] = useUpdateCardMutation();
	const schema = useUpdateCardSchema();
	const editBoxRef = useRef<HTMLDivElement>(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setFocus,
		watch,
	} = useForm<IUpdateCardForm>({
		resolver: yupResolver(schema),
	});
	const inputTitle = useDebounce(watch("title"), 500);
	const inputDescr = useDebounce(watch("description"), 500);
	const { id, title, description } = card;
	const modifiedTitle = modifyString(title, MAX_CHAR.TITLE);
	const modifiedDescr = modifyString(description, MAX_CHAR.DESCR);

	const handleOuterClick = () => setIsEdit && setIsEdit(false);

	const onSubmit = async ({ title, description }: IUpdateCardForm) => {
		await updateCard({ id, title, description });
	};

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
	}, [inputTitle, inputDescr]);

	return isEdit ? (
		<FormWrapper ref={editBoxRef}>
			<StyledForm>
				<StyledInput
					type="text"
					$isError={!!errors.title}
					defaultValue={title}
					{...register("title")}
				/>
				{errors.title && (
					<ErrorContainer>{errors.title.message}</ErrorContainer>
				)}
				<StyledTextArea
					rows={3}
					maxLength={500}
					$isError={!!errors.description}
					defaultValue={description}
					{...register("description")}
				/>
				{errors.description && (
					<ErrorContainer>{errors.description.message}</ErrorContainer>
				)}
			</StyledForm>
		</FormWrapper>
	) : (
		<div>
			<StyledTitle $entity={ENTITY.CARD}>{modifiedTitle}</StyledTitle>
			<StyledParagaph $entity={ENTITY.CARD}>{modifiedDescr}</StyledParagaph>
		</div>
	);
};
