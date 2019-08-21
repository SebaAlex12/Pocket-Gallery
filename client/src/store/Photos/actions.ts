import { Dispatch } from "redux";
import axios from "axios";
import { Photo, ActionTypes, FetchPhotosAction } from "./types";

const url = "https://jsonplaceholder.typicode.com/photos";

export const fetchPhotos = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<any>(url);
    dispatch<FetchPhotosAction>({
      type: ActionTypes.fetchPhotos,
      payload: response.data
    });
  };
};

export const addPhoto = (data: any) => {
  return async (dispatch: Dispatch) => {};
};
