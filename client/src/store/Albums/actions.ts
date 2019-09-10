import { Dispatch } from "redux";
import axios from "axios";
import { ActionTypes, FetchAlbumsAction, AddAlbumAction } from "./types";

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

export const fetchAlbums = () => {
  const jwtTokenAlbums = sessionStorage.getItem("jwtTokenAlbums");

  // if token is set status will always be private
  const status = jwtTokenAlbums ? "private" : "public";
  const access = jwtTokenAlbums ? jwtTokenAlbums : "";

  const graph = {
    query: `
      query {
        fetchAlbums(status: "${status}", access: "${access}"){
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

  const graph = {
    query: `mutation {
      addAlbum(albumInput: { name: "${data.name}", title: "${
      data.title
    }", access: "${data.access}", description: "${
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
