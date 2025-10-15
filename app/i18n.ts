import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import deUI from "./locales/de/ui.json";
import deCV from "./locales/de/cv.json";
import deContent from "./locales/de/content.json";
import deMeta from "./locales/de/meta.json";

import enUI from "./locales/en/ui.json";
import enCV from "./locales/en/cv.json";
import enContent from "./locales/en/content.json";
import enMeta from "./locales/en/meta.json";

const resources = {
  de: {
    ui: deUI,
    cv: deCV,
    content: deContent,
    meta: deMeta,
  },
  en: {
    ui: enUI,
    cv: enCV,
    content: enContent,
    meta: enMeta,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    defaultNS: "ui",
    ns: ["ui", "cv", "content", "meta"],

    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "language",
    },

    interpolation: {
      escapeValue: false, // React already escapes
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
