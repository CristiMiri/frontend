import axios from "axios";
import { Device } from "../models/device";

//Returns data from the database as an array of devices
export const getAllDevices = async () => {
  return axios.get("http://localhost:8081/api/v1/devices").then((response) => {
    // console.log(response);
    return response.data;
  });
};

//Returns data from the database as an array of devices owned by a user
export const getUserDevices = async (id: number) => {
  const url = `http://localhost:8081/api/v1/devices/getdevicesbyuserid`;
  return axios
    .post(url, { userId: id })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

//Returns data from the database device with the given id
export const getDeviceById = async (id: number) => {
  const url = `http://localhost:8081/api/v1/devices/${id}`;
  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

//Returns http response from database after inserting a device
//Need to check status code to see if it was successful
export const insertDevice = async (device: Device) => {
  const url = `http://localhost:8081/api/v1/devices/insert`;
  return axios
    .post(url, device)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

//Returns http response from database after updating a device
//Need to check status code to see if it was successful
export const updateDevice = async (device: Device) => {
  const url = `http://localhost:8081/api/v1/devices/update`;
  return axios
    .put(url, device)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

//Returns http response from database after deleting a device
//Need to check status code to see if it was successful
export const deleteDevice = async (id: number) => {
  const url = `http://localhost:8081/api/v1/devices/delete/${id}`;
  return axios.delete(url).then((response) => {
    return response;
  });
};

export const getDeviceUsers = async () => {
  const url = `http://localhost:8081/api/v1/devices/users`;
  return axios.get(url).then((response) => {
    return response.data;
  });
};
