import React, { Component, Suspense, lazy } from "react";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PageNotFound from "./Components/PageNotFound/PageNotFound";

//STYLLING IMPORTS
import classes from "./App.module.scss";

import Navbar from "./Containers/Layouts/Navbar/Navbar";
import Footer from "./Components/Layouts/Footer/Footer";
import Landing from "./Containers/Layouts/Landing/Landing";
import Loader from "./Components/UI/Loader/Loader";
import * as actions from "./Store/Actions/IndexAction";

// ASYNC LAZY COMPONENTS CHUNKS ...
const Dashboard = lazy(() => import("./Containers/Dashboard/Dashboard"));
const LogIn = lazy(() => import("./Containers/Auth/LogIn/LogIn"));
const SignUp = lazy(() => import("./Containers/Auth/SignUp/SignUp"));
const AddProfile = lazy(() =>
  import("./Containers/Profile/Add-Profile/Add-Profile")
);
const EditProfile = lazy(() =>
  import("./Containers/Profile/Edit-Profile/Edit-Profile")
);
const AddExperience = lazy(() =>
  import("./Containers/Profile/Add-Experience/Add-Experience")
);
const AddEducation = lazy(() =>
  import("./Containers/Profile/Add-Education/Add-Education")
);
const Profiles = lazy(() => import("./Containers/Profiles/Profiles"));
const Profile = lazy(() => import("./Containers/Profile/Profile"));
const Posts = lazy(() => import("./Containers/Posts/Posts"));
const Post = lazy(() => import("./Containers/Post/Post"));

class App extends Component {
  componentDidMount = () => {
    // CHECK IF TOKEN FOR USER IS SET OR NOT IN LOCALSTORAGE IF YES THEN LOGIN USER EVEN AFTER RELOADING...
    this.props.onAuthTryToLogIn(this.props.history);
  };

  render() {
    let routes;

    if (this.props.isAuthenticated) {
      routes = (
        // PRIVATE ROUTES ...
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/add-profile" component={AddProfile} />
          <Route exact path="/edit-profile" component={EditProfile} />
          <Route exact path="/add-experience" component={AddExperience} />
          <Route exact path="/add-education" component={AddEducation} />
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profile/:handle" component={Profile} />
          <Route exact path="/feed" component={Posts} />
          <Route exact path="/post/:id" component={Post} />
          <Route exact path="/pagenotfound" component={PageNotFound} />
          <Redirect exact to="/dashboard" />
        </Switch>
      );
    } else {
      routes = (
        // PUBLIC ROUTES ...
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/pagenotfound" component={PageNotFound} />
          <Route exact path="/signup" component={SignUp} />
          <Redirect exact to="/" />
        </Switch>
      );
    }
    return (
      <main className={classes.App}>
        <Suspense
          fallback={
            <div className={classes.App_Loader}>
              <Loader />
            </div>
          }
        >
          <Navbar />
          {routes}
          <Footer />
        </Suspense>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAuthTryToLogIn: history => dispatch(actions.authCheckLogInState(history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
