import CustomAPI from "../API/SmartHomeAPI/CustomAPI";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
// import useAuth from "./useAuth";
import {useAuth} from "../Contexts/AuthProvider"

const useAuthPrivate = () => {
    const refreshTok = useRefreshToken();
    const { auth } = useAuth();
    useEffect(() => {
        const requestIntercept = CustomAPI.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.access_token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = CustomAPI.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if ((error?.response?.status === 401 || error?.response?.status === 422) && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refreshTok();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return CustomAPI(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            CustomAPI.interceptors.request.eject(requestIntercept);
            CustomAPI.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refreshTok])
    return CustomAPI;
}

export default useAuthPrivate;