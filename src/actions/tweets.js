import { fetchAndSortTweets, addTweet } from "server/operations";

export function fetchTweetsError(bool, error) {
  return {
    type: "FETCH_TWEETS_ERROR",
    hasError: bool,
    error
  };
}

export function fetchTweetsInProcess(bool) {
  return {
    type: "FETCH_TWEETS_IN_PROCESS",
    inProcess: bool
  };
}

export function fetchTweetsSuccess(response) {
  return {
    type: "FETCH_TWEETS_SUCCESS",
    response
  };
}

export function resetfetchTweets() {
  return {
    type: "RESET_TWEETS"
  };
}

export function fetchTweets(url, formData) {
  return dispatch => {
    console.log("Into fetch tweet action", formData.userid);
    dispatch(fetchTweetsInProcess(true));

    fetchAndSortTweets({ user_id: formData.userid })
      .then(responseJson => {
        console.log("dummy response tweets api", responseJson);
        setTimeout(() => {
          dispatch(fetchTweetsSuccess(responseJson));
          dispatch(fetchTweetsInProcess(false));
        }, 200);
      })
      .catch(err => {
        console.log("err in tweets api", err);
        dispatch(fetchTweetsError(err));
        dispatch(fetchTweetsInProcess(false));
      });
  };
}

export function postTweetError(bool, error) {
  return {
    type: "POST_TWEET_ERROR",
    hasError: bool,
    error
  };
}

export function postTweetInProcess(bool) {
  return {
    type: "POST_TWEET_IN_PROCESS",
    inProcess: bool
  };
}

export function postTweetSuccess(response) {
  return {
    type: "POST_TWEET_SUCCESS",
    response
  };
}

export function postTweet(url, formData) {
  return dispatch => {
    console.log("Into post tweet action", formData.userid);
    dispatch(postTweetInProcess(true));

    addTweet({
      user_id: formData.userid,
      content: formData.content,
      user_name: formData.username
    })
      .then(responseJson => {
        console.log("dummy response post tweet api", responseJson);
        setTimeout(() => {
          dispatch(postTweetSuccess(responseJson));
          dispatch(postTweetInProcess(false));
        }, 200);
      })
      .catch(err => {
        console.log("err in post tweet api", err);
        dispatch(postTweetError(err));
        dispatch(postTweetInProcess(false));
      });
  };
}
