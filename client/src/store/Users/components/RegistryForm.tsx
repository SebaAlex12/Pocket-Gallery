import React, { Component } from "react";

class RegistryForm extends Component {
  render() {
    return (
      <div className="registry-form-box col-lg-4">
        <h2>Registry form</h2>
        <form action="post">
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
              value="send"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default RegistryForm;
