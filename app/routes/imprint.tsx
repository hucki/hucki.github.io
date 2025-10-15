import type { Route } from "./+types/imprint";
import { useTranslation } from "react-i18next";
import { SiGithub } from "react-icons/si";
import { SiLinkedin } from "react-icons/si";

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
    <div className="text-gray-900 dark:text-gray-100">
      {/* Content */}
      <section className="max-w-4xl mx-auto px-8 py-20">
        <h1 className="text-5xl font-bold mb-12">
          {t("content:imprint.title")}
        </h1>

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
                <SiGithub />
                <span className="font-medium">github.com/hucki</span>
              </a>
              <a
                href="https://www.linkedin.com/in/hucki/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-lime-500 transition-colors group"
              >
                <SiLinkedin />
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
    </div>
  );
}
