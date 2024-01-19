import { useTranslation } from "react-i18next";
import { STATUS_VALUE } from "utils/consts";

export const useStatusExamples = () => {
	const { t } = useTranslation();

	return {
		[STATUS_VALUE.TODO]: t("statusLabel.todo"),
		[STATUS_VALUE.IN_PROGRESS]: t("statusLabel.inProgress"),
		[STATUS_VALUE.DONE]: t("statusLabel.done"),
	};
};
