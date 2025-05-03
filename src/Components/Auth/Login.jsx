import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";

const Login = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-black text-white p-3">
      <div className="bg-dark rounded-4 p-5 shadow" style={{ maxWidth: "450px", width: "100%" }}>
        <h2 className="text-center mb-2" style={{ color: "#33FF33" }}>Login</h2>
        <p className="text-center text-muted mb-4">Welcome back! Please log in to access your account.</p>

        <div className="mb-3">
          <input type="email" className="form-control bg-black text-white border-secondary" placeholder="Enter your Email" />
        </div>

        <div className="mb-2">
          <input type="password" className="form-control bg-black text-white border-secondary" placeholder="Enter your Password" />
        </div>

        <div className="mb-3 text-end">
          <small className="text-muted" style={{ cursor: "pointer" }}>Forgot Password?</small>
        </div>

        <div className="d-grid mb-2">
          <button className="btn fw-bold rounded-pill" style={{ backgroundColor: "#33FF33", color: "black" }}>Login</button>
        </div>

        <div className="d-grid mb-4">
          <button className="btn btn-secondary fw-bold rounded-pill">Sign Up</button>
        </div>

        <div className="d-flex align-items-center text-muted mb-3">
          <hr className="flex-grow-1" />
          <span className="px-2 small">Or Continue with</span>
          <hr className="flex-grow-1" />
        </div>

        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-outline-light rounded-circle">
            <FaGoogle />
          </button>
          <button className="btn btn-outline-light rounded-circle">
            <FaFacebookF />
          </button>
          <button className="btn btn-outline-light rounded-circle">
            <FaApple />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
