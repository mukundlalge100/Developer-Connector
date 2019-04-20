import React, { Component } from "react";
import { connect } from "react-redux";
import SomethingWentWrong from "../../../HOC/ErrorHandler/SomethingWentWrong";
import classes from "../Profile.module.scss";
import utilClasses from "../../../Util/Util.module.scss";
import Loader from "../../../Components/UI/Loader/Loader";
import * as actions from "../../../Store/Actions/IndexAction";
import { Link } from "react-router-dom";
import Input from "../../../Components/Input/Input";
import TextAreaField from "../../../Components/Input/TextAreaField/TextAreaField";

// ADD EDUCATION FORM COMPONENT ...
class AddEducation extends Component {
  state = {
    educationForm: {
      school: "",
      degree: "",
      fieldOfStudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
      disabled: false
    }
  };

  somethingWentWrongCloseHandler = () => {
    // CALLED WHEN WE CLICK ON BACKDROP OF MODAL COMPONENT ...
    this.props.onSomethingWentWrongClose();
  };

  inputChangeHandler = event => {
    const educationForm = { ...this.state.educationForm };
    educationForm[event.target.name] = event.target.value;

    this.setState({ educationForm: educationForm });
  };

  checkBoxChangeHandler = () => {
    const educationForm = { ...this.state.educationForm };
    educationForm.current = !educationForm.current;
    educationForm.disabled = !educationForm.disabled;
    this.setState({ educationForm: educationForm });
  };

  educationFormSubmitHandler = event => {
    event.preventDefault();
    const educationFormData = {
      school: this.state.educationForm.school,
      degree: this.state.educationForm.degree,
      fieldOfStudy: this.state.educationForm.fieldOfStudy,
      from: this.state.educationForm.from,
      to: this.state.educationForm.to,
      current: this.state.educationForm.current,
      description: this.state.educationForm.description
    };
    this.props.onAddEducation(educationFormData, this.props.history);
  };
  render() {
    let errors = { ...this.props.profileErrors };

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
            <h1 className={utilClasses.Secondary__Heading}>Add Education</h1>
            <p
              className={utilClasses.Paragraph}
              style={{ justifySelf: "start", marginLeft: "1.5rem" }}
            >
              <br />* fileds are mark as required.
            </p>
          </header>
          <form className={classes.Profile_Form}>
            <Input
              placeholder="* School"
              name="school"
              error={errors.schoolIsNotValid}
              value={this.state.educationForm.school}
              label="* School"
              onChange={this.inputChangeHandler}
            />
            <Input
              placeholder="* Degree"
              label="* Degree"
              name="degree"
              error={errors.degreeIsNotValid}
              value={this.state.educationForm.degree}
              onChange={this.inputChangeHandler}
            />
            <Input
              placeholder="* Field of study "
              name="fieldOfStudy"
              error={errors.fieldOfStudyIsNotValid}
              value={this.state.educationForm.fieldOfStudy}
              label="* Field of study"
              onChange={this.inputChangeHandler}
            />
            <Input
              name="from"
              type="date"
              error={errors.fromIsNotValid}
              value={this.state.educationForm.from}
              label="* From Date"
              onChange={this.inputChangeHandler}
            />
            <Input
              type="date"
              name="to"
              value={this.state.educationForm.to}
              label="To Date"
              onChange={this.inputChangeHandler}
              disabled={this.state.educationForm.disabled ? true : false}
            />
            <Input
              type="checkbox"
              name="current"
              value={this.state.educationForm.current ? "true" : "false"}
              label="Current Education"
              onChange={this.checkBoxChangeHandler}
              checked={this.state.educationForm.current}
            />
            <TextAreaField
              placeholder="Education Description"
              name="description"
              value={this.state.educationForm.description}
              onChange={this.inputChangeHandler}
              label="Education Description"
            />
            <button
              className={`${utilClasses.Button} ${
                classes.Profile_Form__Button
              }`}
              onClick={this.educationFormSubmitHandler}
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
    onAddEducation: (educationFormData, history) =>
      dispatch(actions.addEducation(educationFormData, history)),
    onSomethingWentWrongClose: () =>
      dispatch(actions.profileSomethingWentWrongCloseHandler())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEducation);
