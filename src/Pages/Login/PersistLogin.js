import { useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import usePersist from "../../CustomHook/usePersist";
import useRefreshToken from "../../CustomHook/useRefreshToken";
import { useAuth } from "../../Contexts/AuthProvider";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
    const [persist] = usePersist()
    const {auth} = useAuth()
    const effectRan = useRef(false)
    const [trueSuccess, setTrueSuccess] = useState(false)
    const navigate = useNavigate()
    const refreshTok = useRefreshToken()

    useEffect(() => {
        // React 18 strict mode handling
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                console.log("Verify refresh token...")
                try {
                    await refreshTok()
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.log("Error when persist login: ", err)
                }
            }

            if (!auth.access_token && persist) {
                // console.log("Không có auth: ", auth)
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
        console.log('No persist!')
        content = <Outlet />
    }
    else if (trueSuccess) {
        console.log('Success get token!')
        console.log("Authentication info: ", auth)
        content = <Outlet />
    }

    return content
}

export default PersistLogin;

