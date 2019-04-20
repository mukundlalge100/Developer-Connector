import axios from "axios";

const DevConnector = axios.create({
  baseURL: "https://cryptic-coast-55814.herokuapp.com"
});
export default DevConnector;
