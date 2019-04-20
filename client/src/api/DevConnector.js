import axios from "axios";

const DevConnector = axios.create({
  baseURL: "http://localhost:5050"
});
export default DevConnector;
