import CustomAPI from "../API/SmartHomeAPI/CustomAPI";
import { useAuth } from "../Contexts/AuthProvider";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refreshTok = async () => {
        CustomAPI.defaults.withCredentials = true; 
        const response = await CustomAPI.get('/refresh', {
            withCredentials: true,
        });

        setAuth((prev) => {
            // console.log(JSON.stringify(prev));
            // console.log(response.data.access_token)
            return {...prev, access_token: response.data.access_token}
        })
        return response.data.access_token;
    }

    return refreshTok;
}

export default useRefreshToken;