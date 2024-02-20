import { useContext } from "react";
import { ConfigContext } from "../store/ConfigProvider";

const useConfig = () => {
  return useContext(ConfigContext);
};

export default useConfig;
