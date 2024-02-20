import { useContext } from "react";
import { BuilderContext } from "../store/BuilderProvider";

const useBuilder = () => {
  return useContext(BuilderContext);
};

export default useBuilder;
