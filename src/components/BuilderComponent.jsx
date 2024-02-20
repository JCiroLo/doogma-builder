import { memo, useState } from "react";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import { DraggableTypes } from "../types";
import DropZone from "./DropZone";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import {
  KeyboardArrowUp as UpIcon,
  KeyboardArrowDown as DownIcon,
  Close as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useTheme } from "@emotion/react";

const BuilderComponent = memo(({ component, path, level, isFirst, isLast, onReorder, onDelete, onEdit, onDrop }) => {
  const theme = useTheme();
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: DraggableTypes.BUILDER_COMPONENT,
    item: { draggableType: DraggableTypes.BUILDER_COMPONENT, path, ...component },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [active, setActive] = useState(true);

  const color =
    level === 0
      ? theme.palette.components.main
      : level > 3
      ? theme.palette.components.secondary[2]
      : theme.palette.components.secondary[level - 1];

  const handleEditComponent = (event) => {
    event.stopPropagation();
    onEdit({ component, path });
  };

  const handleReorder = (event, direction) => {
    event.stopPropagation();
    onReorder(path, direction);
  };

  const handleDeleteComponent = (event) => {
    event.stopPropagation();
    onDelete(path);
  };

  return (
    <>
      <DropZone
        path={path}
        accept={[DraggableTypes.BUILDER_COMPONENT, DraggableTypes.SIDEBAR_COMPONENT]}
        onDrop={onDrop}
      />
      <Box
        ref={preview}
        border={2}
        borderRadius={2}
        borderColor={color}
        sx={{ opacity: isDragging ? 0.5 : 1, backgroundColor: "white" }}
      >
        <Box
          ref={drag}
          width="100%"
          padding={1}
          borderRadius={1}
          sx={{
            cursor: "pointer",
            backgroundColor: color,
          }}
          onClick={() => setActive((prev) => !prev)}
        >
          <Grid display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <Grid>
              <Typography fontSize={14} color="white">
                Component: {component.type}
              </Typography>
              <Typography fontSize={10} fontWeight={100} color="white" sx={{ opacity: 0.75 }}>
                {component.attributes.label}
              </Typography>
            </Grid>

            <Grid display="flex" gap={1}>
              <Grid display="flex" alignItems="center">
                <IconButton
                  size="small"
                  color="info"
                  disabled={isFirst}
                  onClick={(event) => handleReorder(event, "up")}
                >
                  <UpIcon fontSize="8" />
                </IconButton>
                <IconButton
                  size="small"
                  color="info"
                  disabled={isLast}
                  onClick={(event) => handleReorder(event, "down")}
                >
                  <DownIcon fontSize="8" />
                </IconButton>
              </Grid>
              <Box>
                <IconButton size="small" color="info" onClick={handleEditComponent}>
                  <EditIcon fontSize="8" />
                </IconButton>
                <IconButton size="small" color="info" onClick={handleDeleteComponent}>
                  <DeleteIcon fontSize="8" />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {active && (
          <Box
            display="flex"
            flexDirection="column"
            padding={2}
            sx={{
              "&:empty": {
                display: "none",
              },
            }}
          >
            {component.items.map((item, itemIntex) => {
              const canSaveComponents = !!item.components;

              return canSaveComponents ? (
                <Box
                  key={item.id}
                  display="flex"
                  flexDirection="column"
                  padding={2}
                  border={1}
                  borderRadius={1}
                  borderColor="text.disabled"
                >
                  <Typography fontSize={12}>Item: {item.attributes.name || `Item ${itemIntex}`}</Typography>
                  <Box display="flex" flexDirection="column">
                    {item.components.map((component, index) => (
                      <BuilderComponent
                        key={component.id}
                        component={component}
                        path={`${path}:attributes:items:${itemIntex}:components:${index}`}
                        level={level + 1}
                        isFirst={index === 0}
                        isLast={index === item.components.length - 1}
                        onEdit={onEdit}
                        onReorder={onReorder}
                        onDelete={onDelete}
                        onDrop={onDrop}
                      />
                    ))}
                    <DropZone
                      path={`${path}:attributes:items:${itemIntex}:components:${item.components.length}`}
                      accept={[DraggableTypes.BUILDER_COMPONENT, DraggableTypes.SIDEBAR_COMPONENT]}
                      onDrop={onDrop}
                    />
                  </Box>
                </Box>
              ) : null;
            })}
          </Box>
        )}
      </Box>
    </>
  );
});

BuilderComponent.displayName = "BuilderComponent";

BuilderComponent.propTypes = {
  component: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  onReorder: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
};

export default BuilderComponent;
