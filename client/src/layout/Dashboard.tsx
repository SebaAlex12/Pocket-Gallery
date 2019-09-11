import React, { Component } from "react";
import { connect } from "react-redux";

import ListPublic from "../store/Photos/components/ListPublic";
import LoginForm from "../store/Users/components/LoginForm";
import RegistryForm from "../store/Users/components/RegistryForm";
import AddForm from "../store/Photos/components/AddForm";
import { fetchAlbums, logoutAlbums } from "../store/Albums/actions";

import "./dashboard.scss";

interface Istate {
  registryToggle: boolean;
  loginToggle: boolean;
  addImageToggle: boolean;
}

interface Iprops {
  logoutAlbums(): void;
  fetchAlbums(): void;
}

class Dashboard extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      registryToggle: false,
      loginToggle: false,
      addImageToggle: false
    };
  }
  clearAccessTokenHandler = async () => {
    const { fetchAlbums, logoutAlbums } = this.props;
    await logoutAlbums();
    await fetchAlbums();
  };
  render() {
    const { registryToggle, loginToggle, addImageToggle } = this.state;
    return (
      <div className="clearfix dashboard" style={{ clear: "both" }}>
        <nav className="float-right text-right ">
          <button
            className="btn btn-danger btn-secondary ml-1"
            onClick={this.clearAccessTokenHandler}
          >
            Clear access token
          </button>
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
            Add images
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
        {addImageToggle || registryToggle || loginToggle ? (
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
                  loginToggle: false,
                  registryToggle: false,
                  addImageToggle: false
                })
              }
            >
              x
            </button>
            {addImageToggle ? <AddForm /> : null}
            {registryToggle ? <RegistryForm /> : null}
            {loginToggle ? <LoginForm /> : null}
          </div>
        ) : null}
        <ListPublic />
      </div>
    );
  }
}

export default connect(
  null,
  { fetchAlbums, logoutAlbums }
)(Dashboard);
