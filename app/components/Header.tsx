import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { isFeatureEnabled } from "~/utils/featureFlags";

export function Header() {
  const { t } = useTranslation(["ui"]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show avatar when scrolled past the hero section (approximately 300px)
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`
      sticky top-0 z-50 transition-all duration-500 ease-out rounded-b-2xl
      ${
        isScrolled
          ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/30 shadow-lg shadow-black/5 dark:shadow-black/20"
          : "bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-200 dark:border-gray-700"
      }
      supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-gray-900/60
      before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:pointer-events-none
      after:absolute after:inset-0 after:bg-noise after:opacity-[0.02] after:pointer-events-none
    `}
    >
      {/* Liquid glass overlay effect */}
      <div
        className={`
        absolute inset-0 transition-opacity duration-500
        ${isScrolled ? "opacity-100" : "opacity-0"}
        bg-gradient-to-r from-transparent via-white/5 to-transparent
        animate-pulse-slow
      `}
      />

      <div
        className="max-w-6xl mx-auto px-8 py-6 relative z-10"
        ref={mobileMenuRef}
      >
        <nav className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Avatar - appears when scrolled */}
            <div
              className={`transition-all duration-500 ease-out ${
                isScrolled
                  ? "opacity-100 translate-x-0 scale-100 w-10 h-10"
                  : "opacity-0 -translate-x-4 scale-75 w-0 h-0 overflow-hidden"
              }`}
            >
              <div
                className={`
                relative w-10 h-10 rounded-full transition-all duration-500
                ${
                  isScrolled
                    ? "bg-white/20 dark:bg-gray-800/20 backdrop-blur-md ring-1 ring-white/30 dark:ring-gray-700/30 shadow-lg shadow-black/10"
                    : ""
                }
                before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-60
              `}
              >
                <img
                  src="https://avatars.githubusercontent.com/hucki"
                  alt="Stefan Huckschlag"
                  className="w-full h-full rounded-full object-cover relative z-10"
                />
              </div>
            </div>

            <Link
              to="/"
              className="text-2xl font-bold tracking-tight hover:text-lime-500 transition-colors"
            >
              huckschlag.dev
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-8 text-gray-500 dark:text-gray-400">
              <li>
                <a
                  href="#work"
                  className="hover:text-lime-500 transition-colors"
                >
                  {t("nav.work")}
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="hover:text-lime-500 transition-colors"
                >
                  {t("nav.skills")}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-lime-500 transition-colors"
                >
                  {t("nav.about")}
                </a>
              </li>
              {isFeatureEnabled("SHOW_CV_NAV_LINK") && (
                <li>
                  <a
                    href="#cv"
                    className="hover:text-lime-500 transition-colors"
                  >
                    {t("nav.cv")}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Mobile Burger Menu Button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 text-gray-500 dark:text-gray-400 hover:text-lime-500 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current mt-1.5 transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current mt-1.5 transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-6 pb-2 space-y-4">
            <ul className="space-y-4 text-gray-500 dark:text-gray-400">
              <li>
                <a
                  href="#work"
                  className="block py-2 hover:text-lime-500 transition-colors"
                  onClick={closeMobileMenu}
                >
                  {t("nav.work")}
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="block py-2 hover:text-lime-500 transition-colors"
                  onClick={closeMobileMenu}
                >
                  {t("nav.skills")}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="block py-2 hover:text-lime-500 transition-colors"
                  onClick={closeMobileMenu}
                >
                  {t("nav.about")}
                </a>
              </li>
              {isFeatureEnabled("SHOW_CV_NAV_LINK") && (
                <li>
                  <a
                    href="#cv"
                    className="block py-2 hover:text-lime-500 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {t("nav.cv")}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* CSS for liquid glass effect */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.02; }
            50% { opacity: 0.06; }
          }

          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }

          .bg-noise {
            background-image:
              radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0);
            background-size: 20px 20px;
          }
        `,
        }}
      />
    </header>
  );
}
