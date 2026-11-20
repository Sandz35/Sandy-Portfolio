import { useCallback, useState } from "react";

// Reads the theme that index.html already applied, and toggles it.
export default function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  const toggle = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {
        // Storage can be blocked (private mode); the toggle still works for this visit.
      }
      return next;
    });
  }, []);

  return { dark, toggle };
}
