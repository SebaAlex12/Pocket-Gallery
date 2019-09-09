import React, { Component, FormEvent } from "react";
import { connect } from "react-redux";
import { addAlbum } from "../actions";

interface Iprops {
  addAlbum(data: any): void;
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
    const { addAlbum } = this.props;
    const { title, access, description, status } = this.state;

    const data = {
      name: title.replace(/ /g, "-"),
      title,
      access,
      description,
      status
    };

    event.preventDefault();
    addAlbum(data);
  };
  render() {
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
            <label htmlFor="access">Access:</label>
            <input
              onChange={this.onChangeInput}
              type="password"
              name="access"
              className="form-control"
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
  return {};
};
export default connect(
  mapStateToProps,
  { addAlbum }
)(AlbumAddForm);
