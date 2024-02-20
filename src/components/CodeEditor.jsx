import MonacoEditor from "@monaco-editor/react";
import useBuilder from "../hooks/useBuilder";
import { useTheme } from "@emotion/react";

function CodeEditor() {
  const theme = useTheme();
  const [{ code }, setBuilder] = useBuilder();

  const handleCodeChange = (code) => {
    setBuilder(code);
  };

  return (
    <MonacoEditor
      value={code}
      defaultLanguage="json"
      height={`calc(100vh - ${theme.sizes.header}px)`}
      width="100%"
      onChange={handleCodeChange}
    />
  );
}

export default CodeEditor;
