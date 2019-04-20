import React, { Component } from "react";
import classes from "./Post.module.scss";
import utilClasses from "../../Util/Util.module.scss";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions/IndexAction";
import Loader from "../../Components/UI/Loader/Loader";
import SomethingWentWrong from "../../HOC/ErrorHandler/SomethingWentWrong";
import PostItem from "../../Components/PostItem/PostItem";
import { Link } from "react-router-dom";
import AddComment from "./Add-Comment/Add-Comment";
import PostComment from "../../Components/PostComment/PostComment";

class Post extends Component {
  componentDidMount = () => {
    if (this.props.match.params.id) {
      this.props.onGetPost(this.props.match.params.id);
    }
  };
  deletePostComment = commentId => {
    this.props.onDeleteComment(commentId, this.props.post._id);
  };
  render() {
    if (this.props.postLoading) {
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
      <main className={classes.Post}>
        {this.props.post ? (
          <div className={classes.Post_Container}>
            <Link
              to="/feed"
              className={utilClasses.Link}
              style={{
                marginLeft: "5rem",
                marginTop: "5rem",
                justifySelf: "start"
              }}
            >
              Back to Feed
            </Link>
            <PostItem
              user={this.props.user}
              showActions={false}
              post={this.props.post}
            />
            <AddComment postId={this.props.post._id} />
            <PostComment
              onDeleteComment={this.deletePostComment}
              comments={this.props.post.comments}
              user={this.props.user}
            />
          </div>
        ) : null}
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    post: state.postReducer.post,
    postLoading: state.postReducer.postLoading,
    postErrors: state.postReducer.postErrors,
    user: state.authReducer.user,
    somethingWentWrong: state.postReducer.somethingWentWrong
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onDeleteComment: (commentId, postId) =>
      dispatch(actions.deleteComment(commentId, postId)),
    onGetPost: postId => dispatch(actions.getPost(postId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
