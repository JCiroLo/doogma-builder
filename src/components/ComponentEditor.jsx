import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import useEditor from "../hooks/useEditor";
import useBuilder from "../hooks/useBuilder";
import { useState } from "react";
import Item from "../lib/Item";
import { Add as AddIcon, FileCopy as CopyIcon, Close as DeleteIcon, Close as CloseIcon } from "@mui/icons-material";

function ComponentEditor() {
  const [isEditing, setEditor] = useEditor();
  const [{ json }, setCode] = useBuilder();
  const [addItem, setAddItem] = useState(false);
  const [itemAttributes, setItemAttributes] = useState({});
  const [attributeToAdd, setAttributeToAdd] = useState({ key: "", value: "" });

  const handleChangeAttribute = (value, attribute) => {
    const newJson = { ...json };
    const components = isEditing.path.split(":").reduce((a, c) => a[c], newJson.navigation);
    components.attributes[attribute] = value;
    setCode(JSON.stringify(newJson));
  };

  const handleChangeItem = (value, itemIndex, attribute) => {
    const newJson = { ...json };
    const components = isEditing.path.split(":").reduce((a, c) => a[c], newJson.navigation);
    components.attributes.items[itemIndex][attribute] = value;
    setCode(JSON.stringify(newJson));
  };

  const handleAddItem = () => {
    const newJson = { ...json };
    const components = isEditing.path.split(":").reduce((a, c) => a[c], newJson.navigation);
    components.attributes.items.push(itemAttributes);

    const newIsEditing = { ...isEditing };
    newIsEditing.component.items.push(new Item(null, itemAttributes));

    setEditor(newIsEditing);

    setCode(JSON.stringify(newJson));
    setItemAttributes({});
    setAddItem(false);
  };

  const handleCloneItem = (itemIndex) => {
    const newJson = { ...json };
    const components = isEditing.path.split(":").reduce((a, c) => a[c], newJson.navigation);

    const clone = structuredClone(components.attributes.items[itemIndex]);
    components.attributes.items.splice(itemIndex, 0, clone);

    const newIsEditing = { ...isEditing };
    newIsEditing.component.items.splice(itemIndex, 0, new Item(null, clone));

    setEditor(newIsEditing);

    setCode(JSON.stringify(newJson));
  };

  const handleRemoveItem = (itemIndex) => {
    const newJson = { ...json };
    const components = isEditing.path.split(":").reduce((a, c) => a[c], newJson.navigation);
    delete components.attributes.items[itemIndex];
    components.attributes.items = components.attributes.items.filter((e) => !!e);

    const newIsEditing = { ...isEditing };

    delete newIsEditing.component.items[itemIndex];
    newIsEditing.component.items = newIsEditing.component.items.filter((e) => !!e);

    setEditor(newIsEditing);

    setCode(JSON.stringify(newJson));
  };

  const handleChangeComponentsAttribute = ({ target }) => {
    if (target.checked) {
      const newJson = { ...json };
      const components = isEditing.path.split(":").reduce((a, c) => a[c], newJson.navigation);
      components.attributes.items = components.attributes.items.map((item) => ({ ...item, components: [] }));

      const newIsEditing = { ...isEditing };
      newIsEditing.component.items.forEach((item) => (item.components = []));

      setEditor(newIsEditing);

      setCode(JSON.stringify(newJson));
    } else {
      const newJson = { ...json };
      const components = isEditing.path.split(":").reduce((a, c) => a[c], newJson.navigation);
      components.attributes.items = components.attributes.items.map((item) => {
        item.components = null;
        delete item.components;
        return item;
      });

      const newIsEditing = { ...isEditing };
      newIsEditing.component.items.forEach((item) => (item.components = null));

      setEditor(newIsEditing);

      setCode(JSON.stringify(newJson));
    }
  };

  if (!isEditing) {
    return <></>;
  }

  return (
    <>
      <Box
        position="fixed"
        left={8}
        top={8}
        height="calc(100vh - 16px)"
        width="33vw"
        overflow="auto"
        padding={0}
        borderRadius={2}
        sx={{ backgroundColor: "white" }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          paddingX={2}
          paddingY={0.5}
          borderRadius={2}
          sx={{ backgroundColor: "primary.main", borderRadius: '0 0' }}
        >
          <Typography  color="white">{isEditing.component.type}</Typography>
          <IconButton onClick={() => setEditor(null)}>
            <CloseIcon color="info" />
          </IconButton>
        </Box>
        <Grid display="flex" flexDirection="column" gap={2} padding={2}>
          <Typography variant="h3">Attributes</Typography>

          <Grid display="flex" flexDirection="column" gap={1}>
            {Object.keys(isEditing.component.attributes).map((attribute) => (
              <Grid key={attribute} display="flex" alignItems="center">
                <Grid flexGrow={1}>
                  <Typography fontSize={14}>{attribute}</Typography>
                </Grid>
                <Grid width="50%">
                  <TextField
                    type="text"
                    size="small"
                    defaultValue={isEditing.component.attributes[attribute]}
                    fullWidth
                    onChange={({ target }) => handleChangeAttribute(target.value, attribute)}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>

          <Grid display="flex" justifyContent="space-between" width="100%">
            <Typography variant="h3">Items</Typography>
            <IconButton onClick={() => setAddItem(true)}>
              <AddIcon />
            </IconButton>
          </Grid>

          <Grid display="flex" justifyContent="space-between" width="100%">
            <Typography>Has components attribute</Typography>
            <Checkbox value={!!isEditing.component.items[0]?.components} onChange={handleChangeComponentsAttribute} />
          </Grid>

          {isEditing.component.items.map((item, index) => (
            <Grid key={index} display="flex" flexDirection="column" gap={1}>
              <Grid display="flex" justifyContent="space-between">
                <Typography fontWeight={500}>Item {index}</Typography>
                <Grid display="flex" gap={1}>
                  <IconButton size="small" onClick={() => handleCloneItem(index)}>
                    <CopyIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleRemoveItem(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
              {Object.keys(item.attributes).map((attribute) => (
                <Grid key={attribute} display="flex" alignItems="center">
                  <Grid flexGrow={1}>
                    <Typography fontSize={14}>{attribute}</Typography>
                  </Grid>
                  <Grid width="50%">
                    <TextField
                      type="text"
                      size="small"
                      defaultValue={item.attributes[attribute]}
                      fullWidth
                      onChange={({ target }) => handleChangeItem(target.value, index, attribute)}
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={addItem} maxWidth="sm" fullWidth onClose={() => setAddItem(false)}>
        <DialogTitle>Add item</DialogTitle>
        <DialogContent>
          <Box component="form" display="flex" flexDirection="column" gap={2} onSubmit={handleAddItem} noValidate>
            <Typography variant="h3">Attributes</Typography>
            {Object.keys(itemAttributes).map((attribute, index) => (
              <Grid key={index} display="flex" alignItems="center" gap={2}>
                <TextField key={index} type="text" value={attribute} fullWidth disabled />
                <IconButton
                  onClick={() => {
                    setItemAttributes((prev) => {
                      const newItemAttributes = { ...prev };
                      delete newItemAttributes[attribute];
                      return newItemAttributes;
                    });
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            ))}
            <Grid>
              <TextField
                type="text"
                label="New attribute. E.g. name, value, label..."
                value={attributeToAdd.key}
                fullWidth
                onInput={({ target }) => setAttributeToAdd((prev) => ({ ...prev, key: target.value }))}
              />
            </Grid>
            <Button
              variant="contained"
              onClick={() => {
                setItemAttributes((prev) => ({ ...prev, [attributeToAdd.key]: attributeToAdd.value }));
                setAttributeToAdd({ key: "", value: "" });
              }}
            >
              Add attribute
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "text.primary" }}
            onClick={() => {
              setAddItem(false);
              setItemAttributes({});
            }}
          >
            Close
          </Button>
          <Button onClick={handleAddItem}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ComponentEditor;
