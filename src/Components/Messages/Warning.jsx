import { useState } from "react";
import { WarningIcon, WarningIconSmall } from "../../Assets/icons/Icon";
import styles from "./MessageItem.module.css";
import { X } from 'lucide-react'
import { useMediaQuery } from "react-responsive";

const Warning = (props) => {
    const [isClear, setIsClear] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date()); 
    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isSmall = useMediaQuery({ maxWidth: 640 });

    const handleClear = () => {
        setIsClear(true); // Khi click vào nút đóng, đặt isHidden thành true để ẩn component
    };

    return (
        <>
        {isClear ? null : <div className={`${styles._Warning} ${isClear ? styles.hidden : ''} w-full md:w-3/4  bg-[#FFF8EC] flex flex-row gap-3 sm:gap-4 md:gap-8 px-3 py-3 sm:px-5 sm:py-5 shadow-lg`}>
            {/* Icon and label */}
            <div>
                {isSmall ? <WarningIconSmall /> : <WarningIcon />}
            </div>
            <div className={`flex flex-col gap-1 text-left w-[80%]`}>
                <span className={`font-bold text-base sm:text-xl md:text-2xl lg:text-3xl tracking-wide`}>CẢNH BÁO</span>
                <p className={`${styles._time_change}`}>{formattedTime}</p>
                <div className={`text-base md:text-xl`}>Ai đó không phải bạn và thành viên gia đình, đang cố gắng mở khóa tôi!</div>
            </div>
            <button onClick={handleClear} className={`flex md:items-center text-[#968E8E]`}>
                {isSmall ? <X size={25} /> : <X size={35}/>}
            </button>
        </div>}
        </>
        
    )
}

export default Warning;

