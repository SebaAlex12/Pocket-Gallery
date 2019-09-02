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
    if (album.photos.length > 0) {
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
      <div>
        <h2>
          {album.title}{" "}
          <span
            className="dropdown-toggle"
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
