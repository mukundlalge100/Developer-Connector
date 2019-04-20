import { actionTypes } from "./ActionTypes";
import axios from "../../api/DevConnector";

// SOMETHING WENT WRONG ACTIONS ...
const profileSomethingWentWrong = somethingWentWrong => {
  return {
    type: actionTypes.PROFILE_SOMETHING_WENT_WRONG,
    somethingWentWrong: somethingWentWrong
  };
};

export const profileSomethingWentWrongCloseHandler = () => {
  return {
    type: actionTypes.PROFILE_SOMETHING_WENT_WRONG_CLOSE
  };
};

// CREATE OR UPDATE PROFILE ACTIONS...
const createProfileStart = () => {
  return {
    type: actionTypes.CREATE_PROFILE_START
  };
};
const createProfileSuccess = profile => {
  return {
    type: actionTypes.CREATE_PROFILE_SUCCESS,
    profile: profile
  };
};
const createProfileFail = errors => {
  return {
    type: actionTypes.CREATE_PROFILE_FAIL,
    errors
  };
};
export const createProfile = (profileData, history) => {
  return async dispatch => {
    try {
      dispatch(createProfileStart());
      const response = await axios.post("/api/profiles", profileData);
      dispatch(createProfileSuccess(response.data));
      history.push("/dashboard");
    } catch (error) {
      if (error.response !== undefined) {
        dispatch(createProfileFail(error.response.data));
      } else {
        dispatch(profileSomethingWentWrong(error.message));
      }
    }
  };
};

// GET PROFILE ACTIONS IF ALREADY EXISTS...
const getProfilesStart = () => {
  return {
    type: actionTypes.GET_PROFILES_START
  };
};
const getProfilesSuccess = profiles => {
  return {
    type: actionTypes.GET_PROFILES_SUCCESS,
    profiles: profiles
  };
};
const getProfilesFail = errors => {
  return {
    type: actionTypes.GET_PROFILES_FAIL,
    errors
  };
};
export const getProfiles = () => {
  return async dispatch => {
    try {
      dispatch(getProfilesStart());
      const response = await axios.get("/api/profiles/all");
      dispatch(getProfilesSuccess(response.data));
    } catch (error) {
      if (error.response !== undefined) {
        dispatch(getProfilesFail(error.response.data));
      } else {
        dispatch(profileSomethingWentWrong(error.message));
      }
    }
  };
};

// GET PROFILE ACTIONS IF ALREADY EXISTS...
const getProfileStart = () => {
  return {
    type: actionTypes.GET_PROFILE_START
  };
};
const getProfileSuccess = profile => {
  return {
    type: actionTypes.GET_PROFILE_SUCCESS,
    profile: profile
  };
};
const getProfileFail = errors => {
  return {
    type: actionTypes.GET_PROFILE_FAIL,
    errors
  };
};
export const getProfile = () => {
  return async dispatch => {
    try {
      dispatch(getProfileStart());
      const response = await axios.get("/api/profiles");
      dispatch(getProfileSuccess(response.data));
    } catch (error) {
      if (error.response !== undefined) {
        dispatch(getProfileFail(error.response.data));
      } else {
        dispatch(profileSomethingWentWrong(error.message));
      }
    }
  };
};

// GET PROFILE BY HANDLE ACTIONS ...
const getProfileByHandleStart = () => {
  return {
    type: actionTypes.GET_PROFILE_BY_HANDLE_START
  };
};
const getProfileByHandleSuccess = profile => {
  return {
    type: actionTypes.GET_PROFILE_BY_HANDLE_SUCCESS,
    profile: profile
  };
};
const getProfileByHandleFail = errors => {
  return {
    type: actionTypes.GET_PROFILE_BY_HANDLE_FAIL,
    errors
  };
};
export const getProfileByHandle = handle => {
  return async dispatch => {
    try {
      dispatch(getProfileByHandleStart());
      const response = await axios.get(`/api/profiles/handle/${handle}`);
      dispatch(getProfileByHandleSuccess(response.data));
    } catch (error) {
      if (error.response !== undefined) {
        dispatch(getProfileByHandleFail(error.response.data));
      } else {
        dispatch(profileSomethingWentWrong(error.message));
      }
    }
  };
};

