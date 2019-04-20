import { actionTypes } from "../Actions/ActionTypes";
import { updateObject } from "../../Util/Util";

const initialState = {
  posts: null,
  post: null,
  postErrors: {},
  postLoading: false,
  somethingWentWrong: null
};

// SOMETHING WENT WRONG METHODS...
const postSomethingWentWrong = (state, action) => {
  return updateObject(state, {
    profileLoading: false,
    somethingWentWrong: action.somethingWentWrong
  });
};
const postSomethingWentWrongCloseHandler = state => {
  return updateObject(state, {
    somethingWentWrong: null
  });
};

//ADD POST METHODS ...
const addPostStart = state => {
  return updateObject(state, {
    postLoading: true,
    somethingWentWrong: null
  });
};
const addPostSuccess = (state, action) => {
  return updateObject(state, {
    postLoading: false,
    posts: [action.post, ...state.posts],
    somethingWentWrong: null,
    postErrors: {}
  });
};
const addPostFail = (state, action) => {
  return updateObject(state, {
    postLoading: false,
    somethingWentWrong: null,
    postErrors: action.errors
  });
};

//DELETE POST METHODS ...
const deletePostStart = state => {
  return updateObject(state, {
    postLoading: true,
    somethingWentWrong: null
  });
};
const deletePostSuccess = (state, action) => {
  return updateObject(state, {
    postLoading: false,
    posts: state.posts.filter(post => post._id !== action.postId),
    somethingWentWrong: null,
    postErrors: {}
  });
};
const deletePostFail = (state, action) => {
  return updateObject(state, {
    postLoading: false,
    somethingWentWrong: null,
    postErrors: action.errors
  });
};

// GET POSTS METHODS ...
const getPostsStart = state => {
  return updateObject(state, {
    postLoading: true,
    somethingWentWrong: null
  });
};
const getPostsSuccess = (state, action) => {
  return updateObject(state, {
    postLoading: false,
    posts: action.posts,
    somethingWentWrong: null,
    postErrors: {}
  });
};
const getPostsFail = (state, action) => {
  return updateObject(state, {
    postLoading: false,
    somethingWentWrong: null,
    postErrors: action.errors
  });
};
// GET POSTS METHODS ...
const getPostStart = state => {
  return updateObject(state, {
    postLoading: true,
    somethingWentWrong: null
  });
};
const getPostSuccess = (state, action) => {
  return updateObject(state, {
    postLoading: false,
    post: action.post,
    somethingWentWrong: null,
    postErrors: {}
  });
};
const getPostFail = (state, action) => {
  return updateObject(state, {
    postLoading: false,
    somethingWentWrong: null,
    postErrors: action.errors
  });
};

//ADD COMMENT METHODS ...
const addCommentStart = state => {
  return updateObject(state, {
    postLoading: true,
    somethingWentWrong: null
  });
};
const addCommentSuccess = (state, action) => {
  return updateObject(state, {
    postLoading: false,
    post: action.post,
    somethingWentWrong: null,
    postErrors: {}
  });
};
const addCommentFail = (state, action) => {
  return updateObject(state, {
    postLoading: false,
    somethingWentWrong: null,
    postErrors: action.errors
  });
};

//DELETE COMMENT METHODS ...
const deleteCommentStart = state => {
  return updateObject(state, {
    postLoading: true,
    somethingWentWrong: null
  });
};
const deleteCommentSuccess = (state, action) => {
  return updateObject(state, {
    postLoading: false,
    post: action.post,
    somethingWentWrong: null,
    postErrors: {}
  });
};
const deleteCommentFail = (state, action) => {
  return updateObject(state, {
    postLoading: false,
    somethingWentWrong: null,
    postErrors: action.errors
  });
};

const clearCurrentPost = state => {
  return updateObject(state, {
    post: null,
    posts: null,
    postErrors: {},
    postLoading: false
  });
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    // ADD POST METHODS ...
    case actionTypes.ADD_POST_START:
      return addPostStart(state);
    case actionTypes.ADD_POST_SUCCESS:
      return addPostSuccess(state, action);
    case actionTypes.ADD_POST_FAIL:
      return addPostFail(state, action);

    // DELETE POST METHODS ...
    case actionTypes.DELETE_POST_START:
      return deletePostStart(state);
    case actionTypes.DELETE_POST_SUCCESS:
      return deletePostSuccess(state, action);
    case actionTypes.DELETE_POST_FAIL:
      return deletePostFail(state, action);

    // GET POSTS METHODS ...
    case actionTypes.GET_POSTS_START:
      return getPostsStart(state);
    case actionTypes.GET_POSTS_SUCCESS:
      return getPostsSuccess(state, action);
    case actionTypes.GET_POSTS_FAIL:
      return getPostsFail(state, action);

    // GET POST METHODS ...
    case actionTypes.GET_POST_START:
      return getPostStart(state);
    case actionTypes.GET_POST_SUCCESS:
      return getPostSuccess(state, action);
    case actionTypes.GET_POST_FAIL:
      return getPostFail(state, action);

    // ADD COMMENT METHODS ...
    case actionTypes.ADD_COMMENT_START:
      return addCommentStart(state);
    case actionTypes.ADD_COMMENT_SUCCESS:
      return addCommentSuccess(state, action);
    case actionTypes.ADD_COMMENT_FAIL:
      return addCommentFail(state, action);

    // DELETE COMMENT METHODS ...
    case actionTypes.DELETE_COMMENT_START:
      return deleteCommentStart(state);
    case actionTypes.DELETE_COMMENT_SUCCESS:
      return deleteCommentSuccess(state, action);
    case actionTypes.DELETE_COMMENT_FAIL:
      return deleteCommentFail(state, action);

    // POST SOMETHING WENT WRONG METHODS ...
    case actionTypes.POST_SOMETHING_WENT_WRONG:
      return postSomethingWentWrong(state, action);
    case actionTypes.POST_SOMETHING_WENT_WRONG_CLOSE:
      return postSomethingWentWrongCloseHandler(state);

    // CLEAR POST AND POSTS AFTER LOGOUT ...
    case actionTypes.CLEAR_CURRENT_POST:
      return clearCurrentPost(state);

    default:
      return state;
  }
};

export default PostReducer;
