import { Camera, Door, MemberIcon, ShorcutsIcon, Speech, TempIcon, TvIcon, WifiIcon, Lock, Unlock } 
from "../../Assets/icons/Icon";
import Header from "../../Components/Header/Header";
import styles from "./Dashboard.module.css";
import chad from "../../Assets/images/chad.jpg";
import chad2 from "../../Assets/images/chad2.png";
import chad3 from "../../Assets/images/chad3.jpg";
import chad4 from "../../Assets/images/chad4.png";
import chad5 from "../../Assets/images/chad5.png";
import chad6 from "../../Assets/images/chad6.png";
import lvroom from "../../Assets/images/livingroom.jpg"
import outside from "../../Assets/images/Main entrance.jpg"
import kitchen from "../../Assets/images/kitchen.jpg"
import door_open from "../../Assets/images/door_open.jpg"
import door_closed from "../../Assets/images/door_closed.jpg"
import { useState, useEffect } from "react";
import ReactSwitch from "react-switch";
import {SettingsIcon, ThermometerIcon, ThermometerSnowflakeIcon, ThermometerSunIcon } from "lucide-react"
import { UserData } from "../../Utils/Data";
import Chart from "../../Components/Dashboard/Chart";


const Dashboard = () => {
  const [dateTime, setDateTime] = useState(new Date());
  useEffect(() => {
    // Cập nhật thời gian mỗi giây
    const intervalID = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    // Xóa interval khi component bị unmount
    return () => clearInterval(intervalID);
  }, []);

  // Line chart
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.hour),
    dataset: [{
      label: "Nhiệt độ",
      data: UserData.map((data) => data.temperature),
      backgroundColor: ["red"],
      borderColor: "red",
      borderWidth: 1
    }]
  }) 

  // Door
  const [openDoor, setOpenDoor] = useState("on");     // sau này cần có thêm status
  const toggleDoor = () => {
    setOpenDoor((curr) => (curr === "on" ? "off" : "on"));
  }


  return (
    <div className="bg-white">
      <Header pageName={"Bảng điều khiển"}></Header>

      <div className={`dashboard w-full h-full bg-white flex flex-col gap-4 pl-4`}>
          {/* Good evening & members block */}
          <div className={`w-full flex flex-row gap-4 mt-4`}>
            {/* Good evening */}
            <div className={`${styles._goodEvening} w-[60%] h-[280px] relative rounded-3xl`}>
              {/* <div style={{transform: "translate(-60%, -40%)"}} className={`absolute top-[70%] left-[40%] flex flex-col gap-2 justify-start`}>
                <h2 
                  className={`text-white text-2xl font-bold`}>
                  Hi, Docker! Good evening...
                </h2>
                <div 
                  className={`text-white text-xl`}>
                  Welcome Home, it’s snowing outside stay safe...
                </div> style={{transform: "translate(-60%, -40%)"}}
              </div> */}
              <div  className={`flex flex-row gap-12 justify-between items-center absolute top-[50%] left-[5%] `}>
                <div className={`flex flex-col gap-2 justify-start`}>
                  <h2 
                    className={`text-white text-2xl font-bold`}>
                    Hi, Docker! Good evening...
                  </h2>
                  <div 
                    className={`text-white text-xl`}>
                    Welcome Home, it’s snowing outside stay safe...
                  </div>
                </div>

                <div className={`flex flex-col gap-2 justify-end items-start`}>
                <div 
                    className={`text-white text-3xl font-bold`}>
                    10:25 PM
                  </div>
                  <div 
                    className={`text-white text-2xl font-semibold`}>
                    12 May 2022
                  </div>
                  <div className={`text-white text-2xl flex flex-row gap-4 items-center`}>
                      <ThermometerSunIcon />
                      <span>- 15{'\u00b0'}C</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Members */}
            <div className={`bg-[#F7F1FF] w-1/3 rounded-3xl px-3 py-3 flex flex-col gap-4`}>
              <div className={`flex flex-row gap-4 items-center`}>
                <MemberIcon />
                <span className={`font-bold text-xl tracking-wide`}>Members</span>
              </div>
              <div className={`flex flex-col gap-2 justify-center items-center`}>
                <div className={`flex flex-row gap-8 justify-center items-center`}>
                  <div className={`flex flex-col gap-0 justify-center items-center`}>
                    <img src={chad} className={`w-[70px] h-[70px] border-2 border-[#A737FF] rounded-[10px]`}/>
                    <span className={`font-bold text-xl`}>David</span>
                    {/* <span>Nguyen</span> */}
                  </div>
                  <div className={`flex flex-col gap-0 justify-center items-center`}>
                    <img src={chad2} className={`w-[70px] h-[70px] border-2 border-[#A737FF] rounded-[10px]`}/>
                    <span className={`font-bold text-xl`}>Bang</span>
                    {/* <span>Nguyen</span> */}
                  </div>
                  <div className={`flex flex-col gap-0 justify-center items-center`}>
                    <img src={chad3} className={`w-[70px] h-[70px] border-2 border-[#A737FF] rounded-[10px]`}/>
                    <span className={`font-bold text-xl`}>Bao</span>
                    {/* <span>Nguyen</span> */}
                  </div>
                </div>
                <div className={`flex flex-row gap-8 justify-center items-center`}>
                  <div className={`flex flex-col gap-0 justify-center items-center`}>
                    <img src={chad4} className={`w-[70px] h-[70px] border-2 border-[#A737FF] rounded-[10px]`}/>
                    <span className={`font-bold text-xl`}>Qui</span>
                    {/* <span>Nguyen</span> */}
                  </div>
                  <div className={`flex flex-col gap-0 justify-center items-center`}>
                    <img src={chad5} className={`w-[70px] h-[70px] border-2 border-[#A737FF] rounded-[10px]`}/>
                    <span className={`font-bold text-xl`}>Cuong</span>
                    {/* <span>Nguyen</span> */}
                  </div>
                  <div className={`flex flex-col gap-0 justify-center items-center`}>
                    <img src={chad6} className={`w-[70px] h-[70px] border-2 border-[#A737FF] rounded-[10px]`}/>
                    <span className={`font-bold text-xl`}>Mr.Thinh</span>
                    {/* <span>Nguyen</span> */}
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          
          {/* Power, shorcut and Voice command */}
          <div className={`w-full h-[348px] flex flex-row gap-4`}>
            {/* Power & Shorcuts*/}
            <div className={`w-[60%] flex flex-row gap-4`}>
              {/* Power */}
              <div className={`w-[60%] bg-[#F7F1FF] rounded-3xl`}>
                <div className={`w-full`}>
                  <LineChart chartData={userData} />
                </div> 
              </div>
              {/* Shorcuts */}
              <div className="flex flex-col gap-4 bg-[#F7F1FF] rounded-3xl w-[40%]">
                <div className={`flex flex-row gap-4 items-center px-4 py-4`}>
                  <ShorcutsIcon />
                  <span className={`font-bold text-xl tracking-wide`}>Shorcuts</span>
                </div>
                <div className={`flex flex-col gap-6 justify-start items-center`}>
                  <div className={`flex flex-row gap-8`}>
                    <WifiIcon />
                    <div className={`flex flex-col`}>
                      <span>Wifi</span>
                      <ReactSwitch></ReactSwitch>
                    </div>
                  </div>

                  <div className={`flex flex-row gap-8`}>
                    <TvIcon />
                    <div className={`flex flex-col`}>
                      <span>Tivi</span>
                      <ReactSwitch></ReactSwitch>
                    </div>
                  </div>

                  <div className={`flex flex-row gap-8`}>
                    <TempIcon />
                    <div className={`flex flex-col`}>
                      <span>Temp</span>
                      <ReactSwitch></ReactSwitch>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Speech command */}
            <div className={`bg-[#F7F1FF] w-1/3 rounded-3xl px-4 py-4 flex flex-col gap-8`}>
                <div className={`flex flex-row gap-4 items-center `}>
                  <ShorcutsIcon />
                  <span className={`font-bold text-xl tracking-wide`}>Voice Command</span>
                </div>
                <div className={`flex justify-center items-center`}>
                  <button className={`flex justify-center items-center w-[150px] h-[150px] rounded-full bg-[#9350FF] hover:bg-slate-400`}><Speech /></button>
                </div>
                <div className={`italic text-gray-600 flex items-center justify-center`}>Press to command me!</div>
            </div>

          </div>

          {/* Camera and door */}
          <div className={`w-full flex flex-row gap-4 mb-4`}>
            {/* Camera */}
            <div className={`w-[60%] flex flex-col gap-4 bg-[#F7F1FF] px-4 py-4 rounded-3xl`}>
              <div className={`flex flex-row justify-between`}>
                <div className={`flex flex-row gap-4 items-center`}>
                  <Camera />
                  <span className={`font-bold text-xl tracking-wide`}>Cameras</span>
                </div>
                <button className={`flex justify-center items-start`}>
                  <SettingsIcon />
                </button>
              </div>
              <div className={`w-full h-auto flex flex-row justify-between`}>
                <div className={`w-[30%] flex flex-col gap-2`}>
                  <img className={`rounded-3xl shadow-md`} src={lvroom} alt={"Cam1"} />
                  <div className={`flex flex-row gap-4 items-center`}>
                    <div className={`w-[10px] h-[10px] rounded-full bg-red-600`}></div><span>Living room</span>
                  </div>
                </div>
                <div className={`w-[30%] flex flex-col gap-2`}>
                  <img className={`rounded-3xl shadow-md`} src={kitchen} alt={"Cam1"} />
                  <div className={`flex flex-row gap-4 items-center`}>
                    <div className={`w-[10px] h-[10px] rounded-full bg-red-600`}></div><span>Kitchen</span>
                  </div>
                </div>
                <div className={`w-[30%] flex flex-col gap-2`}>
                  <img className={`rounded-3xl shadow-md`} src={outside} alt={"Cam1"} />
                  <div className={`flex flex-row gap-4 items-center`}>
                    <div className={`w-[10px] h-[10px] rounded-full bg-red-600`}></div><span>Main entrance</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Door */}
            <div className={`bg-[#F7F1FF] w-1/3 rounded-3xl h-full px-4 py-4 flex flex-col gap-4`}>
              <div className={`flex flex-row justify-between h-full`}>
                  <div className={`flex flex-row gap-4 items-center`}>
                    <Door />
                    <span className={`font-bold text-xl tracking-wide`}>Door</span>
                  </div>
                  <button className={`flex justify-center items-start`}>
                    <ReactSwitch onChange={toggleDoor} checked={openDoor === "on"}/>
                  </button>
              </div>
              {openDoor === "on"? <div className={`relative flex justify-center items-center`}>
                <div className={`${styles.door} absolute top-1/2 left-1/2 `}><Unlock /></div>
                <img src={door_open} alt={"door open"} className={`w-2/3 rounded-3xl h-[340px]`} />
                
              </div> :
              <div className={`relative flex justify-center items-center`}>
                <div className={`${styles.door} absolute top-1/2 left-1/2 `}><Lock /></div>
                <img src={door_closed} alt={"door closed"} className={`w-2/3 rounded-3xl h-[340px]`} />
              </div>}
            </div>
          </div>
      </div>
    </div>
  );
};
  
export default Dashboard;