import React, { Component } from "react";
import classes from "./Profile.module.scss";
import utilClasses from "../../Util/Util.module.scss";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions/IndexAction";
import ProfileDisplay from "../../Components/ProfileDisplay/ProfileDisplay";
import Loader from "../../Components/UI/Loader/Loader";
import SomethingWentWrong from "../../HOC/ErrorHandler/SomethingWentWrong";

class Profile extends Component {
  componentDidMount = () => {
    if (this.props.match.params.handle) {
      this.props.onGetProfileByHandle(this.props.match.params.handle);
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.profile === null && this.props.profileLoading) {
      this.props.history.push("/pagenotfound");
    }
  };

  somethingWentWrongCloseHandler = () => {
    this.props.onSomethingWentWrongClose();
  };

  render() {
    if (this.props.somethingWentWrong) {
      return (
        <SomethingWentWrong
          somethingWentWrong={this.props.somethingWentWrong}
          somethingWentWrongCloseHandler={this.somethingWentWrongCloseHandler}
        />
      );
    }
    if (this.props.profileLoading || this.props.profile === null) {
      return (
        <main className={utilClasses.Loader__Centered}>
          <Loader />
        </main>
      );
    }
    return (
      <main className={classes.Profile}>
        <ProfileDisplay profile={this.props.profile} />
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    profile: state.profileReducer.profile,
    profileLoading: state.profileReducer.profileLoading,
    somethingWentWrong: state.profileReducer.somethingWentWrong
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetProfileByHandle: handle => dispatch(actions.getProfileByHandle(handle))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
