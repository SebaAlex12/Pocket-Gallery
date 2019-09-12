export interface User {
  _id: String;
  name: String;
  email: String;
  password: String;
  logged: String;
}

export interface UsersState {
  user: User[];
}

export enum ActionTypes {
  setUser = "SET_USER"
}

export interface SetUserAction {
  type: ActionTypes.setUser;
  payload: User[];
}

export type UserAction = SetUserAction;
