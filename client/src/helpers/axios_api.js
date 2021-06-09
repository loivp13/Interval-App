import axios from "axios";

const mode = process.env.NODE_ENV === "development" ? "dev" : "prod";

let axiosOptions = {
  baseURL: process.env.REACT_APP_SERVER_URL_DEV,
  Headers: {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "https://localhost",
  },
};
switch (mode) {
  case "dev":
    break;
  case "prod":
    axiosOptions = {
      ...axiosOptions,
      baseURL: process.env.REACT_APP_SERVER_URL_PROD,
    };
  default:
    break;
}

export const apiAxios = axios.create(axiosOptions);
