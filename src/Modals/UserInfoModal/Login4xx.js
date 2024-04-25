import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoField from "../../Utils/InfoField";
import {X} from 'lucide-react'

const Login4xx = (props) => {
    const [open, setOpen] = useState(true);
    return (
        <>
        {open && <div className="w-full h-full backdrop-blur-sm bg-transparent absolute z-50 flex justify-center" >
             
                <div className={`relative border-[1px] border-[#367FA9] top-[35%] w-[300px] h-[200px] rounded-lg bg-white overflow-hidden shadow-lg`}>
                    <div className={`HeaderInfo relative flex items-center justify-center my-auto text-[20px] font-bold text-white h-[50px] w-full bg-[#3C8DBC]  bg-gradient-to-br from-cyan-500 to-#3C8DBC`}>
                    Đăng nhập thất bại
                        {/* <span className={`absolute cursor-pointer top-[13px] right-2`} onClick={() => setOpen(false)}>
                            <X />
                        </span> */}
                    </div>

                    <div className="p-3 h-full flex flex-col gap-2">
              <p className="h-1/3 flex items-center justify-center text-xl">{props.content}</p>

              <button
                onClick={() => setOpen(false)}
                className="bg-gradient-to-br from-[#ff7d7d]  outline-none to-[#b84949] mt-3 w-full h-[45px] rounded-md flex items-center justify-center text-white text-[16px] font-bold hover:from-[#ae5d5d] hover:to-[#be4040] transition-all duration-300"
              >
                Đóng
              </button>
            </div>
                </div>
        </div>}
        </>
    );
};

export default Login4xx;