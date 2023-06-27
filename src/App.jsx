import { DoogmaProvider } from "./store/DoogmaProvider";
import { ThemeProvider } from "./store/ThemeProvider";
import { BuilderProvider } from "./store/BuilderProvider";
import Doogma from "./components/Doogma";

import "./assets/css/_default.scss";
import { ComponentEditorProvider } from "./store/ComponentEditorProvider";

function App() {
  return (
    <DoogmaProvider>
      <ThemeProvider>
        <BuilderProvider>
          <ComponentEditorProvider>
            <Doogma />
          </ComponentEditorProvider>
        </BuilderProvider>
      </ThemeProvider>
    </DoogmaProvider>
  );
}

export default App;
