import React, { Component } from "react";
import { connect } from "react-redux";

import Routes from "config/routes";
import ErrorBoundary from "wrappers/errorBoundary";
import RegisterComponent from "components/register";
import { register, resetRegistration } from "actions/register";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { registrationProcess: false, isUserAlreadyRegistered: false };
  }

  static getDerivedStateFromProps(props, state) {
    const { registrationProcess } = state;
    if (
      props.register.registrationAccess === true &&
      registrationProcess === true
    ) {
      props.history.push(Routes.login);
      return { registrationProcess: false };
    }
    if (props.register.hasError === true && registrationProcess === true) {
      if (props.register.error.alreadyRegistered) {
        return { isUserAlreadyRegistered: true, registrationProcess: false };
      }
      return { registrationProcess: false };
    }
    return null;
  }

  onSubmitForm = values => {
    console.log("on submit form values", values);
    const url = "DummyUrl";
    const formData = values;
    this.props.registerAPI(url, formData);
    this.setState({ registrationProcess: true });
  };

  componentWillUnmount() {
    this.props.resetRegistrationState();
  }

  render() {
    const { onSubmitForm } = this;
    const localActions = { onSubmitForm };
    return (
      <ErrorBoundary>
        <>
          <div>
            <RegisterComponent
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
    register: state.register
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerAPI: (url, formData) => dispatch(register(url, formData)),
    resetRegistrationState: () => dispatch(resetRegistration())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
