export interface Album {
  _id: string;
  name: string;
  title: string;
  description: string;
  status: string;
  photos: [];
  createdAt: string;
}

export interface AlbumsState {
  albums: Album[];
}

export enum ActionTypes {
  fetchAlbums = "FETCH_ALBUMS"
}

export interface FetchAlbumsAction {
  type: ActionTypes.fetchAlbums;
  payload: Album[];
}

export type AlbumsAction = FetchAlbumsAction;
