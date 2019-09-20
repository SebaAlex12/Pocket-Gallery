import React, { Component, FormEvent } from "react";
import { connect } from "react-redux";

import { addAlbum } from "../actions";
import { User } from "../../Users/types";

interface Iprops {
  addAlbum(data: any): void;
  user: User;
}
interface Istate {
  name: String;
  title: String;
  access: String;
  description: String;
  status: String;
  createdAt: String;
}

class AlbumAddForm extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      name: "",
      title: "",
      access: "",
      description: "",
      status: "public",
      createdAt: ""
    };
  }
  onChangeInput = (event: FormEvent<HTMLInputElement>): void => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  addHandler = (event: FormEvent<HTMLInputElement>): void => {
    const { addAlbum, user } = this.props;
    const { title, access, description, status } = this.state;

    const data = {
      userId: user._id ? user._id : null,
      name: title.replace(/ /g, "-"),
      title,
      access,
      description,
      status: user._id ? "administrator" : status
    };

    event.preventDefault();
    addAlbum(data);
  };
  render() {
    const {
      user: { logged }
    } = this.props;

    return (
      <div className="clearfix">
        <form action="">
          <div className="form-group form-row">
            <label htmlFor="title">Title:</label>
            <input
              onChange={this.onChangeInput}
              type="text"
              name="title"
              className="form-control"
            />
          </div>
          <div className="form-group form-row">
            <label htmlFor="access">
              Access token:{" "}
              {logged ? (
                <i
                  className="glyphicon glyphicon-exclamation-sign"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="can not use access token because you are login"
                  style={{ cursor: "pointer", fontSize: "16px" }}
                ></i>
              ) : (
                ""
              )}
            </label>
            <input
              onChange={this.onChangeInput}
              type="password"
              name="access"
              className="form-control"
              disabled={logged ? true : false}
            />
          </div>
          <div className="form-group form-row">
            <label htmlFor="description">Description:</label>
            <input
              onChange={this.onChangeInput}
              type="text"
              name="description"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              onClick={this.addHandler}
              className="btn btn-primary float-right"
              type="submit"
              value="add"
            />
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    user: state.users.user ? state.users.user : null
  };
};
export default connect(
  mapStateToProps,
  { addAlbum }
)(AlbumAddForm);
