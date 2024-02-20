import { useContext } from "react";
import { ComponentEditorContext } from "../store/ComponentEditorProvider";

const useEditor = () => {
  return useContext(ComponentEditorContext);
};

export default useEditor;
