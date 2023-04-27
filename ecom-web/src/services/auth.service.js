import { postRequest, getRequest } from "./axios.service";
import API_ENDPOINTS from "../config/api-endpoints";

export const login = async (data) => {
  try {
    let login_response = await postRequest(API_ENDPOINTS.LOGIN_URL, data);
    if (login_response.result.access_token) {
      //
      localStorage.setItem("auth_token", login_response.result.access_token);
      let user_info = {
        name: login_response.result.user.name,
        email: login_response.result.user.email,
        _id: login_response.result.user._id,
        role: login_response.result.user.role,
      };

      localStorage.setItem("auth_user", JSON.stringify(user_info));
      return login_response;
    } else {
      return login_response.result;
    }
  } catch (error) {
    throw error.response.data.msg;
  }
};
export const getVerifed = async () => {
  try {
    let response = await getRequest(API_ENDPOINTS.VERIFY_USER, true);

    return response;
  } catch (error) {
    // err
    throw error;
  }
};
