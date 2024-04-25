import { useEffect, useState } from "react";
import LivingRoom from "./LivingRoom";
import BedRoom from "./BedRoom";
import DiningRoom from "./DiningRoom";
import Header from "../../Components/Header/Header";
import styles from "./Device.module.css"
import { useAuth } from "../../Contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const Devices = () => {
  const [room_type, setRoom_type] = useState("PHÒNG KHÁCH")
  const rooms = ["PHÒNG KHÁCH", "PHÒNG NGỦ", "PHÒNG ĂN"]
  const navigate = useNavigate()
  const handleRoomChange = (event) => {
    setRoom_type(event.target.value); // Lưu giá trị của phòng được chọn vào state
  };

  useEffect(() => {
    if (!document.cookie.includes("csrf_refresh_token"))
      navigate("/Login");
  }, [])
  return (
    <div className={`bg-white`}>
      <Header pageName={"Thiết bị"}></Header>

    <select className={`${styles.select_dropdown} ml-8 mt-4 outline-none text-2xl font-bold w-[250px] cursor-pointer`}
        onChange={handleRoomChange} value={room_type}>
        {rooms.map((room, index) => (
          <option key={index} value={room} onClick={() => setRoom_type(room)}>{room}</option>
        ))}
      </select>
      {room_type === "PHÒNG KHÁCH" && <LivingRoom />}
      {room_type === "PHÒNG NGỦ" && <BedRoom />}
      {room_type === "PHÒNG ĂN" && <DiningRoom />}
    </div>
  );
};
  
export default Devices;