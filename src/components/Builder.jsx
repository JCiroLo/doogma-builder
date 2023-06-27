import classnames from "classnames";
import useDoogma from "../hooks/useDoogma";
import DoogmaComponent from "./DoogmaComponent";
import Icon from "./Icon";
import Modal from "./Modal";
import DoogmaItem from "./DoogmaItem";
import { useState } from "react";
import Button from "./Button";
import useBuilder from "../hooks/useBuilder";
import useEditor from "../hooks/useEditor";

function Builder() {
  const [components, setComponent] = useDoogma();
  const [{ parsed, json }, setCode] = useBuilder();
  const [, setEditor] = useEditor();
  const [showModal, setShowModal] = useState(false);
  const [path, setPath] = useState("");

  const handleOpenModal = (path) => {
    setPath(path);
    setShowModal(true);
  };

  const handleItemUpdate = (item) => {
    setComponent(item);
  };

  const handleAddItem = (item) => {
    const component = {
      type: item.tag,
      attributes: item.props.reduce((a, c) => ({ ...a, [c.key]: c.value || c.default }), {}),
    };

    const newJson = { ...json };

    try {
      const components = path.split(":").reduce((a, c) => a[c], newJson.navigation);
      components.push(component);

      setCode(JSON.stringify(newJson));
    } catch (e) {
      console.log(e);
    }

    setShowModal(false);
  };

  const handleEditComponent = (component) => {
    setEditor(null);
    setTimeout(() => {
      setEditor(component);
    }, 10);
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

  if (!parsed) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <div className="builder-component">
        <div className={classnames("drop-zone")}>
          {parsed.map((item, index) => (
            <DoogmaComponent
              key={item.id}
              component={item}
              path={`components:${index}`}
              onEdit={handleEditComponent}
              onReorder={handleReorderComponent}
              onDelete={handleDeleteComponent}
              onAddComponent={handleOpenModal}
            />
          ))}
          <Button icon={<Icon name="plus" />} onClick={() => handleOpenModal("components")} />
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header title="Select component" />
        <Modal.Body>
          <div
            className={classnames("sidebar-components-wrapper")}
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          >
            {components.map((item) => (
              <div key={item.id} className={classnames("doogma-item-wrapper")}>
                <DoogmaItem data={item} onChange={handleItemUpdate} onAddComponent={handleAddItem} />
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Builder;
