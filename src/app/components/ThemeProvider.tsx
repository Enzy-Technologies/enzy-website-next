"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeContextType = {
  isLightMode: boolean;
  toggleTheme: () => void;
  setIsLightMode: (value: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isLightMode: true,
  toggleTheme: () => {},
  setIsLightMode: () => {},
});

// Persist the theme to both a cookie (so the server can render the correct mode
// on the next request — no flash) and localStorage (back-compat).
const persistTheme = (isLight: boolean) => {
  const value = isLight ? 'light' : 'dark';
  try {
    document.cookie = `enzy-theme=${value};path=/;max-age=31536000;samesite=lax`;
    localStorage.setItem('enzy-theme', value);
  } catch (e) {}
};

export const ThemeProvider = ({
  children,
  initialIsLightMode = true,
}: {
  children: React.ReactNode;
  // Resolved server-side from the cookie so the first render matches the server.
  initialIsLightMode?: boolean;
}) => {
  const [isLightMode, setIsLightMode] = useState(initialIsLightMode);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isLightMode) {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }

      // Drive the iOS Safari status-bar / toolbar tint from the *site* theme
      // (a manual toggle), not the OS color scheme. Remove any media-scoped
      // theme-color tags so they can't override, then set a single one.
      document
        .querySelectorAll('meta[name="theme-color"]')
        .forEach((el) => el.remove());
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = isLightMode ? '#faf9f6' : '#0b0f14';
      document.head.appendChild(meta);
    }
  }, [isLightMode]);

  const toggleTheme = () => {
    setIsLightMode(prev => {
      const newValue = !prev;
      persistTheme(newValue);
      return newValue;
    });
  };

  // Also wrap setIsLightMode so direct calls persist too
  const setPersistedTheme = (value: boolean) => {
    persistTheme(value);
    setIsLightMode(value);
  };

  return (
    <ThemeContext.Provider value={{ isLightMode, toggleTheme, setIsLightMode: setPersistedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);