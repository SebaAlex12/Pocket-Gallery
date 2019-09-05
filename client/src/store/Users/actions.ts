import { Dispatch } from "redux";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { User, SetUserAction, ActionTypes } from "./types";

export const loginUser = (data: any) => {
  return async (dispatch: Dispatch) => {
    const graph = {
      query: `query {
          loginUser(email:"${data.email}",password:"${data.password}"){
            _id
            name
            email
            token
          }
        }
      `
    };

    await axios
      .post("/graphql", JSON.stringify(graph), {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        const { loginUser } = res.data.data;
        // console.log(loginUser.token);

        localStorage.setItem("jwtToken", loginUser.token);
        setAuthToken(loginUser.token);

        // toDO this is wrong way
        window.location.href = "/";

        dispatch<SetUserAction>({
          type: ActionTypes.setUser,
          payload: loginUser
        });
      })
      .catch(err => console.log(err));
  };
};

export const registerUser = (userData: any) => {
  return async (dispatch: Dispatch) => {
    const presentDate = new Date();

    const graph = {
      query: `mutation {
      createUser(userInput: {name: "${userData.name}", email: "${
        userData.email
      }", password: "${
        userData.password
      }", createdAt: "${presentDate.toISOString()}"}){
        _id
        name
        email
      }
    }`
    };

    await axios
      .post<any>("/graphql", JSON.stringify(graph), {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        const { createUser } = res.data.data;
        logoutUser();
        dispatch<SetUserAction>({
          type: ActionTypes.setUser,
          payload: createUser
        });
      })
      .catch(err => console.log(err));
  };
};

export const logoutUser = () => {
  return async (dispatch: Dispatch) => {
    // Remove token fromlocalstorage
    await localStorage.removeItem("jwtToken");
    // remove outh header
    //  setAuthToken(false);
    // set current user to empty object
    //  dispatch(setCurrentUser({}));
    //  history.push("/login");

    // toDO this is wrong way
    window.location.href = "/";
  };
};
