import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPhotos } from "../actions";

interface Iprops {
  fetchPhotos(): void;
}

class ListPublic extends Component<Iprops> {
  componentDidMount() {
    this.props.fetchPhotos();
  }
  render() {
    return <div className="mt-3 mb-3">Photos list Public</div>;
  }
}

const mapStateToProps = (state: any) => {
  return {
    photos: state.photos
  };
};

export default connect(
  mapStateToProps,
  { fetchPhotos }
)(ListPublic);
