import React, { Component } from "react";
import classes from "./LogIn.module.scss";
import utilClasses from "../../../Util/Util.module.scss";
import { connect } from "react-redux";
import * as actions from "../../../Store/Actions/IndexAction";
import Loader from "../../../Components/UI/Loader/Loader";
import Input from "../../../Components/Input/Input";
import SomethingWentWrong from "../../../HOC/ErrorHandler/SomethingWentWrong";

// LOGIN CLASS BASED COMPONENT ...
class LogIn extends Component {
  state = {
    logInForm: {
      email: "",
      password: ""
    },
    showHidePassword: false
  };

  componentDidMount = () => {
    // CHECK IF USER IS AUTHENTICATED OR NOT IF YES REDIRECT USER TO DASHBOARD FROM LOGIN...
    if (this.props.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  };
  somethingWentWrongCloseHandler = () => {
    this.props.onSomethingWentWrongClose();
  };
  // INPUT CHANGE HANDLER METHOD ...
  inputChangeHandler = event => {
    const logInForm = { ...this.state.logInForm };
    logInForm[event.target.name] = event.target.value;
    this.setState({ logInForm: logInForm });
  };

  //LOGIN FORM SUBMIT HANDLER METHOD ...
  logInFormSubmitHandler = event => {
    event.preventDefault();
    const userData = {
      email: this.state.logInForm.email,
      password: this.state.logInForm.password
    };
    // CALLING LOGIN METHOD IN REDUX STORE...
    this.props.onAuthLogIn(userData, this.props.history);
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

  render() {
    let errors = { ...this.props.authLogInFormErrors };

    if (this.props.authLogInFormLoading) {
      // RENDERING LOADER ON SCREEN WHEN LOGIN FORM IS SUBMITED UNTIL SUCCESS...
      return (
        <main className={classes.LogIn}>
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
      <main className={classes.LogIn}>
        <div className={classes.LogIn_Container}>
          <div className={classes.LogIn_Header}>
            <h1 className={`${utilClasses.Primary__Heading}`}>Log In</h1>
            <p className={`${utilClasses.Paragraph}`}>
              Sign in to your DevConnector account
            </p>
          </div>
          <form
            onSubmit={event => this.logInFormSubmitHandler(event)}
            className={classes.LogIn_Form}
          >
            <Input
              type="email"
              id="email"
              info="Email address should contain '@' character."
              placeholder="Email Address"
              onChange={event => this.inputChangeHandler(event)}
              name="email"
              value={this.state.logInForm.email}
              label="Email Address"
              error={errors.emailIsNotValid}
            />
            <Input
              type="password"
              id="password"
              placeholder="Password"
              onChange={event => this.inputChangeHandler(event)}
              name="password"
              value={this.state.logInForm.password}
              label="Password"
              error={errors.passwordIsNotValid}
              showHidePassword={this.state.showHidePassword}
              showHidePasswordFunc={this.showHidePassword}
            />
            <button
              type="submit"
              className={`${utilClasses.Button} ${classes.LogIn_Button}`}
            >
              LogIn
            </button>
          </form>
        </div>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    authLogInFormLoading: state.authReducer.authLogInFormLoading,
    somethingWentWrong: state.authReducer.somethingWentWrong,
    authLogInFormErrors: state.authReducer.authLogInFormErrors,
    isAuthenticated: state.authReducer.isAuthenticated
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAuthLogIn: (userData, history) =>
      dispatch(actions.authLogIn(userData, history)),
    onSomethingWentWrongClose: () =>
      dispatch(actions.authSomethingWentWrongCloseHandler())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);
