import PropTypes from "prop-types";

function Checkbox({ value, onChange }) {
  return <input className="checkbox-component" type="checkbox" defaultChecked={value} onChange={onChange} />;
}

Checkbox.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
