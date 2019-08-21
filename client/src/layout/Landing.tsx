import PicturesList from "../store/Pictures/components/PicturesList";
import LogoutButton from "../store/Users/components/LogoutButton";

import React, { Component } from "react";

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="App container mt-4 mb-4">
          <div className="row">
            <h1>Landing</h1>
            <LogoutButton />
          </div>
          <PicturesList />
        </div>
      </div>
    );
  }
}

export default Landing;
