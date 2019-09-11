import React from "react";
import "./App.css";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducers } from "./store/index";
import { BrowserRouter as Router } from "react-router-dom";

import AlbumLoginForm from "./store/Albums/components/AlbumLoginForm";
import Dashboard from "./layout/Dashboard";
import Landing from "./layout/Landing";
import "./app.scss";

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

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
