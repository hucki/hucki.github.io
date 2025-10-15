import type { Route } from "./+types/_index";
import { useTranslation } from "react-i18next";
import { LuMail } from "react-icons/lu";
import { SiGithub, SiLinkedin } from "react-icons/si";
import {
  getSoftwareDevExperienceYears,
  getITExperienceYears,
} from "~/utils/experienceCalculator";
import { isFeatureEnabled } from "~/utils/featureFlags";

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
  const { t } = useTranslation(["content", "ui", "cv"]);

  // Dynamic experience values for interpolation
  const experienceValues = {
    softwareDevYears: getSoftwareDevExperienceYears(),
    itTotalYears: getITExperienceYears(),
  };

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

  const aboutParagraphs = t("content:about.professional.paragraphs", {
    returnObjects: true,
    ...experienceValues,
  }) as string[];

  const professionalSkills = t("content:about.skills.items", {
    returnObjects: true,
  }) as string[];

  const personalItems = t("content:about.personal.items", {
    returnObjects: true,
  }) as Array<{
    icon: string;
    text: string;
  }>;

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
  ] as Array<{
    title: string;
    description: string;
    gradientClass: string;
    github?: string;
    image?: string;
  }>;

  return (
    <div className="text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-8 py-24 relative overflow-hidden">
        <div className="absolute -top-32 -right-64 w-[600px] h-[600px] rounded-[43%_57%_70%_30%/53%_44%_56%_47%] bg-gradient-to-br from-red-400 via-cyan-400 to-teal-500 dark:from-red-500 dark:via-yellow-400 dark:to-teal-600 opacity-40 dark:opacity-20 blur-[40px] -z-10 animate-morph" />
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
                className="flex gap-2 items-center px-7 py-3.5 bg-lime-500 text-white rounded hover:bg-lime-600 hover:-translate-y-0.5 hover:shadow-lg transition-all font-medium text-center"
              >
                <SiGithub />
                {t("ui:buttons.viewMyWork")}
              </a>
              <a
                href="mailto:hello@huckschlag.dev"
                className="flex gap-2 items-center px-7 py-3.5 bg-transparent text-gray-900 dark:text-gray-100 border-[1.5px] border-gray-200 dark:border-gray-700 rounded hover:border-lime-500 hover:text-lime-500 transition-all font-medium text-center"
              >
                <LuMail /> {t("ui:buttons.getInTouch")}
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

      {/* About Section */}
      <section id="about" className="max-w-6xl mx-auto px-8 py-20">
        <h2 className="text-4xl font-bold mb-12">{t("content:about.title")}</h2>

        <div className="grid md:grid-cols-[auto_1fr] gap-12 items-start mb-16">
          <img
            src="https://avatars.githubusercontent.com/hucki"
            alt="Stefan Huckschlag"
            className="w-48 h-48 rounded-full border-4 border-white dark:border-gray-800 shadow-xl object-cover"
          />
          <div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {t("content:about.subtitle")}
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/hucki"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-center px-6 py-3 bg-lime-500 text-white rounded hover:bg-lime-600 transition-colors font-medium"
              >
                <SiGithub /> {t("ui:buttons.github")}
              </a>
              <a
                href="https://www.linkedin.com/in/hucki/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-center px-6 py-3 bg-transparent text-gray-900 dark:text-gray-100 border-[1.5px] border-gray-200 dark:border-gray-700 rounded hover:border-lime-500 hover:text-lime-500 transition-all font-medium"
              >
                <SiLinkedin /> {t("ui:buttons.linkedin")}
              </a>
            </div>
          </div>
        </div>

        {/* Professional Background */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            {t("content:about.professional.title")}
          </h3>
          <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            {aboutParagraphs.map((paragraph, index) => (
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

        {/* Personal Section */}
        <div className="bg-gradient-to-r from-lime-500 to-lime-600 dark:from-lime-600 dark:to-lime-700 rounded-xl p-8 md:p-12 text-white mb-8">
          <h3 className="text-2xl font-bold mb-6">
            {t("content:about.personal.title")}
          </h3>
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

      {/* CV Section */}
      {isFeatureEnabled("SHOW_CV_SECTION") && (
        <section id="cv" className="max-w-6xl mx-auto px-8 py-20">
          <h2 className="text-4xl font-bold mb-12">{t("cv:title")}</h2>

          <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
            {/* Experience Timeline */}
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <article
                  key={index}
                  className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm transition hover:-translate-y-1 hover:border-lime-500 hover:shadow-md"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {exp.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-1 text-lime-600 dark:text-lime-400 font-medium">
                    {exp.company}
                  </p>
                  <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-lime-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-current flex-shrink-0" />
                        {achievement}
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
                      {t("cv:keyMetrics.softwareDevValue", experienceValues)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-lime-300/80">
                      {t("cv:keyMetrics.itTotal")}
                    </dt>
                    <dd className="text-2xl font-semibold text-white">
                      {t("cv:keyMetrics.itTotalValue", experienceValues)}
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
                  className="flex gap-2 items-center w-64 px-7 py-3.5 bg-white text-lime-500 rounded hover:bg-gray-100 transition-colors font-medium"
                >
                  <LuMail /> {t("ui:buttons.startConversation")}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

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
