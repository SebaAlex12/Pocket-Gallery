import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPictures } from "../actions";

interface Iprops {
  fetchPictures(): void;
}

class PicturesList extends Component<Iprops> {
  componentDidMount() {
    this.props.fetchPictures();
  }
  render() {
    return <div>Pictures list</div>;
  }
}

const mapStateToProps = (state: any) => {
  return {
    pictures: state.pictures
  };
};

export default connect(
  mapStateToProps,
  { fetchPictures }
)(PicturesList);
