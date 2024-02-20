import React, { useEffect, useRef } from "react";
import { Box, Dialog, DialogContent, DialogTitle, Fade, Grid, IconButton, Typography } from "@mui/material";
import useComponents from "./hooks/useComponents";
import useConfig from "./hooks/useConfig";
import Header from "./components/Header";
import Panel from "./components/Panel";
import DoogmaComponents from "./components/DoogmaComponents";
import Builder from "./components/Builder";
import DoogmaProducts from "./components/DoogmaProducts";
import CodeEditor from "./components/CodeEditor";
import ComponentEditor from "./components/ComponentEditor";
import Preview from "./components/Preview";
import { Close as CloseIcon } from "@mui/icons-material";

import "./assets/css/_default.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

function App() {
  const [config, setConfig] = useConfig();
  const [components] = useComponents();

  const handleClosePreview = () => setConfig((prev) => ({ ...prev, preview: false }));

  if (!components || !config) {
    return <h1>Loading</h1>;
  }

  return (
    <Box height="100vh" overflow="hidden">
      <Grid display="flex" flexDirection="column">
        <Header />
        <Grid display="flex" gap={1}>
          <Box width={config.view === 2 ? "50vw" : "33vw"}>
            <Panel value={config.view} index={0}>
              <DoogmaComponents />
            </Panel>
            <Panel value={config.view} index={1}>
              <DoogmaProducts />
            </Panel>
            <Panel value={config.view} index={2}>
              <CodeEditor />
            </Panel>
          </Box>
          <Box width={config.view === 2 ? "50vw" : "67vw"}>
            <Builder />
          </Box>
        </Grid>
        <ComponentEditor />
      </Grid>
      <Dialog
        open={config.preview}
        onClose={handleClosePreview}
        TransitionComponent={Transition}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "calc(100vw - 64px)",
              height: "100%",
              maxHeight: "calc(100vh - 64px)"
            },
          },
        }}
      >
        <DialogTitle>
          <Grid>
            <Typography>Preview</Typography>
            <IconButton
              onClick={handleClosePreview}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent>{config.preview && <Preview />}</DialogContent>
      </Dialog>
    </Box>
  );
}

export default App;
