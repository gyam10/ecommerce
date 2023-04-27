import API_ENDPOINTS from "../config/api-endpoints";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "./axios.service";

export const createUser = async (data) => {
  try {
    console.log("Data:", data);
    let form_data = new FormData();
    if (data.image) {
      form_data.append("image", data.image, data.image.name);
      delete data.image;
    }
    // console.log(Object.keys(data));

    Object.keys(data).forEach((item) => {
      form_data.append(item, data[item]);
    });

    let response = await postRequest(
      API_ENDPOINTS.REGISTER,
      form_data,
      true,
      true
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserByRole = async (role) => {
  try {
    let result = await getRequest(API_ENDPOINTS.USER + "?role=" + role, true);
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteUserById = async (id) => {
  try {
    //
    let result = await deleteRequest(API_ENDPOINTS.USER + "/" + id, true);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    //
    let result = await getRequest(API_ENDPOINTS.USER + "/" + id, true);
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (data, id) => {
  try {
    console.log(data);
    let form_data = new FormData();
    if (data.image && typeof data.image === "object") {
      form_data.append("image", data.image, data.image.name);
      delete data.image;
      if (data.role) {
        data.role = data.role.map((item) => item.value);
      }
    } else {
      delete data.image;
    }
    delete data.role_id;

    Object.keys(data).forEach((item) => {
      form_data.append(item, data[item]);
    });

    let response = await putRequest(
      API_ENDPOINTS.USER + "/" + id,
      form_data,
      true,
      true
    );

    return response;
  } catch (error) {
    throw error;
  }
};
