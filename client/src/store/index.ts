import { combineReducers } from "redux";

import { picturesReducer } from "./Pictures/reducers";
import { PicturesState } from "./Pictures/types";
import { usersReducer } from "./Users/reducers";
import { UsersState } from "./Users/types";

export interface StoreState {
  pictures: PicturesState[];
  users: UsersState[];
}

export const reducers = combineReducers({
  pictures: picturesReducer,
  users: usersReducer
});
