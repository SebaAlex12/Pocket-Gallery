import { Dispatch } from "redux";
import axios from "axios";
import { User, AddUserAction, ActionTypes } from "./types";

export const addUser = (userData: any) => {
  return async (dispatch: Dispatch) => {
    console.log("data", userData);

    // const graphqlQuery = JSON.stringify({
    //   query: `
    //         mutation {
    //           createUser(userInput: {name: "${userData.name}", email: "${
    //     userData.email
    //   }", password: "${userData.password}", createdAt: ${Date.now()}}){
    //             _id
    //             name
    //             email
    //             password
    //           }
    //         }
    //     `
    // });

    const graphqlQuery = {
      query: `mutation {
      createUser(userInput: {name: "jan", email: "jaddn@wp.pl", password: "test", createdAt: "02-12-2010"}){
        _id
        name
        email
        password
      }
    }`
    };

    const response = await axios.get<any>("/graphql", {
      data: JSON.stringify(graphqlQuery),
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log(response);

    dispatch<AddUserAction>({
      type: ActionTypes.addUser,
      payload: response.data
    });
  };
};
