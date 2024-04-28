import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoField from "../../Utils/InfoField";
import {X} from 'lucide-react'
import { useSocket } from "../../Contexts/SocketIOContext";
import axios from "axios";
import Cookies from "js-cookie"

const LOGOUT_URL = "https://dadn-2024-backend.onrender.com/logout"

function UserInfoModal({children}) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const UserSocket = useSocket()

    const handleLogout = async() => {
      UserSocket?.socket?.disconnect();
      if (UserSocket?.socket?.connected) {
        console.log('Socket đang kết nối');
      } else {
        console.log('Socket đã ngắt kết nối');
      }
      // console.log(document.cookie)
      console.log("Cookie: ",Cookies.get())
  //     let cookies = document.cookie.split(';');

  // // Duyệt qua từng cookie để tìm mục có tên là "csrf-token"
  //   let csrfToken;
  //   cookies.forEach(function(cookie) {
  //     let parts = cookie.split('=');
  //     let name = parts[0].trim();
  //     if (name === 'csrf_refresh_token') {
  //         csrfToken = parts[1];
  //     }
  //   });
    axios.defaults.withCredentials = true;
      const response = await axios.delete(LOGOUT_URL, 
      {
        withCredentials: true, 
        headers: {
          'X-CSRF-TOKEN': Cookies.get('csrf_refresh_token'), 
        },
      })
      console.log(JSON.stringify(response?.data));
      localStorage.removeItem("persist")
      Cookies.remove('csrf_refresh_token')
      navigate("/");
    }

    return (
        <div className={`relative z-40 w-auto h-auto`}>
            <div id="triggerUserInfo" className={`cursor-pointer`} onClick={()=>{setOpen(!open)}}>
                {children}
            </div>
            {open && 
                <div className={`absolute border-[1px] border-[#367FA9] top-[140%] right-5 w-[300px] h-[auto] rounded-lg bg-white overflow-hidden shadow-lg`}>
                    <div className={`HeaderInfo relative flex items-center justify-center text-[20px] font-bold text-white h-[50px] w-full bg-[#3C8DBC]  bg-gradient-to-br from-cyan-500 to-#3C8DBC`}>
                        Thông tin của bạn
                        <span className={`absolute cursor-pointer top-[13px] right-2`} onClick={() => setOpen(false)}>
                            <X />
                        </span>
                    </div>

                    <div className="p-3">
              <InfoField
                fieldName={"Tên"}
                fieldValue={
                //   userInformation?.firstName + " " + userInformation?.lastName
                "Docker Levis"
                }></InfoField>
              <InfoField
                fieldName={"Ngày sinh"}
                fieldValue="05 / 06 / 1989"
              ></InfoField>
              <InfoField
                fieldName={"Giới tính"}
                fieldValue={"Nam"}
              ></InfoField>
              <InfoField
                fieldName={"Vai trò"}
                fieldValue={"Gia chủ"}
              ></InfoField>

              <button
                onClick={handleLogout}
                className="bg-gradient-to-br from-[#ff7d7d]  outline-none to-[#b84949] mt-3 w-full h-[45px] rounded-md flex items-center justify-center text-white text-[16px] font-bold hover:from-[#ae5d5d] hover:to-[#be4040] transition-all duration-300"
              >
                ĐĂNG XUẤT
              </button>
            </div>
                </div>}
        </div>
    );
};

export default UserInfoModal;