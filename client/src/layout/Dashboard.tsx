import PhotosListPublic from "../store/Photos/components/ListPublic";
import LoginForm from "../store/Users/components/LoginForm";
import RegistryForm from "../store/Users/components/RegistryForm";
import AddForm from "../store/Photos/components/AddForm";

import React, { Component } from "react";

interface Istate {
  registryToggle: boolean;
  loginToggle: boolean;
  addImageToggle: boolean;
}

interface Iprops {}

class Dashboard extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      registryToggle: false,
      loginToggle: false,
      addImageToggle: false
    };
  }
  render() {
    const { registryToggle, loginToggle, addImageToggle } = this.state;
    return (
      <div>
        <nav className="float-right text-right ">
          <button
            className="btn btn-secondary ml-1"
            onClick={() =>
              this.setState({
                addImageToggle: !addImageToggle,
                registryToggle: false,
                loginToggle: false
              })
            }
          >
            Add image
          </button>
          <button
            className="btn btn-secondary ml-1"
            onClick={() =>
              this.setState({
                registryToggle: !registryToggle,
                loginToggle: false,
                addImageToggle: false
              })
            }
          >
            Registry
          </button>
          <button
            className="btn btn-secondary ml-1"
            onClick={() =>
              this.setState({
                loginToggle: !loginToggle,
                registryToggle: false,
                addImageToggle: false
              })
            }
          >
            Login
          </button>
        </nav>
        <div
          className="flow-box jumbotron"
          style={{ position: "absolute", top: "120px", right: "15px" }}
        >
          {addImageToggle ? <AddForm /> : null}
          {registryToggle ? <RegistryForm /> : null}
          {loginToggle ? <LoginForm /> : null}
        </div>
        <PhotosListPublic />
      </div>
    );
  }
}

export default Dashboard;
