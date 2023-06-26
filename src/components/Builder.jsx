import classnames from "classnames";
import useDoogma from "../hooks/useDoogma";
import DoogmaComponent from "./DoogmaComponent";
import Icon from "./Icon";
import Modal from "./Modal";
import DoogmaItem from "./DoogmaItem";
import { useState } from "react";
import Button from "./Button";
import useBuilder from "../hooks/useBuilder";

function Builder() {
  const [components, setComponent] = useDoogma();
  const [{ parsed, json }, setCode] = useBuilder();
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

  if (!parsed) {
    return <h1>Loading</h1>;
  }

  console.log(parsed);

  return (
    <>
      <div className="builder-component">
        <div className={classnames("drop-zone")}>
          {parsed.map((item, index) => (
            <DoogmaComponent
              key={item.id}
              component={item}
              path={`components:${index}`}
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
                <DoogmaItem data={item} onChange={handleItemUpdate} onAdd={handleAddItem} />
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Builder;
