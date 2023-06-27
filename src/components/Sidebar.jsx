import { useMemo, useState } from "react";
import classnames from "classnames";
import useTheme from "../hooks/useTheme";
import useBuilder from "../hooks/useBuilder";
import useEditor from "../hooks/useEditor";
import Button from "./Button";
import Modal from "./Modal";
import Select from "./Select";
import Item from "../lib/Item";

import admin_oreo_weddings_development from "../products/development/admin-oreo-weddings-development.json";
import design_oreo_weddings_development from "../products/development/design-oreo-weddings-development.json";
import dog_tag_development from "../products/development/dog-tag-development.json";
import lagolfcp_development from "../products/development/lagolfcp-development.json";
import mdt_development from "../products/development/mdt-development.json";
import oreo_corp_development from "../products/development/oreo-corp-development.json";
import oreo_weddings_development from "../products/development/oreo-weddings-development.json";
import oreocp3_development from "../products/development/oreocp3-development.json";
import primadonna_lux_development from "../products/development/primadonna-lux-development.json";

import custom_oreo_weddings_live1 from "../products/production/custom-oreo-weddings-live1.json";
import lagolfcp_live1 from "../products/production/lagolfcp-live1.json";
import oreo_corp_live1 from "../products/production/oreo-corp-live1.json";
import pastease_live1 from "../products/production/pastease-live1.json";
import Icon from "./Icon";
import Checkbox from "./Checkbox";

