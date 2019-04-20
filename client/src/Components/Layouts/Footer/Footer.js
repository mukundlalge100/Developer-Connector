import React from "react";
import classes from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={classes.Footer}>
      Copyright &copy;{new Date().getFullYear()} Dev-Connector
    </footer>
  );
};

export default Footer;
