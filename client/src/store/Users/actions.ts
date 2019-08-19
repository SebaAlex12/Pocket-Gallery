import { Dispatch } from "redux";
import axios from "axios";
import { User, AddUserAction, ActionTypes } from "./types";

export const addUser = (data: any) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<any>("/graphql");

    dispatch<AddUserAction>({
      type: ActionTypes.addUser,
      payload: response.data
    });
  };
};
