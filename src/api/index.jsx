import Axios from "axios";
import { API_BASE_URL } from "../consts/api";

export default Axios.create({
  baseURL: `http://${API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});
