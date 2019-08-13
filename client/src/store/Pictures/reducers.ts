import { PicturesState, ActionTypes, PicturesAction } from "./types";

const initialState: PicturesState = {
  pictures: []
};

export const picturesReducer = (
  state: PicturesState = initialState,
  action: PicturesAction
): PicturesState => {
  switch (action.type) {
    case ActionTypes.fetchPictures:
      return {
        ...state,
        pictures: action.payload
      };
    default:
      return state;
  }
};
