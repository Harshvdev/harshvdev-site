"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "theme";

type Theme = "light" | "dark";

/**
 * Theme lives outside React (localStorage + the `.dark` class on <html>), so
 * `useSyncExternalStore` is the right primitive: it reads the current value,
 * re-renders on change, and stays consistent between server and client.
 */
const listeners = new Set<() => void>();

function readTheme(): Theme {
  // Light is the default; dark only once explicitly chosen and saved.
  return window.localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  // Keep multiple tabs in sync.
  const onStorage = () => listener();
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Server has no window — assume light, matching the inline pre-paint script. */
function getServerSnapshot(): Theme {
  return "light";
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme = theme === "light" ? "dark" : "light";
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.classList.toggle("dark", next === "dark");
    listeners.forEach((l) => l());
  }, [theme]);

  return { theme, toggle };
}
