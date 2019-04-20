import { actionTypes } from "../Actions/ActionTypes";
import { updateObject } from "../../Util/Util";

const initialState = {
  profile: null,
  profiles: null,
  profileLoading: false,
  profileErrors: {},
  somethingWentWrong: null
};
const profileSomethingWentWrong = (state, action) => {
  return updateObject(state, {
    profileLoading: false,
    somethingWentWrong: action.somethingWentWrong
  });
};
const profileSomethingWentWrongCloseHandler = state => {
  return updateObject(state, {
    somethingWentWrong: null
  });
};

const createProfileStart = state => {
  return updateObject(state, {
    profileLoading: true,
    somethingWentWrong: null
  });
};
const createProfileSuccess = (state, action) => {
  return updateObject(state, {
    profileLoading: false,
    profileErrors: {},
    somethingWentWrong: null,
    profile: action.profile
  });
};
const createProfileFail = (state, action) => {
  return updateObject(state, {
    profileLoading: false,
    profileErrors: action.errors
  });
};

// GET PROFILE RELETED METHOD ...
const getProfileStart = state => {
  return updateObject(state, {
    somethingWentWrong: null,
    profileLoading: true
  });
};
const getProfileSuccess = (state, action) => {
  return updateObject(state, {
    profileLoading: false,
    somethingWentWrong: null,
    profileErrors: {},
    profile: action.profile
  });
};
const getProfileFail = (state, action) => {
  return updateObject(state, {
    profileLoading: false,
    profileErrors: action.errors
  });
};
// GET PROFILE BY HANDLE RELETED METHODS ...
const getProfileByHandleStart = state => {
  return updateObject(state, {
    somethingWentWrong: null,
    profileLoading: true
  });
};
const getProfileByHandleSuccess = (state, action) => {
  return updateObject(state, {
    profileLoading: false,
    somethingWentWrong: null,
    profileErrors: {},
    profile: action.profile
  });
};
const getProfileByHandleFail = (state, action) => {
  return updateObject(state, {
    profileLoading: false,
    profileErrors: action.errors
  });
};

// GET PROFILES RELETED METHOD ...
const getProfilesStart = state => {
  return updateObject(state, {
    somethingWentWrong: null,
    profileLoading: true
  });
};
const getProfilesSuccess = (state, action) => {
  return updateObject(state, {
    profileLoading: false,
    somethingWentWrong: null,
    profileErrors: {},
    profiles: action.profiles
  });
};
const getProfilesFail = (state, action) => {
  return updateObject(state, {
    profileLoading: false,
    profileErrors: action.errors
  });
};

// ADD AND DELETE EXPERIENCE RELATED METHODS...
const addExperienceStart = state => {
  return updateObject(state, {
    profileLoading: true,
    somethingWentWrong: null
  });
};
const addExperienceSuccess = (state, action) => {
  return updateObject(state, {
    profileLoading: false,
    somethingWentWrong: null,
    profileErrors: {},
    profile: action.profile
  });
};
const addExperienceFail = (state, action) => {
  return updateObject(state, {
    profileLoading: false,
    profileErrors: action.errors
  });
};
const deleteExperienceStart = state => {
  return updateObject(state, {
    profileLoading: true,
    somethingWentWrong: null
  });
};
const deleteExperienceSuccess = (state, action) => {
  return updateObject(state, {
    profileLoading: false,
    somethingWentWrong: null,
    profileErrors: {},
    profile: action.profile
  });
};
const deleteExperienceFail = (state, action) => {
  return updateObject(state, {
    profileLoading: false,
    profileErrors: action.errors
  });
};

// ADD AND DELETE EDUCATION RELATED METHODS...
const addEducationStart = state => {
  return updateObject(state, {
    profileLoading: true,
    somethingWentWrong: null
  });
};
const addEducationSuccess = (state, action) => {
  return updateObject(state, {
    profileLoading: false,
    somethingWentWrong: null,
    profileErrors: {},
    profile: action.profile
  });
};
const addEducationFail = (state, action) => {
  return updateObject(state, {
    profileLoading: false,
    profileErrors: action.errors
  });
};

const deleteEducationStart = state => {
  return updateObject(state, {
    somethingWentWrong: null,
    profileLoading: true
  });
};
const deleteEducationSuccess = (state, action) => {
  return updateObject(state, {
    profile: action.profile,
    somethingWentWrong: null,
    profileLoading: false,
    profileErrors: {}
  });
};
const deleteEducationFail = (state, action) => {
  return updateObject(state, {
    profileLoading: false,
    profileErrors: action.errors
  });
};

