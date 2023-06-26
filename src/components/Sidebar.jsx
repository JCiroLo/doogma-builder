import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import useTheme from "../hooks/useTheme";
import useBuilder from "../hooks/useBuilder";
import Button from "./Button";
import Modal from "./Modal";
import Select from "./Select";

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

function Sidebar({ title }) {
  const [theme, setTheme] = useTheme();
  const [, setCode, setCss] = useBuilder();
  const [enviroment, setEnviroment] = useState(null);
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

    setShowModal(false);
  };

  return (
    <aside className={classnames("sidebar-component", { active: theme.sidebar })}>
      <div className="sidebar-header">
        {/* <Button variant="filled" icon={<Icon name="bars" />} onClick={handleSwitchSidebar}></Button> */}
        <p>{title}</p>
      </div>

      <div className="sidebar-content">
        <Button
          className={classnames({ active: theme.view === "json" })}
          variant="filled"
          onClick={() => handleSwitchView("json")}
        >
          JSON
        </Button>
        <Button
          className={classnames({ active: theme.view === "builder" })}
          variant="filled"
          onClick={() => handleSwitchView("builder")}
        >
          Builder
        </Button>
        <Button
          className={classnames({ active: theme.view === "preview" })}
          variant="filled"
          onClick={() => handleSwitchView("preview")}
        >
          Preview
        </Button>
      </div>
      <div className="sidebar-footer">
        {theme.view === "json" && (
          <Button variant="filled" onClick={() => setShowModal(true)}>
            Change product
          </Button>
        )}
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
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
          <Button variant="outline" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="filled" onClick={handleChangeJSON}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </aside>
  );
}

Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Sidebar;
