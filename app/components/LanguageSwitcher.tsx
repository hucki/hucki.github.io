import { useLanguage } from "../contexts/I18nContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
      <button
        onClick={() => setLanguage("de")}
        className={`px-3 py-1.5 rounded transition-colors text-sm font-medium ${
          language === "de"
            ? "bg-lime-500 text-white"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
        }`}
        aria-label="Deutsch"
        title="Deutsch"
      >
        DE
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1.5 rounded transition-colors text-sm font-medium ${
          language === "en"
            ? "bg-lime-500 text-white"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
        }`}
        aria-label="English"
        title="English"
      >
        EN
      </button>
    </div>
  );
}
