import React from "react";
import classes from "./PostComment.module.scss";
import utilClasses from "../../Util/Util.module.scss";
import { ReactComponent as Bin } from "../../Assets/SVG/close.svg";
import PropTypes from "prop-types";
const PostComment = props => {
  let postCommentItems;
  if (props.comments.length > 0) {
    postCommentItems = props.comments.map(comment => (
      <div className={classes.PostComment_Items} key={comment._id}>
        <div className={classes.PostComment_Items__User}>
          <img
            src={comment.avatar}
            alt="User Avatar"
            className={classes.PostComment_Items__User_Image}
          />
          <span className={classes.PostComment_Items__User_Name}>
            {comment.userName}
          </span>
        </div>
        <div className={classes.PostComment_Items__Text}>
          <p className={utilClasses.Paragraph}>{comment.text}</p>
          {props.user._id === comment.userId ? (
            <Bin
              className={classes.PostComment_Items__Text_Icon}
              onClick={() => props.onDeleteComment(comment._id)}
            />
          ) : null}
        </div>
      </div>
    ));
  }
  return (
    <div className={classes.PostComment}>
      {props.comments.length > 0 ? (
        <h2 className={utilClasses.Secondary__Heading}>Comments...</h2>
      ) : null}
      {postCommentItems}
    </div>
  );
};
PostComment.propTypes = {
  comments: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  onDeleteComment: PropTypes.func.isRequired
};

export default PostComment;
