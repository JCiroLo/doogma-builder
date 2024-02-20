import { useContext } from "react";
import { ComponentsContext } from "../store/ComponentsProvider";

const useComponents = () => {
  return useContext(ComponentsContext);
};

export default useComponents;
