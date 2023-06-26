import { useRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import useTheme from "../hooks/useTheme";
import useBuilder from "../hooks/useBuilder";
import Button from "./Button";

function Sidebar({ title }) {
  const [theme, setTheme] = useTheme();
  const [{ json }, setBuilder] = useBuilder();
  const inputRef = useRef();

  const handleSwitchView = (view) => {
    setTheme((prev) => ({ ...prev, view }));
  };

  const handleOpenUploadJson = () => {
    inputRef.current.click();
  };

  const handleUploadJson = ({ target }) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      setBuilder(event.target.result);
    };

    reader.readAsText(target.files[0]);
  };

  return (
    <aside className={classnames("sidebar-component", { active: theme.sidebar })}>
      <div className="sidebar-header">
        {/* <Button variant="filled" icon={<Icon name="bars" />} onClick={handleSwitchSidebar}></Button> */}
        <p>{title}</p>
      </div>
      <div className="sidebar-footer">
        {theme.view === "json" && !json && (
          <Button variant="filled" onClick={handleOpenUploadJson}>
            Upload JSON
          </Button>
        )}
        {theme.view !== "json" && (
          <Button variant="filled" onClick={() => handleSwitchView("json")}>
            View JSON
          </Button>
        )}
        {theme.view !== "builder" && (
          <Button variant="filled" onClick={() => handleSwitchView("builder")}>
            View Builder
          </Button>
        )}
        {theme.view !== "preview" && (
          <Button variant="filled" onClick={() => handleSwitchView("preview")}>
            Preview
          </Button>
        )}
        <input ref={inputRef} type="file" onChange={handleUploadJson} />
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Sidebar;
