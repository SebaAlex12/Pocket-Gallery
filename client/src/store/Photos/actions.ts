import axios from "axios";
// import { Photo, ActionTypes, FetchPhotosAction } from "./types";

export const addPhotos = (albumId: string) => {
  return async () => {
    // const presentDate = new Date();
    const multifiles: any = document.getElementById("file-select");
    const files = multifiles.files;
    const formData = new FormData();

    const dest = "albums-" + albumId;

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i], files[i].name);
    }

    await axios
      .post(`/upload-image/${dest}`, formData)
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .catch(err => console.log(err));
  };
};

export const removePhotos = (links: any) => {
  return async () => {
    await axios
      .post(`/delete-image/`, { links: links })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };
};
