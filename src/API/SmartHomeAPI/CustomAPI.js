import axios from "axios";

const CustomAPI = axios.create({
  baseURL: "https://dadn-2024-backend.onrender.com",
  withCredentials: true,
  headers: { crossDomain: true, 'Content-Type': 'application/json' },

});



export default CustomAPI;