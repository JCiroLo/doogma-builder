import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const ComponentEditorContext = createContext();

export const ComponentEditorProvider = ({ children }) => {
  const [component, setComponent] = useState(null);

  useEffect(() => {
    console.log(component);
  }, [component]);

  return (
    <ComponentEditorContext.Provider value={[component, setComponent]}>{children}</ComponentEditorContext.Provider>
  );
};

ComponentEditorProvider.propTypes = {
  children: PropTypes.node,
};
