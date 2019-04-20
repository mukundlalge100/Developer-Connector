import React, { Component } from "react";
import classes from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../Store/Actions/IndexAction";
import { withRouter } from "react-router-dom";
import SideDrawerToggle from "../../../Components/UI/SideDrawer/SideDrawerToggle/SideDrawerToggle";
import SideDrawer from "../../../Components/UI/SideDrawer/SideDrawer";
import { ReactComponent as LaptopSVG } from "../../../Assets/SVG/laptop_mac.svg";
import { ReactComponent as BrandSVG } from "../../../Assets/SVG/laptop.svg";
import { ReactComponent as SignUpSVG } from "../../../Assets/SVG/sign-up-key.svg";
import { ReactComponent as LogInSVG } from "../../../Assets/SVG/unlocked.svg";
import { ReactComponent as HomeSVG } from "../../../Assets/SVG/home.svg";
import { ReactComponent as PostSVG } from "../../../Assets/SVG/pen.svg";

class Navbar extends Component {
  state = {
    showHideSideDrawer: false
  };
  authLogOut = () => {
    this.sideDrawerCloseHandler();
    this.props.onClearCurrentProfile();
    this.props.onClearCurrentPost();
    this.props.onAuthLogOut(this.props.history);
  };
  showHideSideDrawer = () => {
    this.setState(prevState => {
      return {
        showHideSideDrawer: !prevState.showHideSideDrawer
      };
    });
  };
  sideDrawerCloseHandler = () => {
    this.setState({ showHideSideDrawer: false });
  };
  render() {
    let conditionalRoutes;
    if (this.props.isAuthenticated) {
      conditionalRoutes = (
        <div className={classes.Navbar_Nav__LinkContainer}>
          <Link
            to="/dashboard"
            className={classes.Navbar_Nav__Link}
            onClick={this.sideDrawerCloseHandler}
          >
            <HomeSVG className={classes.Navbar_Nav__NavbarSVG} />
            Dashboard
          </Link>
          <Link
            to="/feed"
            className={classes.Navbar_Nav__Link}
            onClick={this.sideDrawerCloseHandler}
          >
            <PostSVG className={classes.Navbar_Nav__NavbarSVG} />
            Post Feed
          </Link>
          <div className={classes.Navbar_Nav__Link} onClick={this.authLogOut}>
            <img
              src={this.props.user.avatar}
              alt="Avatar"
              className={classes.Navbar_Nav__Link_Image}
            />
            LogOut
          </div>
        </div>
      );
    } else {
      conditionalRoutes = (
        <div className={classes.Navbar_Nav__LinkContainer}>
          <Link
            className={classes.Navbar_Nav__Link}
            to="/signup"
            onClick={this.sideDrawerCloseHandler}
          >
            <SignUpSVG className={classes.Navbar_Nav__NavbarSVG} />
            SignUp
          </Link>

          <Link
            className={classes.Navbar_Nav__Link}
            to="login"
            onClick={this.sideDrawerCloseHandler}
          >
            <LogInSVG className={classes.Navbar_Nav__NavbarSVG} />
            LogIn
          </Link>
        </div>
      );
    }
    return (
      <main className={classes.Navbar}>
        <SideDrawerToggle sideDrawerToggle={this.showHideSideDrawer} />

        {this.state.showHideSideDrawer ? (
          <SideDrawer
            showHideSideDrawer={this.state.showHideSideDrawer}
            sideDrawerClosedHandler={this.sideDrawerCloseHandler}
          >
            <nav
              className={`${classes.Navbar_Nav} ${
                classes.Navbar_Nav__SideDrawerShow
              }`}
            >
              <Link
                className={`${classes.Navbar_Nav__Link} ${
                  classes.Navbar_Nav__Link_Brand
                }`}
                to="/"
                onClick={this.sideDrawerCloseHandler}
              >
                <BrandSVG className={classes.Navbar_Nav__BrandSVG} />
                DevConnector
              </Link>
              <Link
                className={classes.Navbar_Nav__Link}
                to="/profiles"
                onClick={this.sideDrawerCloseHandler}
              >
                <LaptopSVG className={classes.Navbar_Nav__NavbarSVG} />
                Developers
              </Link>
              {conditionalRoutes}
            </nav>
          </SideDrawer>
        ) : (
          <nav
            className={`${classes.Navbar_Nav} ${
              classes.Navbar_Nav__SideDrawerHide
            }`}
          >
            <Link
              className={`${classes.Navbar_Nav__Link} ${
                classes.Navbar_Nav__Link_Brand
              }`}
              to="/"
            >
              <BrandSVG className={classes.Navbar_Nav__BrandSVG} />
              DevConnector
            </Link>
            <Link className={classes.Navbar_Nav__Link} to="/profiles">
              <LaptopSVG className={classes.Navbar_Nav__NavbarSVG} />
              Developers
            </Link>
            {conditionalRoutes}
          </nav>
        )}
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    user: state.authReducer.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onClearCurrentProfile: () => dispatch(actions.clearCurrentProfile()),
    onClearCurrentPost: () => dispatch(actions.clearCurrentPost()),
    onAuthLogOut: history => dispatch(actions.authLogOut(history))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar));
