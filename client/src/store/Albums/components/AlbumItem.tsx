import React, { Component } from "react";
import ListItem from "../../Photos/components/ListItem";
import ListItemNav from "../../Photos/components/ListItemNav";
import { Album } from "../../Albums/types";

interface Iprops {
  album: Album;
  removePhotosHandler(): void;
  checkIfChecked(data: string): void;
}

interface Istate {
  albumToggle: boolean;
}

class AlbumItem extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      albumToggle: false
    };
  }
  render() {
    const { album, removePhotosHandler, checkIfChecked } = this.props;
    const { albumToggle } = this.state;
    let photos;
    const photosNumber = album.photos.length;

    if (photosNumber > 0) {
      photos = album.photos.map(photo => {
        let imageUrl = `/photos/albums/${album._id}/${photo}`;
        return (
          <ListItem
            key={photo}
            photo={photo}
            imageUrl={imageUrl}
            checkIfChecked={() => checkIfChecked(imageUrl)}
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
          {album.title}
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
            <ListItemNav removePhotosHandler={removePhotosHandler} />
            <div className="row">{photos}</div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default AlbumItem;
