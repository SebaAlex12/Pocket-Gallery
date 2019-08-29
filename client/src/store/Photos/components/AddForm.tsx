import React, { Component, FormEvent } from "react";
import { connect } from "react-redux";
import { addPhoto } from "../actions";
import AlbumAddForm from "../../Albums/components/AlbumAddForm";
import { fetchAlbums } from "../../Albums/actions";
import { Album } from "../../Albums/types";

interface Iprops {
  albums: Album[];
  addPhoto(data: any): void;
  fetchAlbums(data: any): void;
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
      albumId: "",
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
  onChangeSelect = (event: FormEvent<HTMLSelectElement>): void => {
    this.setState({
      ...this.state,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };
  addHandler = (event: FormEvent<HTMLInputElement>): void => {
    const { addPhoto } = this.props;
    const { albumId } = this.state;
    event.preventDefault();

    if (albumId !== "") {
      addPhoto(this.state);
    }
  };
  componentDidMount() {
    this.props.fetchAlbums("public");
  }
  render() {
    const { albums } = this.props;
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
            <div className="form-group">
              <select
                className="form-control"
                onChange={this.onChangeSelect}
                name="albumId"
              >
                <option value="">Select Album from list</option>
                {albums
                  ? albums.map(album => {
                      return (
                        <option key={album._id} value={album._id}>
                          {album.title}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
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
  return {
    albums: state.albums.albums
  };
};

export default connect(
  mapStateToProps,
  { addPhoto, fetchAlbums }
)(AddForm);
