import axios from "axios";

const SmartHomeAPI = axios.create({
    baseURL: process.env.REACT_APP_QUI_URL,
    headers: {
    "Content-Type": "application/json",
    "X-AIO-Key": process.env.REACT_APP_QUI_KEY
  },
});

// SmartHomeAPI.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("accessToken");
//         if (token) 
//             config.headers["Authorization"] = `Bearer ${token}`;
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// SmartHomeAPI.interceptors.response.use(
//     (reponse) => {
//         return reponse;
//     },
//     async (error) => {
//         const path = "/v1/user/refresh-access-token";
//     const originalConfig = error.config;
//     // console.log("Access_token expired");
//     if (error.response && error.response.status == 410) {
//         try {
//             console.log("call refresh token");
//             const result = await SpssAPI.post(path, {
//             refreshToken: localStorage.getItem("refreshToken"),
//             });
//             const { accesstoken, refreshtoken } = result.data;
//             localStorage.setItem("accessToken", accesstoken);
//             localStorage.setItem("refreshToken", refreshtoken);
//             originalConfig.headers["Authorization"] = `Bearer ${accesstoken}`;

//             return SpssAPI(originalConfig);
//         } catch (err) {
//             if (err.response && err.response.status === 419) {
//                 localStorage.removeItem("accessToken");
//                 localStorage.removeItem("refreshToken");
//                 window.location.href = "/Login";
//             }
//             return Promise.reject(err);
//             }
//         }   
//         return Promise.reject(error)
//     }
// );

export default SmartHomeAPI;
