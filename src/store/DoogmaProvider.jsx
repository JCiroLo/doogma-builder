import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import { components as COMPONENTS } from "../nav-components/docs.json";

export const DoogmaContext = createContext();

export const DoogmaProvider = ({ children }) => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    setComponents(
      COMPONENTS.map((component) => ({
        id: uuid(),
        tag: component.tag,
        props: component.props.map((prop) => ({
          key: prop.attr,
          type: prop.values.map((value) => value.type).join(" | "),
          default: prop.default,
          required: prop.required,
          value: "",
        })),
      }))
    );
  }, []);

  const updateComponent = (component) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === component.id ? component : c))
    );
  };

  return (
    <DoogmaContext.Provider value={[components, updateComponent]}>
      {children}
    </DoogmaContext.Provider>
  );
};

DoogmaProvider.propTypes = {
  children: PropTypes.node,
};
