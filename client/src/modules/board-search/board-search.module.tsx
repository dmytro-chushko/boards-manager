import { FC, Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ISearchForm } from "types";
import { useSearchFormSchema } from "utils/validation/search-form.schema";
import { useGetAllBoardsQuery } from "redux-dir/api/board-api";
import { Loader } from "components";

import { ErrorContainer, Header } from "styles/ui/container.styled";
import { SearchButton, SearchInput, StyledForm } from "./board-search.styled";

export const BoardSearch: FC = () => {
	const { t } = useTranslation();
	const [errorMessage, setErrorMessage] = useState<string>("");
	const navigate = useNavigate();
	const { data } = useGetAllBoardsQuery();
	const schema = useSearchFormSchema();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISearchForm>({ resolver: yupResolver(schema) });

	const onSubmit = ({ boardId }: ISearchForm) => {
		if (data && data.some(({ id }) => id === boardId)) {
			setErrorMessage("");
			navigate(`/${boardId}`);

			return;
		}

		setErrorMessage(t("validation.boardNotExist"));
	};

	return (
		<>
			<Header
				style={{
					paddingBottom: errors.boardId || errorMessage ? "0" : "1.3625rem",
				}}
			>
				<StyledForm as="form" onSubmit={handleSubmit(onSubmit)}>
					<SearchInput
						type="text"
						placeholder={t("searchPlaceholder")}
						$isError={!!errors.boardId || !!errorMessage}
						{...register("boardId")}
					/>
					<SearchButton type="submit">{t("searchButton")}</SearchButton>
				</StyledForm>
				{(errors.boardId || errorMessage) && (
					<ErrorContainer>
						{errors.boardId?.message || errorMessage}
					</ErrorContainer>
				)}
			</Header>
			<Suspense fallback={<Loader isShown />}>
				<Outlet />
			</Suspense>
		</>
	);
};
