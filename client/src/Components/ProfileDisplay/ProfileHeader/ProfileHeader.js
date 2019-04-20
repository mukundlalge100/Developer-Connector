import React from "react";
import classes from "./ProfileHeader.module.scss";
import { Link } from "react-router-dom";
import utilClasses from "../../../Util/Util.module.scss";
import { ReactComponent as WebsiteSVG } from "../../../Assets/SVG/website.svg";
import { ReactComponent as FacebookSVG } from "../../../Assets/SVG/facebook2.svg";
import { ReactComponent as TwitterSVG } from "../../../Assets/SVG/twitter.svg";
import { ReactComponent as LinkedinSVG } from "../../../Assets/SVG/linkedin.svg";
import { ReactComponent as YoutubeSVG } from "../../../Assets/SVG/youtube.svg";
import { ReactComponent as InstagramSVG } from "../../../Assets/SVG/instagram.svg";
import PropTypes from "prop-types";

const ProfileHeader = props => {
  return (
    <div className={classes.ProfileHeader}>
      <Link
        className={utilClasses.Link}
        to="/profiles"
        style={{
          alignSelf: "center",
          justifySelf: "start",
          marginTop: "2rem",
          marginLeft: "2rem"
        }}
      >
        &larr; Back to profiles
      </Link>
      <header className={classes.ProfileHeader_Header}>
        <figure className={classes.ProfileHeader_Header__ProfileImage}>
          <img
            className={classes.ProfileHeader_Header__ProfileImage_Image}
            src={props.profile.userId.avatar}
            alt="User Profile Avatar"
          />
        </figure>
        <h1
          className={`${utilClasses.Primary__Heading} ${
            classes.ProfileHeader_Header__Heading
          }`}
        >
          {props.profile.userId.userName}
        </h1>
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
        <div>
          {props.profile.website ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={props.profile.website}
              className={classes.ProfileHeader_Header__Link}
            >
              <WebsiteSVG className={classes.ProfileHeader_Header__Svg} />
            </a>
          ) : null}
          {props.profile.social.facebook ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={props.profile.social.facebook}
              className={classes.ProfileHeader_Header__Link}
            >
              <FacebookSVG className={classes.ProfileHeader_Header__Svg} />
            </a>
          ) : null}
          {props.profile.social.twitter ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={props.profile.social.twitter}
              className={classes.ProfileHeader_Header__Link}
            >
              <TwitterSVG className={classes.ProfileHeader_Header__Svg} />
            </a>
          ) : null}
          {props.profile.social.linkedin ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={props.profile.social.linkedin}
              className={classes.ProfileHeader_Header__Link}
            >
              <LinkedinSVG className={classes.ProfileHeader_Header__Svg} />
            </a>
          ) : null}
          {props.profile.social.instagram ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={props.profile.social.instagram}
              className={classes.ProfileHeader_Header__Link}
            >
              <InstagramSVG className={classes.ProfileHeader_Header__Svg} />
            </a>
          ) : null}
          {props.profile.social.youtube ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={props.profile.social.youtube}
              className={classes.ProfileHeader_Header__Link}
            >
              <YoutubeSVG className={classes.ProfileHeader_Header__Svg} />
            </a>
          ) : null}
        </div>
      </header>
    </div>
  );
};
ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
};
export default ProfileHeader;
