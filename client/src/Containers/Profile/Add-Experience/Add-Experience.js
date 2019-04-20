import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "../Profile.module.scss";
import SomethingWentWrong from "../../../HOC/ErrorHandler/SomethingWentWrong";
import utilClasses from "../../../Util/Util.module.scss";
import Loader from "../../../Components/UI/Loader/Loader";
import * as actions from "../../../Store/Actions/IndexAction";
import { Link } from "react-router-dom";
import Input from "../../../Components/Input/Input";
import TextAreaField from "../../../Components/Input/TextAreaField/TextAreaField";

// ADD EXPERIENCE FORM COMPONENT ...
class AddExperience extends Component {
  state = {
    experienceForm: {
      company: "",
      title: "",
      location: "",
      current: false,
      description: "",
      from: "",
      to: "",
      disabled: false
    }
  };
  somethingWentWrongCloseHandler = () => {
    this.props.onSomethingWentWrongClose();
  };
  inputChangeHandler = event => {
    const experienceForm = { ...this.state.experienceForm };
    experienceForm[event.target.name] = event.target.value;

    this.setState({ experienceForm: experienceForm });
  };
  checkBoxChangeHandler = () => {
    const experienceForm = { ...this.state.experienceForm };
    experienceForm.current = !experienceForm.current;
    experienceForm.disabled = !experienceForm.disabled;
    this.setState({ experienceForm: experienceForm });
  };
  experienceFormSubmitHandler = event => {
    event.preventDefault();
    const experienceFormData = {
      company: this.state.experienceForm.company,
      title: this.state.experienceForm.title,
      location: this.state.experienceForm.location,
      current: this.state.experienceForm.current,
      from: this.state.experienceForm.from,
      to: this.state.experienceForm.to,
      description: this.state.experienceForm.description
    };
    this.props.onAddExperience(experienceFormData, this.props.history);
  };
  render() {
    let errors = this.props.profileErrors;

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
      <main className={classes.Profile}>
        <div className={classes.Profile_Container}>
          <Link
            to="/dashboard"
            style={{
              justifySelf: "start",
              marginTop: "2rem",
              marginLeft: "2rem"
            }}
            className={`${utilClasses.Link}`}
          >
            &larr; Go back
          </Link>
          <header className={classes.Profile_Header}>
            <h1 className={utilClasses.Secondary__Heading}>Add Experience</h1>
            <p
              className={utilClasses.Paragraph}
              style={{ justifySelf: "start", marginLeft: "1.5rem" }}
            >
              <br />* fileds are mark as required.
            </p>
          </header>
          <form className={classes.Profile_Form}>
            <Input
              placeholder="* Company"
              name="company"
              error={errors.companyIsNotValid}
              value={this.state.experienceForm.company}
              label="* Company"
              onChange={this.inputChangeHandler}
            />
            <Input
              placeholder="* Title"
              name="title"
              error={errors.titleIsNotValid}
              value={this.state.experienceForm.title}
              label="* Title"
              onChange={this.inputChangeHandler}
            />
            <Input
              placeholder="Location"
              name="location"
              value={this.state.experienceForm.location}
              label="Location"
              onChange={this.inputChangeHandler}
            />
            <Input
              name="from"
              type="date"
              error={errors.fromIsNotValid}
              value={this.state.experienceForm.from}
              label="* From Date"
              onChange={this.inputChangeHandler}
            />
            <Input
              type="date"
              name="to"
              value={this.state.experienceForm.to}
              label="To Date"
              onChange={this.inputChangeHandler}
              disabled={this.state.experienceForm.disabled ? true : false}
            />
            <Input
              type="checkbox"
              name="current"
              value={this.state.experienceForm.current ? "true" : "false"}
              label="Current Job"
              onChange={this.checkBoxChangeHandler}
              checked={this.state.experienceForm.current}
            />
            <TextAreaField
              placeholder="Job Description"
              name="description"
              value={this.state.experienceForm.description}
              onChange={this.inputChangeHandler}
              label="Job Description"
            />
            <button
              className={`${utilClasses.Button} ${
                classes.Profile_Form__Button
              }`}
              onClick={this.experienceFormSubmitHandler}
            >
              Submit Experience
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
    onAddExperience: (experienceData, history) =>
      dispatch(actions.addExperience(experienceData, history)),
    onSomethingWentWrongClose: () =>
      dispatch(actions.profileSomethingWentWrongCloseHandler())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExperience);
