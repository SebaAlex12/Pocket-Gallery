import { UsersState, ActionTypes, UserAction } from "./types";

const initialState: UsersState = {
  user: []
};

export const usersReducer = (
  state: UsersState = initialState,
  action: UserAction
): UsersState => {
  switch (action.type) {
    case ActionTypes.addUser:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};
