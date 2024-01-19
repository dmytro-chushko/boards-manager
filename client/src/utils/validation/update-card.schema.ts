import * as yup from "yup";

import { IUpdateCardForm } from "types";
import { useTranslation } from "react-i18next";

export const useUpdateCardSchema = (): yup.ObjectSchema<IUpdateCardForm> => {
	const { t } = useTranslation();

	return yup.object({
		title: yup
			.string()
			.max(100, t("validation.maxChar", { num: "100" }))
			.required(t("validation.required")),
		description: yup
			.string()
			.max(500, t("validation.maxChar", { num: "500" }))
			.required(t("validation.required")),
	});
};
