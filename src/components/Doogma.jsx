import useDoogma from "../hooks/useDoogma";
import Sidebar from "./sidebar";
import BuilderWrapper from "./BuilderWrapper";

function Doogma() {
  const [components] = useDoogma();

  if (!components) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="doogma-builder">
      <Sidebar title="Doogma builder" />
      <BuilderWrapper />
    </div>
  );
}

export default Doogma;
