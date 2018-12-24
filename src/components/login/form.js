import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a vaild email")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be between 3 to 30 characters.")
    .max(20, "Password must be between 3 to 30 characters.")
    .required("Password is required")
  // phone: Yup.string().min(10, "Enter valid phone number")
});

const LoginForm = props => (
  <div className="login-container">
    <div className="login">
      <div className="form-container">
        <h1 className="login-title">LOGIN </h1>
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          validationSchema={LoginSchema}
          onSubmit={values => {
            // same shape as initial values
            // console.log("onsubmit render props formik", values);
            props.localActions.onSubmitForm(values);
          }}
        >
          {({
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            setFieldValue,
            handleBlur,
            handleSubmit,
            handleReset
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-content">
                <div
                  className={`input-container ${!errors.email &&
                    touched.email &&
                    "has-success"} ${errors.email && touched.email && ""}`}
                  id="login-email-wrapper"
                >
                  <label className={`control-label`}>email address</label>
                  <input
                    className={`form-control ${errors.email &&
                      touched.email &&
                      "is-invalid has-error"} `}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="email"
                    id="login-email"
                    type="text"
                    autoFocus=""
                  />
                  {errors.email && touched.email && (
                    <p className="help-text invalid-feedback">{errors.email}</p>
                  )}
                  {/* <p className="help-text">Please enter your email address</p> */}
                </div>

                <div
                  className={`input-container ${!errors.password &&
                    touched.password &&
                    "has-success"}  ${errors.password &&
                    touched.password &&
                    ""}`}
                  id="login-password-wrapper"
                >
                  <label className={`control-label`}>password</label>
                  <input
                    className={`form-control ${errors.password &&
                      touched.password &&
                      "is-invalid has-error"} `}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="password"
                    id="login-password"
                    type="password"
                    autoFocus=""
                  />
                  {errors.password && touched.password && (
                    <p className="help-text  invalid-feedback">
                      {errors.password}
                    </p>
                  )}
                  {/* <p className="help-text">Please enter a password</p> */}
                </div>

                <div className="">
                  <button
                    type="submit"
                    id="loginButton"
                    className="btn btn-login btn-success"
                    disabled={props.loginInProcess}
                  >
                    <span>LOGIN</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  </div>
);

LoginForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired
};

export default LoginForm;
