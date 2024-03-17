import { useState } from "react";
import { NotifyIcon, NotifyIconSmall } from "../../Assets/icons/Icon";
import styles from "./MessageItem.module.css";
import { X } from 'lucide-react'
import { useMediaQuery } from "react-responsive";

const Notify = (props) => {
    const [currentTime, setCurrentTime] = useState(new Date()); 
    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isSmall = useMediaQuery({ maxWidth: 640 });

    return (
        <div className={`${styles._Notify} w-full md:w-3/4  bg-[#EAF2FE] flex flex-row gap-3 sm:gap-4 md:gap-8 px-3 py-3 sm:px-5 sm:py-5 shadow-lg`}>
            {/* Icon and label */}
            <div>
                {isSmall ? <NotifyIconSmall /> : <NotifyIcon />}
            </div>
            <div className={`flex flex-col gap-1 text-left w-[80%]`}>
                <span className={`font-bold text-base sm:text-xl md:text-2xl lg:text-3xl tracking-wide`}>NHẮC NHỞ</span>
                <p className={`${styles._time_change}`}>{formattedTime}</p>
                <div className={`text-base md:text-xl`}>Nhiệt độ điều hòa đang ở mức dưới 20 độ, vui lòng tăng lên !</div>
            </div>
            <div className={`flex md:items-center text-[#968E8E]`}>
                {isSmall ? <X size={25} /> : <X size={35}/>}
            </div>
        </div>
    )
}

export default Notify;