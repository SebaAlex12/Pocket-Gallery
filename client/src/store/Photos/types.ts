export interface Photo {
  id: string;
  title: string;
  name: string;
  description: string;
  imageUrl: string;
  status: string;
  createdAt: string;
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
