import React from "react";
import PropTypes from "prop-types";
import utilClasses from "../../../Util/Util.module.scss";
import classes from "./ProfileCredentials.module.scss";

const ProfileCredentials = props => {
  let experience;
  let education;
  if (props.experience.length > 0) {
    experience = props.experience.map((experience, index) => (
      <div
        className={classes.ProfileCredentials_Experience__Details}
        key={index}
      >
        <b>
          <p className={utilClasses.Paragraph}>{experience.company}</p>
        </b>
        <p className={utilClasses.Paragraph}>
          <b>From: </b>
          {new Date(experience.from).toDateString()} <b>to: </b>
          {experience.to ? new Date(experience.to).toDateString() : "Present"}
        </p>
        <p className={utilClasses.Paragraph}>
          <b>Position:</b> {experience.title}
        </p>
        {experience.location ? (
          <p className={utilClasses.Paragraph}>
            <b>Location:</b> {experience.location}
          </p>
        ) : null}
        {experience.description ? (
          <p className={utilClasses.Paragraph}>
            <b>Description:</b> {experience.description}
          </p>
        ) : null}
      </div>
    ));
  } else {
    experience = (
      <div className={classes.ProfileCredentials_Experience__Details}>
        <p className={utilClasses.Paragraph}>
          Experience details have not added yet.
        </p>
      </div>
    );
  }
  if (props.education.length > 0) {
    education = props.education.map((education, index) => (
      <div
        className={classes.ProfileCredentials_Education__Details}
        key={index}
      >
        <b>
          <p className={utilClasses.Paragraph}>{education.school}</p>
        </b>
        <p className={utilClasses.Paragraph}>
          <b>From: </b>
          {new Date(education.from).toDateString()} <b>to: </b>
          {education.to ? new Date(education.to).toDateString() : "Present"}
        </p>
        <p className={utilClasses.Paragraph}>
          <b>Degree:</b> {education.degree}
        </p>
        <p className={utilClasses.Paragraph}>
          <b>Field of study:</b> {education.fieldOfStudy}
        </p>
        {education.description ? (
          <p className={utilClasses.Paragraph}>
            <b>Description:</b> {education.description}
          </p>
        ) : null}
      </div>
    ));
  } else {
    education = (
      <div className={classes.ProfileCredentials_Experience__Details}>
        <p className={utilClasses.Paragraph}>
          Education details have not added yet.
        </p>
      </div>
    );
  }
  return (
    <div className={classes.ProfileCredentials}>
      <div className={classes.ProfileCredentials_Experience}>
        <h2 className={utilClasses.Secondary__Heading}>Experience</h2>
        {experience}
      </div>
      <div className={classes.ProfileCredentials_Education}>
        <h2 className={utilClasses.Secondary__Heading}>Education</h2>
        {education}
      </div>
    </div>
  );
};
ProfileCredentials.propTypes = {
  education: PropTypes.array.isRequired,
  experience: PropTypes.array.isRequired
};
export default ProfileCredentials;
