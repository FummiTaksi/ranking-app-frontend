import React from 'react';
import PropTypes from 'prop-types';

function Input({
  text, type, name, value, onChange,
}) {
  return (
    <div>
      {text}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
Input.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  type: PropTypes.string,
};

export default Input;
