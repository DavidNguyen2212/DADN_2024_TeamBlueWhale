import { Outlet, Link } from "react-router-dom";
import {useState, useEffect, useRef} from "react";
import usePersist from "../../CustomHook/usePersist";
import useRefreshToken from "../../CustomHook/useRefreshToken";
import { useSelector } from "react-redux";
import { useAuth } from "../../Contexts/AuthProvider";
import useAuthPrivate from "../../CustomHook/useAuthPrivate";
import { useNavigate } from "react-router-dom";

const PersistLogin = () => {
    const [persist, setPersist] = usePersist()
    // const token = 
    const {auth, setAuth} = useAuth()
    const effectRan = useRef(false)
    const [trueSuccess, setTrueSuccess] = useState(false)
    const navigate = useNavigate()
    const refreshTok = useRefreshToken()
    console.log("Không có auth: ", auth)

    useEffect(() => {
        // React 18 strict mode
        if (effectRan.current === false || process.env.NODE_ENV != 'development') {
            const verifyRefreshToken = async () => {
                console.log("Verify refresh token")
                try {
                    const new_AccessToken = await refreshTok()
                    // setAuth({access_token: new_AccessToken})
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.log("Error when persist login: ", err)
                }
            }
            if (!auth.access_token && persist)  {
                console.log("Không có auth: ", auth)
                // setTrueSuccess
                verifyRefreshToken()
            }
            else if (auth.access_token)
                navigate('/Dashboard')
                
        }
        return () => effectRan.current = true   // Gọi hàm cleanup sau khi useEffect chạy lần đầu

        // eslint-disable-next-line
    }, [])

    let content = <Outlet />;
    if (!persist) {
        console.log('No persist')
        content = <Outlet />
    }
    else if (trueSuccess) {
        console.log('Success get token')
        console.log("Auth: ", auth)
        content = <Outlet />
    }
    
    return content
}

export default PersistLogin;

