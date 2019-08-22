import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPhotos } from "../actions";
import ListItem from "./ListItem";
import { Photo } from "../types";

interface Iprops {
  photos: Photo[];
  fetchPhotos(data: any): void;
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
    this.props.fetchPhotos(this.state);
  }

  render() {
    const { photos } = this.props;

    let photosContent;

    if (photos === null || photos.length === 0) {
      photosContent = "Loading ...";
    } else {
      photosContent = photos.map(photo => (
        <ListItem
          key={photo.id}
          title={photo.title}
          description={photo.description}
          imageUrl={photo.imageUrl}
          createdAt={photo.createdAt}
        />
      ));
    }

    return (
      <div className="mt-3 mb-3">
        <div className="row">{photosContent}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    photos: state.photos.photos
  };
};

export default connect(
  mapStateToProps,
  { fetchPhotos }
)(ListPublic);
