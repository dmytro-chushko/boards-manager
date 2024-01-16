import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./en/english.json";

export const defaultNS = "translation";

i18next.use(initReactI18next).init({
	lng: "en",
	debug: true,
	resources: {
		en: {
			translation: english,
		},
	},
	defaultNS,
});
