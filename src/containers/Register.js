import React, { Component } from "react";
import { connect } from "react-redux";

import Routes from "config/routes";
import ErrorBoundary from "wrappers/errorBoundary";
import RegisterComponent from "components/register";
import { login, resetLogin } from "actions/auth";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { registrationProcess: false };
  }

  static getDerivedStateFromProps(props, state) {
    const { registrationProcess } = state;
    if (props.auth.loginAccess === true && registrationProcess === true) {
      props.history.push(Routes.login);
      return { registrationProcess: false };
    }
    return null;
  }

  onSubmitForm = values => {
    console.log("on submit form values", values);
    const url = "DummyUrl";
    const formData = values;
    this.props.loginAPI(url, formData);
    this.setState({ registrationProcess: true });
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
            <RegisterComponent localActions={localActions} />
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
)(Register);
