import { createContext, useContext, useEffect, useState } from "react";

type ColorMode = "light" | "dark" | "system";

interface ThemeContextType {
  colorMode: ColorMode;
  actualMode: "light" | "dark";
  setColorMode: (mode: ColorMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorMode, setColorMode] = useState<ColorMode>("system");
  const [actualMode, setActualMode] = useState<"light" | "dark">("light");

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem("colorMode") as ColorMode;
    if (savedMode) setColorMode(savedMode);
  }, []);

  // Determine actual mode based on system preference
  useEffect(() => {
    const updateActualMode = () => {
      if (colorMode === "system") {
        const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setActualMode(systemPrefersDark ? "dark" : "light");
      } else {
        setActualMode(colorMode);
      }
    };

    updateActualMode();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateActualMode);

    return () => mediaQuery.removeEventListener("change", updateActualMode);
  }, [colorMode]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(actualMode);
  }, [actualMode]);

  // Persist theme changes
  const handleSetColorMode = (mode: ColorMode) => {
    setColorMode(mode);
    localStorage.setItem("colorMode", mode);
  };

  return (
    <ThemeContext.Provider
      value={{
        colorMode,
        actualMode,
        setColorMode: handleSetColorMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
