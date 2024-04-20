import React from 'react';

function Login() {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <form className="w-25">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Username</label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-primary">Log In</button>
      </form>
    </div>
  );
}

export default Login;
