import { v4 as uuid } from "uuid";

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const copy = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = structuredClone(sourceClone[droppableSource.index]);

  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destClone;
};

export const move = (array, fromIndex, toIndex) => {
  array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
};

export const compare = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

export const swap = (array, sourceIndex, destIndex) => {
  const temp = array[sourceIndex];
  array[sourceIndex] = array[destIndex];
  array[destIndex] = temp;
};
