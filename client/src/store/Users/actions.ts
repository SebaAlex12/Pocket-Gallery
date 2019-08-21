import { Dispatch } from "redux";
import axios from "axios";
import { User, AddUserAction, ActionTypes } from "./types";

export const addUser = (userData: any) => {
  return async (dispatch: Dispatch) => {
    const presentDate = new Date();

    const graphqlQuery = {
      query: `mutation {
      createUser(userInput: {name: "${userData.name}", email: "${
        userData.email
      }", password: "${
        userData.password
      }", createdAt: "${presentDate.toISOString()}"}){
        _id
        name
        email
        password
      }
    }`
    };

    const response = await axios.post<any>(
      "/graphql",
      JSON.stringify(graphqlQuery),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    // console.log(response); toDo data.data.createUser

    dispatch<AddUserAction>({
      type: ActionTypes.addUser,
      payload: response.data.data.createUser
    });
  };
};
