import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";

import Icon from "./Icon";

function Button({
  variant = "text",
  size = "medium",
  textAlign = "center",
  icon,
  disabled,
  loading,
  submit,
  circle,
  to,
  className,
  children,
  onClick,
}) {
  const classnames = classNames(
    [
      className,
      to ? "link-component" : "button-component",
      variant,
      textAlign,
      size,
    ],
    {
      "is-circle": circle,
    }
  );

  const elements = loading ? (
    <div className="button-icon-element">
      <Icon name="spinner-third" spin />
    </div>
  ) : (
    <>
      {icon && <div className="button-icon-element">{icon}</div>}
      <span>{children}</span>
    </>
  );

  return to ? (
    <Link className={classnames} to={to} disabled={disabled}>
      {elements}
    </Link>
  ) : (
    <button
      className={classnames}
      type={submit ? "submit" : "button"}
      disabled={disabled}
      onClick={onClick}
    >
      {elements}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(["outline", "filled", "text", "empty"]),
  size: PropTypes.string,
  textAlign: PropTypes.string,
  icon: PropTypes.element,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  submit: PropTypes.bool,
  circle: PropTypes.bool,
  to: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default Button;
