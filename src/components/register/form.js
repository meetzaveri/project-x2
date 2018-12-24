import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

const RegistrationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a vaild email")
    .required("Email is required"),
  username: Yup.string().required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be between 3 to 30 characters.")
    .max(20, "Password must be between 3 to 30 characters.")
    .required("Password is required")
  // phone: Yup.string().min(10, "Enter valid phone number")
});

const RegisterForm = props => (
  <div className="register-container">
    <div className="register">
      <div className="form-container">
        <h1 className="register-title">Register </h1>
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          validationSchema={RegistrationSchema}
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
                  className={`input-container ${!errors.username &&
                    touched.username &&
                    "has-success"} ${errors.username &&
                    touched.username &&
                    ""}`}
                  id="register-email-wrapper"
                >
                  <label className={`control-label`}>Username</label>
                  <input
                    className={`form-control ${errors.username &&
                      touched.username &&
                      "is-invalid has-error"} `}
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="username"
                    id="register-username"
                    type="text"
                    autoFocus=""
                  />
                  {errors.username && touched.username && (
                    <p className="help-text invalid-feedback">
                      {errors.username}
                    </p>
                  )}
                  {/* <p className="help-text">Please enter your email address</p> */}
                </div>
                <div
                  className={`input-container ${!errors.email &&
                    touched.email &&
                    "has-success"} ${errors.email && touched.email && ""}`}
                  id="register-email-wrapper"
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
                    id="register-email"
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
                  id="register-password-wrapper"
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
                    id="register-password"
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
                    id="registerButton"
                    className="btn btn-register btn-success"
                    disabled={props.registerInProcess}
                  >
                    <span>register</span>
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

RegisterForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired
};

export default RegisterForm;
