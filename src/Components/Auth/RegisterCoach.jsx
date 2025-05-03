import React from "react";
import axios from "axios";
import { Link } from "react-router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import SecondFooter from "../SecondFooter";

const RegisterCoach = () => {
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Confirm password is required"),
    specialization: Yup.string().required("Specialization is required"),
    experience: Yup.string().required("Experience is required"),
    clubName: Yup.string().required("Club name is required"),
    coachingSpecialty: Yup.string().required("Coaching specialty is required"),
    portfolioFile: Yup.mixed().required("Portfolio is required").test("fileSize", "File too large", (value) => !value || value.size <= 1024 * 1024), // Limit file size to 1MB
  });
  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== "portfolioFile") {
        formData.append(key, values[key]);
      }
      console.log("Form Values:", values);
    });
    console.log(formData);
    if (values.portfolioFile) {
      formData.append("portfolioFile", values.portfolioFile);
    }

    try {
      const response = await axios.post(
        "EndPoint", // Add your API URL here
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Response:", response.data);
    // console.log(response);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
     <div>
      <div className="register-coach">
        <div className="container-coach">
          <div className="bg"></div>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
              specialization: "",
              experience: "",
              clubName: "",
              coachingSpecialty: "",
              portfolioFile: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={true} // Enable validation on change
            validateOnBlur={true} // Enable validation on blur when leaving the input
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form>
                <div className="title">
                  <h1>
                    <span>Sign Up</span> As Coach
                  </h1>
                  <p>
                    Join our community today! Create an account to unlock exclusive features and personalized experiences.
                  </p>
                </div>
                <div className="inputs username-email">
                <div className="rules">
                <ErrorMessage name="username" component="div" className="error" />
                <Field type="text" name="username" placeholder="Enter Your Username" />
                </div>
                 <div className="rules">
                 <ErrorMessage name="email" component="div" className="error" />
                 <Field type="email" name="email" placeholder="Enter Your Email" />
                 </div>
                </div>
                <div className="inputs input-password">
                  <div className="rules">
                  <ErrorMessage name="password" component="div" className="error" />
                  <Field type="password" name="password" placeholder="Enter Your Password" />
                  </div>
                 <div className="rules">
                 <ErrorMessage name="confirmPassword" component="div" className="error" />
                 <Field type="password" name="confirmPassword" placeholder="Confirm Your Password" />
                 </div>
                </div>
                <div className="inputs select-specialization-experience">
                  <div className="rules">
                  <ErrorMessage name="specialization" component="div" className="error" />
                  <Field as="select" name="specialization" className="select-specialization">
                    <option value="" disabled>Select your specialization</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Strength">Strength</option>
                    <option value="Cardio">Cardio</option>
                    </Field>
                  </div>
                  <div className="rules">
                  <ErrorMessage name="experience" component="div" className="error" />
                  <Field as="select" name="experience" className="select-experience">
                    <option value="" disabled>Enter your experience</option>
                    <option value="1">1 Year</option>
                    <option value="2">2 Years</option>
                    <option value="3">3+ Years</option>
                    </Field>
                  </div>
                </div>
                <div className="inputs club-name-select-coaching-specialty">
                  <div className="rules">
                  <ErrorMessage name="clubName" component="div" className="error" />
                  <Field type="text" name="clubName" className="input-club-name" placeholder="Enter your current club Name" />
                  </div>
                  <div className="rules">
                  <ErrorMessage name="coachingSpecialty" component="div" className="error" />
                  <Field as="select" name="coachingSpecialty" className="select-coaching-specialty">
                    <option value="" disabled>Select your coaching specialty</option>
                    <option value="strength">Strength Training</option>
                    <option value="tactics">Tactical Coaching</option>
                    </Field>
                  </div>
                </div>
                <div className="inputs input-upload-image">
                  <input
                    type="file"
                    id="portfolioFile"
                    className="input-portfolio-file"
                    onChange={(e) => setFieldValue("portfolioFile", e.target.files[0])}
                  />
                  <label htmlFor="portfolioFile" className="label-portfolio-upload">
                    Upload your coaching portfolio
                  </label>
                  <ErrorMessage name="portfolioFile" component="div" className="error" />
                </div>
                <div className="btns">
                  <button type="submit" disabled={isSubmitting}>
                    Sign Up
                  </button>
                  <Link to="/login">Login</Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>

    <SecondFooter width={'90%'} backgroundColor={'#000000'}/>
    </>
  );
};

export default RegisterCoach;
