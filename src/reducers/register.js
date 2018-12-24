export function auth_login(state = {}, action) {
  switch (action.type) {
    case "REGISTRATION_ERROR":
      state = {
        ...state,
        hasError: true,
        error: action.error
      };
      return state;

    case "REGISTRATION_IN_PROCESS":
      return action.inProcess;

    case "REGISTRATION_SUCCESS":
      console.log("responseToBeSend", action.registrationResponse);
      state = {
        ...state,
        registrationAccess: true,
        response: action.registrationResponse
      };
      return state;

    case "REGISTRATION_RESET":
      state = {};
      return state;

    default:
      return state;
  }
}
