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
import { GetAllNotifications, GetNotificationsByDay } from "../../API/notifications/getNotifications";
import MyLoader from "../../Components/Messages/Loader";

const Message = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [allNotifs, setAllNotifs] = useState();
  const allNotifsRef = useRef([]);

  const handleChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };
  // console.log(format(selectedDate, "yyyy-MM-dd", { locale: vi }))
  useEffect(() => {
    const fetchNotifs = async (query_day) => {
      const response = await GetNotificationsByDay(query_day);
      console.log("Notifs data: ", response);
      setAllNotifs(response?.data);
      allNotifsRef.current = response?.data;
    } 
    // setAllNotifs([]);
    fetchNotifs(format(selectedDate, "yyyy-MM-dd", { locale: vi }));
  }, [selectedDate])

  const convertfromISO = (isoStringTime) => {
    const date = new Date(isoStringTime);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // Nếu là 0 giờ, chuyển thành 12 giờ AM
  
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
  
    return formattedTime;
  }
  

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
          
          {/* <div className={`gap-4 flex w-full h-[200px]`}> */}
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
