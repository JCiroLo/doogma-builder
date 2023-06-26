import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({ view: "json", sidebar: false });

  useEffect(() => {
    if (localStorage.getItem("doogma_theme")) {
      setTheme(JSON.parse(localStorage.getItem("doogma_theme")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("doogma_theme", JSON.stringify(theme));
  }, [theme]);

  return <ThemeContext.Provider value={[theme, setTheme]}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
