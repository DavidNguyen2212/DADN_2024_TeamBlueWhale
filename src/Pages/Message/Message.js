import Header from "../../Components/Header/Header";
import styles from "./Message.module.css"
import Change from "../../Components/Messages/Change";
import Accident from "../../Components/Messages/Accident";
import Warning from "../../Components/Messages/Warning";
import Notify from "../../Components/Messages/Notify";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState, useRef } from "react";
import { BsCalendar } from "react-icons/bs";
import { format } from "date-fns";
import vi from "date-fns/locale/vi";
import { GetNotificationsByDay, MarkAllNotifasRead } from "../../API/NotificationAPI/NotificationAPI";
import MyLoader from "../../Components/Messages/Loader";
import { useNewNotice } from "../../Contexts/NoticeContext";
import { confirmCheckNotice, getNotice } from "../../API/MessageAPI/MessageAPI";
import { useSocket } from "../../Contexts/SocketIOContext";
import { ListChecks, ListTodo } from 'lucide-react'
import {useMediaQuery} from 'react-responsive'
import useAuthPrivate from "../../CustomHook/useAuthPrivate";
import { GetNumberNotifs } from "../../API/NotificationAPI/NotificationAPI";
import { io } from "socket.io-client";
import PersistLogin from "../Login/PersistLogin";
import { useAuth } from "../../Contexts/AuthProvider";

const Message = () => {
  const NewNoticeContext = useNewNotice();
  const UserSocket = useSocket();
  const [firstLoad, setFirstLoad] = useState(true);
  const [allNotifs, setAllNotifs] = useState();
  const isMobile = useMediaQuery({maxWidth: 600});
  const [rerender, setRerender] = useState(false)
  const {auth} = useAuth()
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };
  const CustomAPI = useAuthPrivate()
  const fetchNotifs = async (query_day) => {
      const response = await GetNotificationsByDay(CustomAPI, query_day);
      console.log("Notifs data: ", response);
      // const new_notice = await GetNumberNotifs();
      // NewNoticeContext.updateNewNotice(new_notice?.data?.newNotifsToday);
      // if (query_day === format(new Date(), "yyyy-MM-dd", { locale: vi }))
      NewNoticeContext.updateNewNotice(response?.data[0]["unReadCount"]);
      setAllNotifs(response?.data?.slice(1));
  } 


  const handleCheckAll = async() => {
    if (NewNoticeContext.newNotice !== 0) {
      const response = await MarkAllNotifasRead(format(selectedDate, "yyyy-MM-dd", { locale: vi }))
      setAllNotifs();
      setRerender(!rerender)
    }
  }
  // const response = useAuthPrivate()
  useEffect(() => {
      if (!UserSocket) {
          const socket = io("http://127.0.0.1:5000");
          socket.on("connect", () => {
              console.log("Init socket IO with socketID = ", socket?.id);
          });
          UserSocket?.connectSocket(socket);
          
      }
    
    fetchNotifs(format(selectedDate, "yyyy-MM-dd", { locale: vi }));
    setFirstLoad(false);
  }, [])

  useEffect(() => {
    if (!firstLoad)
      fetchNotifs(format(selectedDate, "yyyy-MM-dd", { locale: vi }));
  }, [selectedDate, rerender])

  UserSocket?.socket?.on('Announce change', (data) => {
    let this_day = new Date().toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"})
    setSelectedDate(this_day)
    setAllNotifs();
    setRerender(!rerender)
  })

  return (
      <div className={`bg-white h-full`}>
        <Header pageName={"Thông báo"}></Header>

        <div className={`${styles.msg_wrapper} mt-4 ml-4 mr-4 md:mr-0 pb-4 overflow-auto flex flex-col gap-3 md:gap-4`}>
          {isMobile? 
          (<>
          <div className={`w-full md:w-3/4 pr-4 flex flex-row gap-6 ml-4 items-center justify-end`}>
            <p className={`text-base md:text-lg italic`}>{format(selectedDate, "eeee, dd/MM/yyyy", { locale: vi })}</p>
            <div className={`pr-2`}>
              <BsCalendar size={25} className="cursor-pointer text-[#6A21A4]" onClick={() => setShowCalendar(!showCalendar)} />
              {showCalendar && (
                <Calendar
                  onChange={handleChange}
                  value={selectedDate}
                  locale={vi}
                  className="custom-calendar z-60 absolute right-0"
                />
              )}
            </div>
          </div>
          <button onClick={handleCheckAll} className={`w-full md:w-3/4 pr-2 flex justify-end items-center`}>
            {NewNoticeContext.newNotice === 0 ? <ListChecks size={35} className="mr-2"></ListChecks> : <ListTodo size={35} className="mr-2"></ListTodo>}
            <span className="border-2 p-2">Đánh dấu tất cả là đã đọc ({NewNoticeContext.newNotice})</span>
          </button>
          </>
          )
          : (
            <div className="flex flex-row justify-between w-full md:w-[90%]">
          <div className={`flex flex-row gap-6 items-center justify-end`}>
            <p className={`text-base md:text-lg italic`}>{format(selectedDate, "eeee, dd/MM/yyyy", { locale: vi })}</p>
            <div className={``}>
              <BsCalendar size={25} className="cursor-pointer text-[#6A21A4]" onClick={() => setShowCalendar(!showCalendar)} />
              {showCalendar && (
                <Calendar
                  onChange={handleChange}
                  value={selectedDate}
                  locale={vi}
                  className="custom-calendar z-60 absolute"
                />
              )}
            </div>
          </div>
          <button onClick={handleCheckAll} className={`flex justify-end items-center`}>
            {NewNoticeContext.newNotice === 0 ? <ListChecks size={35} className="mr-2"></ListChecks> : <ListTodo size={35} className="mr-2"></ListTodo>}
            <span className="border-2 p-2">Đánh dấu tất cả là đã đọc ({NewNoticeContext.newNotice})</span>
          </button>
          </div>
          )}
          
          {/* <Change device={"điều hòa"} room={"phòng khách"}/>
          <Notify />
          <Warning />
          <Accident room={"phòng ăn"} /> */}
          {Array.isArray(allNotifs) ? (
            allNotifs.length > 0 ? (
              allNotifs.map((notif, index) => {
                switch (notif.type) {
                  case "Tai nạn xảy ra":
                    return <Accident nid={notif._id} isRead={notif.isRead} room={notif.place} time={new Date(notif.created_at)} />;
                  case "Nhắc nhở":
                    return <Notify nid={notif._id} isRead={notif.isRead} time={new Date(notif.created_at)} />;
                  case "Thay đổi thành công":
                    return <Change nid={notif._id} isRead={notif.isRead} device={notif.device} room={notif.place} time={new Date(notif.created_at)} />;
                  default:
                    return <Warning nid={notif._id} isRead={notif.isRead} time={new Date(notif.created_at)}/>;
                }
              })
            ) : (
              <h2> Không có thông báo nào </h2>
            )
          ) : (
            <>
              <MyLoader />
              <MyLoader />
              <MyLoader />
            </>
          )}
        </div>
        
      </div>
    );
  };
  
export default Message;
