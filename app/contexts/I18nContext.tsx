import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../i18n";

type Language = "de" | "en";

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState<Language>(
    (i18n.language as Language) || "en"
  );

  // Handle language changes
  const setLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
  };

  // Initialize language from i18n on mount
  useEffect(() => {
    const currentLang = i18n.language as Language;
    setLanguageState(currentLang);
    document.documentElement.lang = currentLang;
  }, [i18n.language]);

  return (
    <I18nContext.Provider value={{ language, setLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within an I18nProvider");
  }
  return context;
}
