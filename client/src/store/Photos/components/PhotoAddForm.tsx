import React, { Component, FormEvent } from "react";
import { connect } from "react-redux";
import { addPhotos } from "../actions";
import AlbumAddForm from "../../Albums/components/AlbumAddForm";
import { fetchAlbums } from "../../Albums/actions";
import { Album } from "../../Albums/types";
import { User } from "../../Users/types";

interface Iprops {
  albums: Album[];
  user: User;
  addPhotos(data: any): void;
  fetchAlbums(userId: string | null): void;
}

interface Istate {
  title: String;
  description: String;
  albumId: String;
  imageUrl: String;
  albumToggle: boolean;
}

class PhotoAddForm extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      title: "",
      description: "",
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
  addHandler = async (event: FormEvent<HTMLInputElement>) => {
    const { addPhotos, fetchAlbums, user } = this.props;
    const { albumId } = this.state;
    event.preventDefault();

    if (albumId !== "") {
      await addPhotos(albumId);
      await fetchAlbums(user._id ? user._id.toString() : null);
    }
  };

  render() {
    const { albums } = this.props;
    const { albumToggle } = this.state;
    return (
      <React.Fragment>
        <button
          className="album-button btn btn-secondary float-left mr-1"
          onClick={() =>
            this.setState({
              albumToggle: !albumToggle
            })
          }
        >
          Add album
        </button>
        {albumToggle ? <AlbumAddForm /> : null}
        <h2>Add Images</h2>
        <div className="clearfix">
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    user: state.users.user ? state.users.user : null,
    albums: state.albums.albums
  };
};

export default connect(
  mapStateToProps,
  { addPhotos, fetchAlbums }
)(PhotoAddForm);
