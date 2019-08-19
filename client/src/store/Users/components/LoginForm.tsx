import React, { Component } from "react";

class LoginForm extends Component {
  render() {
    return (
      <div className="login-form-box col-lg-4">
        <h2>Login form</h2>
        <form action="">
          <div className="form-group form-row">
            <label htmlFor="">Name:</label>
            <input className="form-control" type="text" name="name" />
          </div>
          <div className="form-group form-row">
            <label htmlFor="">Email:</label>
            <input className="form-control" type="text" name="email" />
          </div>
          <div className="form-group form-row">
            <label htmlFor="">Password:</label>
            <input className="form-control" type="password" name="password" />
          </div>
          <div className="form-group">
            <input
              className="btn btn-primary float-right"
              type="submit"
              value="login"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
