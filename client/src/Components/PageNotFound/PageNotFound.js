import React from "react";
import classes from "./PageNotFound.module.scss";
import utilClasses from "../../Util/Util.module.scss";
import NotFoundGif from "../../Assets/Gif/Ojra.gif";
import { Link } from "react-router-dom";
const PageNotFound = props => {
  return (
    <div className={classes.PageNotFound}>
      <img
        src={NotFoundGif}
        alt="Not Found Page"
        className={classes.PageNotFound_Image}
      />
      <Link to="/" className={utilClasses.Link}>
        &larr;Go back to home
      </Link>
    </div>
  );
};

export default PageNotFound;
