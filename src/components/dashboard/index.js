import React from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";
import Routes from "config/routes";
import Users from "server/dummyusers";

const DisplayCards = props => {
  const loggedInUser = localStorage.getItem("userid");
  console.log("props.localState.tweets", props.localState.tweets);
  const renderCards = props.localState.tweets.map((item, index) => (
    <React.Fragment key={index}>
      <div className="card-body">
        <div className="card-header db">
          <div className="dib user-name ph1">
            {loggedInUser === item.user_id ? (
              <span>{item.user_name.toLowerCase()}</span>
            ) : (
              <NavLink to={Routes.profile + "?userid=" + item.user_id}>
                {item.user_name.toLowerCase()}
              </NavLink>
            )}
          </div>
          <div className="dib seperator-dot"> </div>
          <div className="dib tweet-date ph1">
            {moment(item.timestamp).format("LT") +
              " " +
              moment(item.timestamp).format("LL")}
          </div>
        </div>
        <div className="card-break-ruler mv3" />
        <div className="card-content">{item.tweet_body}</div>
      </div>
    </React.Fragment>
  ));

  return renderCards;
};

const NewTweetInput = props => {
  return (
    <>
      <div>
        {" "}
        <textarea
          name="newTweetInput"
          onClick={props.localActions.enableInputTweetBox}
          onChange={props.localActions.onChangeTextInput}
          // onBlur={props.localActions.disableInputTweetBox}
          className="tweet-input-box"
          placeholder="Write a tweet"
          value={props.localState.newTweetInput}
        />
        {props.localState.toggleTweetInput && (
          <button
            className="tweet-btn"
            onClick={props.localActions.onSubmitTweet}
          >
            Tweet
          </button>
        )}
      </div>
    </>
  );
};

const WhomToFollow = props => {
  const currentLoggedInUser = props.localState.userid;
  const extractArrayFrom = Users.filter(i => i.user_id === currentLoggedInUser);
  const currentUserData = extractArrayFrom[0];
  console.log("currentUserData", currentUserData);
  const renderUsers = Users.filter(i => i.user_id !== currentLoggedInUser).map(
    item => (
      <>
        <div>
          <div className="dib user-col">{item.user_name}</div>
          <div className="dib user-follow-col">
            {currentUserData &&
            item.user_followed_by.includes(currentUserData.user_id) ? (
              <button
                className="follow-btn"
                onClick={() => props.localActions.unfollowUser(item)}
              >
                Following
              </button>
            ) : (
              <button
                className="follow-btn"
                onClick={() => props.localActions.followUser(item)}
              >
                Follow
              </button>
            )}
          </div>
        </div>
      </>
    )
  );

  return <>{renderUsers}</>;
};

const Dashboard = props => {
  return (
    <>
      <div className="dashboard-container db">
        <div className="dashboard-content dib">
          <NewTweetInput {...props} />
          <DisplayCards {...props} />
        </div>
        <div className="dasboard-sidebar dib v-top">
          {" "}
          <h3>Who to follow</h3>
          <WhomToFollow {...props} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
