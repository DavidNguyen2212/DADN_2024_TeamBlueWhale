import { useState } from "react";
import { WarningIcon, WarningIconSmall } from "../../Assets/icons/Icon";
import styles from "./MessageItem.module.css";
import { BookOpenCheck, BellDot } from 'lucide-react'
import { useMediaQuery } from "react-responsive";
import { useNewNotice } from "../../Contexts/NoticeContext";
import { MarkNotifasRead } from "../../API/NotificationAPI/NotificationAPI";

const Warning = (props) => {
    const [isRead, setIsRead] = useState(props.isRead);
    const [currentTime, setCurrentTime] = useState(props.time); 
    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isSmall = useMediaQuery({ maxWidth: 640 });
    const NewNoticeContext = useNewNotice()

    const handleRead = async () => {
        setIsRead(true); 
        // Sau khi đọc thì gọi API
        NewNoticeContext.updateNewNotice(NewNoticeContext.newNotice - 1)
        const response = await MarkNotifasRead(props.nid);
    };

    return (
        <div onClick={handleRead} className={`${isRead ? styles._Warning : styles._WarningUnRead } w-full md:w-[90%]  bg-[#FFF8EC] flex flex-row gap-3 sm:gap-4 md:gap-8 lg:gap-12 px-3 py-3 sm:px-5 sm:py-5 ${isRead ? "shadow-lg" : ""} `}>
            {/* Icon and label */}
            <div>
                {isSmall ? <WarningIconSmall /> : <WarningIcon />}
            </div>
            <div className={`flex flex-col gap-1 text-left w-[80%]`}>
                <span className={`font-bold text-base sm:text-xl md:text-2xl lg:text-3xl tracking-wide`}>CẢNH BÁO</span>
                <p className={`${styles._time_change}`}>{formattedTime}</p>
                <div className={`text-base md:text-xl`}>Ai đó không phải bạn và thành viên gia đình, đang cố gắng mở khóa tôi!</div>
            </div>
            <button  className={`flex md:items-center text-[#968E8E]`}>
            {isRead ? (isSmall ? <BookOpenCheck size={25} /> : <BookOpenCheck size={35}/>) : (isSmall ? <BellDot color="blue" size={25} /> : <BellDot color="blue" size={35}/>)}
            </button>
        </div>   
    )
}

export default Warning;
