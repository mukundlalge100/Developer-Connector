import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../Store/Actions/IndexAction";
import Loader from "../../Components/UI/Loader/Loader";
import utilClasses from "../../Util/Util.module.scss";
import classes from "./Dashboard.module.scss";
import ProfileActions from "../../Components/DashBoardProfileActions/ProfileActions";
import Experience from "../../Components/Experience/Experience";
import Education from "../../Components/Education/Education";
import SomethingWentWrong from "../../HOC/ErrorHandler/SomethingWentWrong";

// DASHBOARD CLASS BASED COMPONENT ...

class Dashboard extends Component {
  componentDidMount = () => {
    // GET PROFILE IF USER HAS ANY...
    this.props.onGetProfile();
  };

  deleteExperience = experienceId => {
    this.props.onDeleteExperience(experienceId, this.props.history);
  };
  deleteEducation = educationId => {
    this.props.onDeleteEducation(educationId, this.props.history);
  };
  somethingWentWrongCloseHandler = () => {
    this.props.onSomethingWentWrongCloseHandler();
  };

  // DELETE USER ACCOUNT AND PROFILE METHOD...
  deleteAccount = () => {
    this.props.onDeleteAccount(this.props.history);
  };

  render() {
    let dashboard;
    // CHECK IF USER HAS PROFILE OR NOT...
    if (this.props.profile) {
      dashboard = (
        <div className={classes.Dashboard_Container}>
          <h2 className={utilClasses.Secondary__Heading}>Dashboard</h2>
          <h3 className={utilClasses.Tertiary__Heading}>
            Welcome{" "}
            <Link
              to={`/profile/${this.props.profile.handle}`}
              className={classes.Dashboard_Container__Link}
            >
              {this.props.user.userName}
            </Link>
          </h3>
          <ProfileActions />
          <Experience
            experience={this.props.profile.experience}
            onDeleteExperience={this.deleteExperience}
          />
          <Education
            education={this.props.profile.education}
            onDeleteEducation={this.deleteEducation}
          />
          <button
            onClick={this.deleteAccount}
            className={`${utilClasses.Button} ${classes.Dashboard_Button}`}
          >
            Delete Account
          </button>
        </div>
      );
    } else {
      dashboard = (
        <div className={classes.Dashboard_Container}>
          <h1 className={utilClasses.Primary__Heading}>Dashboard</h1>
          <h3 className={utilClasses.Tertiary__Heading}>
            Welcome {this.props.user.userName}
          </h3>
          <br />
          <p className={utilClasses.Paragraph}>
            You have not yet set up profile,please add some info
          </p>
          <Link
            to="/add-profile"
            className={`${utilClasses.Button} ${classes.Dashboard_Button}`}
          >
            Create Profile
          </Link>
        </div>
      );
    }
    if (this.props.profileLoading) {
      return (
        // RENDER LOADER WHEN USER PROFILE IS UPLOADING ...
        <main className={utilClasses.Loader__Centered}>
          <Loader />
        </main>
      );
    }
    // IF SOMETHING BAD HAPPEN THIS ERROR HANDLER MODEL WILL SHOW ...
    if (this.props.somethingWentWrong) {
      return (
        <SomethingWentWrong
          somethingWentWrong={this.props.somethingWentWrong}
          somethingWentWrongCloseHandler={this.somethingWentWrongCloseHandler}
        />
      );
    }
    return <main className={classes.Dashboard}>{dashboard}</main>;
  }
}
const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    somethingWentWrong: state.profileReducer.somethingWentWrong,
    profileLoading: state.profileReducer.profileLoading,
    profile: state.profileReducer.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetProfile: () => dispatch(actions.getProfile()),
    onDeleteExperience: (experienceId, history) =>
      dispatch(actions.deleteExperience(experienceId, history)),
    onDeleteEducation: (educationId, history) =>
      dispatch(actions.deleteEducation(educationId, history)),
    onDeleteAccount: history => dispatch(actions.deleteAccount(history)),
    onSomethingWentWrongCloseHandler: () =>
      dispatch(actions.profileSomethingWentWrongCloseHandler())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
