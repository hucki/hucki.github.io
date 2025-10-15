import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import type { Route } from "./+types/about";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Me - Stefan Huckschlag" },
    {
      name: "description",
      content: "Learn more about Stefan Huckschlag - Full Stack Developer",
    },
  ];
}

export default function About() {
  const { t } = useTranslation(["content", "ui"]);

  const professionalSkills = t("content:about.skills.items", { returnObjects: true }) as string[];
  const professionalParagraphs = t("content:about.professional.paragraphs", { returnObjects: true }) as string[];
  const personalItems = t("content:about.personal.items", { returnObjects: true }) as Array<{
    icon: string;
    text: string;
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
                  <Link to="/about" className="text-lime-500 font-semibold">
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

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-8 py-20">
        <div className="grid md:grid-cols-[auto_1fr] gap-12 items-start">
          <img
            src="https://avatars.githubusercontent.com/hucki"
            alt="Stefan Huckschlag"
            className="w-48 h-48 rounded-full border-4 border-white dark:border-gray-800 shadow-xl object-cover"
          />
          <div>
            <h1 className="text-5xl font-bold mb-4">{t("content:about.title")}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t("content:about.subtitle")}
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/hucki"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-lime-500 text-white rounded hover:bg-lime-600 transition-colors font-medium"
              >
                {t("ui:buttons.github")}
              </a>
              <a
                href="https://www.linkedin.com/in/hucki/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-transparent text-gray-900 dark:text-gray-100 border-[1.5px] border-gray-200 dark:border-gray-700 rounded hover:border-lime-500 hover:text-lime-500 transition-all font-medium"
              >
                {t("ui:buttons.linkedin")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Background */}
      <section className="max-w-6xl mx-auto px-8 py-12">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            {t("content:about.professional.title")}
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            {professionalParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            {t("content:about.skills.title")}
          </h3>
          <div className="flex flex-wrap gap-3">
            {professionalSkills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-900 dark:text-gray-100 hover:border-lime-500 hover:text-lime-500 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Section */}
      <section className="max-w-6xl mx-auto px-8 py-12 mb-20">
        <div className="bg-gradient-to-r from-lime-500 to-lime-600 dark:from-lime-600 dark:to-lime-700 rounded-xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold mb-6">{t("content:about.personal.title")}</h2>
          <div className="grid md:grid-cols-2 gap-6 text-white/95">
            {personalItems.map((item, index) => (
              <div key={index} className="flex gap-4">
                <span className="text-3xl" role="img">
                  {item.icon}
                </span>
                <p className="leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-12">
        <div className="max-w-6xl mx-auto px-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>{t("ui:footer.copyright")}</p>
        </div>
      </footer>
    </div>
  );
}
