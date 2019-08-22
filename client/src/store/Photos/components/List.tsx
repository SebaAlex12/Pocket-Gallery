import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPhotos } from "../actions";

interface Iprops {
  fetchPhotos(data: any): void;
}
interface Istatus {
  status: String;
}

class List extends Component<Iprops, Istatus> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      status: "private"
    };
  }
  componentDidMount() {
    this.props.fetchPhotos(this.state);
  }
  render() {
    return <div className="mt-3 mb-3">Photos list public / private</div>;
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
)(List);
