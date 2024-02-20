import { useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { compare } from "../lib/DraggableUtils";

const DropZone = ({ path, onDrop, accept, className }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: (item) => {
      onDrop(path, item);
    },
    canDrop: (item) => {
      if (!item.path) {
        return true;
      }

      const currentPath = path.split(":");
      const itemPath = item.path.split(":");

      const currentIndex = parseInt(currentPath.pop());
      const itemIndex = parseInt(itemPath.pop());

      if (
        compare(currentPath, itemPath) &&
        Math.abs(currentIndex - (itemIndex >= currentIndex ? itemIndex : itemIndex + 1)) <= 0
      ) {
        return false;
      }

      if (accept.includes(item.draggableType)) {
        return true;
      }

      return false;
    },
    collect: (monitor) => ({ isOver: monitor.isOver(), canDrop: monitor.canDrop() }),
  });

  return (
    <Box
      ref={drop}
      minHeight={isOver && canDrop ? 24 : 8}
      width="calc(100% - 16px)"
      marginX="auto"
      data-path={path}
      sx={{
        backgroundColor: isOver && canDrop ? "secondary.main" : "transparent",
        transition: "min-height 0.2s ease-out",
      }}
    />
  );
};

DropZone.propTypes = {
  path: PropTypes.string.isRequired,
  onDrop: PropTypes.func.isRequired,
  accept: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default DropZone;
