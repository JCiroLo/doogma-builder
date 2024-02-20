import { useEffect, useRef } from "react";
import { renderComponents } from "../lib/Doogma";
import useBuilder from "../hooks/useBuilder";
import { Box } from "@mui/material";

function Preview() {
  const previewRef = useRef(null);
  const [{ json }] = useBuilder();

  useEffect(() => {
    if (json?.navigation?.components) {
      const { wrapper, components } = renderComponents(json.navigation.components);

      const doogmaNavNestedElmRendered = (ev) => {
        const param = ev.detail.param;
        const index = ev.detail.index;
        const key = param + index;

        if (components[key]) {
          document.querySelector("[data-nested-content='" + key + "'] > .doogma-nav-nested-content-inner").innerHTML =
            components[key].wrapper.innerHTML;
        }
      };

      const doogmaContainerNestedElmRendered = (ev) => {
        const param = ev.detail.param;
        const index = ev.detail.index;
        const key = param + index;

        if (components[key]) {
          document.querySelector("[data-nested-content='" + key + "'] > .doogma-container-content-inner").innerHTML =
            components[key].wrapper.innerHTML;
        }
      };

      if (previewRef.current.hasChildNodes()) {
        previewRef.current.replaceChild(wrapper, previewRef.current.firstElementChild);
      } else {
        previewRef.current.appendChild(wrapper);
      }

      document.addEventListener("doogmaNavNestedElmRendered", doogmaNavNestedElmRendered);
      document.addEventListener("doogmaContainerNestedElmRendered", doogmaContainerNestedElmRendered);

      return () => {
        document.removeEventListener(doogmaNavNestedElmRendered, doogmaNavNestedElmRendered);
        document.removeEventListener(doogmaContainerNestedElmRendered, doogmaContainerNestedElmRendered);
      };
    }
  }, []);

  return (
    <Box>
      <Box ref={previewRef}></Box>
    </Box>
  );
}

export default Preview;
