import React from "react";
import classes from "./PostItem.module.scss";
import utilClasses from "../../Util/Util.module.scss";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ReactComponent as Like } from "../../Assets/SVG/thumbs-up.svg";
import { ReactComponent as DisLike } from "../../Assets/SVG/thumbs-down.svg";
import { ReactComponent as Bin } from "../../Assets/SVG/bin.svg";

const PostItem = props => {
  return (
    <div
      className={classes.PostItem}
      style={props.showActions ? { width: "100%" } : { width: "80%" }}
    >
      <div className={classes.PostItem_LinkContainer}>
        <Link
          className={classes.PostItem_LinkContainer__Link}
          to={`/profile/${props.post.userId._id}`}
        >
          <img
            src={props.post.avatar}
            alt="Avatar"
            className={classes.PostItem_LinkContainer__Link_Image}
          />
          <p className={classes.PostItem_LinkContainer__Link_UserName}>
            {props.post.userId.userName}
          </p>
        </Link>
      </div>
      <div className={classes.PostItem_PostDetails}>
        <p className={utilClasses.Paragraph}>{props.post.text}</p>
        {props.showActions ? (
          <div className={classes.PostItem_PostDetails__Actions}>
            <div className={classes.PostItem_PostDetails__Actions_Container}>
              {props.post.likes.filter(like => like.userId === props.user._id)
                .length > 0 ? (
                <Like
                  className={`${classes.PostItem_PostDetails__Icon} ${
                    classes.PostItem_PostDetails__Icon_Liked
                  }`}
                  onClick={() => props.onLikePost(props.post._id)}
                />
              ) : (
                <Like
                  className={classes.PostItem_PostDetails__Icon}
                  onClick={() => props.onLikePost(props.post._id)}
                />
              )}
              <span style={{ fontSize: "1.4rem" }}>
                {props.post.likes.length}
              </span>
            </div>
            <div className={classes.PostItem_PostDetails__Actions_Container}>
              {props.post.disLikes.filter(
                disLike => disLike.userId === props.user._id
              ).length > 0 ? (
                <DisLike
                  className={`${classes.PostItem_PostDetails__Icon} ${
                    classes.PostItem_PostDetails__Icon_DisLiked
                  }`}
                  onClick={() => props.onDisLikePost(props.post._id)}
                />
              ) : (
                <DisLike
                  className={classes.PostItem_PostDetails__Icon}
                  onClick={() => props.onDisLikePost(props.post._id)}
                />
              )}
              <span style={{ fontSize: "1.4rem" }}>
                {props.post.disLikes.length}
              </span>
            </div>
            <Link
              to={`/post/${props.post._id}`}
              className={classes.PostItem_PostDetails__Link}
            >
              Comments
            </Link>
            {props.post.userId._id === props.user._id ? (
              <Bin
                className={`${classes.PostItem_PostDetails__Icon} ${
                  classes.PostItem_PostDetails__Icon_Delete
                }`}
                onClick={() => props.onDeletePost(props.post._id)}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  showActions: PropTypes.bool.isRequired,
  onDeletePost: PropTypes.func,
  onLikePost: PropTypes.func,
  onDisLikePost: PropTypes.func
};

export default PostItem;
