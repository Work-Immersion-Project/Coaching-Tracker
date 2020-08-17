import Axios from "axios";
import { config } from "../consts/config";

export default Axios.create({
  baseURL: `http://${config.API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});
