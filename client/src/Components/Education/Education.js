import React from "react";
import classes from "./Education.module.scss";
import { ReactComponent as Bin } from "../../Assets/SVG/bin.svg";
import PropTypes from "prop-types";

const Education = props => {
  const educationDetails = props.education.map(item => {
    return (
      <tr key={item._id}>
        <td>{item.school}</td>
        <td>{item.degree}</td>
        <td>
          {new Date(item.from).toDateString()} -{" "}
          {item.to ? new Date(item.to).toDateString() : "Now"}
        </td>
        <td>
          <Bin
            onClick={() => props.onDeleteEducation(item._id)}
            className={classes.Education_BinIcon}
          />
        </td>
      </tr>
    );
  });
  return (
    <main className={classes.Education}>
      <table className={classes.Education_Table}>
        <caption>Education Credentials</caption>
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody className={classes.Education_Table__Tbody}>
          {educationDetails}
        </tbody>
      </table>
    </main>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  onDeleteEducation: PropTypes.func.isRequired
};
export default Education;
