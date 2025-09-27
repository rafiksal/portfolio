import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the theme context
const ThemeContext = createContext({
  darkMode: true,
  setDarkMode: () => {}
});

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // Effect to apply theme to document
  useEffect(() => {
    // Add no-transition class on initial load
    if (isInitialLoad) {
      document.documentElement.classList.add('no-transition');
      document.documentElement.classList.toggle('light-mode', !darkMode);
      document.documentElement.classList.toggle('dark-mode', darkMode);
      
      // Remove no-transition class after a short delay
      setTimeout(() => {
        document.documentElement.classList.remove('no-transition');
        setIsInitialLoad(false);
      }, 100);
    } else {
      document.documentElement.classList.toggle('light-mode', !darkMode);
      document.documentElement.classList.toggle('dark-mode', darkMode);
    }
  }, [darkMode, isInitialLoad]);
  
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext; 