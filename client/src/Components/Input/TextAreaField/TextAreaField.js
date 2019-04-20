import React from "react";
import PropTypes from "prop-types";
import classes from "../Input.module.scss";

// TEXTAREA INPUT FUNCTIONAL COMPONENT...
const TextAreaField = ({
  label,
  placeholder,
  error,
  value,
  onChange,
  name,
  info
}) => {
  return (
    <div className={`${classes.Input}`}>
      <textarea
        className={`${classes.Input__InputElement}  ${
          error ? classes.Input__Invalid : ""
        }`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      <label className={classes.Input__Label}>{label}</label>

      {info ? <small className={classes.Input__Text}>{info}</small> : null}

      {error ? <p className={classes.Input__IsInvalid}>{error}</p> : null}
    </div>
  );
};

TextAreaField.propTypes = {
  // REQUIRED PROPS...
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,

  // OPTIONAL PROPS...
  error: PropTypes.string,
  info: PropTypes.string
};

export default TextAreaField;
