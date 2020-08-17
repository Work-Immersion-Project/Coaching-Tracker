import Axios from "axios";
import { config } from "../consts/config";

const prod = Axios.create({
  baseURL: `https://${config.API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

const dev = Axios.create({
  baseURL: `http://${config.API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default process.env.NODE_ENV === "development" ? dev : prod;
