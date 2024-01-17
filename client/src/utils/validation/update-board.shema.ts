import * as yup from "yup";

import { IUpdateBoardForm } from "types";
import { useTranslation } from "react-i18next";

export const useUpdateBoardSchema = (): yup.ObjectSchema<IUpdateBoardForm> => {
	const { t } = useTranslation();

	return yup.object({
		title: yup
			.string()
			.max(100, t("validation.maxChar", { num: "100" }))
			.required(t("validation.required")),
	});
};
