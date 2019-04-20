import { actionTypes } from "./ActionTypes";
import axios from "../../api/DevConnector";

// CLEAR CURRENT POST AFTER LOGOUT ...
export const clearCurrentPost = () => {
  return {
    type: actionTypes.CLEAR_CURRENT_POST
  };
};
// POST SOMETHING WENT WRONG ACTION ...
const postSomethingWentWrong = somethingWentWrong => {
  return {
    type: actionTypes.POST_SOMETHING_WENT_WRONG,
    somethingWentWrong
  };
};
export const postSomethingWentWrongCloseHandler = () => {
  return {
    type: actionTypes.POST_SOMETHING_WENT_WRONG_CLOSE
  };
};

// ADD POST ACTIONS ...
const addPostStart = () => {
  return {
    type: actionTypes.ADD_POST_START
  };
};
const addPostSuccess = post => {
  return {
    type: actionTypes.ADD_POST_SUCCESS,
    post
  };
};
const addPostFail = errors => {
  return {
    type: actionTypes.ADD_POST_FAIL,
    errors
  };
};
export const addPost = postData => {
  return async dispatch => {
    try {
      dispatch(addPostStart());
      const response = await axios.post("/api/posts", postData);
      dispatch(addPostSuccess(response.data));
    } catch (error) {
      if (error.response !== undefined) {
        dispatch(addPostFail(error.response.data));
      } else {
        dispatch(postSomethingWentWrong(error.message));
      }
    }
  };
};

// ADD COMMENT ACTIONS ...
const addCommentStart = () => {
  return {
    type: actionTypes.ADD_COMMENT_START
  };
};
const addCommentSuccess = post => {
  return {
    type: actionTypes.ADD_COMMENT_SUCCESS,
    post
  };
};
const addCommentFail = errors => {
  return {
    type: actionTypes.ADD_COMMENT_FAIL,
    errors
  };
};
export const addComment = (postId, commentFormData) => {
  return async dispatch => {
    try {
      dispatch(addCommentStart());
      const response = await axios.post(
        `/api/posts/comment/${postId}`,
        commentFormData
      );
      dispatch(addCommentSuccess(response.data));
    } catch (error) {
      if (error.response !== undefined) {
        dispatch(addCommentFail(error.response.data));
      } else {
        dispatch(postSomethingWentWrong(error.message));
      }
    }
  };
};

// ADD COMMENT ACTIONS ...
const deleteCommentStart = () => {
  return {
    type: actionTypes.DELETE_COMMENT_START
  };
};
const deleteCommentSuccess = post => {
  return {
    type: actionTypes.DELETE_COMMENT_SUCCESS,
    post
  };
};
const deleteCommentFail = errors => {
  return {
    type: actionTypes.DELETE_COMMENT_FAIL,
    errors
  };
};
export const deleteComment = (commentId, postId) => {
  return async dispatch => {
    try {
      dispatch(deleteCommentStart());
      const response = await axios.delete(
        `/api/posts/comment/${postId}/${commentId}`
      );
      dispatch(deleteCommentSuccess(response.data));
    } catch (error) {
      if (error.response !== undefined) {
        dispatch(deleteCommentFail(error.response.data));
      } else {
        dispatch(postSomethingWentWrong(error.message));
      }
    }
  };
};

// DELETE POST ACTIONS ...
const deletePostStart = () => {
  return {
    type: actionTypes.DELETE_POST_START
  };
};
const deletePostSuccess = postId => {
  return {
    type: actionTypes.DELETE_POST_SUCCESS,
    postId
  };
};
const deletePostFail = errors => {
  return {
    type: actionTypes.DELETE_POST_FAIL,
    errors
  };
};
export const deletePost = postId => {
  return async dispatch => {
    try {
      dispatch(deletePostStart());
      const response = await axios.delete(`/api/posts/${postId}`);

      if (response.data.success) {
        dispatch(deletePostSuccess(postId));
      }
    } catch (error) {
      if (error.response !== undefined) {
        dispatch(deletePostFail(error.response.data));
      } else {
        dispatch(postSomethingWentWrong(error.message));
      }
    }
  };
};

// GET  POSTS ACTIONS ...
const getPostsStart = () => {
  return {
    type: actionTypes.GET_POSTS_START
  };
};
const getPostsSuccess = posts => {
  return {
    type: actionTypes.GET_POSTS_SUCCESS,
    posts
  };
};
const getPostsFail = errors => {
  return {
    type: actionTypes.GET_POSTS_FAIL,
    errors
  };
};
export const getPosts = () => {
  return async dispatch => {
    try {
      dispatch(getPostsStart());
      const response = await axios.get("/api/posts");
      dispatch(getPostsSuccess(response.data));
    } catch (error) {
      if (error.response !== undefined) {
        dispatch(getPostsFail(error.response.data));
      } else {
        dispatch(postSomethingWentWrong(error.message));
      }
    }
  };
};

//GET POST ACTIONS ...
const getPostStart = () => {
  return {
    type: actionTypes.GET_POST_START
  };
};
const getPostSuccess = post => {
  return {
    type: actionTypes.GET_POST_SUCCESS,
    post
  };
};
const getPostFail = errors => {
  return {
    type: actionTypes.GET_POST_FAIL,
    errors
  };
};
export const getPost = postId => {
  return async dispatch => {
    try {
      dispatch(getPostStart());
      const response = await axios.get(`/api/posts/${postId}`);
      dispatch(getPostSuccess(response.data));
    } catch (error) {
      if (error.response !== undefined) {
        dispatch(getPostFail(error.response.data));
      } else {
        dispatch(postSomethingWentWrong(error.message));
      }
    }
  };
};
// LIKE POST ACTION ...
export const likePost = postId => {
  return async dispatch => {
    try {
      const response = await axios.post(`/api/posts/like/${postId}`);
      if (response) {
        dispatch(getPosts());
      }
    } catch (error) {
      dispatch(postSomethingWentWrong(error.message));
    }
  };
};

// DISLIKE POST ACTION...
export const disLikePost = postId => {
  return async dispatch => {
    try {
      const response = await axios.post(`/api/posts/unlike/${postId}`);
      if (response) {
        dispatch(getPosts());
      }
    } catch (error) {
      dispatch(postSomethingWentWrong(error.message));
    }
  };
};
