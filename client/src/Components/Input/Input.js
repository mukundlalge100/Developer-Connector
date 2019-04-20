import React from "react";
import PropTypes from "prop-types";
import classes from "./Input.module.scss";

// SVG'S COMPONENT...
import { ReactComponent as ViewPasswordSVG } from "../../Assets/SVG/visibility.svg";
import { ReactComponent as HidePasswordSVG } from "../../Assets/SVG/visibility_off.svg";
import { ReactComponent as FaceBookSVG } from "../../Assets/SVG/facebook2.svg";
import { ReactComponent as TwitterSVG } from "../../Assets/SVG/twitter.svg";
import { ReactComponent as InstagramSVG } from "../../Assets/SVG/instagram.svg";
import { ReactComponent as LinkedinSVG } from "../../Assets/SVG/linkedin.svg";
import { ReactComponent as YouTubeSVG } from "../../Assets/SVG/youtube.svg";

// TEXT INPUT FUNCTIONAL COMPONENT...
const Input = ({
  type,
  id,
  label,
  placeholder,
  disabled,
  checked,
  error,
  value,
  onChange,
  name,
  info,
  showHidePassword,
  showHidePasswordFunc,
  showHideConfirmPassword,
  showHideConfirmPasswordFunc
}) => {
  let showHidePasswordSVG;
  let showHideConfirmPasswordSVG;

  // RENDER SHOWHIDE PASSWORD SVG ..
  if (showHidePassword) {
    showHidePasswordSVG = (
      <ViewPasswordSVG className={classes.Input__ShowHidePasswordIcon} />
    );
  } else {
    showHidePasswordSVG = (
      <HidePasswordSVG className={classes.Input__ShowHidePasswordIcon} />
    );
  }

  if (showHideConfirmPassword) {
    showHideConfirmPasswordSVG = (
      <ViewPasswordSVG className={classes.Input__ShowHidePasswordIcon} />
    );
  } else {
    showHideConfirmPasswordSVG = (
      <HidePasswordSVG className={classes.Input__ShowHidePasswordIcon} />
    );
  }

  if (type === "checkbox") {
    return (
      <div className={`${classes.Input} ${classes.Input__CheckBox}`}>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          checked={checked}
        />
        <label
          className={`${classes.Input__Label} ${classes.Input__Label_CheckBox}`}
        >
          {label}
        </label>
      </div>
    );
  }
  return (
    <div className={`${classes.Input}`}>
      <input
        type={type}
        id={id}
        className={`${classes.Input__InputElement}  ${
          error ? classes.Input__Invalid : ""
        }`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />

      {id === "password" ? (
        <div onClick={showHidePasswordFunc}>{showHidePasswordSVG}</div>
      ) : null}

      {id === "confirmPassword" ? (
        <div onClick={showHideConfirmPasswordFunc}>
          {showHideConfirmPasswordSVG}
        </div>
      ) : null}

      {name === "facebook" ? (
        <FaceBookSVG
          className={`${classes.Input__SocialIcons} ${
            classes.Input__SocialIcons_Facebook
          }`}
        />
      ) : null}
      {name === "twitter" ? (
        <TwitterSVG
          className={`${classes.Input__SocialIcons} ${
            classes.Input__SocialIcons_Twitter
          }`}
        />
      ) : null}
      {name === "youtube" ? (
        <YouTubeSVG
          className={`${classes.Input__SocialIcons} ${
            classes.Input__SocialIcons_Youtube
          }`}
        />
      ) : null}
      {name === "linkedin" ? (
        <LinkedinSVG
          className={`${classes.Input__SocialIcons} ${
            classes.Input__SocialIcons_Linkedin
          }`}
        />
      ) : null}
      {name === "instagram" ? (
        <InstagramSVG
          className={`${classes.Input__SocialIcons} ${
            classes.Input__SocialIcons_Instagram
          }`}
        />
      ) : null}

      <label className={classes.Input__Label}>{label}</label>

      {info ? <small className={classes.Input__Text}>{info}</small> : null}

      {error ? <p className={classes.Input__IsInvalid}>{error}</p> : null}
    </div>
  );
};

Input.propTypes = {
  // REQUIRED PROPS...
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,

  // OPTIONAL PROPS...
  id: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  showHidePassword: PropTypes.bool,
  showHidePasswordFunc: PropTypes.func,
  showHideConfrimPassword: PropTypes.bool,
  showHideConfrimPasswordFunc: PropTypes.func
};
Input.defaultProps = {
  type: "text"
};
export default Input;
