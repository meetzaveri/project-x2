import React, { Component } from "react";
import queryString from "query-string";
import { connect } from "react-redux";

import ErrorBoundary from "wrappers/errorBoundary";
import { fetchTweets, postTweet } from "actions/tweets";
import { updateUser } from "actions/user";
import DashboardComponent from "components/dashboard";
import Routes from "config/routes";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTweetInput: "",
      tweets: [],
      fetchTweetsInProcess: false,
      toggleTweetInput: false,
      userid: null,
      postingTweetInProcess: false,
      updateUserInProcess: false,
      inputRestricted: false
    };
  }

  componentDidMount() {
    const cacheduserid = localStorage.getItem("userid");
    const parseQueryString = queryString.parse(this.props.location.search);
    const userid = parseQueryString.userid
      ? parseQueryString.userid
      : cacheduserid;
    const url = "dummyUrl";
    this.setState({ fetchTweetsInProcess: true, userid });
    this.props.fetchTweetsAPI(url, { userid });
  }

  static getDerivedStateFromProps(props, state) {
    const {
      fetchTweetsInProcess,
      postingTweetInProcess,
      updateUserInProcess,
      tweets
    } = state;

    if (
      props.getTweets.fetchSuccess === true &&
      fetchTweetsInProcess === true
    ) {
      console.log("get tweets", props.getTweets);
      return { fetchTweetsInProcess: false, tweets: props.getTweets.response };
    }

    if (
      props.postTweet.publishTweet === true &&
      postingTweetInProcess === true
    ) {
      return {
        postingTweetInProcess: false,
        tweets: props.postTweet.response
      };
    }

    if (
      props.updateUser.updateUserSuccess === true &&
      updateUserInProcess === true
    ) {
      return {
        updateUserInProcess: false,
        userData: props.updateUser.response,
        userUpdate: true,
        tweets: props.updateUser.response.tweets
      };
    }

    return null;
  }

  enableInputTweetBox = () => {
    this.setState({ toggleTweetInput: true });
  };

  disableInputTweetBox = () => {
    this.setState({ toggleTweetInput: false });
  };

  onChangeTextInput = e => {
    const { newTweetInput } = this.state;
    const name = e.target.name;
    const value = e.target.value;
    if (newTweetInput.length > 140) {
      this.setState({ [name]: value, inputRestricted: true });
    } else {
      this.setState({ [name]: value, inputRestricted: false });
    }
  };

  onSubmitTweet = text => {
    console.log("on submit tweet");
    const { userid, newTweetInput } = this.state;
    const username = localStorage.getItem("username");
    const url = "Dummyurl";
    const formData = { userid, content: newTweetInput, username };
    this.props.publishTweet(url, formData);
    this.setState({ postingTweetInProcess: true });
  };

  unfollowUser = userObj => {
    const { userid } = this.state;
    const url = "dummyurl";
    const formData = {
      userid: userid,
      userToFollow: userObj.user_id
    };
    this.props.followUserAPI(url, formData, "unfollow");
    this.setState({ updateUserInProcess: true });
  };

  followUser = userObj => {
    const { userid } = this.state;
    const url = "dummyurl";
    const formData = {
      userid: userid,
      userToFollow: userObj.user_id
    };
    this.props.followUserAPI(url, formData, "follow");
    this.setState({ updateUserInProcess: true });
  };

  logOut = () => {
    localStorage.removeItem("token");
    this.props.history.replace(Routes.login);
  };

  render() {
    const {
      fetchTweetsInProcess,
      postingTweetInProcess,
      updateUserInProcess
    } = this.state;
    const {
      enableInputTweetBox,
      disableInputTweetBox,
      onChangeTextInput,
      onSubmitTweet,
      unfollowUser,
      followUser
    } = this;
    const actions = {
      enableInputTweetBox,
      disableInputTweetBox,
      onChangeTextInput,
      onSubmitTweet,
      unfollowUser,
      followUser
    };

    const username = localStorage.getItem("username");

    return (
      <ErrorBoundary>
        <>
          <h2 className="text-center">
            Welcome,
            <span style={{ textDecoration: "underline", color: "#000" }}>
              {username}
            </span>
          </h2>
          <div className="logout">
            <button onClick={this.logOut}>Logout</button>
          </div>
          {fetchTweetsInProcess ||
          postingTweetInProcess ||
          updateUserInProcess ? (
            <div className="d-flexbox">
              {" "}
              <div className="spinner spinner-1" />
            </div>
          ) : (
            <DashboardComponent
              localActions={actions}
              localState={this.state}
            />
          )}
        </>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = state => {
  return {
    getTweets: state.get_tweets,
    postTweet: state.post_tweet,
    updateUser: state.update_user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTweetsAPI: (url, id) => dispatch(fetchTweets(url, id)),
    publishTweet: (url, formData) => dispatch(postTweet(url, formData)),
    followUserAPI: (url, formData, action) =>
      dispatch(updateUser(url, formData, action))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
