import { createContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { getParsedComponents } from "../lib/Doogma";

export const BuilderContext = createContext();

export const BuilderProvider = ({ children }) => {
  const [code, setCode] = useState("");
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
  }, []);

  useEffect(() => {
    localStorage.setItem("doogma_code", code);
  }, [code]);

  return <BuilderContext.Provider value={[{ code, parsed, json }, setCode]}>{children}</BuilderContext.Provider>;
};

BuilderProvider.propTypes = {
  children: PropTypes.node,
};
