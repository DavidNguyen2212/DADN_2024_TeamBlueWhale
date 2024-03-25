import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoField from "../../Utils/InfoField";
import {X} from 'lucide-react'
import { useSocket } from "../../Contexts/SocketIOContext";

function UserInfoModal({children}) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const UserSocket = useSocket()

    const handleLogout = () => {
      UserSocket?.socket?.disconnect();
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
              {/* <div className="mb-2 flex items-center">
                <span className="text-[#066DCC] text-[20px] font-bold mr-3 leading-7">
                  Số dư hiện tại (tờ):
                </span>
                <div className="text-[20px] font-semibold w-[135px] h-[40px] bg-[#f1eeee] flex items-center justify-center rounded-lg">
                  {Math.floor(userInformation?.balance)}
                </div>
              </div>
              <PagesPurchaseModal ref={modalRef}>
                <button className="bg-[#3C8DBC] bg-gradient-to-br outline-none from-cyan-500 mb-2 mt-4 to-#3C8DBC w-full h-[45px] rounded-md flex items-center justify-center text-white text-[16px] font-bold hover:bg-[#2c5d8d] hover:from-cyan-400 hover:to-[#345a96] transition-all duration-300">
                  MUA THÊM GIẤY
                </button>
              </PagesPurchaseModal> */}
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