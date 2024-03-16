import Header from "../../Components/Header/Header";
import styles from "./Message.module.css"
import Change from "../../Components/Messages/Change";
import Accident from "../../Components/Messages/Accident";
import Warning from "../../Components/Messages/Warning";
import Notify from "../../Components/Messages/Notify";

const Message = () => {
  
    return (
      <div className={`bg-white h-full`}>
        <Header pageName={"Thông báo"}></Header>
        <div className={`${styles.msg_wrapper} mt-4 ml-4 mr-4 md:mr-0 overflow-auto flex flex-col gap-3 md:gap-6`}>
          <Change device={"điều hòa"} room={"phòng khách"}/>
          <Notify />
          <Warning />
          <Accident room={"phòng ăn"} />
        </div>
        
      </div>
    );
  };
  
export default Message;