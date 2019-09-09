export interface Album {
  _id: string;
  name: string;
  title: string;
  access: string;
  description: string;
  status: string;
  photos: [];
  createdAt: string;
}

export interface AlbumsState {
  albums: Album[];
}

export enum ActionTypes {
  fetchAlbums = "FETCH_ALBUMS",
  addAlbum = "ADD_ALBUM"
}

export interface FetchAlbumsAction {
  type: ActionTypes.fetchAlbums;
  payload: Album[];
}

export interface AddAlbumAction {
  type: ActionTypes.addAlbum;
  payload: Album;
}

export type AlbumsAction = FetchAlbumsAction | AddAlbumAction;
