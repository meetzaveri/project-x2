import React, { Component } from "react";
import { connect } from "react-redux";

import Routes from "config/routes";
import ErrorBoundary from "wrappers/errorBoundary";
import LoginComponent from "components/login";
import { login, resetLogin } from "actions/auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { loginInProcess: false, setLoginError: null };
  }

  static getDerivedStateFromProps(props, state) {
    const { loginInProcess } = state;
    if (props.auth.loginAccess === true && loginInProcess === true) {
      props.history.push(
        Routes.dashboard + "?userid=" + props.auth.response.user_id
      );
      return { loginInProcess: false };
    }
    console.log("props.auth", props.auth);
    if (props.auth.hasError === true && loginInProcess === true) {
      return { loginInProcess: false, setLoginError: props.auth.error };
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

  navigateToRegister = () => {
    this.props.history.replace(Routes.register);
  };

  componentWillUnmount() {
    this.props.resetLoginState();
  }

  render() {
    const { onSubmitForm, navigateToRegister } = this;
    const localActions = { onSubmitForm, navigateToRegister };
    return (
      <ErrorBoundary>
        <>
          <div>
            <LoginComponent
              localActions={localActions}
              localState={this.state}
            />
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
