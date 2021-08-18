import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  defaultValue,
  disabled,
  fullWidth,
  label,
  name,
  onChange,
  placeholder,
  register,
  required,
  type,
  value,
}) => {
  const registerProps = register && { ...register(name, { required }) };

  return (
    <div className={classNames({ 'w-full': fullWidth })}>
      {label && (
        <label htmlFor={name}>
          <span className="capitalize">{label}</span>
        </label>
      )}
      <input
        className={classNames('block input', {
          'mt-1': label,
          'w-full': fullWidth,
        })}
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...registerProps}
      />
    </div>
  );
};

Input.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  register: PropTypes.func,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Input.defaultProps = {
  defaultValue: undefined,
  disabled: false,
  fullWidth: false,
  label: undefined,
  name: undefined,
  onChange: undefined,
  placeholder: undefined,
  register: undefined,
  required: false,
  type: 'text',
  value: undefined,
};

export default Input;
