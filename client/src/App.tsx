import React from "react";
import "./App.css";
import moment from "moment";

import store from "./store/store";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { setCurrenUser } from "./store/Users/actions";

import AlbumLoginForm from "./store/Albums/components/AlbumLoginForm";
import Dashboard from "./layout/Dashboard";
import Landing from "./layout/Landing";
import "./app.scss";

if (localStorage.jwtTokenAuthorization) {
  const { _id, name, createdAt, tokenCreatedAt, logged } = jwt_decode(
    localStorage.jwtTokenAuthorization
  );

  const expiredMinutes = 60;

  const difference = moment(new Date()).diff(tokenCreatedAt, "minutes");
  // console.log("difference", difference);

  if (difference < expiredMinutes) {
    store.dispatch<any>(
      setCurrenUser({ _id, name, createdAt, tokenCreatedAt, logged })
    );
  } else {
    localStorage.removeItem("jwtTokenAuthorization");
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container main-app mt-2">
          <div className="row">
            <div className="col-lg-12">
              {!localStorage.jwtTokenAuthorization ||
              localStorage.jwtTokenAuthorization === undefined ? (
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
