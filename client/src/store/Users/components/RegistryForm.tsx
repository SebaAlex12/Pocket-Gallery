import React, { Component, FormEvent } from "react";
import { connect } from "react-redux";
import { addUser } from "../actions";

interface Iprops {
  addUser(data: any): void;
}
interface Istate {
  name: String;
  email: String;
  password: String;
}

class RegistryForm extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      name: "",
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
  registerHandler = (event: FormEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const { addUser } = this.props;
    // console.log(this.state);
    addUser(this.state);
  };
  render() {
    return (
      <div className="registry-form-box col-lg-4">
        <h2>Registry form</h2>
        <form action="post">
          <div className="form-group form-row">
            <label htmlFor="">Name:</label>
            <input
              onChange={this.onChangeInput}
              className="form-control"
              type="text"
              name="name"
            />
          </div>
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
              onClick={this.registerHandler}
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
  return {
    // pictures: state.pictures
  };
};

export default connect(
  mapStateToProps,
  { addUser }
)(RegistryForm);
