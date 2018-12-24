import React from "react";
import Routes from "config/routes";

//Auth Wrapper as part of navigation guard
export const withAuth = Component => {
  class Auth extends React.Component {
    state = {};
    componentDidMount() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("token not available");
        this.props.history.replace(Routes.login);
      }
    }
    render() {
      const token = localStorage.getItem("token");
      return token ? <Component {...this.props} /> : null;
    }
  }

  return Auth;
};
