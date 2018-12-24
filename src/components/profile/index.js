import React from "react";

const Profile = props => {
  const profileData = props.localState.userData;
  const userid = localStorage.getItem("userid");
  console.log("profileData");
  return (
    <>
      <div className="user-container">
        <div className="dib username"> {profileData.user_name}</div>
        <div className="dib follow-slot">
          {profileData.user_followed_by &&
          profileData.user_followed_by.includes(userid) ? (
            <button
              className="follow-btn"
              onClick={() =>
                props.localActions.followUser(profileData.user_id, "unfollow")
              }
            >
              Following
            </button>
          ) : (
            <button
              className="follow-btn"
              onClick={() =>
                props.localActions.followUser(profileData.user_id, "follow")
              }
            >
              Follow
            </button>
          )}
        </div>
        <div className="follow-section d-flex-align-center">
          <div className="follows ph3">
            <div className="follow-label"> Follows</div>
            <div className="follow-content text-center">
              {profileData.user_follows && profileData.user_follows.length}
            </div>
          </div>
          <div className="followed-by mv3 ph3">
            <div className="follow-label"> Followers </div>
            <div className="follow-content text-center">
              {profileData.user_followed_by &&
                profileData.user_followed_by.length}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
