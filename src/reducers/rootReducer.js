import { combineReducers } from "redux";
import { auth_login } from "./auth";
import { get_tweets, post_tweet } from "./tweets";
import { fetch_user, update_user } from "./user";

export default combineReducers({
  auth_login,
  get_tweets,
  post_tweet,
  fetch_user,
  update_user
});
