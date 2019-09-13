import { Dispatch } from "redux";
import axios from "axios";
// import store from "../store";

import {
  ActionTypes,
  FetchAlbumsAction,
  AddAlbumAction,
  RemoveAlbumAction
} from "./types";

// Albums authorization token
import jwt from "jsonwebtoken";
// import setAlbumAuthToken from "../../utils/setAlbumAuthToken";

export const loginAlbums = (access: any) => {
  return async (dispatch: Dispatch) => {
    const token = jwt.sign(
      { data: { access: access } },
      "secretkeyokeyforalbums",
      {
        expiresIn: "1h"
      }
    );
    // localStorage.setItem("jwtTokenAlbums", token);
    sessionStorage.setItem("jwtTokenAlbums", token);
    // setAlbumAuthToken(token);
  };
};

export const logoutAlbums = () => {
  return async (dispatch: Dispatch) => {
    await sessionStorage.removeItem("jwtTokenAlbums");
  };
};

export const fetchAlbums = (userId: string | null) => {
  const jwtTokenAlbums = sessionStorage.getItem("jwtTokenAlbums");
  // console.log("user id", userId);

  let id;
  let status;
  let access;

  if (userId) {
    // if userId is set status will be administrator
    id = userId;
    status = "administrator";
    access = "";
  } else if (jwtTokenAlbums) {
    // if token is set status will be private
    id = null;
    status = "private";
    access = jwtTokenAlbums;
  } else {
    // other cases status will be public
    id = null;
    status = "public";
    access = "";
  }

  // const status = jwtTokenAlbums ? "private" : "public";
  // const access = jwtTokenAlbums ? jwtTokenAlbums : "";

  const graph = {
    query: `
      query {
        fetchAlbums(userId: "${id}", status: "${status}", access: "${access}"){
          _id
          name
          title
          access
          description
          status
          photos
          createdAt
        }
      }
      `
  };

  return async (dispatch: Dispatch) => {
    await axios
      .post("/graphql", JSON.stringify(graph), {
        headers: { "Content-Type": "application/json" }
      })
      .then(res => {
        dispatch<FetchAlbumsAction>({
          type: ActionTypes.fetchAlbums,
          payload: res.data.data.fetchAlbums
        });
      })
      .catch(err => console.log(err));
  };
};

export const addAlbum = (data: any) => {
  const presentDate = new Date();

  // not fast removed
  // const state = store.getState();

  const graph = {
    query: `mutation {
      addAlbum(albumInput: { userId: "${data.userId}", name: "${
      data.name
    }", title: "${data.title}", access: "${data.access}", description: "${
      data.description
    }", status: "${data.status}", createdAt: "${presentDate.toDateString()}"}){
      _id
      name
      title
      description
      status
      photos
      createdAt
      }
    }`
  };

  return async (dispatch: Dispatch) => {
    await axios
      .post("/graphql", JSON.stringify(graph), {
        headers: { "Content-Type": "application/json" }
      })
      .then(res => {
        dispatch<AddAlbumAction>({
          type: ActionTypes.addAlbum,
          payload: res.data.data.addAlbum
        });
      })
      .catch(err => console.log(err));
  };
};
export const removeAlbum = (albumId: string) => {
  console.log("id", albumId);
  return async (dispatch: Dispatch) => {
    const graph = {
      query: `
      mutation {
        removeAlbum(albumId:"${albumId}"){
          _id
        }
      }
      `
    };
    await axios
      .post("/graphql", JSON.stringify(graph), {
        headers: { "Content-Type": "application/json" }
      })
      .then(res => {
        dispatch<RemoveAlbumAction>({
          type: ActionTypes.removeAlbum,
          payload: res.data.data.removeAlbum
        });
      })
      .catch(err => console.log(err));

    // return response;
  };
};
