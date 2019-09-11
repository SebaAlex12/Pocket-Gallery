import React, { Component } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import ListItem from "../../Photos/components/ListItem";
import ListItemNav from "../../Photos/components/ListItemNav";
import { Album } from "../../Albums/types";

interface Iprops {
  album: Album;
  removePhotosHandler(): void;
  checkAllPhotosHandler(album: Album): void;
  unCheckAllPhotosHandler(album: Album): void;
  checkIfChecked(data: string): void;
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
  lightboxPhotosHandler(photoIndex: any) {
    const { isOpen } = this.state;
    this.setState({ photoIndex: photoIndex });
    this.setState({ isOpen: !isOpen });
  }
  render() {
    const {
      album,
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
            photo={photo}
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
      <div className="album-box">
        <h2>
          <button type="button" className="btn btn-primary mr-3">
            photos <span className="badge badge-light">{photosNumber}</span>
          </button>
          {`${album.title} / ${album.status}`}
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

export default AlbumItem;
