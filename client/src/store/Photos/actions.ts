import { Dispatch } from "redux";
import axios from "axios";
// import { Photo, ActionTypes, FetchPhotosAction } from "./types";

export const addPhotos = (data: any) => {
  return async (dispatch: Dispatch) => {
    const presentDate = new Date();
    const multifiles: any = document.getElementById("file-select");
    const files = multifiles.files;
    const formData = new FormData();

    const dest = "albums-" + data.albumId;

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i], files[i].name);
    }

    await axios
      .post(`/upload-image/${dest}`, formData)
      .then(res => {
        console.log("image uploaded");
      })
      .catch(err => console.log(err));
  };
};

export const removePhotos = (links: any) => {
  return async (dispatch: Dispatch) => {
    await axios
      .post(`/delete-image/`, { links: links })
      .then(res => {
        console.log("images has been deleted");
      })
      .catch(err => console.log(err));
  };
};
