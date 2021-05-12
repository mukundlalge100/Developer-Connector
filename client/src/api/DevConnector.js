import axios from "axios";

const DevConnector = axios.create({
  baseURL: "https://dev-connector-rest.herokuapp.com",
  // baseURL: "http://localhost:5050"
});
export default DevConnector;
