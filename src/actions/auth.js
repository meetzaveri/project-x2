import { ApiCallForLogin } from "server/operations";

export function loginHasError(bool, error) {
  return {
    type: "LOGIN_ERROR",
    hasError: bool,
    error
  };
}

export function loginInProcess(bool) {
  return {
    type: "LOGIN_IN_PROCESS",
    inProcess: bool
  };
}

export function loginSuccess(loginResponse) {
  return {
    type: "LOGIN_SUCCESS",
    loginResponse
  };
}

export function resetLogin() {
  return {
    type: "LOGIN_RESET"
  };
}

export function login(url, formData) {
  return dispatch => {
    console.log("Into login action", formData);
    dispatch(loginInProcess(true));

    ApiCallForLogin({ data: formData })
      .then(responseJson => {
        console.log("dummy response login api", responseJson);
        setTimeout(() => {
          dispatch(loginSuccess(responseJson));
          dispatch(loginInProcess(false));
        }, 200);
      })
      .catch(err => {
        console.log("err in login api", err);
        dispatch(loginHasError(err));
        dispatch(loginInProcess(false));
      });
  };
}
