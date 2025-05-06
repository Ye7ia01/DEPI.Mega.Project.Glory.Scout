import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
// import toast from "react-hot-toast";
// import SecondFooter from "../SecondFooter";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post("http://glory-scout.tryasp.net/api/Auth/login", {
        email: values.email,
        password: values.password,
      });
      localStorage.setItem("token", response.data.token);
      setTimeout(() => {
        navigate("/");
      }, 800);
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      setErrors({ submit: "Invalid email or password" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
     <div>
      <div className="login">
        <div className="container-coach">
          <div className="bg"></div>
          <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
        {({isSubmitting, errors }) => (
        <Form>
          <div className="title">
            <h1>
              <span>Login</span>
            </h1>
            <p>Welcome back! Please log in to access your account.</p>
            {errors.submit && <div className="error-text">{errors.submit}</div>}
          </div>

          <div className="inputs username-email">
            <div className="rules">
              <ErrorMessage name="email" component="div" className="error" />
              <Field type="email" name="email" placeholder="Enter your Email" />
            </div>
              <div className="rules" style={{ position: "relative" }}>
              <ErrorMessage name="password" component="div" className="error" />
                <Field type={showPassword ? "text" : "password"}  name="password"  placeholder="Enter your Password"/>
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 10, top: 32, cursor: "pointer", userSelect: "none",  }}>
                  {showPassword ? <button className="show-hide"><FaEyeSlash /></button> : <button className="show-hide"><FaEye /></button>}
                </span>
            </div>
          </div>

          <div className="paths">
            <Link to="/changepassword">Forgot Password?</Link>
          </div>

          <div className="btns">
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? <FaSpinner className="loading-login" /> : "Login"}</button>
            <Link to="/login">Sign Up</Link>
          </div>

          
        </Form>
      )}
    </Formik>
        </div>
      </div>
    </div>

    {/* <SecondFooter width={'90%'} backgroundColor={'#000000'}/> */}
    </>
  );
};

export default Login;
