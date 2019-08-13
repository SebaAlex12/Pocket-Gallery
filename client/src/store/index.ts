import { combineReducers } from "redux";
import { picturesReducer } from "./Pictures/reducers";
import { PicturesState } from "./Pictures/types";

export interface StoreState {
  pictures: PicturesState[];
}

export const reducers = combineReducers({
  pictures: picturesReducer
});
