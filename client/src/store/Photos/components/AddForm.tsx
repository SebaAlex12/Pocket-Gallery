import React, { Component, FormEvent } from "react";
import { connect } from "react-redux";
import { addPhoto } from "../actions";
import AlbumAddForm from "../../Albums/components/AlbumAddForm";

interface Iprops {
  addPhoto(data: any): void;
}

interface Istate {
  title: String;
  description: String;
  status: String;
  albumId: String;
  imageUrl: String;
  albumToggle: boolean;
}

class AddForm extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      title: "",
      description: "",
      status: "public",
      albumId: "uyeguqwbf4375d",
      imageUrl: "",
      albumToggle: false
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
    const { albumToggle } = this.state;
    return (
      <div>
        <button
          className="btn btn-secondary float-right mr-1"
          onClick={() =>
            this.setState({
              albumToggle: !albumToggle
            })
          }
        >
          Add album
        </button>
        {albumToggle ? <AlbumAddForm /> : null}
        <h2>Add Image</h2>
        <div className="clearfix pt-5 pb-5">
          <form action="" method="post" encType="multipart/form-data">
            {/* <div className="form-group form-row">
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
          </div> */}
            <div className="form-group form-row">
              <label htmlFor="" />
              <input
                onChange={this.onChangeInput}
                id="file-select"
                type="file"
                name="photos[]"
                className="form-control"
                multiple
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
