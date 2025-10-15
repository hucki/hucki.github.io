import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  const { t } = useTranslation(["ui"]);

  return (
    <footer
      id="contact"
      className="border-t border-gray-200 dark:border-gray-700 bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-50/60 supports-[backdrop-filter]:dark:bg-gray-900/60 py-12"
    >
      <div className="flex justify-between flex-col gap-4 sm:flex-row items-center max-w-6xl mx-auto px-8 text-center text-gray-500 dark:text-gray-400 text-sm">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <p>{t("footer.copyright")}</p>
          <Link
            to="/imprint"
            className="hover:text-lime-500 transition-colors underline"
          >
            {t("nav.imprint")}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  );
}
