import MonacoEditor from "@monaco-editor/react";
import useBuilder from "../hooks/useBuilder";

function Editor() {
  const [{ code }, setBuilder] = useBuilder();

  const handleCodeChange = (code) => {
    setBuilder(code);
  };

  return (
    <div style={{ width: "calc(100vw - 320px)" }}>
      <MonacoEditor value={code} defaultLanguage="json" height="100vh" width="100%" onChange={handleCodeChange} />
    </div>
  );
}

export default Editor;
