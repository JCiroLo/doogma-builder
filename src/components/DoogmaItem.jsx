import classnames from "classnames";
import PropTypes from "prop-types";
import { useState } from "react";
import Icon from "./Icon";
import useTheme from "../hooks/useTheme";
import Button from "./Button";

function DoogmaItem({ data, onChange, onAdd }) {
  const [active, setActive] = useState(false);
  const [theme] = useTheme();

  const formatTagName = (tagName) => tagName.replaceAll("-", " ");

  return (
    <div
      className={classnames("doogma-item-component", {
        active,
        "sidebar-active": theme.sidebar,
      })}
    >
      <div className="doogma-item-toggler" onClick={() => setActive((prev) => !prev)}>
        <Icon name="puzzle-piece" />
        <span>{formatTagName(data.tag)}</span>
        <Icon name="chevron-down" />
      </div>
      <div className="doogma-item-dropdown">
        {data.props.map((prop, index) => (
          <div key={index} className="doogma-item-prop">
            <label>
              <div className="doogma-item-prop-name">
                {prop.key} <span>{prop.required && "*"}</span>
              </div>
              <div className="doogma-item-prop-type">{prop.type}</div>
            </label>
            <input
              type="text"
              defaultValue={prop.default || ""}
              onChange={({ target }) => {
                prop.value = target.value;
                onChange(data);
              }}
            />
          </div>
        ))}
        <Button variant="filled" size="small" onClick={() => onAdd(data)}>
          Add
        </Button>
      </div>
    </div>
  );
}

DoogmaItem.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default DoogmaItem;
