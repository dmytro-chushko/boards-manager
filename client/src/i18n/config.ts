import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import english from "./en/english.json";

export const defaultNS = "translation";

i18next
	.use(initReactI18next)
	.use(Backend)
	.use(LanguageDetector)
	.init({
		lng: "en",
		resources: {
			en: {
				translation: english,
			},
		},
		defaultNS,
	});

export default i18next;
