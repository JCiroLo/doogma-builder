import BuilderComponent from "./BuilderComponent";
import { useCallback, useState } from "react";
import useBuilder from "../hooks/useBuilder";
import useEditor from "../hooks/useEditor";
import DropZone from "./DropZone";
import { DraggableTypes } from "../types";
import { Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
import { compare, move } from "../lib/DraggableUtils";

function Builder() {
  const theme = useTheme();
  const [{ parsed, json }, setCode] = useBuilder();
  const [, setEditor] = useEditor();
  const [path] = useState("components");

  const handleEditComponent = (component) => {
    setEditor(component);
  };

  const handleReorderComponent = (path, direction) => {
    const newJson = { ...json };
    const paths = path.split(":");
    const index = parseInt(paths.pop());
    const nextIndex = (direction === "up" ? -1 : 1) + index;
    const components = paths.reduce((a, c) => a[c], newJson.navigation);

    const [removed] = components.splice(index, 1);
    components.splice(nextIndex < 0 ? 0 : nextIndex, 0, removed);

    setCode(JSON.stringify(newJson));
  };

  const handleDeleteComponent = (path) => {
    const newJson = { ...json };
    const paths = path.split(":");
    const index = paths.pop();

    paths.reduce((a, c) => a[c], newJson.navigation).splice(parseInt(index), 1);

    setCode(JSON.stringify(newJson));
  };

  const handleDrop = useCallback(
    (dest, item) => {
      switch (item.draggableType) {
        case DraggableTypes.BUILDER_COMPONENT: {
          const newJson = { ...json };

          const sourcePath = item.path.split(":");
          const destPath = dest.split(":");

          const sourceIndex = parseInt(sourcePath.pop());
          const destIndex = parseInt(destPath.pop());

          const sourceComponents = sourcePath.reduce((a, c) => a[c], newJson.navigation);
          const destComponents = destPath.reduce((a, c) => a[c], newJson.navigation);

          if (compare(sourcePath, destPath)) {
            move(destComponents, sourceIndex, sourceIndex > destIndex ? destIndex : destIndex - 1);
          } else {
            const [removed] = sourceComponents.splice(sourceIndex, 1);

            destComponents.splice(destIndex, 0, { ...removed });
          }

          setCode(JSON.stringify(newJson));
          break;
        }
        case DraggableTypes.SIDEBAR_COMPONENT: {
          const component = {
            type: item.tag,
            attributes: item.props.reduce((a, c) => ({ ...a, [c.key]: c.value || c.default }), {}),
          };

          const newJson = { ...json };

          const path = dest.split(":");
          const index = parseInt(path.pop());

          const components = path.reduce((a, c) => a[c], newJson.navigation);

          components.splice(index, 0, component);

          setCode(JSON.stringify(newJson));
          break;
        }
        default:
          break;
      }

      return;
    },
    [json, setCode]
  );

  if (!parsed) {
    return <h1>Loading</h1>;
  }

  return (
    <Grid
      display="flex"
      flexDirection="column"
      padding={1}
      height={`calc(100vh - ${theme.sizes.header}px)`}
      overflow="auto"
    >
      {parsed.map((item, index) => (
        <BuilderComponent
          key={item.id}
          component={item}
          path={`${path}:${index}`}
          level={0}
          isFirst={index === 0}
          isLast={index === parsed.length - 1}
          onEdit={handleEditComponent}
          onReorder={handleReorderComponent}
          onDelete={handleDeleteComponent}
          onDrop={handleDrop}
        />
      ))}
      <DropZone
        path={`${path}:${parsed.length}`}
        accept={[DraggableTypes.BUILDER_COMPONENT, DraggableTypes.SIDEBAR_COMPONENT]}
        onDrop={handleDrop}
      />
    </Grid>
  );
}

export default Builder;
