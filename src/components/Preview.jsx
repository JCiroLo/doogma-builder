import { useEffect, useRef } from "react";
import { renderComponents } from "../lib/Doogma";
import useBuilder from "../hooks/useBuilder";

function Preview() {
  const previewRef = useRef(null);
  const [{ json }] = useBuilder();

  useEffect(() => {
    if (json?.navigation?.components) {
      previewRef.current.appendChild(renderComponents(json.navigation.components));
    }
  }, [json]);

  return <div ref={previewRef} style={{ maxHeight: "100vh", overflow: "auto" }}></div>;
}

export default Preview;
