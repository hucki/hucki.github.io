import { Link } from "react-router";
import type { Route } from "./+types/_index";
import { useTranslation } from "react-i18next";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Huckschlag.dev - Freelance Developer" },
    {
      name: "description",
      content:
        "Freelance Full Stack Developer specializing in modern web technologies",
    },
  ];
}

export default function Home() {
  const { t } = useTranslation(["content", "ui"]);

  const skills = t("content:home.skills.items", {
    returnObjects: true,
  }) as Array<{
    title: string;
    description: string;
  }>;

  const projects = t("content:home.projects.items", {
    returnObjects: true,
  }) as Array<{
    title: string;
    description: string;
  }>;

  const projectsWithMeta = [
    {
      ...projects[0],
      gradientClass:
        "from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700",
    },
    {
      ...projects[1],
      gradientClass:
        "from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700",
    },
    {
      ...projects[2],
      gradientClass:
        "from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700",
      github: "https://github.com/hucki/grouptripper",
      image: "/images/grouptripper-autox300.png",
    },
    {
      ...projects[3],
      gradientClass:
        "from-pink-500 to-pink-600 dark:from-pink-600 dark:to-pink-700",
      github: "https://github.com/hucki/necto",
      image: "/images/necto-autox300.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <nav className="flex justify-between items-center flex-wrap gap-4">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight hover:text-lime-500 transition-colors"
            >
              huckschlag.dev
            </Link>
            <div className="flex items-center gap-8">
              <ul className="hidden md:flex gap-8 text-gray-500 dark:text-gray-400">
                <li>
                  <a
                    href="#work"
                    className="hover:text-lime-500 transition-colors"
                  >
                    {t("ui:nav.work")}
                  </a>
                </li>
                <li>
                  <a
                    href="#skills"
                    className="hover:text-lime-500 transition-colors"
                  >
                    {t("ui:nav.skills")}
                  </a>
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
      <section className="max-w-6xl mx-auto px-8 py-24 relative overflow-hidden">
        <div className="absolute -top-32 -right-64 w-[600px] h-[600px] rounded-[43%_57%_70%_30%/53%_44%_56%_47%] bg-gradient-to-br from-red-400 via-yellow-300 via-cyan-400 via-emerald-400 via-pink-400 via-rose-500 via-indigo-500 to-teal-500 dark:from-red-500 dark:via-yellow-400 dark:to-teal-600 opacity-40 dark:opacity-20 blur-[40px] -z-10 animate-morph" />
        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              {t("content:home.hero.title")}{" "}
              <span className="text-lime-500">
                {t("content:home.hero.titleHighlight")}
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
              {t("content:home.hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com/hucki"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 bg-lime-500 text-white rounded hover:bg-lime-600 hover:-translate-y-0.5 hover:shadow-lg transition-all font-medium text-center"
              >
                {t("ui:buttons.viewMyWork")}
              </a>
              <a
                href="mailto:hello@huckschlag.dev"
                className="px-7 py-3.5 bg-transparent text-gray-900 dark:text-gray-100 border-[1.5px] border-gray-200 dark:border-gray-700 rounded hover:border-lime-500 hover:text-lime-500 transition-all font-medium text-center"
              >
                {t("ui:buttons.getInTouch")}
              </a>
            </div>
          </div>
          <img
            src="https://avatars.githubusercontent.com/hucki"
            alt="Stefan Huckschlag"
            className="w-48 h-48 rounded-full border-4 border-white shadow-xl object-cover"
          />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="max-w-6xl mx-auto px-8 py-20">
        <h2 className="text-4xl font-bold mb-12">
          {t("content:home.skills.title")}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill) => (
            <div
              key={skill.title}
              className="p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-lime-500 hover:-translate-y-1 hover:shadow-xl transition-all"
            >
              <h3 className="text-xl font-semibold mb-3">{skill.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="max-w-6xl mx-auto px-8 py-20">
        <h2 className="text-4xl font-bold mb-12">
          {t("content:home.projects.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projectsWithMeta.map((project) => (
            <div
              key={project.title}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all cursor-pointer"
            >
              <div
                className={`w-full h-48 bg-gradient-to-br ${project.gradientClass} flex items-center justify-center relative`}
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-soft-light dark:opacity-80"
                  />
                ) : (
                  <div className="text-white text-6xl font-bold opacity-20">
                    {project.title.charAt(0)}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {project.description}
                </p>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-lime-500 hover:text-lime-600 text-sm font-medium"
                  >
                    {t("ui:buttons.viewOnGithub")} →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-lime-500 to-lime-600 dark:from-lime-600 dark:to-lime-700 my-20 mx-8 rounded-xl">
        <div className="max-w-6xl mx-auto px-8 md:px-12 py-16">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold text-white mb-4">
              {t("content:home.cta.title")}
            </h2>
            <p className="text-xl text-white/95 mb-8 leading-relaxed">
              {t("content:home.cta.subtitle")}
            </p>
            <a
              href="mailto:hello@huckschlag.dev"
              className="inline-block px-7 py-3.5 bg-white text-lime-500 rounded hover:bg-gray-100 transition-colors font-medium"
            >
              {t("ui:buttons.startConversation")}
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        id="contact"
        className="border-t border-gray-200 dark:border-gray-700 py-12"
      >
        <div className="max-w-6xl mx-auto px-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>{t("ui:footer.copyright")}</p>
        </div>
      </footer>

      <style>{`
        @keyframes morph {
          0%, 100% {
            border-radius: 43% 57% 70% 30% / 53% 44% 56% 47%;
          }
          25% {
            border-radius: 58% 42% 35% 65% / 48% 62% 38% 52%;
          }
          50% {
            border-radius: 35% 65% 58% 42% / 62% 35% 65% 38%;
          }
          75% {
            border-radius: 65% 35% 42% 58% / 38% 58% 42% 62%;
          }
        }
        .animate-morph {
          animation: morph 20s ease-in-out infinite, spin 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
