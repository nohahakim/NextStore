"use client";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";
import { useState, useEffect } from "react";

const ModeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = resolvedTheme === "dark"; // Use `resolvedTheme` for SSR compatibility

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      type="button"
      aria-label="Toggle Theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center justify-center rounded-md p-2 transition 
                 hover:bg-brand-dark/50 focus-visible:ring-2 focus-visible:ring-accent 
                 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      id="theme-toggle"
    >
      {isDark ? (
        <FaMoon className="h-6 w-6 " />
      ) : (
        <FaSun className="h-6 w-6 " />
      )}
    </button>
  );
};

export default ModeToggle;
