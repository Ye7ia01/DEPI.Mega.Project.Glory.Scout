import React from 'react';

const RegisterForm = () => {
  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Sign Up</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" className="form-control" placeholder="Enter your full name" />
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" placeholder="Enter your email" />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="Enter password" />
        </div>

        <div className="mb-3">
          <label className="form-label">Country</label>
          <select className="form-select">
            <option value="">Choose...</option>
            <option value="EG">Egypt</option>
            <option value="SA">Saudi Arabia</option>
            <option value="US">USA</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Skills Video</label>
          <input type="file" className="form-control" />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
