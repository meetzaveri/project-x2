import React, { Component } from "react";
import queryString from "query-string";
import { connect } from "react-redux";

import { fetchUserAction, updateUser } from "actions/user";
import ProfileComponent from "components/profile";
import ErrorBoundary from "wrappers/errorBoundary";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchProfileInProcess: false,
      userData: {},
      userUpdate: false,
      updateUserInProcess: false
    };
  }

  componentDidMount() {
    const cacheduserid = localStorage.getItem("userid");
    const parseQueryString = queryString.parse(this.props.location.search);
    const userid = parseQueryString.userid
      ? parseQueryString.userid
      : cacheduserid;
    const url = "dummyUrl";
    this.props.fetchUserAPI(url, { userid });
    this.setState({
      fetchProfileInProcess: true
    });
  }

  static getDerivedStateFromProps(props, state) {
    const { fetchProfileInProcess, updateUserInProcess } = state;

    if (
      props.fetchUser.fetchSuccess === true &&
      fetchProfileInProcess === true
    ) {
      return {
        fetchProfileInProcess: false,
        userData: props.fetchUser.response
      };
    }

    if (
      props.updateUser.updateUserSuccess === true &&
      updateUserInProcess === true
    ) {
      return {
        updateUserInProcess: false,
        userData: props.updateUser.response,
        userUpdate: true
      };
    }

    return null;
  }

  followUser = (userid, action) => {
    console.log("userid", userid);
    const cacheduserid = localStorage.getItem("userid");

    const url = "dummyUrl";
    const formData = {
      userid: cacheduserid,
      userToFollow: userid
    };
    this.props.followUserAPI(url, formData, action);
    this.setState({ updateUserInProcess: true });
  };

  render() {
    const { followUser } = this;
    const actions = { followUser };

    return (
      <ErrorBoundary>
        <>
          <h3>Profile</h3>
          <ProfileComponent localState={this.state} localActions={actions} />
        </>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetchUser: state.fetch_user,
    updateUser: state.update_user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserAPI: (url, formData) => dispatch(fetchUserAction(url, formData)),
    followUserAPI: (url, formData, action) =>
      dispatch(updateUser(url, formData, action))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
