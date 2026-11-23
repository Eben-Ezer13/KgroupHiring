"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";
  return <button className="theme-toggle" type="button" onClick={toggleTheme} aria-pressed={dark} aria-label={dark ? "Activer le thème clair" : "Activer le thème sombre"} title={dark ? "Thème clair" : "Thème sombre"}>
    {dark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    <span className="sr-only">{dark ? "Activer le thème clair" : "Activer le thème sombre"}</span>
  </button>;
}
