export interface Photo {
  title: String;
  name: String;
  description: String;
  imageUrl: String;
  createdAt: String;
}

export interface PhotosState {
  photos: Photo[];
}

export enum ActionTypes {
  fetchPhotos = "FETCH_PHOTOS"
}

export interface FetchPhotosAction {
  type: ActionTypes.fetchPhotos;
  payload: Photo[];
}

export type PhotosAction = FetchPhotosAction;
