import React from "react";
import classes from "./PostFeed.module.scss";
import PropTypes from "prop-types";
import PostItem from "../PostItem/PostItem";

const PostFeed = props => {
  let posts = null;

  if (props.posts) {
    posts = props.posts.map(post => (
      <PostItem
        key={post._id}
        post={post}
        user={props.user}
        onDeletePost={props.onDeletePost}
        onLikePost={props.onLikePost}
        onDisLikePost={props.onDisLikePost}
        showActions={props.showActions}
      />
    ));
  }
  return <div className={classes.PostFeed}>{posts}</div>;
};

PostFeed.propTypes = {
  showActions: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  posts: PropTypes.array,
  post: PropTypes.object,
  onDeletePost: PropTypes.func,
  onLikePost: PropTypes.func,
  onDisLikePost: PropTypes.func
};

export default PostFeed;
