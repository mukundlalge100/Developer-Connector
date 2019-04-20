import React from "react";
import classes from "./Experience.module.scss";
import PropTypes from "prop-types";
import { ReactComponent as Bin } from "../../Assets/SVG/bin.svg";

const Experience = props => {
  const experienceDetails = props.experience.map(item => {
    return (
      <tr key={item._id}>
        <td>{item.company}</td>
        <td>{item.title}</td>
        <td>
          {new Date(item.from).toDateString()} -{" "}
          {item.to ? new Date(item.to).toDateString() : "Now"}
        </td>
        <td>
          <Bin
            onClick={() => props.onDeleteExperience(item._id)}
            className={classes.Experience_BinIcon}
          />
        </td>
      </tr>
    );
  });
  return (
    <main className={classes.Experience}>
      <table className={classes.Experience_Table}>
        <caption>Experience Credentials</caption>
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody className={classes.Experience_Table__Tbody}>
          {experienceDetails}
        </tbody>
      </table>
    </main>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  onDeleteExperience: PropTypes.func.isRequired
};
export default Experience;
