import React, { Component } from "react";
import classes from "./Profiles.module.scss";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions/IndexAction";
import Loader from "../../Components/UI/Loader/Loader";
import utilClasses from "../../Util/Util.module.scss";
import ProfileItems from "../../Components/ProfileItems/ProfileItems";
import SomethingWentWrong from "../../HOC/ErrorHandler/SomethingWentWrong";

class Profiles extends Component {
  componentDidMount = () => {
    this.props.onGetProfiles();
  };

  somethingWentWrongCloseHandler = () => {
    // CALLED WHEN WE CLICK ON BACKDROP OF MODAL COMPONENT ...
    this.props.onSomethingWentWrongClose();
  };

  render() {
    const { profiles } = this.props;
    let profilesItems;
    if (profiles) {
      profilesItems = profiles.map(profile => (
        <ProfileItems key={profile._id} profile={profile} />
      ));
    } else {
      profilesItems = <h1>There are no profiles to show ...</h1>;
    }
    if (this.props.profileLoading) {
      return (
        <main className={utilClasses.Loader__Centered}>
          <Loader />
        </main>
      );
    }
    if (this.props.somethingWentWrong) {
      return (
        <SomethingWentWrong
          somethingWentWrong={this.props.somethingWentWrong}
          somethingWentWrongCloseHandler={this.somethingWentWrongCloseHandler}
        />
      );
    }
    return (
      <main className={classes.Profiles}>
        <h2
          className={`${utilClasses.Secondary__Heading} ${
            classes.Profiles_Heading
          }`}
        >
          Developer Profiles
        </h2>
        <p className={utilClasses.Paragraph}>
          Browse and connect with developer.
        </p>
        <div className={classes.Profiles_Container}>{profilesItems}</div>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    profiles: state.profileReducer.profiles,
    profileLoading: state.profileReducer.profileLoading,
    somethingWentWrong: state.profileReducer.somethingWentWrong
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetProfiles: () => dispatch(actions.getProfiles())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profiles);
