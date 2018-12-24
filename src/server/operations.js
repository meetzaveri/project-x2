import _ from "lodash";
import moment from "moment";

import Users from "./dummyusers";
import Tweets from "./dummytweets";

import { ApiCall } from "config/api";
import { checkUser, sortByLatestDate } from "utils/utils";

let dummyTweetCounter = 220;
let userTweetCounter = 110;

export const ApiCallForLogin = params => {
  return new Promise((resolve, reject) => {
    let data = params.data;
    const isUser = checkUser(Users, data);
    if (isUser) {
      if (isUser.success) {
        resolve(isUser.data);
      } else {
        reject(isUser.error);
      }
    } else {
      reject({ error: "No user found" });
    }
  });
};

export const fetchAndSortTweets = params => {
  return new Promise((resolve, reject) => {
    const findId = _.findIndex(Users, { user_id: params.user_id });
    const arrOfUserFollows = Users[findId].user_follows;
    console.log("arrOfUserFollows", arrOfUserFollows);
    const userSpecificFilterData = Tweets.filter(item =>
      arrOfUserFollows.includes(item.user_id)
    );
    // console.log("userSpecificFilterData", userSpecificFilterData);
    const filterByDate = sortByLatestDate(userSpecificFilterData);
    console.log("filterByDate", filterByDate);
    if (filterByDate) {
      resolve(filterByDate);
    } else {
      reject({ error: "No data found" });
    }
  });
};

export const addTweet = params => {
  return new Promise((resolve, reject) => {
    const newTweet = {
      tweet_id: ++dummyTweetCounter,
      tweet_body: params.content,
      user_id: params.user_id,
      user_name: params.user_name,
      timestamp: moment().format()
    };
    const findId = _.findIndex(Users, { user_id: params.user_id });
    Users[findId].user_tweets.push(newTweet);
    Tweets.push(newTweet);
    console.log("Tweets", Tweets);
    const immutableData = [...Tweets];
    const arrOfUserFollows = Users[findId].user_follows;
    const userSpecificFilterData = immutableData.filter(item =>
      arrOfUserFollows.includes(item.user_id)
    );
    console.log("userSpecificFilterData", userSpecificFilterData);
    const filterByDateTweets = sortByLatestDate(userSpecificFilterData);
    resolve(filterByDateTweets);
  });
};

export const fetchUser = params => {
  return new Promise((resolve, reject) => {
    const findId = _.findIndex(Users, { user_id: params.user_id });
    const data = Users[findId];
    if (findId === -1) {
      reject({ error: "No user profile found" });
    } else {
      resolve(data);
    }
  });
};

export const followUser = params => {
  return new Promise((resolve, reject) => {
    const findId = _.findIndex(Users, { user_id: params.user_id });
    const data = Users[findId];
    data.user_follows.push(params.toUser);
    const findIdofFollowedUser = _.findIndex(Users, { user_id: params.toUser });
    const followedUserData = Users[findIdofFollowedUser];
    followedUserData.user_followed_by.push(params.user_id);

    const arrOfUserFollows = Users[findId].user_follows;
    console.log("arrOfUserFollows", arrOfUserFollows);
    const userSpecificFilterData = Tweets.filter(item =>
      arrOfUserFollows.includes(item.user_id)
    );
    // console.log("userSpecificFilterData", userSpecificFilterData);
    const TweetsFilterByDate = sortByLatestDate(userSpecificFilterData);
    if (findId === -1) {
      reject({ error: "No user profile found" });
    } else {
      resolve({ users: Users, tweets: TweetsFilterByDate });
    }
  });
};

export const ApiCallForRegister = params => {
  return new Promise((resolve, reject) => {
    let data = params.data;

    const schemaModel = {
      user_id: ++userTweetCounter,
      email: data,
      user_name: data.username,
      password: data.password,
      user_follows: [],
      user_followed_by: [],
      user_tweets: []
    };
    Users.push(schemaModel);
  });
};
