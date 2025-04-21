import { useEffect, useState } from 'react';

const useDarkMode = (): { darkMode: boolean; toggleDarkMode: () => void } => {
  // Initialize state with a undefined initial value to prevent hydration issues
  const [darkMode, setDarkMode] = useState<boolean | undefined>(undefined);

  // First useEffect runs once on component mount to set the initial state
  useEffect(() => {
    // Check for stored preference first
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setDarkMode(true);
    } else if (storedTheme === 'light') {
      setDarkMode(false);
    } else {
      // Fall back to system preference
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(isDark);
    }
  }, []);

  // Apply theme when darkMode changes
  useEffect(() => {
    // Only run if darkMode has been initialized
    if (darkMode === undefined) return;

    // Apply theme class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Store preference
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent): void => {
      // Only update if no manual preference has been set
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches);
      }
    };

    // Add listener
    mediaQuery.addEventListener('change', handleChange);

    // Clean up
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = (): void => {
    setDarkMode((prev) => !prev);
  };

  // Provide a fallback value if darkMode is undefined
  return {
    darkMode: darkMode ?? false,
    toggleDarkMode,
  };
};

export default useDarkMode;