// DELETE ACCOUNT AND PROFILE RELATED METHODS ...
const deleteAccountStart = state => {
  return updateObject(state, {
    profileLoading: true,
    somethingWentWrong: null
  });
};
const deleteAccountSuccess = state => {
  return updateObject(state, {
    profileLoading: false,
    somethingWentWrong: null,
    profile: {},
    profileErrors: {}
  });
};
const deleteAccountFail = (state, action) => {
  return updateObject(state, {
    profileLoading: false,
    profileErrors: action.errors
  });
};

//CLEAR CURRENT PROFILE WHEN USER LOGOUT...
const clearCurrentProfile = state => {
  return updateObject(state, {
    profile: null,
    profileLoading: false
  });
};
const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    // SOMETHING WENT WRONG RELATED REDUCER METHODS ...
    case actionTypes.PROFILE_SOMETHING_WENT_WRONG:
      return profileSomethingWentWrong(state, action);
    case actionTypes.PROFILE_SOMETHING_WENT_WRONG_CLOSE:
      return profileSomethingWentWrongCloseHandler(state);

    // CREATE OR UPDATE PROFILE RELATED REDUCER METHODS ...
    case actionTypes.CREATE_PROFILE_START:
      return createProfileStart(state);
    case actionTypes.CREATE_PROFILE_SUCCESS:
      return createProfileSuccess(state, action);
    case actionTypes.CREATE_PROFILE_FAIL:
      return createProfileFail(state, action);

    // GET PROFILE RELAED REDUCER METHODS ...
    case actionTypes.GET_PROFILE_START:
      return getProfileStart(state);
    case actionTypes.GET_PROFILE_SUCCESS:
      return getProfileSuccess(state, action);
    case actionTypes.GET_PROFILE_FAIL:
      return getProfileFail(state, action);

    // GET PROFILE BY HANDLE RELAED REDUCER METHODS ...
    case actionTypes.GET_PROFILE_BY_HANDLE_START:
      return getProfileByHandleStart(state);
    case actionTypes.GET_PROFILE_BY_HANDLE_SUCCESS:
      return getProfileByHandleSuccess(state, action);
    case actionTypes.GET_PROFILE_BY_HANDLE_FAIL:
      return getProfileByHandleFail(state, action);

    // GET PROFILES RELATED REDUCER METHODS ...
    case actionTypes.GET_PROFILES_START:
      return getProfilesStart(state);
    case actionTypes.GET_PROFILES_SUCCESS:
      return getProfilesSuccess(state, action);
    case actionTypes.GET_PROFILES_FAIL:
      return getProfilesFail(state, action);

    // DELETE ACCOUNT AND PROFILE REDUCER METHODS ...
    case actionTypes.DELETE_ACCOUNT_START:
      return deleteAccountStart(state);
    case actionTypes.DELETE_ACCOUNT_SUCCESS:
      return deleteAccountSuccess(state);
    case actionTypes.DELETE_ACCOUNT_FAIL:
      return deleteAccountFail(state, action);

    // ADD AND DELETE EXPERIENCE RELATED REDUCER METHODS ...
    case actionTypes.ADD_EXPERIENCE_START:
      return addExperienceStart(state);
    case actionTypes.ADD_EXPERIENCE_SUCCESS:
      return addExperienceSuccess(state, action);
    case actionTypes.ADD_EXPERIENCE_FAIL:
      return addExperienceFail(state, action);
    case actionTypes.DELETE_EXPERIENCE_START:
      return deleteExperienceStart(state);
    case actionTypes.DELETE_EXPERIENCE_SUCCESS:
      return deleteExperienceSuccess(state, action);
    case actionTypes.DELETE_EXPERIENCE_FAIL:
      return deleteExperienceFail(state);

    // ADD AND DELETE EDUCATION RELATED REDUCER METHODS ...
    case actionTypes.ADD_EDUCATION_START:
      return addEducationStart(state);
    case actionTypes.ADD_EDUCATION_SUCCESS:
      return addEducationSuccess(state, action);
    case actionTypes.ADD_EDUCATION_FAIL:
      return addEducationFail(state, action);
    case actionTypes.DELETE_EDUCATION_START:
      return deleteEducationStart(state);
    case actionTypes.DELETE_EDUCATION_SUCCESS:
      return deleteEducationSuccess(state, action);
    case actionTypes.DELETE_EDUCATION_FAIL:
      return deleteEducationFail(state, action);

    //CLEAR CURRENT PROFILE RELATED REDUCER METHODS  ...
    case actionTypes.CLEAR_CURRENT_PROFILE:
      return clearCurrentProfile(state);

    default:
      return state;
  }
};

export default ProfileReducer;
