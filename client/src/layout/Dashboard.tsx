import PicturesList from "../store/Pictures/components/PicturesList";
import LoginForm from "../store/Users/components/LoginForm";
import RegistryForm from "../store/Users/components/RegistryForm";

import React, { Component } from "react";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="App container mt-4 mb-4">
          <div className="row">
            <RegistryForm />
            <LoginForm />
          </div>
          <PicturesList />
        </div>
      </div>
    );
  }
}

export default Dashboard;
