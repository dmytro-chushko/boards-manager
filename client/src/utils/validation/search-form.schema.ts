import * as yup from "yup";

import { ISearchForm } from "types";
import { useTranslation } from "react-i18next";

export const useSearchFormSchema = (): yup.ObjectSchema<ISearchForm> => {
	const { t } = useTranslation();

	return yup.object({
		boardId: yup
			.string()
			.length(36, t("validation.requiredLength", { num: "36" }))
			.required(t("validation.required")),
	});
};
