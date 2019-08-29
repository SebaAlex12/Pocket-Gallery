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
    default:
      return state;
  }
};
