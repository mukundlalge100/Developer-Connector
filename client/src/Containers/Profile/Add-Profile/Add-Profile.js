import React, { Component } from "react";
import classes from "../Profile.module.scss";
import utilClasses from "../../../Util/Util.module.scss";
import { connect } from "react-redux";
import Input from "../../../Components/Input/Input";
import SelectField from "../../../Components/Input/SelectField/SelectField";
import TextAreaField from "../../../Components/Input/TextAreaField/TextAreaField";
import * as actions from "../../../Store/Actions/IndexAction";
import Loader from "../../../Components/UI/Loader/Loader.js";
import SomethingWentWrong from "../../../HOC/ErrorHandler/SomethingWentWrong";

// ADDIDING PROFILE INFORMATION FORM COMPONENT...
class AddProfile extends Component {
  state = {
    displaySocialInputs: false,
    profileForm: {
      handle: "",
      company: "",
      bio: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubUserName: "",
      twitter: "",
      youtube: "",
      instagram: "",
      facebook: "",
      linkedin: ""
    }
  };
  somethingWentWrongCloseHandler = () => {
    this.props.onSomethingWentWrongClose();
  };

  inputChangeHandler = event => {
    const profileForm = { ...this.state.profileForm };
    profileForm[event.target.name] = event.target.value;

    this.setState({ profileForm: profileForm });
  };
  toggleDisplaySocialInputs = event => {
    event.preventDefault();
    this.setState(prevState => {
      return {
        displaySocialInputs: !prevState.displaySocialInputs
      };
    });
  };
  profileFormSubmitHandler = event => {
    event.preventDefault();
    const profileData = {
      handle: this.state.profileForm.handle,
      company: this.state.profileForm.company,
      bio: this.state.profileForm.bio,
      website: this.state.profileForm.website,
      location: this.state.profileForm.location,
      status: this.state.profileForm.status,
      skills: this.state.profileForm.skills,
      githubUserName: this.state.profileForm.githubUserName,
      facebook: this.state.profileForm.facebook,
      youtube: this.state.profileForm.youtube,
      twitter: this.state.profileForm.twitter,
      linkedin: this.state.profileForm.linkedin,
      instagram: this.state.profileForm.instagram
    };
    this.props.onCreateProfile(profileData, this.props.history);
  };

  render() {
    let errors = this.props.profileErrors;

    // SELECT OPTIONS FOR THE STATUS ...
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];
    let socialInputs;
    // TOGGLE SOCIAL INPUT BY TOGGLE BUTTON...
    if (this.state.displaySocialInputs) {
      socialInputs = (
        <div className={classes.Profile_Form__Social_Links}>
          <Input
            placeholder="Fackebook Profile URL"
            label="Fackebook Profile URL"
            name="facebook"
            value={this.state.profileForm.facebook}
            onChange={this.inputChangeHandler}
            error={errors.facebookIsNotValid}
          />
          <Input
            placeholder="Twitter Profile URL"
            label="Twitter Profile URL"
            name="twitter"
            value={this.state.profileForm.twitter}
            onChange={this.inputChangeHandler}
            error={errors.twitterIsNotValid}
          />
          <Input
            placeholder="Instagram Profile URL"
            label="Instagram Profile URL"
            name="instagram"
            value={this.state.profileForm.instagram}
            onChange={this.inputChangeHandler}
            error={errors.instagramIsNotValid}
          />
          <Input
            placeholder="YouTube Profile URL"
            label="YouTube Profile URL"
            name="youtube"
            value={this.state.profileForm.youtube}
            onChange={this.inputChangeHandler}
            error={errors.youtubeIsNotValid}
          />
          <Input
            placeholder="Linkedin Profile URL"
            label="Linkedin Profile URL"
            name="linkedin"
            value={this.state.profileForm.linkedin}
            onChange={this.inputChangeHandler}
            error={errors.linkedinIsNotValid}
          />
        </div>
      );
    }

