import axios from "axios";

const BackendAPI = axios.create({
    baseURL: "https://dadn-2024-backend.onrender.com",
    headers: {
    "Content-Type": "application/json",
  },
});

export default BackendAPI;