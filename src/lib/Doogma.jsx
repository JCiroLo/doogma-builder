import Component from "./Component";
import Item from "./Item";

export function getParsedComponents(components) {
  const parsedComponents = [];

  components.forEach(({ type, attributes: { items, ...rest } }) => {
    const component = new Component(type, rest);

    if (items) {
      const parsedItems = [];

      items.forEach(({ components: itemComponents, ...rest }) => {
        if (itemComponents) {
          parsedItems.push(new Item(getParsedComponents(itemComponents), rest));
        } else {
          parsedItems.push(new Item(null, rest));
        }
      });

      component.items = parsedItems;
    }

    parsedComponents.push(component);
  });

  return parsedComponents;
}

export function renderComponents(components, wrapper = "div", wrapperClass = "doogma-nav-wrapper") {
  const doogmaComponentsWrap = document.createElement(wrapper);
  doogmaComponentsWrap.classList.add(wrapperClass);

  const innerComponents = {};

  components.forEach(function (component) {
    const componentType = component.type;

    const elm = document.createElement(component.type);

    for (const key in component.attributes) {
      let innerComponentsData;
      let attb = component.attributes[key];

      const dashedKey = key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

      if (
        (componentType === "doogma-nav-tabs" && key === "items") ||
        (componentType === "doogma-component-containers" && key === "items")
      ) {
        const items = JSON.parse(JSON.stringify(attb));
        const new_items = [];

        items.forEach(function (item, index) {
          if (item.components) {
            innerComponentsData = item.components;
            delete item.components;

            innerComponents[elm.getAttribute("param") + index] = renderComponents(innerComponentsData);
          }

          new_items.push(item);
        });

        elm.setAttribute(dashedKey, JSON.stringify(new_items));
      } else if (
        (key === "items" && componentType !== "doogma-nav-tabs") ||
        (key === "items" && componentType !== "doogma-component-containers")
      ) {
        attb = JSON.stringify(attb);
        elm.setAttribute(dashedKey, attb);
      } else {
        elm.setAttribute(dashedKey, attb);
      }

      doogmaComponentsWrap.appendChild(elm);
    }
  });

  return { wrapper: doogmaComponentsWrap, components: innerComponents };
}

export async function fetchJson(url) {
  return await (await fetch(url, { method: "GET", headers: { "Content-type": "application/json" } })).json();
}
