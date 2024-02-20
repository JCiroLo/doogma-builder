import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [theme, setTheme] = useState({ view: 0, sidebar: false, preview: false, dragging: false });

  useEffect(() => {
    if (localStorage.getItem("doogma_theme")) {
      setTheme(JSON.parse(localStorage.getItem("doogma_theme")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("doogma_theme", JSON.stringify(theme));
  }, [theme]);

  return <ConfigContext.Provider value={[theme, setTheme]}>{children}</ConfigContext.Provider>;
};

ConfigProvider.propTypes = {
  children: PropTypes.node,
};
