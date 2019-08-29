import { combineReducers } from "redux";

import { photosReducer } from "./Photos/reducers";
import { PhotosState } from "./Photos/types";
import { usersReducer } from "./Users/reducers";
import { UsersState } from "./Users/types";
import { albumsReducer } from "./Albums/reducers";
import { AlbumsState } from "./Albums/types";

export interface StoreState {
  photos: PhotosState[];
  users: UsersState[];
  albums: AlbumsState[];
}

export const reducers = combineReducers({
  photos: photosReducer,
  users: usersReducer,
  albums: albumsReducer
});
