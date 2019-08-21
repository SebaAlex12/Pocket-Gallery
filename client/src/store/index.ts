import { combineReducers } from "redux";

import { photosReducer } from "./Photos/reducers";
import { PhotosState } from "./Photos/types";
import { usersReducer } from "./Users/reducers";
import { UsersState } from "./Users/types";

export interface StoreState {
  photos: PhotosState[];
  users: UsersState[];
}

export const reducers = combineReducers({
  photos: photosReducer,
  users: usersReducer
});