    // IF PROFILE LOADING IS TRUE SHOW LOADER FUNTIONAL COMPONENT ...
    if (this.props.profileLoading) {
      return (
        <main className={utilClasses.Loader__Centered}>
          <Loader />
        </main>
      );
    }
    // IF SOMETHING BAD WENT WRONG SHOW MODAL WITH MESSAGE ...
    if (this.props.somethingWentWrong) {
      return (
        <SomethingWentWrong
          somethingWentWrong={this.props.somethingWentWrong}
          somethingWentWrongCloseHandler={this.somethingWentWrongCloseHandler}
        />
      );
    }
    return (
      <main className={classes.Profile}>
        <div className={classes.Profile_Container}>
          <header className={classes.Profile_Header}>
            <h1 className={utilClasses.Secondary__Heading}>
              Create Your Profile
            </h1>
            <p className={utilClasses.Paragraph}>
              Let's get some information to make your profile stand out.
            </p>
            <p
              className={utilClasses.Paragraph}
              style={{ justifySelf: "start", marginLeft: "1.5rem" }}
            >
              <br />* fileds are mark as required.
            </p>
          </header>
          <form className={classes.Profile_Form}>
            <Input
              placeholder="* Profile Handle"
              label="* Profile Handle"
              name="handle"
              value={this.state.profileForm.handle}
              onChange={this.inputChangeHandler}
              error={errors.handleIsNotValid}
              info="A unique handle for your profile URL."
            />
            <SelectField
              label="* Status"
              name="status"
              value={this.state.profileForm.status}
              onChange={this.inputChangeHandler}
              error={errors.statusIsNotValid}
              options={options}
              info="Give us idea about where you are at in career."
            />
            <Input
              placeholder="Company"
              label="Company"
              name="company"
              value={this.state.profileForm.company}
              onChange={this.inputChangeHandler}
              info="Could be your own company or one you work for."
            />
            <Input
              placeholder="Website"
              label="Website"
              name="website"
              value={this.state.profileForm.website}
              onChange={this.inputChangeHandler}
              error={errors.websiteIsNotValid}
              info="Could be your own website or your company website."
            />
            <Input
              placeholder="* Skills"
              label="* Skills"
              name="skills"
              value={this.state.profileForm.skills}
              error={errors.skillsAreNotValid}
              onChange={this.inputChangeHandler}
              info="Use comma(,) to seperate the each skill (e.g.MongoDB,Express,React,Redux,Node,HTML5,CSS3,etc)."
            />
            <Input
              placeholder="Github User Name"
              label="Github User Name"
              name="githubUserName"
              value={this.state.profileForm.githubUserName}
              onChange={this.inputChangeHandler}
              info="If you want your latest repos and Github user name,please include user name."
            />
            <TextAreaField
              placeholder="Short Bio"
              label="Short Bio"
              name="bio"
              value={this.state.profileForm.bio}
              onChange={this.inputChangeHandler}
              info="Tell us a little about yourself."
            />

            <div className={classes.Profile_Form__Social}>
              <button
                className={`${utilClasses.Button} ${
                  classes.Profile_Form__Button
                }`}
                onClick={event => this.toggleDisplaySocialInputs(event)}
              >
                Add Social Network Links
              </button>
              <span className={classes.Profile_Form__Social_Optional}>
                Optional
              </span>
            </div>
            {socialInputs}
            <button
              className={`${utilClasses.Button} ${
                classes.Profile_Form__Button
              }`}
              onClick={this.profileFormSubmitHandler}
            >
              Submit Profile
            </button>
          </form>
        </div>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    profileLoading: state.profileReducer.profileLoading,
    profileErrors: state.profileReducer.profileErrors,
    somethingWentWrong: state.profileReducer.somethingWentWrong
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onCreateProfile: (profileData, history) =>
      dispatch(actions.createProfile(profileData, history)),
    onSomethingWentWrongClose: () =>
      dispatch(actions.profileSomethingWentWrongCloseHandler())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProfile);
