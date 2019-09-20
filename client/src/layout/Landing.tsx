import React, { Component } from "react";
import { connect } from "react-redux";

import ListPublic from "../store/Photos/components/ListPublic";
import PhotoAddForm from "../store/Photos/components/PhotoAddForm";

import "./landing.scss";

interface Istate {
  addImageToggle: boolean;
}

interface Iprops {}

class Landing extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      addImageToggle: false
    };
  }
  render() {
    const { addImageToggle } = this.state;
    return (
      <div className="clearfix landing" style={{ clear: "both" }}>
        <nav className="float-right text-right ">
          <button
            className="btn btn-secondary ml-1"
            onClick={() =>
              this.setState({
                addImageToggle: !addImageToggle
              })
            }
          >
            Add images
          </button>
        </nav>
        {addImageToggle ? (
          <div
            className="flow-box jumbotron"
            style={{
              position: "absolute",
              top: "120px",
              right: "15px",
              zIndex: 1000
            }}
          >
            <button
              className="btn btn-primary hide"
              onClick={() =>
                this.setState({
                  addImageToggle: false
                })
              }
            >
              x
            </button>
            {addImageToggle ? <PhotoAddForm /> : null}
          </div>
        ) : null}
        <ListPublic />
      </div>
    );
  }
}

export default connect(
  null,
  {}
)(Landing);
