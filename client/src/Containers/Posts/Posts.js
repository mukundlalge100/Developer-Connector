import React, { Component } from "react";
import classes from "./Posts.module.scss";
import utilClasses from "../../Util/Util.module.scss";
import AddPost from "./Add-Post/Add-Post";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions/IndexAction";
import PostFeed from "../../Components/PostFeed/PostFeed";
import Loader from "../../Components/UI/Loader/Loader";
import SomethingWentWrong from "../../HOC/ErrorHandler/SomethingWentWrong";

class Posts extends Component {
  componentDidMount = () => {
    this.props.onGetPosts();
  };

  deletePost = postId => {
    this.props.onDeletePost(postId);
  };

  likePost = postId => {
    this.props.onLikePost(postId);
  };

  disLikePost = postId => {
    this.props.onDisLikePost(postId);
  };

  somethingWentWrongCloseHandler = () => {
    // CALLED WHEN WE CLICK ON BACKDROP OF MODAL COMPONENT ...
    this.props.onSomethingWentWrongClose();
  };
  render() {
    let postContent = null;
    const { posts } = this.props;
    if (posts) {
      postContent = (
        <PostFeed
          posts={posts}
          user={this.props.user}
          onDeletePost={this.deletePost}
          onLikePost={this.likePost}
          onDisLikePost={this.disLikePost}
          showActions={true}
        />
      );
    }

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
      <main className={classes.Posts}>
        <AddPost />
        {postContent}
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    postLoading: state.postReducer.postLoading,
    posts: state.postReducer.posts,
    somethingWentWrong: state.postReducer.somethingWentWrong,
    user: state.authReducer.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSomethingWentWrongClose: () =>
      dispatch(actions.postSomethingWentWrongCloseHandler()),
    onGetPosts: () => dispatch(actions.getPosts()),
    onDeletePost: postId => dispatch(actions.deletePost(postId)),
    onLikePost: postId => dispatch(actions.likePost(postId)),
    onDisLikePost: postId => dispatch(actions.disLikePost(postId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
