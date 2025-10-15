import type { Route } from "./+types/cv";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

export function meta({}: Route.MetaArgs) {
  // Note: meta tags can't be dynamic with useTranslation in React Router v7
  // They are set at build time, so we'll use English as default
  return [
    { title: "CV - Stefan Huckschlag" },
    {
      name: "description",
      content: "Professional experience and career timeline",
    },
  ];
}

export default function CV() {
  const { t } = useTranslation(["cv", "ui", "meta"]);

  const experiences = t("cv:experiences", { returnObjects: true }) as Array<{
    title: string;
    company: string;
    period: string;
    achievements: string[];
  }>;

  const education = t("cv:education.items", { returnObjects: true }) as Array<{
    degree: string;
    institution: string;
    period: string;
    description: string;
  }>;

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
                  <Link to="/cv" className="text-lime-500 font-semibold">
                    {t("ui:nav.cv")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/imprint"
                    className="hover:text-lime-500 transition-colors"
                  >
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
      <section className="max-w-6xl mx-auto px-8 py-20">
        <h1 className="text-5xl font-bold mb-12">{t("cv:title")}</h1>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          {/* Experience Timeline */}
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <article
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm transition hover:-translate-y-1 hover:border-lime-500 hover:shadow-md"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {exp.title}
                  </h3>
                  <span className="flex items-center rounded-full bg-lime-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-lime-600 dark:text-lime-500">
                    {exp.period}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  {exp.company}
                </p>
                <ul className="mt-4 space-y-2 text-base leading-7 text-gray-700 dark:text-gray-300">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-lime-500 mt-1.5">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* Sidebar with Stats and Education */}
          <div className="space-y-8">
            {/* Key Metrics Card */}
            <div className="rounded-2xl bg-gray-900 dark:bg-gray-950 p-8 text-white shadow-sm">
              <h3 className="text-lg font-semibold uppercase tracking-wide text-lime-400 mt-0">
                {t("cv:keyMetrics.title")}
              </h3>
              <dl className="mt-6 space-y-4">
                <div>
                  <dt className="text-sm font-medium text-lime-300/80">
                    {t("cv:keyMetrics.currentStatus")}
                  </dt>
                  <dd className="text-2xl font-semibold text-white">
                    {t("cv:keyMetrics.statusValue")}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-lime-300/80">
                    {t("cv:keyMetrics.softwareDev")}
                  </dt>
                  <dd className="text-2xl font-semibold text-white">
                    {t("cv:keyMetrics.softwareDevValue")}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-lime-300/80">
                    {t("cv:keyMetrics.itTotal")}
                  </dt>
                  <dd className="text-2xl font-semibold text-white">
                    {t("cv:keyMetrics.itTotalValue")}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-lime-300/80">
                    {t("cv:keyMetrics.techFocus")}
                  </dt>
                  <dd className="text-2xl font-semibold text-white">
                    {t("cv:keyMetrics.techFocusValue")}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Education Card */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-0">
                {t("cv:education.title")}
              </h3>
              <div className="mt-6 space-y-6">
                {education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {edu.degree}
                      </h4>
                      <span className="text-xs font-medium text-lime-600 dark:text-lime-500">
                        {edu.period}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                      {edu.institution}
                    </p>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
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
