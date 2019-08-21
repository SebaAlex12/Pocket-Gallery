export interface User {
  name: String;
  email: String;
  password: String;
}

export interface UsersState {
  user: User[];
}

export enum ActionTypes {
  addUser = "ADD_USER"
}

export interface AddUserAction {
  type: ActionTypes.addUser;
  payload: User[];
}

export type UserAction = AddUserAction;
