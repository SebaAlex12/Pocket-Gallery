import React, { Component, FormEvent } from "react";
import { connect } from "react-redux";
import { addPhoto } from "../actions";

interface Iprops {
  addPhoto(data: any): void;
}

interface Istate {
  title: String;
  description: String;
  status: String;
  imageFile: String;
  imageUrl: String;
}

class AddForm extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      title: "",
      description: "",
      status: "public",
      imageFile: "",
      imageUrl: ""
    };
  }
  onChangeInput = (event: FormEvent<HTMLInputElement>): void => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  addHandler = (event: FormEvent<HTMLInputElement>): void => {
    const { addPhoto } = this.props;
    event.preventDefault();
    addPhoto(this.state);
  };
  render() {
    return (
      <div>
        <h2>Add Image</h2>
        <form action="" method="post" encType="multipart/form-data">
          <div className="form-group form-row">
            <label htmlFor="">Title:</label>
            <input
              onChange={this.onChangeInput}
              type="text"
              name="title"
              className="form-control"
            />
          </div>
          <div className="form-group form-row">
            <label htmlFor="">Description:</label>
            <input
              onChange={this.onChangeInput}
              type="text"
              name="description"
              className="form-control"
            />
          </div>
          <div className="form-group form-row">
            <label htmlFor="">Image url:</label>
            <input
              onChange={this.onChangeInput}
              type="text"
              name="imageUrl"
              className="form-control"
            />
          </div>
          <div className="form-group form-row">
            <label htmlFor="">Image url:</label>
            <input
              onChange={this.onChangeInput}
              type="file"
              name="imageFile"
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
  { addPhoto }
)(AddForm);
