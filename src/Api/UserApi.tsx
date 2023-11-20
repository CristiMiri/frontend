import axios from "axios";
import { User } from "../models/user";

//Returns data from the database users as an array of users
export const getAllUsers = async () => {
  return axios.get("http://localhost:8080/user").then((response) => {
    // console.log(response);
    return response.data;
  });
};

//Returns data from the database user with the given id
export const getUserById = async (id: number) => {
  const url = `http://localhost:8080/user/${id}`;
  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

//Returns http response from database after inserting a user
//Need to check status code to see if it was successful
export const registerUser = async (user: User) => {
  const url = `http://localhost:8080/user/register`;
  return axios
    .post(url, user)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

//Returns http response from database after updating a user
//Need to check status code to see if it was successful
export const updateUser = async (user: User) => {
  const url = `http://localhost:8080/user/update`;
  return axios
    .put(url, user)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

//Returns http response from database after deleting a user
//Need to check status code to see if it was successful
export const deleteUser = async (id: number) => {
  const url = `http://localhost:8080/user/delete/${id}`;
  return axios
    .delete(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};
