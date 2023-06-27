import { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Icon from "./Icon";
import Button from "./Button";

function DoogmaComponent({ component, path, onReorder, onDelete, onEdit, onAddComponent }) {
  const [active, setActive] = useState(false);

  const handleEditComponent = (event) => {
    event.stopPropagation();
    onEdit({ component, path });
  };

  const handleReorder = (event, direction) => {
    event.stopPropagation();
    onReorder(path, direction);
  };

  const handleDeleteComponent = (event) => {
    event.stopPropagation();
    onDelete(path);
  };

  return (
    <div className={classnames("doogma-component-wrapper", { active })}>
      <div className="doogma-component-header">
        <div className="doogma-component-info" onClick={() => setActive((prev) => !prev)}>
          <small className="component-type">{component.attributes.label || component.type}</small>
          <div className="doogma-component-actions">
            <div className="doogma-component-actions-multiple">
              <button className="doogma-component-action" onClick={(event) => handleReorder(event, "up")}>
                <Icon name="chevron-up" />
              </button>
              <button className="doogma-component-action" onClick={(event) => handleReorder(event, "down")}>
                <Icon name="chevron-down" />
              </button>
            </div>
            <button className="doogma-component-action" onClick={handleEditComponent}>
              <Icon name="pencil" />
            </button>
            <button className="doogma-component-action" onClick={handleDeleteComponent}>
              <Icon name="times" />
            </button>
          </div>
        </div>
      </div>
      <div className="doogma-component-content">
        <div className="doogma-component-preview">
          <component.type
            items={JSON.stringify(component.items.map((item) => item.attributes))}
            {...component.attributes}
          ></component.type>
        </div>

        <div className="doogma-component-items">
          {component.items.map((item, itemIntex) => {
            const canSaveComponents = !!item.components;

            return canSaveComponents ? (
              <div
                className={classnames("doogma-component-item", { "with-components": canSaveComponents })}
                key={item.id}
              >
                <small className="item-type">{item.attributes.name || `Item ${itemIntex}`}</small>
                <div className={classnames("doogma-component-drop-zone")}>
                  {item.components.map((component, index) => (
                    <DoogmaComponent
                      key={component.id}
                      component={component}
                      path={`${path}:attributes:items:${itemIntex}:components:${index}`}
                      onEdit={onEdit}
                      onReorder={onReorder}
                      onDelete={onDelete}
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
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}

DoogmaComponent.propTypes = {
  component: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  onReorder: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAddComponent: PropTypes.func.isRequired,
};

// onClick={() => onRemove(item, list)}

export default DoogmaComponent;
