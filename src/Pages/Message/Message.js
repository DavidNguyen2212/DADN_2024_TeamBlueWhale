import Header from "../../Components/Header/Header";
import styles from "./Message.module.css"
import Change from "../../Components/Messages/Change";
import Accident from "../../Components/Messages/Accident";
import Warning from "../../Components/Messages/Warning";
import Notify from "../../Components/Messages/Notify";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { BsCalendar } from "react-icons/bs";
import { format } from "date-fns";
import vi from "date-fns/locale/vi";

const Message = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

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

          <Change device={"điều hòa"} room={"phòng khách"}/>
          <Notify />
          <Warning />
          <Accident room={"phòng ăn"} />
        </div>
        
      </div>
    );
  };
  
export default Message;
