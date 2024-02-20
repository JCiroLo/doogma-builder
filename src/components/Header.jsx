import React, { useState } from "react";
import { AppBar, Box, Container, IconButton, Menu, Tab, Tabs, Toolbar, Tooltip, Typography } from "@mui/material";
import {
  Add as AddIcon,
  Source as SourceIcon,
  DataObject as JSONIcon,
  QuestionMark as QuestionMarkIcon,
  Save as SaveIcon,
  Preview as PreviewIcon,
} from "@mui/icons-material";
import useConfig from "../hooks/useConfig";

function Header() {
  const [config, setConfig] = useConfig();

  const handleSwitchView = (view) => {
    setConfig((prev) => ({ ...prev, view }));
  };

  return (
    <AppBar position="relative" color="transparent" elevation={0}>
      <Toolbar style={{ minHeight: "max-content" }} disableGutters>
        <Tabs value={config.view} onChange={(event, newValue) => handleSwitchView(newValue)}>
          <Tooltip title="Add">
            <Tab id="simple-tab-components" value={0} aria-controls="simple-tabpanel-components" icon={<AddIcon />} />
          </Tooltip>
          <Tooltip title="Templates">
            <Tab id="simple-tab-templates" value={1} aria-controls="simple-tabpanel-templates" icon={<SourceIcon />} />
          </Tooltip>
          <Tooltip title="Code">
            <Tab id="simple-tab-code" value={2} aria-controls="simple-tabpanel-code" icon={<JSONIcon />} />
          </Tooltip>
        </Tabs>
        <Tooltip title="Documentation">
          <Tab icon={<QuestionMarkIcon />} value="docs" />
        </Tooltip>
        <Box flexGrow={1}></Box>
        {/* <Tooltip title="Update">
          <Tab icon={<SaveIcon />} />
        </Tooltip> */}
        <Tooltip title="Preview">
          <Tab icon={<PreviewIcon />} onClick={() => setConfig((prev) => ({ ...prev, preview: true }))} />
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
