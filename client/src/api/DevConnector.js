import axios from "axios";

const DevConnector = axios.create({
  baseURL: "https://cryptic-coast-55814.herokuapp.com"
  // baseURL: "http://localhost:5050"
});
export default DevConnector;
