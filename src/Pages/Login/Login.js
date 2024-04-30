import styles from './Login.module.css'
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../App';
import { FaUser, FaLock } from 'react-icons/fa';
import { io } from 'socket.io-client';
import { useSocket } from '../../Contexts/SocketIOContext';
import { useNewNotice } from '../../Contexts/NoticeContext';
import { GetNumberNotifs } from '../../API/NotificationAPI/NotificationAPI';
import axios from 'axios';
import { useAuth } from '../../Contexts/AuthProvider';
import Login4xx from '../../Modals/UserInfoModal/Login4xx';
import usePersist from '../../CustomHook/usePersist';
import Cookies from 'js-cookie';


const LOGIN_URL = "https://dadn-2024-backend.onrender.com/login"

const Login = () => {
  const {role, setRole} = useContext(LoginContext);
  const UserSocket = useSocket();
  const NewNoticeContext = useNewNotice()
  const navigate = useNavigate();
  const [persist, setPersist] = usePersist()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [open401, setOpen401] = useState(false)
  const [open, setOpen] = useState(false)
  const {setAuth} = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen401(false)
    setOpen(false)
    let isLogin = 'success'
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(LOGIN_URL, JSON.stringify({username, password}), 
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      // console.log(JSON.stringify(response?.data));
      const access_token = response?.data?.access_token;
      setUsername();
      setPassword();
      setAuth({username, password, access_token})
      setPersist(true)
      Cookies.set('csrf_refresh_token', response?.data?.csrf_refresh_token, {secure: true, sameSite: 'None'})
    }
    catch (err) {
      if (!err?.response) {
        isLogin = 'No Server Response';
        setOpen(true)
      } else if (err.response?.status === 401) {
        isLogin = 'Incorrect username or password'
        setOpen401(true)
      } 
      else if (err.response?.status === 403) {
        isLogin = 'Already sign in';
        setAuth({username, password})
        navigate("/Dashboard")
      }
      else {
        isLogin = 'Login Failed';
        setOpen(true)
      }
      console.log("Error when logging in: ", err)
    }
    
    if (isLogin === 'success') {
      setRole("family_member");
      const socket = io("https://dadn-2024-backend.onrender.com");
      socket.on("connect", () => {
        console.log("Init socket IO with socketID = ", socket?.id);
      });
      
      UserSocket?.connectSocket(socket);

      const responseNotice = await GetNumberNotifs();
      console.log("Respone notice: ", responseNotice)
      NewNoticeContext?.updateNewNotice(responseNotice?.data.newNotifsToday);
      navigate("/Dashboard");
    }
  }


  return (
    <div className={`${styles.wrapper} flex justify-center items-center min-h-[100vh] rounded-md`}>
      {open401 && 
      <Login4xx content="Sai tài khoản hoặc mật khẩu">

      </Login4xx>}

      {open && 
      <Login4xx content="Lỗi server vui lòng thử lại sau.">

      </Login4xx>}
      
      <div className={`${styles.inner_wrapper} p-5 backdrop-blur-xl rounded-xl`}>

        <form onSubmit={handleSubmit} action=''>
          <h1 className='text-[2.25rem] text-center font-bold text-white'>Login</h1>
          <div className={`${styles.input_box} relative w-full h-[50px] my-6 mx-0`}>
            <input name='username' onChange={(e) => setUsername(e.target.value)}
            className="w-full h-full focus:outline-none text-white font-medium bg-transparent border-2 rounded-[2.5rem] px-[2.5rem] py-[1.25rem]" type='text' placeholder='Username...' required />
            <FaUser className={`${styles.icon} text-[#8F00FF] absolute right-5 top-1/2 -translate-y-1/2`}/>
          </div>

          <div className={`${styles.input_box} relative w-full h-[50px] my-6 mx-0`}>
            <input name='password' onChange={(e) => setPassword(e.target.value)}
            className="w-full h-full focus:outline-none text-white font-medium bg-transparent border-2 rounded-[2.5rem] px-[2.5rem] py-[1.25rem]" type='password' placeholder='Password...' required />
            <FaLock className={`${styles.icon} text-[#8F00FF] absolute right-5 top-1/2 -translate-y-1/2`}/>
          </div>

          <div className={`${styles.remember_forgot} flex justify-between text-[14px] -mt-4 mx-0 mb-4`}>
            <label className='text-yellow-300'><input className="accent-white mr-1 " type='checkbox'/>Remember me</label>
            <a className=" text-white no-underline hover:underline" href='#!'>Forgot password?</a>
          </div>

          <button className={`${styles.submit_button} w-full h-[2.8rem] bg-[#8F00FF] text-base text-white font-bold border-none outline-none cursor-pointer rounded-[2.5rem]`} type='submit'>Đăng nhập</button>

          <div className={`${styles.register_link} mt-1`}>
            <p className='text-yellow-300 italic'>Don't have an account? <a className='text-white no-underline font-semibold hover:underline' href ='#!'>Register</a></p>
          </div>
        </form>

      </div>
    </div>
  );
};
  
export default Login;