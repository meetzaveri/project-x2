import React, { Component } from "react";
import { connect } from "react-redux";

import Routes from "config/routes";
import ErrorBoundary from "wrappers/errorBoundary";
import LoginComponent from "components/login";
import { login, resetLogin } from "actions/auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { loginInProcess: false };
  }

  static getDerivedStateFromProps(props, state) {
    const { loginInProcess } = state;
    if (props.auth.loginAccess === true && loginInProcess === true) {
      props.history.push(
        Routes.dashboard + "?userid=" + props.auth.response.user_id
      );
      return { loginInProcess: false };
    }
    return null;
  }

  onSubmitForm = values => {
    console.log("on submit form values", values);
    const url = "DummyUrl";
    const formData = values;
    this.props.loginAPI(url, formData);
    this.setState({ loginInProcess: true });
  };

  componentWillUnmount() {
    this.props.resetLoginState();
  }

  render() {
    const { onSubmitForm } = this;
    const localActions = { onSubmitForm };
    return (
      <ErrorBoundary>
        <>
          <div>
            <LoginComponent localActions={localActions} />
          </div>
        </>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth_login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginAPI: (url, formData) => dispatch(login(url, formData)),
    resetLoginState: () => dispatch(resetLogin())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
