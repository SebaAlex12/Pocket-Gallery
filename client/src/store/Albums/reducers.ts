import { AlbumsState, ActionTypes, AlbumsAction } from "./types";

const initialState: AlbumsState = {
  albums: []
};

export const albumsReducer = (
  state: AlbumsState = initialState,
  action: AlbumsAction
): AlbumsState => {
  switch (action.type) {
    case ActionTypes.fetchAlbums:
      return {
        ...state,
        albums: action.payload
      };
    case ActionTypes.addAlbum:
      return {
        ...state,
        albums: [...state.albums, action.payload]
      };
    case ActionTypes.removeAlbum:
      return {
        ...state,
        albums: state.albums.filter(album => album._id != action.payload._id)
      };
    default:
      return state;
  }
};
