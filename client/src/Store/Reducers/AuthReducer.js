import { actionTypes } from "../Actions/ActionTypes";
import { updateObject, isEmpty } from "../../Util/Util";

const initialState = {
  authLogInFormLoading: false,
  authSignUpFormLoading: false,

  authLogInFormErrors: {},
  authSignUpFormErrors: {},

  deleteAccountLoading: false,

  somethingWentWrong: null,
  user: {},
  isAuthenticated: false
};

const authSomethingWentWrong = (state, action) => {
  return updateObject(state, {
    authLogInFormLoading: false,
    authSignUpFormLoading: false,
    somethingWentWrong: action.somethingWentWrong
  });
};
const authSomethingWentWrongCloseHandler = state => {
  return updateObject(state, {
    somethingWentWrong: null
  });
};
const authSignUpStart = state => {
  return updateObject(state, {
    somethingWentWrong: null,
    authSignUpFormLoading: true,
    authSignUpFormErrors: {}
  });
};
const authSignUpSuccess = state => {
  return updateObject(state, {
    authSignUpFormLoading: false,
    somethingWentWrong: null,
    authSignUpFormErrors: {}
  });
};

const authSignUpFail = (state, action) => {
  return updateObject(state, {
    authSignUpFormLoading: false,
    authSignUpFormErrors: action.errors
  });
};

const authLogInStart = state => {
  return updateObject(state, {
    authLogInFormLoading: true,
    authLogInFormErrors: {},
    somethingWentWrong: null
  });
};

const authLogInSuccess = (state, action) => {
  return updateObject(state, {
    somethingWentWrong: null,
    authLogInFormLoading: false,
    authLogInFormErrors: {},
    user: action.user,
    isAuthenticated: !isEmpty(action.user)
  });
};
const authLogInFail = (state, action) => {
  return updateObject(state, {
    authLogInFormLoading: false,
    authLogInFormErrors: action.errors
  });
};

const deleteAccountStart = state => {
  return updateObject(state, {
    deleteAccountLoading: true,
    somethingWentWrong: null
  });
};
const deleteAccountSuccess = (state, action) => {
  return updateObject(state, {
    deleteAccountLoading: false,
    somethingWentWrong: null,
    user: {},
    isAuthenticated: false
  });
};
const deleteAccountFail = (state, action) => {
  return updateObject(state, {
    deleteAccountLoading: false,
    somethingWentWrong: action.somethingWentWrong
  });
};

const authLogOut = state => {
  return updateObject(state, {
    user: {},
    isAuthenticated: false
  });
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SOMETHING_WENT_WRONG:
      return authSomethingWentWrong(state, action);
    case actionTypes.AUTH_SOMETHING_WENT_WRONG_CLOSE:
      return authSomethingWentWrongCloseHandler(state);

    case actionTypes.AUTH_LOGIN_START:
      return authLogInStart(state);
    case actionTypes.AUTH_LOGIN_SUCCESS:
      return authLogInSuccess(state, action);
    case actionTypes.AUTH_LOGIN_FAIL:
      return authLogInFail(state, action);

    case actionTypes.DELETE_ACCOUNT_START:
      return deleteAccountStart(state);
    case actionTypes.DELETE_ACCOUNT_SUCCESS:
      return deleteAccountSuccess(state);
    case actionTypes.DELETE_ACCoUNT_FAIL:
      return deleteAccountFail(state, action);

    case actionTypes.AUTH_SIGNUP_START:
      return authSignUpStart(state);
    case actionTypes.AUTH_SIGNUP_SUCCESS:
      return authSignUpSuccess(state);
    case actionTypes.AUTH_SIGNUP_FAIL:
      return authSignUpFail(state, action);

    case actionTypes.AUTH_LOGOUT:
      return authLogOut(state);

    default:
      return state;
  }
};

export default AuthReducer;
