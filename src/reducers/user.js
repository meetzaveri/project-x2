export function fetch_user(state = {}, action) {
  switch (action.type) {
    case "FETCH_USER_DATA_ERROR":
      state = {
        ...state,
        hasError: true,
        error: action.error
      };
      return state;

    case "FETCH_USER_DATA_IN_PROCESS":
      return { fetchSuccess: false, inProcess: action.inProcess };

    case "FETCH_USER_DATA_SUCCESS":
      console.log("responseToBeSend", action.response);
      state = {
        ...state,
        fetchSuccess: true,
        response: action.response
      };
      return state;

    case "RESET_USER_DATA":
      state = {};
      return state;

    default:
      return state;
  }
}

export function update_user(state = {}, action) {
  switch (action.type) {
    case "UPDATE_USER_DATA_ERROR":
      state = {
        ...state,
        hasError: true,
        error: action.error
      };
      return state;

    case "UPDATE_USER_IN_PROCESS":
      return { updateUserSuccess: false, inProcess: action.inProcess };

    case "UPDATE_USER_SUCCESS":
      console.log("responseToBeSend", action.response);
      state = {
        ...state,
        updateUserSuccess: true,
        response: action.response
      };
      return state;

    case "RESET_USER_DATA":
      state = {};
      return state;

    default:
      return state;
  }
}
