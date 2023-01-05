import axios from "axios";
import store from "../store";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

instance.interceptors.request.use(
  (request) => {
    if (store.state.accessToken) {
      request.headers["x-access-token"] = `${store.state.accessToken}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
