import { createContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { getParsedComponents } from "../lib/Doogma";

export const BuilderContext = createContext();

export const BuilderProvider = ({ children }) => {
  const [code, setCode] = useState("");
  const [css, setCss] = useState("");
  const json = useMemo(() => {
    try {
      return JSON.parse(code);
    } catch (error) {
      return null;
    }
  }, [code]);
  const parsed = useMemo(
    () => (json?.navigation?.components ? getParsedComponents(json.navigation.components) : []),
    [json]
  );

  useEffect(() => {
    if (localStorage.getItem("doogma_code")) {
      setCode(localStorage.getItem("doogma_code"));
    }

    if (localStorage.getItem("doogma_styles")) {
      setCss(localStorage.getItem("doogma_styles"));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("doogma_code", code);
  }, [code]);

  useEffect(() => {
    localStorage.setItem("doogma_styles", css);

    const head = document.head;
    const link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = css;

    head.prepend(link);

    return () => {
      head.removeChild(link);
    };
  }, [css]);

  return (
    <BuilderContext.Provider value={[{ code, parsed, json }, setCode, setCss]}>{children}</BuilderContext.Provider>
  );
};

BuilderProvider.propTypes = {
  children: PropTypes.node,
};
