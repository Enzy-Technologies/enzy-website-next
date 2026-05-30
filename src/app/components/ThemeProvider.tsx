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

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Default to light so first-time visitors (and SSR) render light mode with
  // no dark flash. Only an explicit stored "dark" preference switches it.
  const [isLightMode, setIsLightMode] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('enzy-theme');
      setIsLightMode(stored !== 'dark');
    }
  }, []);

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
      localStorage.setItem('enzy-theme', newValue ? 'light' : 'dark');
      return newValue;
    });
  };

  // Also wrap setIsLightMode so direct calls persist too
  const setPersistedTheme = (value: boolean) => {
    localStorage.setItem('enzy-theme', value ? 'light' : 'dark');
    setIsLightMode(value);
  };

  return (
    <ThemeContext.Provider value={{ isLightMode, toggleTheme, setIsLightMode: setPersistedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);