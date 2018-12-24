import { fetchUser, followUser } from "server/operations";

export function fetchUserDataError(bool, error) {
  return {
    type: "FETCH_USER_DATA_ERROR",
    hasError: bool,
    error
  };
}

export function fetchUserDataInProcess(bool) {
  return {
    type: "FETCH_USER_DATA_IN_PROCESS",
    inProcess: bool
  };
}

export function fetchUserDataSuccess(response) {
  return {
    type: "FETCH_USER_DATA_SUCCESS",
    response
  };
}

export function resetUserData() {
  return {
    type: "RESET_USER_DATA"
  };
}

export function fetchUserAction(url, formData) {
  return dispatch => {
    console.log("Into fetch user data action", formData.userid);
    dispatch(fetchUserDataInProcess(true));

    fetchUser({ user_id: formData.userid })
      .then(responseJson => {
        console.log("dummy response user data api", responseJson);
        setTimeout(() => {
          dispatch(fetchUserDataSuccess(responseJson));
          dispatch(fetchUserDataInProcess(false));
        }, 200);
      })
      .catch(err => {
        console.log("err in user data api", err);
        dispatch(fetchUserDataError(err));
        dispatch(fetchUserDataInProcess(false));
      });
  };
}

export function updateUserError(bool, error) {
  return {
    type: "UPDATE_USER_DATA_ERROR",
    hasError: bool,
    error
  };
}

export function udpateUserInProcess(bool) {
  return {
    type: "UPDATE_USER_IN_PROCESS",
    inProcess: bool
  };
}

export function updateUserSuccess(response) {
  return {
    type: "UPDATE_USER_SUCCESS",
    response
  };
}

export function updateUser(url, formData, action) {
  return dispatch => {
    console.log("Into update user data action", formData.userid, action);
    dispatch(udpateUserInProcess(true));

    if (action === "follow") {
      followUser({ user_id: formData.userid, toUser: formData.userToFollow })
        .then(responseJson => {
          console.log("dummy response user update api", responseJson);
          setTimeout(() => {
            dispatch(updateUserSuccess(responseJson));
            dispatch(udpateUserInProcess(false));
          }, 200);
        })
        .catch(err => {
          console.log("err in user update api", err);
          dispatch(updateUserError(err));
          dispatch(udpateUserInProcess(false));
        });
    } else if (action === "unfollow") {
      followUser({ user_id: formData.userid, toUser: formData.userToFollow })
        .then(responseJson => {
          console.log("dummy response user update api", responseJson);
          setTimeout(() => {
            dispatch(updateUserSuccess(responseJson));
            dispatch(udpateUserInProcess(false));
          }, 200);
        })
        .catch(err => {
          console.log("err in user update api", err);
          dispatch(updateUserError(err));
          dispatch(udpateUserInProcess(false));
        });
    }
  };
}
