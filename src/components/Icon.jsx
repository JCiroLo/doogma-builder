import PropTypes from "prop-types";
import classNames from "classnames";

function Icon({ name, type = "fal", fixed = true, spin = false, className }) {
  return (
    <i
      className={classNames(className, "icon-component", type, `fa-${name}`, {
        "fa-fw": fixed,
        "fa-spin": spin,
      })}
      style={{ color: "inherit" }}
    />
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["fas", "far", "fad", "fal", "fab"]),
  fixed: PropTypes.bool,
  spin: PropTypes.bool,
  className: PropTypes.string,
};

export default Icon;
