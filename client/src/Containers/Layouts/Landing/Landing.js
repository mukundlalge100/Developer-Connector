import React, { Component } from "react";
import classes from "./Landing.module.scss";
import UtilClasses from "../../../Util/Util.module.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//LANGING PAGE COMPONENT ...
class Landing extends Component {
  componentDidMount = () => {
    //  IF USER IS AUTHENTICATED THEN REDIRECT HIM/HER TO DASHBOARD PAGE...
    if (this.props.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  };
  render() {
    return (
      <div className={classes.Landing}>
        <div className={classes.Landing_Header}>
          <h1 className={UtilClasses.Primary__Heading}>Developer Connector</h1>
          <p className={UtilClasses.Paragraph}>
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
        </div>
        <div className={classes.Landing_Actions}>
          <Link
            to="/signup"
            className={`${UtilClasses.Button} ${classes.Landing_Button}`}
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className={`${UtilClasses.Button} ${classes.Landing_Button}`}
          >
            Login
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated
  };
};
export default connect(
  mapStateToProps,
  null
)(Landing);