// ADD EXPERIENCE ACTIONS ...
const addExperienceStart = () => {
  return {
    type: actionTypes.ADD_EXPERIENCE_START
  };
};
const addExperienceSuccess = profile => {
  return {
    type: actionTypes.ADD_EXPERIENCE_SUCCESS,
    profile
  };
};
const addExperienceFail = errors => {
  return {
    type: actionTypes.ADD_EXPERIENCE_FAIL,
    errors
  };
};
export const addExperience = (experienceData, history) => {
  return async dispatch => {
    try {
      dispatch(addExperienceStart());
      const response = await axios.post(
        "/api/profiles/experience",
        experienceData
      );
      dispatch(addExperienceSuccess(response.data));
      history.push("/dashboard");
    } catch (error) {
      if (error.response !== undefined) {
        dispatch(addExperienceFail(error.response.data));
      } else {
        dispatch(profileSomethingWentWrong(error.message));
      }
    }
  };
};

// ADD EDUCATION ACTIONS ...
const addEducationStart = () => {
  return {
    type: actionTypes.ADD_EDUCATION_START
  };
};
const addEducationSuccess = profile => {
  return {
    type: actionTypes.ADD_EDUCATION_SUCCESS,
    profile
  };
};
const addEducationFail = errors => {
  return {
    type: actionTypes.ADD_EDUCATION_FAIL,
    errors
  };
};
export const addEducation = (educationData, history) => {
  return async dispatch => {
    try {
      dispatch(addEducationStart());
      const response = await axios.post(
        "/api/profiles/education",
        educationData
      );
      dispatch(addEducationSuccess(response.data));
      history.push("/dashboard");
    } catch (error) {
      if (error.response !== undefined) {
        dispatch(addEducationFail(error.response.data));
      } else {
        dispatch(profileSomethingWentWrong(error.message));
      }
    }
  };
};

// DELETE ACCOUNT AND PROFILE ACTIONS ...
const deleteAccountStart = () => {
  return {
    type: actionTypes.DELETE_ACCOUNT_START
  };
};

const deleteAccountSuccess = () => {
  return {
    type: actionTypes.DELETE_ACCOUNT_SUCCESS
  };
};

const deleteAccountFail = somethingWentWrong => {
  return {
    type: actionTypes.DELETE_ACCOUNT_FAIL,
    somethingWentWrong: somethingWentWrong
  };
};

export const deleteAccount = history => {
  return async dispatch => {
    try {
      const isDelete = window.confirm(
        "Are you sure about deleting your account ? This is undone action."
      );
      if (isDelete) {
        dispatch(deleteAccountStart());
        await axios.delete("/api/profiles");
        dispatch(deleteAccountSuccess());
        history.push("/signup");
      }
    } catch (error) {
      if (error.response !== undefined) {
        dispatch(deleteAccountFail(error.response.data));
      } else {
        dispatch(profileSomethingWentWrong(error.message));
      }
    }
  };
};

// DELETE EXPERIENCE RELATED ACTIONS ...
const deleteExperienceStart = () => {
  return {
    type: actionTypes.DELETE_EXPERIENCE_START
  };
};
const deleteExperienceSuccess = profile => {
  return {
    type: actionTypes.DELETE_EXPERIENCE_SUCCESS,
    profile
  };
};
const deleteExperienceFail = errors => {
  return {
    type: actionTypes.DELETE_EXPERIENCE_FAIL,
    errors
  };
};

export const deleteExperience = (experienceId, history) => {
  return async dispatch => {
    try {
      dispatch(deleteExperienceStart());
      const response = await axios.delete(
        `/api/profiles/experience/${experienceId}`
      );
      dispatch(deleteExperienceSuccess(response.data));
      history.push("/dashboard");
    } catch (error) {
      if (error.response !== undefined) {
        dispatch(deleteExperienceFail(error.response.data));
      } else {
        dispatch(profileSomethingWentWrong(error.message));
      }
    }
  };
};

// DELETE EXPERIENCE RELATED ACTIONS ...
const deleteEducationStart = () => {
  return {
    type: actionTypes.DELETE_EDUCATION_START
  };
};
const deleteEducationSuccess = profile => {
  return {
    type: actionTypes.DELETE_EDUCATION_SUCCESS,
    profile
  };
};
const deleteEducationFail = errors => {
  return {
    type: actionTypes.DELETE_EDUCATION_FAIL,
    errors
  };
};

export const deleteEducation = (educationId, history) => {
  return async dispatch => {
    try {
      dispatch(deleteEducationStart());
      const response = await axios.delete(
        `/api/profiles/education/${educationId}`
      );
      dispatch(deleteEducationSuccess(response.data));
      history.push("/dashboard");
    } catch (error) {
      if (error.response !== undefined) {
        dispatch(deleteEducationFail(error.response.data));
      } else {
        dispatch(profileSomethingWentWrong(error.message));
      }
    }
  };
};
export const clearCurrentProfile = () => {
  return {
    type: actionTypes.CLEAR_CURRENT_PROFILE
  };
};
