import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAlbums } from "../../Albums/actions";
import { Album } from "../../Albums/types";
import AlbumItem from "../../Albums/components/AlbumItem";
import { removePhotos } from "../../Photos/actions";
import { User } from "../../Users/types";

interface Iprops {
  albums: Album[];
  user: User;
  fetchAlbums(userId: string | null): void;
  removePhotos(data: any): void;
}
interface Istate {
  selected: any;
}

class ListPublic extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      selected: []
    };
  }
  componentDidMount() {
    const { fetchAlbums, user } = this.props;
    fetchAlbums(user._id ? user._id.toString() : null);
    this.setState({
      selected: []
    });
  }
  removePhotosHandler = async () => {
    const { removePhotos, fetchAlbums, user } = this.props;
    const { selected } = this.state;

    await removePhotos(selected);
    await fetchAlbums(user._id ? user._id.toString() : null);
    this.setState({
      selected: []
    });
  };
  checkIfChecked = (item: string) => {
    const { selected } = this.state;

    const newSelected =
      selected.includes(item) === true
        ? selected.filter((element: any) => element !== item)
        : [...selected, item];

    this.setState({
      selected: newSelected
    });
  };
  checkAllPhotosHandler = (album: Album) => {
    const { selected } = this.state;
    const albumListId = `album-list-${album._id}`;
    const imageUrl = `/photos/albums/${album._id}/`;
    const photos = album.photos.map((photo: any) => imageUrl + photo);

    let newSelected = selected;

    // check all checkboxes
    const checkboxes = document.querySelectorAll(
      `#${albumListId} input[type=checkbox]`
    );

    checkboxes.forEach(checkbox => {
      const checkboxInput = checkbox as HTMLInputElement;
      checkboxInput.checked = true;
    });

    photos.forEach((photo: any) => {
      if (selected.includes(photo) !== true) {
        newSelected.push(photo);
      }
    });

    this.setState({
      selected: newSelected
    });
  };
  unCheckAllPhotosHandler = (album: Album) => {
    const { selected } = this.state;
    const albumListId = `album-list-${album._id}`;
    const imageUrl = `/photos/albums/${album._id}/`;
    const photos = album.photos.map((photo: any) => imageUrl + photo);

    // uncheck all checkboxes
    const checkboxes = document.querySelectorAll(
      `#${albumListId} input[type=checkbox]`
    );

    checkboxes.forEach(checkbox => {
      const checkboxInput = checkbox as HTMLInputElement;
      checkboxInput.checked = false;
    });

    const newSelected = selected.filter((element: never) =>
      photos.includes(element) !== true ? element : null
    );

    this.setState({
      selected: newSelected
    });
  };
  render() {
    const { albums } = this.props;

    let albumsContent;

    if (albums === null || albums.length === 0) {
      albumsContent =
        "Loading ... - if loading takes too long try clear access token because the token you are checking probably does not exist";
    } else {
      albumsContent = albums.map(album => {
        return (
          <AlbumItem
            key={album._id}
            album={album}
            removePhotosHandler={this.removePhotosHandler} // callback function to listItemNav
            checkAllPhotosHandler={this.checkAllPhotosHandler} // callback function to listItemNav
            unCheckAllPhotosHandler={this.unCheckAllPhotosHandler} // callback function to listItemNav
            checkIfChecked={this.checkIfChecked} // callback function to listItem
          />
        );
      });
    }

    return <div className="mt-3 mb-3">{albumsContent}</div>;
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
  { fetchAlbums, removePhotos }
)(ListPublic);
