import React from "react";
import classes from "./ProfileItems.module.scss";
import utilClasses from "../../Util/Util.module.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ReactComponent as Tick } from "../../Assets/SVG/checkmark.svg";

const ProfileItems = props => {
  return (
    <div className={classes.ProfileItems}>
      <figure className={classes.ProfileItems_Avatar}>
        <img
          className={classes.ProfileItems_Avatar__Image}
          src={props.profile.userId.avatar}
          alt="Profile avatar"
        />
      </figure>
      <div className={classes.ProfileItems_Information}>
        <h3 className={utilClasses.Tertiary__Heading}>
          {props.profile.userId.userName}
        </h3>
        {props.profile.company ? (
          <p className={utilClasses.Paragraph}>
            <span className={utilClasses.Paragraph}>
              {props.profile.status}
            </span>{" "}
            at {props.profile.company}
          </p>
        ) : (
          <span className={utilClasses.Paragraph}>{props.profile.status}</span>
        )}
        {props.profile.location ? (
          <p className={utilClasses.Paragraph}>{props.profile.location}</p>
        ) : null}

        <Link
          to={`/profile/${props.profile.handle}`}
          className={`${utilClasses.Button} ${
            classes.ProfileItems_Information__Button
          }`}
        >
          View Profile
        </Link>
      </div>
      <div className={classes.ProfileItems_Skills}>
        <h3 className={utilClasses.Tertiary__Heading}>Skills Set</h3>
        <ul className={classes.ProfileItems_Skills__List}>
          {props.profile.skills.slice(0, 4).map((skill, index) => {
            return (
              <li
                key={index}
                className={classes.ProfileItems_Skills__List_Item}
              >
                <Tick
                  className={classes.ProfileItems_Skills__List_Item__Icon}
                />
                {skill}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

ProfileItems.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItems;
