import axios from "axios";

const BackendAPI = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
    "Content-Type": "application/json",
  },
});

export default BackendAPI;