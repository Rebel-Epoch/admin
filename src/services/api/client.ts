import useAuth from "../../Utils/useAuth";
import { getBaseURL } from "./base";
import axios from "axios";

const client = axios.create({
  baseURL: getBaseURL(),
});

client.interceptors.request.use((request) => {
  const { useToken } = request;

  if (useToken !== false) {
    const { token } = useAuth.getState();
    request.headers.set("Authorization", `Bearer ${token}`);
  }
  return request;
});

client.interceptors.response.use(
  (response) => {
    // Uncomment when necessary
    console.log("success >> ");
    // console.log({
    //   url: response.request.responseURL,
    //   response: response.data,
    //   status: response.status,
    // });
    return response;
  },
  (error) => {
    // Uncomment when necessary
    console.log("error >> ");
    if (error.response.data.message) {
      // message.error(error.response.data.message.status);
      console.log(error.response.data.message.status);
    }
    // console.log({
    //   url: error?.request?.responseURL,
    //   response: error.response?.data,
    //   status: error?.response?.status,
    // });
    return Promise.reject(error);
  },
);

export default client;
