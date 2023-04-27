import API_ENDPOINTS from "../config/api-endpoints";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "./axios.service";

export const createLabel = async (data) => {
  try {
    let form_data = new FormData();
    if (data.image) {
      form_data.append("image", data.image, data.image.name);
      delete data.image;
    }
    // console.log(Object.keys(data));
    // // Object.keys(data).forEach((item) => form_data.append((item, data[item])));
    // // Object.keys(data).forEach((item) => {
    // //   form_data.append(item, data[item]);
    // // });
    Object.keys(data).forEach((item) => {
      form_data.append(item, data[item]);
    });

    // for (const value of form_data.values()) {
    //   console.log(value);
    // }
    let response = await postRequest(
      API_ENDPOINTS.LABEL,
      form_data,
      true,
      true
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const getLabelByType = async (type) => {
  try {
    let result = await getRequest(API_ENDPOINTS.LABEL + "?type=" + type);
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteLabelById = async (id) => {
  try {
    //
    let result = await deleteRequest(API_ENDPOINTS.LABEL + "/" + id, true);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getLabelById = async (id) => {
  try {
    //
    let result = await getRequest(API_ENDPOINTS.LABEL + "/" + id, true);
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateLabel = async (data, id) => {
  try {
    let form_data = new FormData();
    if (data.image && typeof data.image === "object") {
      form_data.append("image", data.image, data.image.name);
      delete data.image;
    } else {
      delete data.image;
    }

    Object.keys(data).forEach((item) => {
      form_data.append(item, data[item]);
    });

    let response = await putRequest(
      API_ENDPOINTS.LABEL + "/" + id,
      form_data,
      true,
      true
    );

    return response;
  } catch (error) {
    throw error;
  }
};
