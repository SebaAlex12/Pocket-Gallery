import React from "react";
import "./App.css";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducers } from "./store/index";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Dashboard from "./layout/Dashboard";
import Landing from "./layout/Landing";

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Pocket Gallery</h1>
              {!localStorage.jwtToken || localStorage.jwtToken === undefined ? (
                <Dashboard />
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
