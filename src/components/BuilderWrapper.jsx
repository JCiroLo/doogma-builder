import MonacoEditor from "./Editor";
import useTheme from "../hooks/useTheme";
import Builder from "./Builder";
import Preview from "./Preview";

function BuilderWrapper() {
  const [theme] = useTheme();

  if (!theme) {
    return <h1>Loading</h1>;
  }

  return theme.view === "json" ? (
    <MonacoEditor>JSON View</MonacoEditor>
  ) : theme.view === "builder" ? (
    <Builder />
  ) : (
    <Preview />
  );
}

export default BuilderWrapper;
