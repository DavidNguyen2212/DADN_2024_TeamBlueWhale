import { Camera, Door, MemberIcon, ShorcutsIcon, Speech, TempIcon, TvIcon, WifiIcon, Lock, Unlock, FastLook } 
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
import { useMediaQuery } from "react-responsive";
import ReactSwitch from "react-switch";
import {SettingsIcon, ThermometerIcon, ThermometerSnowflakeIcon, ThermometerSunIcon } from "lucide-react"
import { UserData } from "../../Utils/Data";
import Chart from "../../Components/Dashboard/Chart";


const Dashboard = () => {
  const isMedium = useMediaQuery({maxWidth: 1024, minWidth: 769});
  const isMobile = useMediaQuery({maxWidth: 768});

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
  const [element, setElement] = useState("Nhiệt độ");
  const elements = ["Nhiệt độ", "Độ ẩm", "Ánh sáng"];
  const handleEleChange = (event) => {
    setElement(event.target.value); // Lưu giá trị của phòng được chọn vào state
  };
  const [userData, setUserData] = useState([{
    labels: UserData.map((data) => data.hour),
    datasets: [{
      label: "Nhiệt độ",
      data: UserData.map((data) => data.temperature),
      backgroundColor: ["red"],
      borderColor: "red",
      borderWidth: 1,
      tension: 0.3
    }]},
    {
      labels: UserData.map((data) => data.hour),
      datasets: [{
        label: "Độ ẩm",
        data: UserData.map((data) => data.humidity),
        backgroundColor: ["blue"],
        borderColor: "blue",
        borderWidth: 1,
        tension: 0.3
      }]},
      {
        labels: UserData.map((data) => data.hour),
        datasets: [{
          label: "Ánh sáng",
          data: UserData.map((data) => data.lightStrength),
          backgroundColor: ["orange"],
          borderColor: "orange",
          borderWidth: 1,
          tension: 0.3
      }]}
    ]);

  // Door
  const [openDoor, setOpenDoor] = useState("on");     // sau này cần có thêm status
  const toggleDoor = () => {
    setOpenDoor((curr) => (curr === "on" ? "off" : "on"));
  }


  return (
    <div className="bg-white">
      <Header pageName={"Bảng điều khiển"}></Header>

      <div className={`dashboard w-full h-full bg-white flex flex-col gap-4 sm:gap-8 pl-4 pr-4`}>
          {/* Good evening & members block */}
          <div className={`w-full flex flex-col gap-4 lg:flex-row lg:gap-6 mt-4`}>
            {/* Good evening */}
            <div className={`${styles._goodEvening} w-full lg:w-[65%] h-[280px] relative rounded-3xl`}>
              <div  className={`flex flex-row gap-2 sm:gap-8 md:gap-28 lg:gap-12 justify-between items-center absolute top-[40%] left-[3%] sm:top-[50%] sm:left-[5%] `}>
                <div className={`flex flex-col gap-2 justify-start `}>
                  <h2 
                    className={`text-white text-lg md:text-2xl font-bold`}>
                    Hi, Docker! Good evening...
                  </h2>
                  <div 
                    className={`text-white text-base md:text-xl`}>
                    Welcome Home, it’s snowing outside stay safe...
                  </div>
                </div>

                <div className={`flex flex-col gap-2 justify-end items-start`}>
                <div 
                    className={`text-white text-xl sm:text-3xl font-bold`}>
                    10:25 PM
                  </div>
                  <div 
                    className={`text-white text-base sm:text-2xl font-semibold`}>
                    12 May 2022
                  </div>
                  <div className={`text-white text-base sm:text-2xl flex flex-row gap-2 sm:gap-4 items-center`}>
                      <ThermometerSunIcon />
                      <span>-15{'\u00b0'}C</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Members */}
            <div className={`bg-[#F7F1FF] w-full lg:w-1/3 rounded-3xl px-3 py-3 flex flex-col gap-4`}>
              <div className={`flex flex-row gap-4 items-center`}>
                <MemberIcon />
                <span className={`font-bold text-lg md:text-xl tracking-wide`}>Members</span>
              </div>
              <div className={`flex flex-row gap-6 sm:flex-row sm:gap-8 lg:flex-col lg:gap-2 justify-center items-center`}>
                <div className={`flex flex-row gap-6 sm:gap-8 justify-center items-center`}>
                  <div className={`flex flex-col gap-0 justify-center items-center`}>
                    <img src={chad} alt="member" className={`w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] border-2 border-[#A737FF] rounded-[10px]`}/>
                    <span className={`font-semibold text-base md:text-xl`}>David</span>
                    {/* <span>Nguyen</span> */}
                  </div>
                  <div className={`flex flex-col gap-0 justify-center items-center`}>
                    <img src={chad2} alt="member" className={`w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] border-2 border-[#A737FF] rounded-[10px]`}/>
                    <span className={`font-semibold text-base md:text-xl`}>Bang</span>
                    {/* <span>Nguyen</span> */}
                  </div>
                  <div className={`flex flex-col gap-0 justify-center items-center`}>
                    <img src={chad3} alt="member" className={`w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] border-2 border-[#A737FF] rounded-[10px]`}/>
                    <span className={`font-semibold text-base md:text-xl`}>Bao</span>
                    {/* <span>Nguyen</span> */}
                  </div>
                </div>
                <div className={`flex flex-row gap-6 sm:gap-8 justify-center items-center`}>
                  <div className={`flex flex-col gap-0 justify-center items-center`}>
                    <img src={chad4} alt="member" className={`w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] border-2 border-[#A737FF] rounded-[10px]`}/>
                    <span className={`font-semibold text-base md:text-xl`}>Qui</span>
                    {/* <span>Nguyen</span> */}
                  </div>
                  <div className={`flex flex-col gap-0 justify-center items-center`}>
                    <img src={chad5} alt="member" className={`w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] border-2 border-[#A737FF] rounded-[10px]`}/>
                    <span className={`font-semibold text-base md:text-xl`}>Cuong</span>
                    {/* <span>Nguyen</span> */}
                  </div>
                  <div className={`flex flex-col gap-0 justify-center items-center`}>
                    <img src={chad6} alt="member" className={`w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] border-2 border-[#A737FF] rounded-[10px]`}/>
                    <span className={`font-semibold text-base md:text-xl`}>Mr.Thinh</span>
                    {/* <span>Nguyen</span> */}
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          
          {/* Fastlook, shorcut and Voice command */}
          <div className={`w-full lg:h-[348px] flex flex-row gap-4 md:flex-col lg:flex-row lg:gap-6`}>
            {/* Fastlook & Shorcuts*/}
            <div className={`w-full lg:w-[65%] flex flex-col md:flex-row gap-4`}>

              {isMobile && 
              <div className={`flex flex-row gap-4 justify-between`}>
                <div className="flex flex-col gap-4 bg-[#F7F1FF] rounded-3xl w-[50%]">
                  <div className={`flex flex-row gap-4 items-center px-4 pt-4`}>
                    <ShorcutsIcon />
                    <span className={`font-bold text-lg tracking-wide`}>Shortcuts</span>
                  </div>
                  <div className={`flex flex-col gap-6 justify-start items-center mb-4`}>
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
                <div className={`bg-[#F7F1FF] w-[50%] rounded-3xl px-4 py-4 flex flex-col gap-8 `}>
                  <div className={`flex flex-row gap-4 items-center `}>
                    <ShorcutsIcon />
                    <span className={`font-bold text-lg tracking-wide`}>Voice Command</span>
                  </div>
                  <div className={`flex justify-center items-center`}>
                    <button className={`flex justify-center items-center w-[150px] h-[150px] rounded-full bg-[#9350FF] hover:bg-slate-400`}><Speech /></button>
                  </div>
                  <div className={`italic text-gray-600 flex items-center justify-center`}>Press to command me!</div>
                </div>
              </div>
              }


              {/* Fastlook */}
              <div className={`w-full md:w-[60%] bg-[#F7F1FF] rounded-3xl px-4 py-4 flex flex-col gap-8`}>
                  <div className={`flex flex-row justify-between`}>
                    <div className={`flex flex-row gap-4 items-center`}>
                      <FastLook />
                      <span className={`font-bold text-lg md:text-xl tracking-wide`}>Fast Look</span>
                    </div>

                    <select className={`${styles.select_dropdown} bg-[#F7F1FF] outline-none text-lg md:text-xl font-bold cursor-pointer`}
                    onChange={handleEleChange} value={element}>
                    {elements.map((ele, index) => (
                    <option key={index} value={ele} onClick={() => setElement(ele)}> {ele} </option>
                    ))}
                    </select>
                  </div>
                  {element === "Nhiệt độ" && <Chart chartData={userData[0]} />}
                  {element === "Độ ẩm" && <Chart chartData={userData[1]} />}
                  {element === "Ánh sáng" && <Chart chartData={userData[2]} />}
              </div>

              {/* Shorcuts */}
              {(!isMobile && !isMedium) &&
              <div className="flex flex-col gap-4 bg-[#F7F1FF] rounded-3xl w-[40%]">
                <div className={`flex flex-row gap-4 items-center px-4 py-4`}>
                  <ShorcutsIcon />
                  <span className={`font-bold text-xl tracking-wide`}>Shortcuts</span>
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
              </div>}

              {/* Speech command */}
              {isMedium && <div className={`bg-[#F7F1FF] w-[40%] rounded-3xl px-4 py-4 flex flex-col gap-8`}>
                <div className={`flex flex-row gap-4 items-center `}>
                  <ShorcutsIcon />
                  <span className={`font-bold text-xl tracking-wide`}>Voice Command</span>
                </div>
                <div className={`flex justify-center items-center`}>
                  <button className={`flex justify-center items-center w-[150px] h-[150px] rounded-full bg-[#9350FF] hover:bg-slate-400`}><Speech /></button>
                </div>
                <div className={`italic text-gray-600 flex items-center justify-center`}>Press to command me!</div>
              </div>}

            </div>

            {/* Speech command */}
            {!isMedium && !isMobile && <div className={`bg-[#F7F1FF] w-1/3 rounded-3xl px-4 py-4 flex flex-col gap-8`}>
                <div className={`flex flex-row gap-4 items-center `}>
                  <ShorcutsIcon />
                  <span className={`font-bold text-xl tracking-wide`}>Voice Command</span>
                </div>
                <div className={`flex justify-center items-center`}>
                  <button className={`flex justify-center items-center w-[150px] h-[150px] rounded-full bg-[#9350FF] hover:bg-slate-400`}><Speech /></button>
                </div>
                <div className={`italic text-gray-600 flex items-center justify-center`}>Press to command me!</div>
            </div>}
            
            {isMedium &&
              <div className="flex flex-col gap-2 bg-[#F7F1FF] rounded-3xl w-[full]">
                <div className={`flex flex-row gap-4 items-center px-4 py-4`}>
                  <ShorcutsIcon />
                  <span className={`font-bold text-xl tracking-wide`}>Shortcuts</span>
                </div>
                <div className={`flex flex-row gap-12 justify-center items-center pb-4`}>
                  <div className={`flex flex-row gap-4`}>
                    <WifiIcon />
                    <div className={`flex flex-col`}>
                      <span>Wifi</span>
                      <ReactSwitch></ReactSwitch>
                    </div>
                  </div>

                  <div className={`flex flex-row gap-4`}>
                    <TvIcon />
                    <div className={`flex flex-col`}>
                      <span>Tivi</span>
                      <ReactSwitch></ReactSwitch>
                    </div>
                  </div>

                  <div className={`flex flex-row gap-4`}>
                    <TempIcon />
                    <div className={`flex flex-col`}>
                      <span>Temp</span>
                      <ReactSwitch></ReactSwitch>
                    </div>
                  </div>
                </div>
              </div>}


          </div>

          {/* Camera and door */}
          <div className={`w-full flex flex-col md:flex-row gap-4 lg:gap-6 mb-4`}>
            {/* Camera */}
            <div className={`w-full md:w-[65%] flex flex-col gap-4 bg-[#F7F1FF] px-4 py-4 rounded-3xl`}>
              <div className={`flex flex-row justify-between`}>
                <div className={`flex flex-row gap-4 items-center`}>
                  <Camera />
                  <span className={`font-bold text-lg md:text-xl tracking-wide`}>Cameras</span>
                </div>
                <button className={`flex justify-center items-start`}>
                  <SettingsIcon />
                </button>
              </div>
              <div className={`w-full h-auto flex flex-row justify-between`}>
                <div className={`w-[30%] flex flex-col gap-2`}>
                  <img className={`rounded-2xl shadow-md`} src={lvroom} alt={"Cam1"} />
                  <div className={`flex flex-row gap-4 items-center`}>
                    <div className={`w-[10px] h-[10px] rounded-full bg-red-600`}></div><span>Living room</span>
                  </div>
                </div>
                <div className={`w-[30%] flex flex-col gap-2`}>
                  <img className={`rounded-2xl shadow-md`} src={kitchen} alt={"Cam1"} />
                  <div className={`flex flex-row gap-4 items-center`}>
                    <div className={`w-[10px] h-[10px] rounded-full bg-red-600`}></div><span>Kitchen</span>
                  </div>
                </div>
                <div className={`w-[30%] flex flex-col gap-2`}>
                  <img className={`rounded-2xl shadow-md`} src={outside} alt={"Cam1"} />
                  <div className={`flex flex-row gap-4 items-center`}>
                    <div className={`w-[10px] h-[10px] rounded-full bg-red-600`}></div><span>Main entrance</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Door */}
            <div className={`bg-[#F7F1FF] w-full md:w-1/3 rounded-3xl h-full px-4 py-4 flex flex-col gap-4`}>
              <div className={`flex flex-row justify-between h-full`}>
                  <div className={`flex flex-row gap-4 items-center`}>
                    <Door />
                    <span className={`font-bold text-lg md:text-xl tracking-wide`}>Door</span>
                  </div>
                  <button className={`flex justify-center items-start`}>
                    <ReactSwitch onChange={toggleDoor} checked={openDoor === "on"}/>
                  </button>
              </div>
              {openDoor === "on"? <div className={`relative flex justify-center items-center`}>
                <div className={`${styles.door} absolute top-1/2 left-1/2 `}><Unlock /></div>
                <img src={door_open} alt={"door open"} className={`w-2/3 rounded-3xl h-[350px] md:h-[250px] lg:h-[370px]`} />
                
              </div> :
              <div className={`relative flex justify-center items-center`}>
                <div className={`${styles.door} absolute top-1/2 left-1/2 `}><Lock /></div>
                <img src={door_closed} alt={"door closed"} className={`w-2/3 rounded-3xl h-[350px] md:h-[250px] lg:h-[370px]`} />
              </div>}
            </div>
          </div>
      </div>
    </div>
  );
};
  
export default Dashboard;