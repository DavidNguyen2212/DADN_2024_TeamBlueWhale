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
import { GetNotificationsByDay } from "../../API/NotificationAPI/NotificationAPI";
import MyLoader from "../../Components/Messages/Loader";
import { useNewNotice } from "../../Contexts/NoticeContext";
import { confirmCheckNotice, getNotice } from "../../API/MessageAPI/MessageAPI";
import { useSocket } from "../../Contexts/SocketIOContext";

const Message = () => {
  const [data, setData] = useState({});
  const NewNoticeContext = useNewNotice();
  const UserSocket = useSocket();
  const [firstLoad, setFirstLoad] = useState(true);
  const [allNotifs, setAllNotifs] = useState();
  const allNotifsRef = useRef([]);
  // useEffect(() => {
  //   handleGetNotice({})
  // }, []);

  // const handleGetNotice = async (params) => { 
  //   const response = await getNotice(params);
  //   setData(response?.data?.data.allNotices);
  //   NewNoticeContext?.updateNewNotice(response?.data?.data.news);
  // };

  // const fetchNotify = async (params) => {
  //   await handleGetNotice(params)
  // };

  UserSocket?.socket?.on("update-notification-list", () => {
    try {
      console.log("Signal Update-Notification-List");
      // fetchNotify({});
    } catch (error) {
      console.log("Error Update-Notification-List");
    }
  })
    

  // const handleConfirmNotice = async () => {
  //   try {
  //     setData({});
  //     await confirmCheckNotice();
  //     await handleGetNotice();
  //   } catch (err) {
  //     console.log("Error handle confirm check notice");
  //   }
  // };


  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const fetchNotifs = async (query_day) => {
    const response = await GetNotificationsByDay(query_day);
    console.log("Notifs data: ", response);
    setAllNotifs(response?.data);
    allNotifsRef.current = response?.data;
  } 

  useEffect(() => {
    fetchNotifs(format(selectedDate, "yyyy-MM-dd", { locale: vi }));
  }, [selectedDate])

    //Just one ? in the UserSocket
    useEffect(() => {
      UserSocket?.socket.on('Announce change', (data) => {
        let this_day = new Date()
        setSelectedDate(this_day)
        fetchNotifs(format(this_day, "yyyy-MM-dd", { locale: vi }));
        UserSocket.socket.emit('message', "I received!");
      })
    }, [])
    console.log("CC")

  return (
      <div className={`bg-white h-full`}>
        <Header pageName={"Thông báo"}></Header>

        <div className={`${styles.msg_wrapper} mt-4 ml-4 mr-4 md:mr-0 pb-4 overflow-auto flex flex-col gap-3 md:gap-4`}>
          <div className={`w-full md:w-3/4 pr-4 flex flex-row gap-6 ml-4 items-center justify-end`}>
            <p className={`text-base md:text-lg italic`}>{format(selectedDate, "eeee, dd/MM/yyyy", { locale: vi })}</p>
            <div className={``}>
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

          {/* <Change device={"điều hòa"} room={"phòng khách"}/>
          <Notify />
          <Warning />
          <Accident room={"phòng ăn"} /> */}
          {Array.isArray(allNotifs) ? (
            allNotifs.length > 0 ? (
              allNotifs.map((notif, index) => {
                switch (notif.type) {
                  case "Tai nạn xảy ra":
                    return <Accident room={notif.place} time={new Date(notif.created_at)} />;
                  case "Nhắc nhở":
                    return <Notify time={new Date(notif.created_at)} />;
                  case "Thay đổi thành công":
                    return <Change device={notif.device} room={notif.place} time={new Date(notif.created_at)} />;
                  default:
                    return <Warning time={new Date(notif.created_at)}/>;
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
