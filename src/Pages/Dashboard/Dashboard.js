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
import cam1 from "../../Assets/images/cam1.gif"
import cam2 from "../../Assets/images/cam2.gif"
import cam3 from "../../Assets/images/cam3.gif"
import door_open from "../../Assets/images/door_open.jpg"
import door_closed from "../../Assets/images/door_closed.jpg"
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import ReactSwitch from "react-switch";
import { SettingsIcon, ThermometerSunIcon } from "lucide-react"
import Chart from "../../Components/Dashboard/Chart";
import { DoorGet, DoorPost } from "../../API/DoorAPI/DoorAPI";
import useSpeechReg from "../../CustomHook/useSpeechRegHook.ts";
import { usePostACMutation, usePostChandeliersMutation, usePostTempACMutation } from "../../API/RTK_Query/apiSlice.jsx";
import useStore from "../../Zustand/store.js";
import { VoiceProcessing } from "../../API/Assistant/AssistantAPI.js";
import mqtt from "mqtt";
import { protocol } from "socket.io-client";


const Dashboard = () => {

  const {
    text, setText, startListening, stopListening, isListening, hasRecognitionSupport
  } = useSpeechReg()

  const listenOrstop = () => {
    if (!isListening)
      startListening()
    else  
      stopListening()
  }
  
  const assistantSpeak = (message) => {
    var msg = new SpeechSynthesisUtterance(message);
    var voices = window.speechSynthesis.getVoices();
    // Tìm giọng nói tiếng Việt trong danh sách giọng nói
    var vietnameseVoice = voices.find(voice => voice.lang === 'vi-VN' && voice.voiceURI.includes("HoaiMy"));
    // Nếu có giọng nói tiếng Việt, sử dụng nó; nếu không, sử dụng giọng mặc định
    msg.voice = vietnameseVoice || voices[0];
    window.speechSynthesis.speak(msg);
}


  const textToCommand = async (your_text) => {
    // assistantSpeak(your_text)
    if (your_text !== '' && your_text !== "Press to command me!" && your_text !== "Đã thực hiện!") {
      setText("Đang xử lý...")
      const response = await VoiceProcessing(JSON.stringify({"usertext": your_text}))
      console.log("Response: ", response)
      assistantSpeak(response?.data?.Reply)
    }
    setText('Đã thực hiện!')
  };

  const [firstLoad, setFirstLoad] = useState(true);
  const isMedium = useMediaQuery({maxWidth: 1024, minWidth: 769});
  const isMobile = useMediaQuery({maxWidth: 768});
  const isSmall = useMediaQuery({maxWidth: 499})
  const isFold = useMediaQuery({maxWidth: 280})
  const isVoiceandShort = useMediaQuery({maxWidth: 430})

  const effectRan = useRef(false)
  const [client, setClient] = useState(null);
  const [connectStatus, setConnectStatus] = useState();
  const [canMutate, setCanMutate] = useState(false)
  const mqttConnect = (host, mqttOption) => {
      setConnectStatus('Connecting');
      setClient(mqtt.connect(host, mqttOption));
  };

  useEffect(() => {
      let isMounted = true;
      // if (effectRan == false) {
      mqttConnect("mqtt://io.adafruit.com", {
      host: "io.adafruit.com",
      port: 443,
      username: process.env.REACT_APP_DAVID_NAME,
      password: process.env.REACT_APP_DAVID_KEY,
      protocol: 'wss'
    });
      // }
      const fetchDoorState = async() => {
        const response = await DoorGet();
        console.log("Reponse from Door api: ", response);
        const value = response?.data?.value;
        doorInfoRef.current = value;
  
        setOpenDoor(value);
        setFirstLoad(false);
      }
      if (effectRan.current === false)
        fetchDoorState();

      return () => {
          isMounted = false;
          effectRan.current = true
          if (client) {
              console.log("Xóa client")
              client.end();
          }
      };
  }, [])
  
  useEffect(() => {
      if (client && effectRan) {
          client.on('connect', () => {
              setConnectStatus('Connected');
              console.log("Connected!")
              client.subscribe("Giaqui14032002/feeds/door")
          });
          console.log(client);
          client.on('error', (err) => {
              console.error('Connection error: ', err);
              client.end();
          });
          client.on('reconnect', () => {
              setConnectStatus('Reconnecting');
          });
          client.on('message', (topic, message) => {
              const payload = { topic, message: message.toString() };
              // console.log("Nhan du lieu", payload)
              if (topic.includes("door") && effectRan.current && message.toString() !== openDoor)
                setOpenDoor(message.toString())
          });
      }

      return () => {
          if (client) {
              client.removeAllListeners();
          }
      };
    }, [client]);

  const [dateTime, setDateTime] = useState('');

  function formatTime(val) {
    if (val < 10)
      return '0'
    return ''
  }
  function tick() {
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    const s = d.getSeconds();

    setDateTime(formatTime(h) + h + ' : ' + formatTime(m) + m + ' : ' + formatTime(s) +s)
  }
  useEffect(() => {
    tick()
    const timeID = setInterval(() => tick(), 1000)
    return () => clearInterval(timeID)
  }, [])
  const doorInfoRef = useRef("");


  useEffect(() => {
    if (firstLoad)
      setText("Press to command me!");
    else if (!isListening) {
      if (!["Press to command me!", "Đang xử lý...", "Đã xử lý!", "Vui lòng nhắc lại ạ!", "Đã thực hiện!"].includes(text)) 
        setTimeout(() => {textToCommand(text)}, 3000)
    }
  }, [text])

  const handleSubmit = async () => {
    const response = await DoorPost({"value": openDoor});
    console.log("Send to door feed: ", response);
  }

  // Line chart
  const [element, setElement] = useState("Nhiệt độ");
  const elements = ["Nhiệt độ", "Độ ẩm", "Ánh sáng"];
  const handleEleChange = (event) => {
    setElement(event.target.value); // Lưu giá trị của phòng được chọn vào state
  };
  

  // Door
  const [openDoor, setOpenDoor] = useState("ON");     // sau này cần có thêm status
  const toggleDoor = () => {
    setOpenDoor((curr) => (curr === "ON" ? "OFF" : "ON"));
    setCanMutate(true)
  }
  
  useEffect(() => {
    if (!firstLoad && canMutate) {
        // if (openDoor !== doorInfoRef.current) {
        //     // Nếu có sự thay đổi, gọi handleSubmit()
            handleSubmit();
        //     doorInfoRef.current = openDoor;
        // }
    }
  }, [openDoor])


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
                    {dateTime}
                  </div>
                  <div 
                    className={`text-white text-base sm:text-2xl font-semibold`}>
                    {new Date().toDateString()}
                  </div>
                  <div className={`text-white text-base sm:text-2xl flex flex-row gap-2 sm:gap-4 items-center`}>
                      <ThermometerSunIcon />
                      <span>39{'\u00b0'}C</span>
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
              <div className={`flex ${isSmall ? "flex-col gap-3" : "flex-row gap-6"} sm:flex-row sm:gap-8 lg:flex-col lg:gap-2 justify-center items-center`}>
                <div className={`flex flex-row ${isFold? "gap-6":"gap-10"} sm:gap-8 justify-center items-center`}>
                  <div className={`flex flex-col gap-0 justify-center items-center`}>
                    <img src={chad} alt="member" className={`w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] border-2 border-[#A737FF] rounded-[10px]`}/>
                    <span className={`font-semibold text-base md:text-xl`}>David</span>
                  </div>
                  <div className={`flex flex-col gap-0 justify-center items-center`}>
                    <img src={chad2} alt="member" className={`w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] border-2 border-[#A737FF] rounded-[10px]`}/>
                    <span className={`font-semibold text-base md:text-xl`}>Bang</span>
                  </div>
                  <div className={`flex flex-col gap-0 justify-center items-center`}>
                    <img src={chad3} alt="member" className={`w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] border-2 border-[#A737FF] rounded-[10px]`}/>
                    <span className={`font-semibold text-base md:text-xl`}>Bao</span>
                  </div>
                </div>
                <div className={`flex flex-row ${isFold? "gap-6":"gap-10"} sm:gap-8 justify-center items-center`}>
                  <div className={`flex flex-col gap-0 justify-center items-center`}>
                    <img src={chad4} alt="member" className={`w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] border-2 border-[#A737FF] rounded-[10px]`}/>
                    <span className={`font-semibold text-base md:text-xl`}>Qui</span>
                  </div>
                  <div className={`flex flex-col gap-0 justify-center items-center`}>
                    <img src={chad5} alt="member" className={`w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] border-2 border-[#A737FF] rounded-[10px]`}/>
                    <span className={`font-semibold text-base md:text-xl`}>Cuong</span>
                  </div>
                  <div className={`flex flex-col gap-0 justify-center items-center`}>
                    <img src={chad6} alt="member" className={`w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] border-2 border-[#A737FF] rounded-[10px]`}/>
                    <span className={`font-semibold text-base md:text-xl`}>Mr.Thinh</span>
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
              <div className={`hk flex ${isVoiceandShort? "flex-col" : "flex-row"} gap-4 justify-between`}>
                                <div className={`bg-[#F7F1FF] ${isVoiceandShort? "w-full" : "w-[50%]"} rounded-3xl px-4 py-4 flex flex-col gap-8 `}>
                  <div className={`flex flex-row gap-4 items-center `}>
                    <ShorcutsIcon />
                    <span className={`font-bold text-lg tracking-wide`}>Voice Command</span>
                  </div>
                  <div className={`flex justify-center items-center`}>
                    <button onClick={startListening} className={`flex justify-center items-center w-[150px] h-[150px] rounded-full bg-[#9350FF] hover:bg-slate-400`}><Speech /></button>
                  </div>
                  {isListening && 
                  <div className={`italic text-gray-600 flex items-center justify-center`}>Tôi đang nghe đây...</div>
                }
                  <div className={`italic text-gray-600 flex items-center justify-center`}>{text}</div>

                  {/* <div className={`italic text-gray-600 flex items-center justify-center`}>Press to command me!</div> */}

                </div>
                <div className={`flex flex-col gap-4 bg-[#F7F1FF] rounded-3xl ${isVoiceandShort? "w-full" : "w-[50%]"} `}>
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
                  {element === "Nhiệt độ" && <Chart chartData={"Nhiệt độ"} />}
                  {element === "Độ ẩm" && <Chart chartData={"Độ ẩm"} />}
                  {element === "Ánh sáng" && <Chart chartData={"Ánh sáng"} />}
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
                  <button onClick={startListening} className={`flex justify-center items-center w-[150px] h-[150px] rounded-full bg-[#9350FF] hover:bg-slate-400`}><Speech /></button>
                </div>
                {isListening && 
                  <div className={`italic text-gray-600 flex items-center justify-center`}>Tôi đang nghe đây...</div>
                }
                  <div className={`italic text-gray-600 flex items-center justify-center`}>{text}</div>
                {/* <div className={`italic text-gray-600 flex items-center justify-center`}>Press to command me!</div> */}
              </div>}

            </div>

            {/* Speech command */}
            {!isMedium && !isMobile && <div className={`bg-[#F7F1FF] w-1/3 rounded-3xl px-4 py-4 flex flex-col gap-8`}>
                <div className={`flex flex-row gap-4 items-center `}>
                  <ShorcutsIcon />
                  <span className={`font-bold text-xl tracking-wide`}>Voice Command</span>
                </div>
                <div className={`flex justify-center items-center`}>
                    <button onClick={listenOrstop} className={`flex justify-center items-center w-[150px] h-[150px] rounded-full bg-[#9350FF] hover:bg-slate-400`}><Speech /></button>
                  </div>
                  {isListening && 
                  <div className={`italic text-gray-600 flex items-center justify-center`}>Tôi đang nghe đây...</div>
                }
                  <div className={`italic text-gray-600 flex items-center justify-center`}>{text}</div>

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
              <div className={`w-full h-full flex ${isSmall? "flex-col" : "flex-row"}  justify-between`}>
                <div className={`${isSmall? "w-full" : "w-[30%]"} flex flex-col gap-2`}>
                  <img className={`rounded-2xl shadow-md h-full`} src={cam1} alt={"Cam1"} />
                  <div className={`flex flex-row gap-4 items-center`}>
                    <div className={`w-[10px] h-[10px] rounded-full bg-red-600`}></div><span>Living room</span>
                  </div>
                </div>
                <div className={`${isSmall? "w-full mt-4" : "w-[30%]"} flex flex-col gap-2`}>
                  <img className={`rounded-2xl shadow-md h-full`} src={cam2} alt={"Cam1"} />
                  <div className={`flex flex-row gap-4 items-center`}>
                    <div className={`w-[10px] h-[10px] rounded-full bg-red-600`}></div><span>Kitchen</span>
                  </div>
                </div>
                <div className={`${isSmall? "w-full mt-4" : "w-[30%]"} flex flex-col gap-2`}>
                  <img className={`rounded-2xl shadow-md h-full`} src={cam3} alt={"Cam1"} />
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
                    <ReactSwitch onChange={toggleDoor} checked={openDoor === "ON"}/>
                  </button>
              </div>
              {openDoor === "ON"? <div className={`relative flex justify-center items-center`}>
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