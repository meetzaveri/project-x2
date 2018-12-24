export function auth_login(state = {}, action) {
  switch (action.type) {
    case "LOGIN_ERROR":
      state = {
        ...state,
        hasError: true,
        error: action.error
      };
      return state;

    case "LOGIN_IN_PROCESS":
      return action.inProcess;

    case "LOGIN_SUCCESS":
      console.log("responseToBeSend", action.loginResponse);
      localStorage.setItem("token", "ABCDEFGHIJKL1234567890");
      localStorage.setItem("username", action.loginResponse.user_name);
      localStorage.setItem("userid", action.loginResponse.user_id);
      state = {
        ...state,
        loginAccess: true,
        response: action.loginResponse
      };
      return state;

    case "LOGIN_RESET":
      state = {};
      return state;

    default:
      return state;
  }
}
