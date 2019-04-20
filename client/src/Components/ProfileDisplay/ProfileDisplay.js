import React from "react";
import ProfileAbout from "./ProfileAbout/ProfileAbout";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileCredentials from "./ProfileCredentials/ProfileCredentials";
import classes from "./ProfileDisplay.module.scss";
import PropTypes from "prop-types";
import GithubInfo from "../../Containers/Profile/GithubInfo/GithubInfo";

const ProfileDisplay = props => {
  return (
    <div className={classes.ProfileDisplay}>
      <ProfileHeader profile={props.profile} />
      <ProfileAbout profile={props.profile} />
      <ProfileCredentials
        education={props.profile.education}
        experience={props.profile.experience}
      />
      <GithubInfo />
    </div>
  );
};
ProfileDisplay.propTypes = {
  profile: PropTypes.object.isRequired,
  repos: PropTypes.array
};
export default ProfileDisplay;
