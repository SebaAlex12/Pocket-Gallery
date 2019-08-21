import React, { Component, FormEvent } from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions";

interface Iprops {
  loginUser(data: any): void;
}

interface Istate {
  email: String;
  password: String;
}

class LoginForm extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  onChangeInput = (event: FormEvent<HTMLInputElement>): void => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  loginHandler = (event: FormEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const { loginUser } = this.props;
    const { email, password } = this.state;
    loginUser({ email: email, password: password });
  };
  // componentDidUpdate() {
  //   console.log("loged in");
  // }
  render() {
    return (
      <div className="login-form-box col-lg-4">
        <h2>Login form</h2>
        <form action="post">
          <div className="form-group form-row">
            <label htmlFor="">Email:</label>
            <input
              onChange={this.onChangeInput}
              className="form-control"
              type="text"
              name="email"
            />
          </div>
          <div className="form-group form-row">
            <label htmlFor="">Password:</label>
            <input
              onChange={this.onChangeInput}
              className="form-control"
              type="password"
              name="password"
            />
          </div>
          <div className="form-group">
            <input
              onClick={this.loginHandler}
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

const mapStateToProps = (state: any) => {
  return {};
};

export default connect(
  mapStateToProps,
  { loginUser }
)(LoginForm);
