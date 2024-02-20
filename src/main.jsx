// import React from "react";
import ReactDOM from "react-dom/client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ThemeProvider } from "@emotion/react";
import { ConfigProvider } from "./store/ConfigProvider";
import { ComponentsProvider } from "./store/ComponentsProvider";
import { BuilderProvider } from "./store/BuilderProvider";
import { ComponentEditorProvider } from "./store/ComponentEditorProvider";
import App from "./App.jsx";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <DndProvider backend={HTML5Backend}>
      <ComponentsProvider>
        <ConfigProvider>
          <BuilderProvider>
            <ComponentEditorProvider>
              <App />
            </ComponentEditorProvider>
          </BuilderProvider>
        </ConfigProvider>
      </ComponentsProvider>
    </DndProvider>
  </ThemeProvider>
);
