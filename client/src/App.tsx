import React from "react";
import "./App.css";

import store from "./store/store";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { setCurrenUser } from "./store/Users/actions";

import AlbumLoginForm from "./store/Albums/components/AlbumLoginForm";
import Dashboard from "./layout/Dashboard";
import Landing from "./layout/Landing";
import "./app.scss";

if (localStorage.jwtToken) {
  const userData = jwt_decode(localStorage.jwtToken);
  store.dispatch<any>(setCurrenUser(userData));
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container main-app mt-2">
          <div className="row">
            <div className="col-lg-12">
              {!localStorage.jwtToken || localStorage.jwtToken === undefined ? (
                <div className="logout-box">
                  <h1 className="float-left">Pocket Gallery</h1>
                  <AlbumLoginForm />
                  <Dashboard />
                </div>
              ) : (
                <Landing />
              )}
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
