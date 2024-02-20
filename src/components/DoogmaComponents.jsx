import { useTheme } from "@emotion/react";
import useComponents from "../hooks/useComponents";
import DoogmaComponent from "./DoogmaComponent";
import { Box, Grid, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";

function DoogmaComponents() {
  const theme = useTheme();
  const [components, setComponent] = useComponents();
  const [search, setSearch] = useState("");

  const handleItemUpdate = (item) => {
    setComponent(item);
  };

  return (
    <Grid
      display="flex"
      flexDirection="column"
      gap={1}
      borderRadius={2}
      padding={1}
      height={`calc(100vh - ${theme.sizes.header}px)`}
      overflow="auto"
    >
      <TextField
        value={search}
        placeholder="Search component"
        onInput={(e) => setSearch(e.target.value)}
        sx={{
          backgroundColor: "white",
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {components.map((component) =>
        component.tag.includes(search) ? (
          <Box key={component.id}>
            <DoogmaComponent data={component} onChange={handleItemUpdate} />
          </Box>
        ) : null
      )}
    </Grid>
  );
}

DoogmaComponents.propTypes = {};

export default DoogmaComponents;
