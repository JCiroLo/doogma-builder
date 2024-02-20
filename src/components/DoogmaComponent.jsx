import { useState } from "react";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import { DraggableTypes } from "../types";
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, TextField, Typography } from "@mui/material";
import { ExpandMore as ExpandIcon } from "@mui/icons-material";

function DoogmaComponent({ data, onChange }) {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: DraggableTypes.SIDEBAR_COMPONENT,
    item: { draggableType: DraggableTypes.SIDEBAR_COMPONENT, ...data },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [active, setActive] = useState(false);

  const formatTagName = (tagName) => tagName.replaceAll("-", " ");

  return (
    <Box sx={{ opacity: isDragging ? 0.5 : 1 }}>
      <Accordion
        ref={preview}
        expanded={active}
        elevation={0}
        disableGutters
        TransitionProps={{ unmountOnExit: true }}
        onChange={() => setActive((prev) => !prev)}
      >
        <AccordionSummary
          ref={drag}
          expandIcon={<ExpandIcon />}
          aria-controls="component-content"
          sx={{ backgroundColor: "white", borderRadius: 2 }}
          style={{ cursor: "grab" }}
        >
          <Typography>{formatTagName(data.tag)}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "white", marginTop: 1, borderRadius: 2 }}>
          <Grid display="flex" flexDirection="column" gap={1}>
            {data.props.map((prop, index) => (
              <Grid key={index} display="flex" alignItems="center">
                <Box flexGrow={1}>
                  <Typography>{prop.key}</Typography>
                  <Typography variant="caption" color="text.disabled">
                    {prop.type}
                  </Typography>
                </Box>
                <TextField
                  type="text"
                  size="small"
                  defaultValue={prop.default || ""}
                  onChange={({ target }) => {
                    prop.value = target.value;
                    onChange(data);
                  }}
                  sx={{ width: "50%" }}
                />
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

DoogmaComponent.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DoogmaComponent;
