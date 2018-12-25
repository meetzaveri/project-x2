import { ApiCallForRegister } from "server/operations";

export function registrationHasError(error) {
  return {
    type: "REGISTRATION_ERROR",
    hasError: true,
    error
  };
}

export function registrationInProcess(bool) {
  return {
    type: "REGISTRATION_IN_PROCESS",
    inProcess: bool
  };
}

export function registrationSuccess(registrationResponse) {
  return {
    type: "REGISTRATION_SUCCESS",
    registrationResponse
  };
}

export function resetRegistration() {
  return {
    type: "REGISTRATION_RESET"
  };
}

export function register(url, formData) {
  return dispatch => {
    console.log("Into register action", formData);
    dispatch(registrationInProcess(true));

    ApiCallForRegister({ data: formData })
      .then(responseJson => {
        console.log("dummy response register api", responseJson);
        setTimeout(() => {
          dispatch(registrationSuccess(responseJson));
          dispatch(registrationInProcess(false));
        }, 200);
      })
      .catch(err => {
        console.log("err in register api", err);
        dispatch(registrationHasError(err));
        dispatch(registrationInProcess(false));
      });
  };
}
