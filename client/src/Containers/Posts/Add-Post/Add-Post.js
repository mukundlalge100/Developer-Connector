import React, { Component } from "react";
import utilClasses from "../../../Util/Util.module.scss";

import classes from "./Add-Post.module.scss";
import { connect } from "react-redux";
import * as actions from "../../../Store/Actions/IndexAction";
import TextAreaField from "../../../Components/Input/TextAreaField/TextAreaField";

class AddPost extends Component {
  state = {
    text: ""
  };
  somethingWentWrongCloseHandler = () => {
    // CALLED WHEN WE CLICK ON BACKDROP OF MODAL COMPONENT ...
    this.props.onSomethingWentWrongClose();
  };

  inputChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  postFormSubmitHandler = event => {
    event.preventDefault();
    const postFormData = {
      text: this.state.text,
      userName: this.props.user.userName,
      avatar: this.props.user.avatar
    };
    this.props.onAddPost(postFormData);
  };
  render() {
    return (
      <div className={classes.AddPost}>
        <h2
          style={{ marginLeft: "1rem" }}
          className={utilClasses.Secondary__Heading}
        >
          Write Something ...
        </h2>
        <form
          className={classes.AddPost_Form}
          onSubmit={this.postFormSubmitHandler}
        >
          <TextAreaField
            name="text"
            label="Create a post"
            placeholder="Create a post"
            value={this.state.text}
            onChange={this.inputChangeHandler}
            error={this.props.postErrors.textIsNotValid}
          />
          <button
            type="submit"
            className={`${utilClasses.Button} ${classes.AddPost_Form__Button}`}
          >
            Add Post
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    postErrors: state.postReducer.postErrors,
    postLoading: state.postReducer.postLoading,
    somethingWentWrong: state.postReducer.somethingWentWrong
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddPost: postData => dispatch(actions.addPost(postData))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPost);
