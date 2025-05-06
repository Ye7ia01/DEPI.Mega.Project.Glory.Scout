import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const ResetPassword = () => {
  // Define validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    // Simulate API call (you can replace this with your actual API logic)
    setTimeout(() => {
      if (values.email === "test@example.com") {
        // Simulate a success response
        alert("Password reset link sent to " + values.email);
      } else {
        // Simulate an error response
        setErrors({ submit: "Email not found" });
      }
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div>
      <div className="change-password">
        <div className="container-coach">
          <div className="bg"></div>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={true} // Enable validation on change
            validateOnBlur={true}   // Enable validation on blur (when leaving the input)
          >
            {({ errors, touched, isSubmitting, setFieldTouched }) => (
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Manually touch the field to trigger validation
                  setFieldTouched("email", true, true);
                  if (!isSubmitting) {
                    // Proceed with form submission if valid
                    handleSubmit();
                  }
                }}
              >
                <div className="title">
                  <h1>
                    <span>Reset My</span> Password
                  </h1>
                  <p>
                    Join our community today! Create an account to unlock exclusive features and personalized experiences.
                  </p>
                </div>

                <div className="inputs input-password">
                  <div className="rules">
                    <ErrorMessage name="email" component="div" className="error" />
                    <Field type="email" name="email" placeholder="Email Address" />
                  </div>

                  {/* <div className="rules">
                    <input type="radio" />
                    <p>Remember me</p>
                  </div> */}
                </div>

                {/* Show errors related to submit */}
                {errors.submit && <div className="error">{errors.submit}</div>}

                <div className="btns">
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Send Password Reset Link"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
