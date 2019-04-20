import { actionTypes } from "./ActionTypes";
import axios from "../../api/DevConnector";
import jwtDecode from "jwt-decode";
import { setAuthToken } from "../../Util/Util";
import * as actions from "./IndexAction";

const authSomethingWentWrong = somethingWentWrong => {
  return {
    type: actionTypes.AUTH_SOMETHING_WENT_WRONG,
    somethingWentWrong: somethingWentWrong
  };
};

export const authSomethingWentWrongCloseHandler = () => {
  return {
    type: actionTypes.AUTH_SOMETHING_WENT_WRONG_CLOSE
  };
};

const authSignUpStart = () => {
  return {
    type: actionTypes.AUTH_SIGNUP_START
  };
};
const authSignUpSuccess = () => {
  return {
    type: actionTypes.AUTH_SIGNUP_SUCCESS
  };
};
const authSignUpFail = errors => {
  return {
    type: actionTypes.AUTH_SIGNUP_FAIL,
    errors: errors
  };
};
export const authSignUp = (userData, history) => {
  return async dispatch => {
    dispatch(authSignUpStart());
    try {
      await axios.post("/api/users/signup", userData);
      dispatch(authSignUpSuccess());
      history.push("/login");
    } catch (error) {
      if (error.response !== undefined) {
        dispatch(authSignUpFail(error.response.data));
      } else {
        dispatch(authSomethingWentWrong(error.message));
      }
    }
  };
};

const authLogInStart = () => {
  return {
    type: actionTypes.AUTH_LOGIN_START
  };
};
const authLogInSuccess = user => {
  return {
    type: actionTypes.AUTH_LOGIN_SUCCESS,
    user
  };
};

const authLogInFail = errors => {
  return {
    type: actionTypes.AUTH_LOGIN_FAIL,
    errors
  };
};

export const authLogIn = (userData, history) => {
  return async dispatch => {
    dispatch(authLogInStart());
    try {
      const response = await axios.post("/api/users/login", userData);
      const { token } = response.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const user = jwtDecode(token);
      dispatch(authLogInSuccess(user));
      history.push("/dashboard");
    } catch (error) {
      if (error.response !== undefined) {
        dispatch(authLogInFail(error.response.data));
      } else {
        dispatch(authSomethingWentWrong(error.message));
      }
    }
  };
};
export const authLogOut = history => {
  setAuthToken(false);
  localStorage.removeItem("jwtToken");
  history.push("/");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkExpiredTime = (expiredTime, history) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogOut(history));
    }, expiredTime * 1000);
  };
};

export const authCheckLogInState = history => {
  return dispatch => {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      const user = jwtDecode(localStorage.jwtToken);
      const currenTime = Date.now() / 1000;
      if (user.exp < currenTime) {
        dispatch(authLogOut(history));
        dispatch(actions.clearCurrentProfile());
        return;
      }
      const totalExpTimeLeft = user.exp - currenTime;
      dispatch(authLogInSuccess(user));
      dispatch(checkExpiredTime(totalExpTimeLeft, history));
    }
  };
};
