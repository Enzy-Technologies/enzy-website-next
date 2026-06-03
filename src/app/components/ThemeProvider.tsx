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
}: {
  children: React.ReactNode;
}) => {
  // Initialize from the `.dark` class that the inline pre-paint script in the
  // root layout sets synchronously before first paint (from the enzy-theme
  // cookie / localStorage). This makes the client state match the already-
  // rendered theme with zero flash, and removes the need for the server to read
  // the cookie — so every route can be statically rendered + prefetched.
  // Theme appearance itself is driven by CSS `dark:` variants keyed off this
  // class; this state only drives JS consumers (canvas/3D globe colors) and the
  // toggle button's icon.
  const [isLightMode, setIsLightMode] = useState(() => {
    if (typeof document !== 'undefined') {
      return !document.documentElement.classList.contains('dark');
    }
    return true;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isLightMode) {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
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