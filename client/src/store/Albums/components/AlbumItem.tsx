import React, { Component } from "react";
import { connect } from "react-redux";

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import ListItem from "../../Photos/components/ListItem";
import ListItemNav from "../../Photos/components/ListItemNav";
import { Album } from "../../Albums/types";
import { User } from "../../Users/types";
import "../albums.scss";
import { removeAlbum } from "../actions";

interface Iprops {
  album: Album;
  user: User;
  removePhotosHandler(): void;
  checkAllPhotosHandler(album: Album): void;
  unCheckAllPhotosHandler(album: Album): void;
  checkIfChecked(data: string): void;
  removeAlbum(id: string): void;
}

interface Istate {
  albumToggle: boolean;
  photoIndex: number;
  isOpen: boolean;
}

class AlbumItem extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      albumToggle: false,
      photoIndex: 0,
      isOpen: false
    };
  }
  lightboxPhotosHandler(photoIndex: number) {
    const { isOpen } = this.state;
    this.setState({ photoIndex: photoIndex });
    this.setState({ isOpen: !isOpen });

    return false;
  }
  removeAlbumHandler(albumId: string) {
    const { removeAlbum } = this.props;
    removeAlbum(albumId);
  }
  render() {
    const {
      album,
      user,
      removePhotosHandler,
      checkAllPhotosHandler,
      unCheckAllPhotosHandler,
      checkIfChecked
    } = this.props;
    const { albumToggle, isOpen, photoIndex } = this.state;

    let photos;
    let photosUrls: any;
    photosUrls = [];
    const photosNumber = album.photos.length;

    if (photosNumber > 0) {
      let item = 0;
      photos = album.photos.map(photo => {
        let imageUrl = `/photos/albums/${album._id}/${photo}`;
        photosUrls.push(imageUrl);
        let photoNumber = item++;
        return (
          <ListItem
            key={photo}
            imageUrl={imageUrl}
            checkIfChecked={() => checkIfChecked(imageUrl)}
            lightboxPhotosHandler={() =>
              this.lightboxPhotosHandler(photoNumber)
            }
          />
        );
      });
    }

    return (
      <div className="albums-album-item mt-2">
        <h2>
          {user.logged ? (
            <button
              type="button"
              onClick={() => this.removeAlbumHandler(album._id)}
              className="btn btn-danger btn-primary mr-3"
            >
              delete
            </button>
          ) : null}

          <button type="button" className="btn btn-primary mr-3">
            photos <span className="badge badge-light">{photosNumber}</span>
          </button>
          <span
            style={{ cursor: "pointer" }}
            onClick={() =>
              this.setState({
                albumToggle: !albumToggle
              })
            }
          >
            {`${album.title} / ${album.status}`}
          </span>
          <span
            className="dropdown-toggle ml-2 mr-2"
            style={{ cursor: "pointer" }}
            onClick={() =>
              this.setState({
                albumToggle: !albumToggle
              })
            }
          ></span>
        </h2>
        {albumToggle ? (
          <div>
            <ListItemNav
              removePhotosHandler={removePhotosHandler}
              checkAllPhotosHandler={() => checkAllPhotosHandler(album)}
              unCheckAllPhotosHandler={() => unCheckAllPhotosHandler(album)}
              lightboxPhotosHandler={() => this.lightboxPhotosHandler(0)}
            />
            <div id={`album-list-${album._id}`} className="row">
              {photos}
            </div>
            {photosUrls && isOpen && (
              <Lightbox
                mainSrc={photosUrls[photoIndex]}
                nextSrc={photosUrls[(photoIndex + 1) % photosUrls.length]}
                prevSrc={
                  photosUrls[
                    (photoIndex + photosUrls.length - 1) % photosUrls.length
                  ]
                }
                imageTitle={photoIndex + 1 + "/" + photosUrls.length}
                onCloseRequest={() => this.setState({ isOpen: false })}
                onMovePrevRequest={() =>
                  this.setState({
                    photoIndex:
                      (photoIndex + photosUrls.length - 1) % photosUrls.length
                  })
                }
                onMoveNextRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + 1) % photosUrls.length
                  })
                }
              />
            )}
          </div>
        ) : null}
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
  { removeAlbum }
)(AlbumItem);
