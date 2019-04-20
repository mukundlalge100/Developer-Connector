import React, { Component } from "react";
import classes from "./SignUp.module.scss";
import utilClasses from "../../../Util/Util.module.scss";
import { connect } from "react-redux";
import * as actions from "../../../Store/Actions/IndexAction";
import Loader from "../../../Components/UI/Loader/Loader";
import Input from "../../../Components/Input/Input";
import SomethingWentWrong from "../../../HOC/ErrorHandler/SomethingWentWrong";

// SIGNUP CLASS BASED COMPONENT...
class SignUp extends Component {
  state = {
    signUpForm: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    showHidePassword: false,
    showHideConfirmPassword: false
  };
  // INPUT CHANGE HANDLER METHOD ...
  inputChangeHandler = event => {
    const signUpForm = { ...this.state.signUpForm };
    signUpForm[event.target.name] = event.target.value;
    this.setState({ signUpForm });
  };
  somethingWentWrongCloseHandler = () => {
    this.props.onSomethingWentWrongClose();
  };

  //SIGNUP FORM SUBMIT HANDLER METHOD ...
  signUpFormSubmitHandler = async event => {
    event.preventDefault();
    const userData = {
      userName: this.state.signUpForm.userName,
      email: this.state.signUpForm.email,
      password: this.state.signUpForm.password,
      confirmPassword: this.state.signUpForm.confirmPassword
    };
    // CALLING LOGIN METHOD IN REDUX STORE...
    this.props.onAuthSignUp(userData, this.props.history);
  };

  // SHOW OR HIDE PASSWORD FOR PASSWORD FIELD SIMPLE DOM METHOD ...
  showHidePassword = () => {
    let passwordElement = document.getElementById("password");
    if (passwordElement.type === "password") {
      passwordElement.type = "text";
    } else {
      passwordElement.type = "password";
    }
    this.setState(prevState => {
      return { showHidePassword: !prevState.showHidePassword };
    });
  };

  // SHOW OR HIDE PASSWORD FOR PASSWORD FIELD SIMPLE DOM METHOD ...
  showHideConfirmPassword = () => {
    let passwordElement = document.getElementById("confirmPassword");
    if (passwordElement.type === "password") {
      passwordElement.type = "text";
    } else {
      passwordElement.type = "password";
    }
    this.setState(prevState => {
      return { showHideConfirmPassword: !prevState.showHideConfirmPassword };
    });
  };

  render() {
    const errors = { ...this.props.authSignUpFormErrors };

    if (this.props.authSignUpFormLoading) {
      return (
        // RENDERING LOADER ON SCREEN WHEN SIGN FORM IS SUBMITED UNTIL SUCCESS...
        <main className={classes.SignUp}>
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
      <main className={classes.SignUp}>
        <div className={classes.SignUp_Container}>
          <div className={classes.SignUp_Header}>
            <h1 className={`${utilClasses.Primary__Heading}`}>Sign Up</h1>
            <p className={`${utilClasses.Paragraph}`}>
              Create your DevConnector account
            </p>
          </div>
          <form
            method="POST"
            onSubmit={event => this.signUpFormSubmitHandler(event)}
            className={classes.SignUp_Form}
          >
            <Input
              name="userName"
              info="User name must be in between 2 and 30 character."
              id="name"
              type="text"
              label="User Name"
              error={errors.userNameIsNotValid}
              placeholder="User Name"
              value={this.state.signUpForm.userName}
              onChange={event => this.inputChangeHandler(event)}
            />
            <Input
              name="email"
              id="email"
              type="email"
              label="Email Address"
              error={errors.emailIsNotValid}
              placeholder="Email Address"
              value={this.state.signUpForm.email}
              onChange={event => this.inputChangeHandler(event)}
              info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
            />
            <Input
              name="password"
              info="Password must be in between 6 and 30 characters!"
              type="password"
              label="Password"
              id="password"
              error={errors.passwordIsNotValid}
              placeholder="Password"
              value={this.state.signUpForm.password}
              onChange={event => this.inputChangeHandler(event)}
              showHidePassword={this.state.showHidePassword}
              showHidePasswordFunc={this.showHidePassword}
            />
            <Input
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              label="Confirm Password"
              error={errors.confirmPasswordIsNotValid}
              placeholder="Confirm Password"
              value={this.state.signUpForm.confirmPassword}
              onChange={event => this.inputChangeHandler(event)}
              showHideConfirmPassword={this.state.showHideConfirmPassword}
              showHideConfirmPasswordFunc={this.showHideConfirmPassword}
            />
            <button
              type="submit"
              className={`${utilClasses.Button} ${classes.SignUp_Button}`}
            >
              SignUp
            </button>
          </form>
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    authSignUpFormLoading: state.authReducer.authSignUpFormLoading,
    authSignUpFormErrors: state.authReducer.authSignUpFormErrors,
    somethingWentWrong: state.authReducer.somethingWentWrong
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAuthSignUp: (userData, history) =>
      dispatch(actions.authSignUp(userData, history)),
    onSomethingWentWrongClose: () =>
      dispatch(actions.authSomethingWentWrongCloseHandler())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
