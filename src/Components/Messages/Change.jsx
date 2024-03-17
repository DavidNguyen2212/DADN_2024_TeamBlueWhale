import { useState } from "react";
import { ChangeIcon, ChangeIconSmall } from "../../Assets/icons/Icon";
import styles from "./MessageItem.module.css";
import { X } from 'lucide-react'
import { useMediaQuery } from "react-responsive";

const Change = (props) => {
    const [currentTime, setCurrentTime] = useState(new Date()); 
    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isSmall = useMediaQuery({ maxWidth: 640 });

    return (
        <div className={`${styles._Change} w-full md:w-3/4  bg-[#F6FFF9] flex flex-row gap-3 sm:gap-4 md:gap-8 px-3 py-3 sm:px-5 sm:py-5 shadow-lg`}>
            {/* Icon and label */}
            <div>
                {isSmall ? <ChangeIconSmall /> : <ChangeIcon />}
            </div>
            <div className={`flex flex-col gap-1 text-left w-[80%]`}>
                <span className={`font-bold text-base sm:text-xl md:text-2xl lg:text-3xl tracking-wide`}>THAY ĐỔI THÀNH CÔNG</span>
                <p className={`${styles._time_change}`}>{formattedTime}</p>
                <div className={`text-base md:text-xl`}>Bạn đã thay đổi trạng thái của {props.device}, tại {props.room}.</div>
            </div>
            <div className={`flex md:items-center text-[#968E8E]`}>
                {isSmall ? <X size={25} /> : <X size={35}/>}
            </div>
        </div>
    )
}

export default Change;