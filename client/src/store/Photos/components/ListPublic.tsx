import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAlbums } from "../../Albums/actions";
import { Album } from "../../Albums/types";
import ListItem from "../components/ListItem";

interface Iprops {
  albums: Album[];
  fetchAlbums(data: any): void;
}
interface Istatus {
  status: String;
}

class ListPublic extends Component<Iprops, Istatus> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      status: "public"
    };
  }
  componentDidMount() {
    this.props.fetchAlbums(this.state.status);
  }

  getPhotos(path: string) {}

  render() {
    const { albums } = this.props;

    let albumsContent;

    if (albums === null || albums.length === 0) {
      albumsContent = "Loading ...";
    } else {
      albumsContent = albums.map(album => {
        return <h2>{album.title}</h2>;
      });
    }

    return (
      <div className="mt-3 mb-3">
        <div className="row">{albumsContent}</div>
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
  { fetchAlbums }
)(ListPublic);
