import { Dispatch } from "redux";
import axios from "axios";
import { Photo, ActionTypes, FetchPhotosAction } from "./types";

export const fetchPhotos = (data: any) => {
  const status = !data.status ? "public" : data.status;

  return async (dispatch: Dispatch) => {
    const graph = {
      query: `
        query {
          fetchPhotos(album: "${data.album}",category: "${
        data.category
      }",status:"${status}"){
        _id
        title
        description
        imageUrl
        createdAt
          }
        }
      `
    };

    await axios
      .post<any>("/graphql", JSON.stringify(graph), {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        dispatch<FetchPhotosAction>({
          type: ActionTypes.fetchPhotos,
          payload: res.data.data.fetchPhotos
        });
      });
  };
};

export const addPhoto = (data: any) => {
  return async (dispatch: Dispatch) => {
    const presentDate = new Date();
    const multifiles: any = document.getElementById("file-select");
    const files = multifiles.files;
    const formData = new FormData();
    const dest = "albums-maja";

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i], files[i].name);
    }

    await axios.post(`/upload-image/${dest}`, formData).then(res => {
      console.log("image uploaded");
    });

    const graph = {
      query: `
      mutation {
        addPhoto(photoInput:{title:"${data.title}", description: "${
        data.description
      }",imageUrl:"${data.imageUrl}",status:"${
        data.status
      }",createdAt:"${presentDate.toISOString()}"}){
          _id
          title
          status
        }
      }
      `
    };
    await axios
      .post<any>("/graphql", JSON.stringify(graph), {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        console.log("image  added");
      });
  };
};
