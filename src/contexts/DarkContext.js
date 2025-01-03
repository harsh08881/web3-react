import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Retrieve the theme from localStorage or default to false (light mode)
  const savedTheme = localStorage.getItem('isDarkMode') === 'true';

  const [isDarkMode, setIsDarkMode] = useState(savedTheme);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      // Save the new theme to localStorage
      localStorage.setItem('isDarkMode', newMode);
      return newMode;
    });
  };

  useEffect(() => {
    // On mount, check the theme from localStorage and update state
    const savedTheme = localStorage.getItem('isDarkMode') === 'true';
    setIsDarkMode(savedTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
