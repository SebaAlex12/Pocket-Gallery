export interface Picture {
  title: String;
  name: String;
  description: String;
  imageUrl: String;
  createdAt: String;
}

export interface PicturesState {
  pictures: Picture[];
}

export enum ActionTypes {
  fetchPictures = "FETCH_PICTURES"
}

export interface FetchPicturesAction {
  type: ActionTypes.fetchPictures;
  payload: Picture[];
}

export type PicturesAction = FetchPicturesAction;
