import React, { Component } from "react";
import utilClasses from "../../../Util/Util.module.scss";

import classes from "./Add-Comment.module.scss";
import { connect } from "react-redux";
import * as actions from "../../../Store/Actions/IndexAction";
import TextAreaField from "../../../Components/Input/TextAreaField/TextAreaField";
import PropTypes from "prop-types";

class AddComment extends Component {
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
  commentFormSubmitHandler = event => {
    event.preventDefault();
    const commentFormData = {
      text: this.state.text,
      userName: this.props.user.userName,
      avatar: this.props.user.avatar
    };
    this.props.onAddComment(this.props.postId, commentFormData);
  };
  render() {
    return (
      <div className={classes.AddComment}>
        <h2
          style={{ marginLeft: "1rem" }}
          className={utilClasses.Secondary__Heading}
        >
          Make a Comment ...
        </h2>
        <form
          className={classes.AddComment_Form}
          onSubmit={this.commentFormSubmitHandler}
        >
          <TextAreaField
            name="text"
            label="Reply to post"
            placeholder="Reply to post"
            value={this.state.text}
            onChange={this.inputChangeHandler}
            error={this.props.postErrors.textIsNotValid}
          />
          <button
            type="submit"
            className={`${utilClasses.Button} ${
              classes.AddComment_Form__Button
            }`}
          >
            Comment
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
    onAddComment: (postId, commentData) =>
      dispatch(actions.addComment(postId, commentData))
  };
};

AddComment.propTypes = {
  postId: PropTypes.string.isRequired
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddComment);
