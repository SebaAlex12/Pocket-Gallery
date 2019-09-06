import { Dispatch } from "redux";
import axios from "axios";
import { ActionTypes, FetchAlbumsAction, AddAlbumAction } from "./types";

export const fetchAlbums = (data: any) => {
  const status = !data.status ? "public" : data.status;

  const graph = {
    query: `
      query {
        fetchAlbums(status: "${status}"){
          _id
          name
          title
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
    }", description: "${data.description}", status: "${
      data.status
    }", createdAt: "${presentDate.toDateString()}"}){
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
