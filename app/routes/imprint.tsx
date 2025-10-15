import type { Route } from "./+types/imprint";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Imprint - Stefan Huckschlag" },
    {
      name: "description",
      content: "Contact information and legal notice",
    },
  ];
}

export default function Imprint() {
  const { t } = useTranslation(["content", "ui"]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <nav className="flex justify-between items-center">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight hover:text-lime-500 transition-colors"
            >
              huckschlag.dev
            </Link>
            <div className="flex items-center gap-8">
              <ul className="flex gap-8 text-gray-500 dark:text-gray-400">
                <li>
                  <Link to="/" className="hover:text-lime-500 transition-colors">
                    {t("ui:nav.home")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-lime-500 transition-colors"
                  >
                    {t("ui:nav.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cv"
                    className="hover:text-lime-500 transition-colors"
                  >
                    {t("ui:nav.cv")}
                  </Link>
                </li>
                <li>
                  <Link to="/imprint" className="text-lime-500 font-semibold">
                    {t("ui:nav.imprint")}
                  </Link>
                </li>
              </ul>
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-8 py-20">
        <h1 className="text-5xl font-bold mb-12">{t("content:imprint.title")}</h1>

        <div className="space-y-12">
          {/* Contact Information */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              {t("content:imprint.contact.title")}
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {t("content:imprint.contact.name")}
                </p>
                <p>{t("content:imprint.contact.role")}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {t("content:imprint.contact.email")}
                </p>
                <a
                  href="mailto:hello@huckschlag.dev"
                  className="text-lime-500 hover:text-lime-600 transition-colors"
                >
                  hello@huckschlag.dev
                </a>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {t("content:imprint.contact.website")}
                </p>
                <a
                  href="https://huckschlag.dev"
                  className="text-lime-500 hover:text-lime-600 transition-colors"
                >
                  huckschlag.dev
                </a>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              {t("content:imprint.connect.title")}
            </h2>
            <div className="flex flex-col gap-4">
              <a
                href="https://github.com/hucki"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-lime-500 transition-colors group"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                <span className="font-medium">github.com/hucki</span>
                <svg
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/hucki/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-lime-500 transition-colors group"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="font-medium">linkedin.com/in/hucki</span>
                <svg
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Legal Notice */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              {t("content:imprint.legal.title")}
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t("content:imprint.legal.tmg.title")}
                </h3>
                <p style={{ whiteSpace: "pre-line" }}>
                  {t("content:imprint.legal.tmg.content")}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t("content:imprint.legal.responsible.title")}
                </h3>
                <p style={{ whiteSpace: "pre-line" }}>
                  {t("content:imprint.legal.responsible.content")}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t("content:imprint.legal.disclaimer.title")}
                </h3>
                <p className="text-sm">
                  {t("content:imprint.legal.disclaimer.content")}
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              {t("content:imprint.privacy.title")}
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
              <p style={{ whiteSpace: "pre-line" }}>
                {t("content:imprint.privacy.content")}
                <a
                  href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime-500 hover:text-lime-600 underline"
                >
                  {t("content:imprint.privacy.githubLink")}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>{t("ui:footer.copyright")}</p>
        </div>
      </footer>
    </div>
  );
}
