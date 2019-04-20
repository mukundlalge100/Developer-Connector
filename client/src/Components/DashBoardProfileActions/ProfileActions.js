import React from "react";
import classes from "./ProfileActions.module.scss";
import { Link } from "react-router-dom";

// SVG'S COMPONENT...
import { ReactComponent as AddExperinceSVG } from "../../Assets/SVG/add-experience.svg";
import { ReactComponent as AddEducationSVG } from "../../Assets/SVG/add-education.svg";
import { ReactComponent as EditProfileSVG } from "../../Assets/SVG/edit-profile.svg";

// PROFILE ACTIONS FUNCTIONAL COMPONENT...
const ProfileActions = props => {
  return (
    <div className={classes.ProfileActions}>
      <Link to="/edit-profile" className={classes.ProfileActions_Link}>
        <EditProfileSVG className={classes.ProfileActions_Link__Icons} />
        Edit-Profile
      </Link>
      <Link to="/add-experience" className={classes.ProfileActions_Link}>
        <AddExperinceSVG className={classes.ProfileActions_Link__Icons} />
        Add-Experience
      </Link>
      <Link to="/add-education" className={classes.ProfileActions_Link}>
        <AddEducationSVG className={classes.ProfileActions_Link__Icons} />
        Add-Education
      </Link>
    </div>
  );
};

export default ProfileActions;