function Sidebar() {
  const [theme, setTheme] = useTheme();
  const [{ json }, setCode, setCss] = useBuilder();
  const [isEditing, setEditor] = useEditor();
  const [enviroment, setEnviroment] = useState(null);
  const [product, setProduct] = useState(null);
  const [changeProduct, setChangeProduct] = useState(false);
  const [addItem, setAddItem] = useState(false);
  const [itemAttributes, setItemAttributes] = useState({});
  const [attributeToAdd, setAttributeToAdd] = useState({ key: "", value: "" });

  const products = useMemo(
    () => ({
      development: {
        admin_oreo_weddings: {
          name: "Admin Oreo Weddings",
          json: admin_oreo_weddings_development,
          css: "src/products/css/development/admin-oreo-weddings-development.css",
        },
        design_oreo_weddings: {
          name: "Design Oreo Weddings",
          json: design_oreo_weddings_development,
          css: "src/products/css/development/design-oreo-weddings-development.css",
        },
        dog_tag: {
          name: "Dog Tag",
          json: dog_tag_development,
          css: "src/products/css/development/dog-tag-development.css",
        },
        lagolfcp: {
          name: "Lagolfpc",
          json: lagolfcp_development,
          css: "src/products/css/development/lagolfcp-development.css",
        },
        mdt: {
          name: "MDT",
          json: mdt_development,
          css: "src/products/css/development/mdt-development.css",
        },
        oreo_corp: {
          name: "Oreo Corp",
          json: oreo_corp_development,
          css: "src/products/css/development/oreo-corp-development.css",
        },
        oreo_weddings: {
          name: "Oreo Weddings",
          json: oreo_weddings_development,
          css: "src/products/css/development/oreo-weddings-development.css",
        },
        oreocp3: {
          name: "Oreo CP3",
          json: oreocp3_development,
          css: "src/products/css/development/oreocp3.css",
        },
        primadonna_lux: {
          name: "Primadonna Lux",
          json: primadonna_lux_development,
          css: "src/products/css/development/primadonna-lux-development.css",
        },
      },
      production: {
        custom_oreo_weddings: {
          name: "Custom Oreo Weddings",
          json: custom_oreo_weddings_live1,
          css: "src/products/css/production/custom-oreo-weddings-live1.css",
        },
        lagolfcp: {
          name: "Lagol FPC",
          json: lagolfcp_live1,
          css: "src/products/css/production/lagolfcp-live1.css",
        },
        oreo_corp: {
          name: "Oreo Corp",
          json: oreo_corp_live1,
          css: "src/products/css/production/oreo-corp-live1.css",
        },
        pastease: {
          name: "Pastease",
          json: pastease_live1,
          css: "src/products/css/production/pastease-live1.css",
        },
      },
    }),
    []
  );

  const handleSwitchView = (view) => {
    setTheme((prev) => ({ ...prev, view }));
  };

  const handleChangeJSON = async (event) => {
    event.preventDefault();

    setCode(JSON.stringify(products[enviroment][product].json));
    setCss(products[enviroment][product].css);

    setChangeProduct(false);
  };

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

    setEditor(null);

    setTimeout(() => {
      setEditor(newIsEditing);
    }, 10);

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

    setEditor(null);

    setTimeout(() => {
      setEditor(newIsEditing);
    }, 10);

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

  return (
    <aside className={classnames("sidebar-component", { active: theme.sidebar })}>
      <div className="sidebar-header">
        <p>{isEditing ? "Component" : theme.view === "json" ? "Doogma configuration" : "Doogma builder"}</p>
        {isEditing && (
          <Button
            className="close-editor"
            variant="filled"
            size="empty"
            icon={<Icon name="times" />}
            onClick={() => setEditor(null)}
          />
        )}
      </div>

      {isEditing ? (
        <div className="sidebar-editor">
          <div className="sidebar-editor-label">
            <h3>Attributes</h3>
          </div>
          {Object.keys(isEditing.component.attributes).map((attribute) => (
            <div key={attribute} className="doogma-component-editor">
              <label>{attribute}</label>
              <input
                type="text"
                defaultValue={isEditing.component.attributes[attribute]}
                onChange={({ target }) => handleChangeAttribute(target.value, attribute)}
              />
            </div>
          ))}
          <div className="sidebar-editor-label">
            <h3>Items</h3>
            <Button variant="text" size="empty" icon={<Icon name="plus" />} onClick={() => setAddItem(true)}></Button>
          </div>
          <div className="doogma-component-items-allow-components">
            <label>Has components attribute</label>
            <Checkbox value={!!isEditing.component.items[0]?.components} onChange={handleChangeComponentsAttribute} />
          </div>
          {isEditing.component.items.map((item, index) => (
            <div key={index} className="doogma-component-item">
              <div className="sidebar-editor-label">
                <h3>Item {index}</h3>
                <Button
                  variant="text"
                  size="empty"
                  icon={<Icon name="trash-alt" />}
                  onClick={() => handleRemoveItem(index)}
                />
              </div>
              {Object.keys(item.attributes).map((attribute) => (
                <div key={attribute} className="doogma-component-item-editor">
                  <label>{attribute}</label>
                  <input
                    type="text"
                    defaultValue={item.attributes[attribute]}
                    onChange={({ target }) => handleChangeItem(target.value, index, attribute)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="sidebar-content">
          <Button
            className={classnames({ active: theme.view === "builder" })}
            variant="filled"
            onClick={() => handleSwitchView("builder")}
          >
            Builder
          </Button>
          <Button
            className={classnames({ active: theme.view === "json" })}
            variant="filled"
            onClick={() => handleSwitchView("json")}
          >
            Configuration
          </Button>

          {/* <Button
            className={classnames({ active: theme.view === "preview" })}
            variant="filled"
            onClick={() => handleSwitchView("preview")}
          >
            Preview
          </Button> */}
        </div>
      )}

      <div className="sidebar-footer">
        {theme.view === "json" && (
          <Button variant="filled" onClick={() => setChangeProduct(true)}>
            Change product
          </Button>
        )}
      </div>

      <Modal show={changeProduct} onClose={() => setChangeProduct(false)}>
        <Modal.Header title="Change product" />
        <Modal.Body>
          <form onSubmit={handleChangeJSON} noValidate>
            <section>
              <label>Enviroment</label>
              <Select onChange={({ target }) => setEnviroment(target.value)}>
                <option value={null}>Select an option</option>
                <option value="production">Production</option>
                <option value="development">Development</option>
              </Select>
            </section>
            <section>
              <label>Product</label>
              <Select onChange={({ target }) => setProduct(target.value)}>
                <option value={null}>Select an option</option>
                {Object.keys(products[enviroment] || {}).map((product) => (
                  <option value={product} key={product}>
                    {products[enviroment][product].name}
                  </option>
                ))}
              </Select>
            </section>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onClick={() => setChangeProduct(false)}>
            Cancel
          </Button>
          <Button variant="filled" onClick={handleChangeJSON}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={addItem} onClose={() => setAddItem(false)}>
        <Modal.Header title="Add item" />
        <Modal.Body>
          <form onSubmit={handleChangeJSON} noValidate>
            <h4>Item attributes</h4>
            {Object.keys(itemAttributes).map((attribute, index) => (
              <section key={index} className="item-attribute">
                <label>
                  {attribute}{" "}
                  <Button
                    variant="text"
                    size="empty"
                    icon={<Icon name="times" />}
                    onClick={() => {
                      setItemAttributes((prev) => {
                        const newItemAttributes = { ...prev };
                        delete newItemAttributes[attribute];
                        return newItemAttributes;
                      });
                    }}
                  ></Button>
                </label>
              </section>
            ))}
            <section className="item-new-attribute">
              <input
                type="text"
                placeholder="E.g. name"
                value={attributeToAdd.key}
                onInput={({ target }) => setAttributeToAdd((prev) => ({ ...prev, key: target.value }))}
              />
            </section>
            <Button
              size="small"
              onClick={() => {
                setItemAttributes((prev) => ({ ...prev, [attributeToAdd.key]: attributeToAdd.value }));
                setAttributeToAdd({ key: "", value: "" });
              }}
            >
              Add attribute
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="filled" onClick={handleAddItem}>
            Add item
          </Button>
        </Modal.Footer>
      </Modal>
    </aside>
  );
}

Sidebar.propTypes = {};

export default Sidebar;
