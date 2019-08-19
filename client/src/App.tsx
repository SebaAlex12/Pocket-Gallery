import React from "react";
import "./App.css";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducers } from "./store/index";

import PicturesList from "./store/Pictures/components/PicturesList";
import LoginForm from "./store/Users/components/LoginForm";
import RegistryForm from "./store/Users/components/RegistryForm";

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

function App() {
  return (
    <Provider store={store}>
      <div className="App container mt-4 mb-4">
        <div className="row">
          <RegistryForm />
          <LoginForm />
        </div>
        <PicturesList />
      </div>
    </Provider>
  );
}

export default App;
