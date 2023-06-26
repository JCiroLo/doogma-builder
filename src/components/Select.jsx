import classnames from "classnames";
import PropTypes from "prop-types";

function Select({ children, onChange }) {
  return (
    <select className={classnames("select-component")} onChange={onChange}>
      {children}
    </select>
  );
}

Select.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
};

export default Select;
