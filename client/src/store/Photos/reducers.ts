import { PhotosState, ActionTypes, PhotosAction } from "./types";

const initialState: PhotosState = {
  photos: []
};

export const photosReducer = (
  state: PhotosState = initialState,
  action: PhotosAction
): PhotosState => {
  switch (action.type) {
    case ActionTypes.fetchPhotos:
      return {
        ...state,
        photos: action.payload
      };
    default:
      return state;
  }
};
