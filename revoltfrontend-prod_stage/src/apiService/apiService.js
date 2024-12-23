import { jwtDecode } from "jwt-decode";
import { URL_API } from "../constants/cartConstants";
import Axios from "axios";

const ApiService = async ({ url, method, payload }) => {
  let response = await Axios(URL_API + url, { method, data: payload });
  response.data.data = jwtDecode(response.data.data);

  console.log(response);
  return response;
};

export default ApiService;
