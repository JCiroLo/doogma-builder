import PropTypes from "prop-types";
import classnames from "classnames";
import Icon from "./Icon";
import Button from "./Button";
import { useState } from "react";

function DoogmaComponent({ component, path, onAddComponent }) {
  const [active, setActive] = useState(true);

  return (
    <div className={classnames("doogma-component-wrapper", { active })}>
      <div className="doogma-component-header" onClick={() => setActive((prev) => !prev)}>
        <p>{component.type}</p>
        <div className="doogma-component-remove">
          <Icon name="times" />
        </div>
      </div>
      <div className="doogma-component-items">
        {component.items.map((item, itemIntex) => {
          const canSaveComponents = !!item.components;
          return (
            <div className="doogma-component-item" key={item.id}>
              <small>Item {itemIntex}</small>
              <div className={classnames("doogma-component-drop-zone")}>
                {canSaveComponents &&
                  item.components.map((component) => (
                    <DoogmaComponent
                      key={component.id}
                      component={component}
                      path={`${path}:attributes:items:${itemIntex}:components`}
                      onAddComponent={onAddComponent}
                    />
                  ))}

                {canSaveComponents && (
                  <Button
                    icon={<Icon name="plus" />}
                    onClick={() => onAddComponent(`${path}:attributes:items:${itemIntex}:components`)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

DoogmaComponent.propTypes = {
  component: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  onAddComponent: PropTypes.func.isRequired,
};

// onClick={() => onRemove(item, list)}

export default DoogmaComponent;
