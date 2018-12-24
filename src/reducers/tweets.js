export function get_tweets(state = {}, action) {
  switch (action.type) {
    case "FETCH_TWEETS_ERROR":
      state = {
        ...state,
        hasError: true,
        error: action.error
      };
      return state;

    case "FETCH_TWEETS_IN_PROCESS":
      return { fetchSuccess: false, inProcess: action.inProcess };

    case "FETCH_TWEETS_SUCCESS":
      console.log("responseToBeSend", action.response);
      state = {
        ...state,
        fetchSuccess: true,
        response: action.response
      };
      return state;

    case "RESET_TWEETS":
      state = {};
      return state;

    default:
      return state;
  }
}

export function post_tweet(state = {}, action) {
  switch (action.type) {
    case "POST_TWEET_ERROR":
      state = {
        ...state,
        hasError: true,
        error: action.error
      };
      return state;

    case "POST_TWEET_IN_PROCESS":
      return { publishTweet: false, inProcess: action.inProcess };

    case "POST_TWEET_SUCCESS":
      console.log("responseToBeSend post tweet", action.response);
      state = {
        ...state,
        publishTweet: true,
        response: action.response
      };
      return state;

    case "RESET_TWEETS":
      state = {};
      return state;

    default:
      return state;
  }
}
