import PhotosList from "../store/Photos/components/List";
import LogoutButton from "../store/Users/components/LogoutButton";
import AddForm from "../store/Photos/components/AddForm";

import React, { Component } from "react";

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
      <div>
        <nav>
          <LogoutButton />
          <button
            className="btn btn-secondary float-right mr-1"
            onClick={() =>
              this.setState({
                addImageToggle: !addImageToggle
              })
            }
          >
            Add image
          </button>
        </nav>
        <div
          className="flow-box jumbotron"
          style={{ position: "absolute", top: "120px", right: "15px" }}
        >
          {addImageToggle ? <AddForm /> : null}
        </div>
        <PhotosList />
      </div>
    );
  }
}

export default Landing;
