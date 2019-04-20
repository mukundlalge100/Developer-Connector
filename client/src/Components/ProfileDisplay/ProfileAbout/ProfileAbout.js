import React from "react";
import classes from "./ProfileAbout.module.scss";
import utilClasses from "../../../Util/Util.module.scss";
import { ReactComponent as Tick } from "../../../Assets/SVG/checkmark.svg";
import { ReactComponent as Bio } from "../../../Assets/SVG/info-large.svg";
import { ReactComponent as Skills } from "../../../Assets/SVG/bolt.svg";

import PropTypes from "prop-types";

const ProfileAbout = props => {
  const firstName = props.profile.userId.userName.split(" ")[0];
  const skills = (
    <ul className={classes.ProfileAbout_Skills__List}>
      {props.profile.skills.map((skill, index) => {
        return (
          <li key={index} className={classes.ProfileAbout_Skills__List_Item}>
            <Tick className={classes.ProfileAbout_Skills__List_Item__Icon} />
            {skill}
          </li>
        );
      })}
    </ul>
  );
  return (
    <div className={classes.ProfileAbout}>
      <div className={classes.ProfileAbout_Bio}>
        <div className={classes.ProfileAbout_Bio__Header}>
          <Bio className={classes.ProfileAbout_Bio__Header_Svg} />
          <h2
            className={utilClasses.Tertiary__Heading}
            style={{ textTransform: "capitalize" }}
          >
            {firstName}'s Bio
          </h2>
        </div>
        {props.profile.bio ? (
          <p className={utilClasses.Paragraph}>{props.profile.bio}</p>
        ) : (
          <span>{firstName} does not have any bio...</span>
        )}
      </div>
      <div className={classes.ProfileAbout_Skills}>
        <div className={classes.ProfileAbout_Skills__Header}>
          <Skills className={classes.ProfileAbout_Skills__Header_Svg} />
          <h2
            className={utilClasses.Tertiary__Heading}
            style={{ marginBottom: "2rem" }}
          >
            Skills Set
          </h2>
        </div>
        {skills}
      </div>
    </div>
  );
};
ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};
export default ProfileAbout;
