import { Dispatch } from "redux";
import axios from "axios";
import { Picture, ActionTypes, FetchPicturesAction } from "./types";

const url = "https://jsonplaceholder.typicode.com/photos";

export const fetchPictures = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<any>(url);
    dispatch<FetchPicturesAction>({
      type: ActionTypes.fetchPictures,
      payload: response.data
    });
  };
};
