import _ from "lodash";
import moment from "moment";

import Users from "./dummyusers";
import Tweets from "./dummytweets";

import { ApiCall } from "config/api";
import { checkUser, sortByLatestDate, extractObjDataById } from "utils/utils";

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
    const extractedUserObj = extractObjDataById(
      Users,
      "user_id",
      params.user_id
    );

    const userSpecificFilterData = Tweets.filter(item =>
      extractedUserObj.user_follows.includes(item.user_id)
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
    const userData = extractObjDataById(Users, "user_id", params.user_id);
    userData.user_tweets.push(newTweet);
    Tweets.push(newTweet);
    const immutableData = [...Tweets];
    const arrOfUserFollows = userData.user_follows;
    const userSpecificFilterData = immutableData.filter(item =>
      arrOfUserFollows.includes(item.user_id)
    );
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
    const userData = extractObjDataById(Users, "user_id", params.user_id);
    userData.user_follows.push(params.toUser);

    const followedUserData = extractObjDataById(
      Users,
      "user_id",
      params.toUser
    );
    followedUserData.user_followed_by.push(params.user_id);

    const arrOfUserFollows = userData.user_follows;
    const userSpecificFilterData = Tweets.filter(item =>
      arrOfUserFollows.includes(item.user_id)
    );
    // console.log("userSpecificFilterData", userSpecificFilterData);
    const TweetsFilterByDate = sortByLatestDate(userSpecificFilterData);
    if (userData === undefined) {
      reject({ error: "No user profile found" });
    } else {
      resolve({ users: Users, tweets: TweetsFilterByDate });
    }
  });
};

export const unFollowUser = params => {
  return new Promise((resolve, reject) => {
    const userData = extractObjDataById(Users, "user_id", params.user_id);

    if (userData.user_follows.includes(params.toUser)) {
      let id = userData.user_follows.indexOf(params.toUser);
      userData.user_follows.splice(id, 1);
    }

    const followedUserData = extractObjDataById(
      Users,
      "user_id",
      params.toUser
    );

    if (followedUserData.user_followed_by.includes(params.user_id)) {
      let id = followedUserData.user_followed_by.indexOf(params.user_id);
      followedUserData.user_followed_by.splice(id, 1);
    }

    const arrOfUserFollows = userData.user_follows;
    const userSpecificFilterData = Tweets.filter(item =>
      arrOfUserFollows.includes(item.user_id)
    );
    // console.log("userSpecificFilterData", userSpecificFilterData);
    const TweetsFilterByDate = sortByLatestDate(userSpecificFilterData);
    if (userData === undefined) {
      reject({ error: "No user profile found" });
    } else {
      resolve({ users: Users, tweets: TweetsFilterByDate });
    }
  });
};

export const ApiCallForRegister = params => {
  return new Promise((resolve, reject) => {
    let data = params.data;
    const findId = _.findIndex(Users, { email: data.email });
    if (findId !== -1) {
      reject({ alreadyRegistered: true });
    } else {
      const schemaModel = {
        user_id: JSON.stringify(++userTweetCounter),
        email: data.email,
        user_name: data.username,
        password: data.password,
        user_follows: [],
        user_followed_by: [],
        user_tweets: []
      };
      Users.push(schemaModel);
      resolve({ registerSuccess: true });
    }
  });
};
