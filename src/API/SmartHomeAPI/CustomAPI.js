import axios from "axios";

const CustomAPI = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: { crossDomain: true, 'Content-Type': 'application/json' },

});



export default CustomAPI;