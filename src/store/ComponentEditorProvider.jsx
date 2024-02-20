import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ComponentEditorContext = createContext();

export const ComponentEditorProvider = ({ children }) => {
  const [component, setComponent] = useState(null);

  return (
    <ComponentEditorContext.Provider value={[component, setComponent]}>{children}</ComponentEditorContext.Provider>
  );
};

ComponentEditorProvider.propTypes = {
  children: PropTypes.node,
};
