import { useContext } from "react";
import { DoogmaContext } from "../store/DoogmaProvider";

const useDoogma = () => {
  return useContext(DoogmaContext);
};

export default useDoogma;
