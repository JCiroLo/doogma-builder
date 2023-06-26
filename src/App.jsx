import { DoogmaProvider } from "./store/DoogmaProvider";
import { ThemeProvider } from "./store/ThemeProvider";
import { BuilderProvider } from "./store/BuilderProvider";
import Doogma from "./components/Doogma";

import "./assets/css/_default.scss";

function App() {
  return (
    <DoogmaProvider>
      <ThemeProvider>
        <BuilderProvider>
          <Doogma />
        </BuilderProvider>
      </ThemeProvider>
    </DoogmaProvider>
  );
}

export default App;
