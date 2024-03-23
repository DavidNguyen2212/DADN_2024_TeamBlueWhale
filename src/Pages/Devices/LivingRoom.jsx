import { useEffect, useState, useRef } from "react";
import GasIcon from "../../Assets/images/gas.svg"
import GasIconSmall from "../../Assets/images/gasSmall.svg"
import { useMediaQuery } from "react-responsive";
import { HumidIcon, TemperatureIcon, AirConditionerIcon, FridgeIcon, LightIcon,
TemperatureIconSmall, HumidIconSmall} from "../../Assets/icons/Icon";
import ReactSwitch from "react-switch";
import { Minus, Plus } from "lucide-react";
import styles from "./LivingRoom.module.css"
import { LivingroomGet, LivingroomPost } from "../../API/LivingroomAPI/LivingroomAPI";
import useStore from "../../Zustand/store";
import { useGetLivingroomQuery, usePostLivingroomMutation } from "../../API/APISlice/apiSlice";
import { current } from "immer";


export default function LivingRoom() {
    // Real-time (fake) fetch data
    const {  data, error, isLoading, isFetching } = useGetLivingroomQuery({}, {
        pollingInterval: 2000,
        skipPollingIfUnfocused: false,
      });
    console.log("data: ", data)
    // Submit new data
    const [addNewState, response] = usePostLivingroomMutation()

    const { value, setTemperature, setHumidity, setLux, setAutoMode, setAC, setTempAC, setChandeliers,setLight1, setLight2, setUpdated_at } = useStore(
        (state) => ({ value: state.value, setTemperature: state.setTemperature,
        setHumidity: state.setHumidity, setLux: state.setLux,
        setAutoMode: state.setAutoMode,
        setAC: state.setAC, setTempAC: state.setTempAC,
        setChandeliers: state.setChandeliers,
        setLight1: state.setLight1, setLight2: state.setLight2, setUpdated_at: state.setUpdated_at
    }));

    // Manage sending data
    const [firstLoad, setFirstLoad] = useState(true);   
    const [allInfo, setAllInfo] = useState({});         
    const allInfoRef = useRef({});      

    useEffect(() => {
        if (data) {
          const got_value = JSON.parse(data.value);
          // setAllInfo(value);
          allInfoRef.current = got_value;
          setFirstLoad(false);
          // States
          setAutoMode(got_value.autoMode);
          setTemperature(got_value.temperature);   setHumidity(got_value.humidity);   setLux(got_value.lux);
          setAC(got_value.AC);
          setTempAC(got_value.tempAC);
          setChandeliers(got_value.chandeliers);
          setLight1(got_value.light1);    
          setLight2(got_value.light2);
        }
      }, []);

    // const updateAllInfo = (field) => {
    //     if (field === 'autoMode') {
    //         setAllInfo((prevData) => ({
    //             ...prevData,
    //             autoMode: autoMode
    //         }))
    //     }
    //     else if (field === 'air_conditioner') {
    //         setAllInfo((prevData) => ({
    //             ...prevData,
    //             air_conditioner: {
    //                 ...prevData.air_conditioner,
    //                 state: AC,
    //                 current_temp: tempAC,
    //             }
    //         }))
    //     }
    //     else if (field === 'light') {
    //         setAllInfo((prevData) => ({
    //             ...prevData,
    //                 light: {
    //                 ...prevData.light,
    //                 chandeliers: chandeliers,
    //                 light1: light1,
    //                 light2: light2
    //             }
    //         }))
    //     }
    // } 

    const handleSubmit = async () => {
       await addNewState({"value": JSON.stringify(value)}).unwrap()
      .then(() => {})
      .then((error) => {
        console.log(error)
      })
    }

    const [colorMinus, setColorMinus] = useState("#E7D5FF");
    const [colorPlus, setColorPlus] = useState("#E7D5FF");

    // use for Responsive
    const isFold = useMediaQuery({maxWidth : 290 })
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isUnderLarge = useMediaQuery({ maxWidth: 1023 })
    const [dashArray, setDashArray] = useState(isUnderLarge? 87.5 * Math.PI * 2 : 154.5 * Math.PI * 2);
    // const [dashOffset, setDashOffset] = useState(dashArray);
    const [dashOffset, setDashOffset] = useState(dashArray - dashArray * (value.tempAC/ 40));
    
    useEffect(() => {
        setDashArray(isUnderLarge? 87.5 * Math.PI * 2 : 154.5 * Math.PI * 2)
    }, [isUnderLarge])
    
    const handleClickDown = () => {
        // Thay đổi màu nền khi nhấp vào
        setColorMinus("#C27CF9");
        // Thực hiện reset màu nền sau 1 giây
        setTimeout(() => {
          setColorMinus("#E7D5FF");
        }, 100);
        setTempAC(value.tempAC === 0 ? 0 : (value.tempAC - 1));
        setDashOffset(value.tempAC === 0? value.tempAC : (dashArray - dashArray * (value.tempAC - 1) / 40))
    };
    const handleClickUp = () => {
        // Thay đổi màu nền khi nhấp vào
        setColorPlus("#C27CF9");
        // Thực hiện reset màu nền sau 1 giây
        setTimeout(() => {
          setColorPlus("#E7D5FF");
        }, 100);
        setTempAC(value.tempAC === 30 ? 30 : (value.tempAC + 1));
        setDashOffset(value.tempAC === 30? value.tempAC : (dashArray - dashArray * (value.tempAC + 1) / 40))
      };


    useEffect(() => {
        if (!firstLoad) {
            const current_time = new Date()
            setUpdated_at(current_time.toISOString())
        }
    }, [value])

    // useEffect(() => {
    //     if (!firstLoad) {
    //         updateAllInfo('light');
    //     }
    // }, [chandeliers, light1, light2])

    useEffect(() => {
        if (!firstLoad && value) {
            if (JSON.stringify(value) !== JSON.stringify(allInfoRef.current)) {
                // Nếu có sự thay đổi, gọi handleSubmit()
                handleSubmit();
                allInfoRef.current = allInfo;
            }
        }
    }, [value])

    return (
    <div className={`w-full flex flex-col-reverse lg:flex-row gap-4 lg:gap-2 mt-4 mb-4 `}>
        {/* AirCond block */}
        <div className="w-full lg:ml-4 lg:px-0 lg:w-[70%] px-4">
            <div className={`w-full pt-4 pb-4 lg:pb-0 lg:h-[36rem] xl:w-[52rem] bg-[#F7F1FF] rounded-3xl`}>
                {/* AirCond Heading area */}
                <div className={`pl-4 pr-4 lg:pr-8 flex flex-row items-center justify-between`}>
                    <div className={`flex flex-row items-center gap-2 md:gap-4`}><AirConditionerIcon /><span className={`${isFold ? "text-sm font-medium" : "font-medium"}`}>Air Conditioner</span></div>      
                    <div className="w-1/3 gap-2 md:gap-3">
                        <div className="flex flex-row justify-end gap-1 w-full">
                            {!isFold &&
                            (value.AC === "on" ? 
                            <p className="text-[#066DCC] overflow-hidden flex text-[16px] md:text-[20px] font-bold w-1/2 mb-[8px]">
                            Hoạt động{" "}
                            </p> : <p className="text-red-500 overflow-hidden flex italic text-[16px] md:text-[20px] font-bold w-1/2 mb-[8px]">
                                Đang tắt{" "}
                            </p>)}

                            <button className="switch flex">
                                <ReactSwitch onChange={setAC(value.AC === "on"? "off" : "on")} checked={value.AC === "on"}/>
                            </button>
                        </div>
                    </div>
                </div>

                {/* AirCond Number area  */}
                <div className={`flex flex-row items-center justify-center gap-1 md:gap-4 lg:gap-6 pt-4 lg:pt-0`}>
                    <button onClick={handleClickDown} className={`w-[30px] h-[50px] lg:w-[92px] lg:h-[73px] flex items-center justify-center text-[50px] font-extrabold text-[#09006E] bg-[${colorMinus}] rounded-3xl shadow-lg`}>
                        {/* <Minus strokeWidth={9} /> */}
                        <Minus strokeWidth={5}/>
                    </button>
                    <span className={`text-[18px]  lg:text-3xl font-bold`}>10{'\u00b0'}C</span>     
                    <div className={`num_ring relative flex justify-center items-center w-[200px] h-[200px] lg:w-[345px] lg:h-[345px]`}>
                        <div className={`${styles.outer} w-[200px] h-[200px] p-[25px] lg:w-[345px] lg:h-[345px] lg:p-[36px] rounded-full`}>
                            <div className={`${styles.inner} w-[150px] h-[150px] lg:w-[273px] lg:h-[273px] rounded-full flex items-center justify-center shadow-2xl z-50 bg-[#EFEFEF]`}>
                                <div className={`${styles.inner} flex flex-col items-center font-semibold text-black gap-`}>
                                    <span className={`text-[#858585] text-base lg:text-2xl`}>Current</span>
                                    <span className={`text-3xl lg:text-5xl font-extrabold`}>{value.tempAC >= 0 ? `+ ${value.tempAC}`:`- ${value.tempAC}`} {'\u00b0'}C</span>
                                </div>
                            </div>
                        </div>
        
                        {isUnderLarge && 
                        <svg className={`${styles._svg}`} xmlns="http://www.w3.org/2000/svg" version="1.1" width="200px" height="200px">
                            <defs>
                                <linearGradient id="GradientColor" x1="0%" x2="0%" y1="100%" y2="0%">
                                <stop offset="40%" stop-color="#060CA4" />  
                                <stop offset="75%" stop-color="#0A79FB" />
                                <stop offset="94%" stop-color="#0ADEFB" />  
                                <stop offset="100%" stop-color="#FF0000" />                           
                                </linearGradient>
                            </defs>
                            <circle 
                                className={`${styles._circle}`} 
                                // cx="172.5" cy="172.5" r="154.5" 
                                cx="100" cy="100" r="87.5"
                                stroke-linecap="butt" fill="none" 
                                // strokeWidth={36} 
                                strokeWidth={25}
                                stroke="url(#GradientColor)" 
                                strokeDasharray={dashArray} strokeDashoffset={dashOffset}
                                // transform={`rotate(90 172.5 172.5)`}
                                transform={`rotate(90 100 100)`}
                                />
                        </svg> }
                        {!isUnderLarge && 
                        <svg className={`${styles._svg}`} xmlns="http://www.w3.org/2000/svg" version="1.1" width="345px" height="345px">
                            <defs>
                                <linearGradient id="GradientColor" x1="0%" x2="0%" y1="100%" y2="0%">
                                <stop offset="40%" stop-color="#060CA4" />  
                                <stop offset="75%" stop-color="#0A79FB" />
                                <stop offset="94%" stop-color="#0ADEFB" />  
                                <stop offset="100%" stop-color="#FF0000" />                           
                                </linearGradient>
                            </defs>
                            <circle 
                                className={`${styles._circle}`} 
                                cx="172.5" cy="172.5" r="154.5" 
                                // cx="100" cy="100" r="87.5"
                                stroke-linecap="butt" fill="none" 
                                strokeWidth={36} 
                                // strokeWidth={25}
                                stroke="url(#GradientColor)" 
                                strokeDasharray={dashArray} strokeDashoffset={dashOffset}
                                transform={`rotate(90 172.5 172.5)`}
                                // transform={`rotate(90 100 100)`}
                                />
                        </svg>}
                    </div>
                    <span className={`text-[18px] lg:text-3xl font-bold`}>30{'\u00b0'}C</span>
                    <button onClick={handleClickUp} className={`w-[30px] h-[50px] lg:w-[92px] lg:h-[73px] flex items-center justify-center text-[50px] font-extrabold text-[#09006E] bg-[${colorPlus}] rounded-3xl shadow-lg`}>
                        {/* <Plus strokeWidth={6} size={30} /> */}
                        <Plus strokeWidth={4} size={25} />

                    </button>
                </div>
                <div className={`mt-4 text-[18px] lg:text-3xl font-bold flex items-center justify-center`}>0 {'\u00b0'}C</div>
            </div>

            {/* Lights block */}
            <div className={`w-full lg:h-[38rem] xl:w-[52rem] flex flex-col gap-8 mt-8 px-4 lg:px-0 lg:gap-0  bg-[#F7F1FF] rounded-3xl mb-8`}>
                <div className={`w-full h-1/2 rounded-3xl px-4 flex flex-col lg:flex-row gap-8 lg:gap-20 justify-center items-center`}>
                    {/* Fridge */}
                    {/* <div className={`w-full lg:w-[40%] h-2/3 bg-[#09006E] flex flex-col rounded-3xl pt-3 pb-4 mt-8 gap-4 lg:mt-0 lg:pb-0 lg:gap-8`}>
                         Row 1 of fridge 
                        <div className="flex flex-row justify-center gap-8 w-full mt-4">
                            {onAC === "on" ? 
                            <p className="text-white overflow-hidden flex text-[16px] md:text-[20px] font-bold w-1/2 mb-[8px]">
                            Bật{" "}
                            </p> : <p className="text-red-500 overflow-hidden flex italic text-[16px] md:text-[20px] font-bold w-1/2 mb-[8px]">
                                Tắt{" "}
                            </p>}

                            <div className="switch flex items-center justify-end ">
                                <ReactSwitch onChange={toggleState} checked={onAC === "on"}/>
                            </div>
                        </div>
                        Row 2 of fridge
                        <div className={`flex flex-row justify-center items-center gap-12 w-full mt-4`}>
                            <FridgeIcon />
                            <span className={`text-white text-2xl font-semibold text-center flex items-center justify-end w-1/2`}>Tủ lạnh</span>
                        </div>
                    </div> */}

                    {/* Chandeliers */}
                    <div className={`w-full lg:mx-10 mt-8 h-2/3 bg-[#E7D5FF] flex flex-col rounded-3xl pt-3 pb-4 gap-4 lg:mt-4 lg:pb-0 lg:gap-8`}>
                        {/* Row 1 of Chandeliers */}
                        <div className="flex flex-row justify-center gap-8 w-full mt-4">
                            {value.chandeliers === "on" ? 
                            <p className="text-[#066DCC] overflow-hidden flex text-[16px] md:text-[20px] font-bold w-1/2 mb-[8px]">
                            Bật{" "}
                            </p> : <p className="text-red-500 overflow-hidden flex italic text-[16px] md:text-[20px] font-bold w-1/2 mb-[8px]">
                                Tắt{" "}
                            </p>}

                            <div className="switch flex items-center justify-end ">
                                <ReactSwitch onChange={setChandeliers(value.chandeliers === "on"? "on" : "off")} checked={value.chandeliers === "on"}/>
                            </div>
                        </div>
                        {/* Row 2 of Chandeliers */}
                        <div className={`flex flex-row justify-center items-center gap-12 w-full mt-4`}>
                            <LightIcon />
                            <span className={`text-black text-2xl font-semibold text-center flex items-center justify-end w-1/2`}>Đèn Chùm</span>
                        </div>
                    </div>

                </div>

                <div className={`w-full h-1/2 rounded-3xl px-4 flex flex-row lg:gap-20 justify-between items-center lg:justify-center lg:items-center mb-8`}>
                    {/* Light 1 */}
                    <div className={`w-[45%] lg:w-[40%] h-2/3 bg-[#E7D5FF] flex flex-col rounded-3xl py-3 gap-8`}>
                        {/* Row 1 of Light 1 */}
                        <div className="flex flex-row justify-center gap-8 w-full mt-4">
                            {value.light1 === "on" ? 
                            <p className="text-[#066DCC] overflow-hidden flex text-[16px] md:text-[20px] font-bold w-auto lg:w-1/2 mb-[8px]">
                            Bật{" "}
                            </p> : <p className="text-red-500 overflow-hidden flex italic text-[16px] md:text-[20px] font-bold w-auto lg:w-1/2 mb-[8px]">
                                Tắt{" "}
                            </p>}

                            <div className="switch flex items-center justify-end ">
                                <ReactSwitch onChange={setLight1(value.light1 === "on" ? "off" : "on")} checked={value.light1 === "on"}/>
                            </div>
                        </div>
                        {/* Row 2 of Light 1 */}
                        <div className={`flex flex-row justify-center items-center gap-6 lg:gap-12 w-full mt-4`}>
                            <LightIcon />
                            <span className={`text-black text-lg lg:text-2xl font-semibold text-center flex items-center justify-center w-auto lg:w-1/2`}>Đèn 1</span>
                        </div>
                    </div>

                    {/* Light 2 */}
                    <div className={`w-[45%] lg:w-[40%] h-2/3 bg-[#E7D5FF] flex flex-col rounded-3xl py-3 gap-8 `}>
                        {/* Row 1 of light 2*/}
                        <div className="flex flex-row justify-center gap-8 w-full mt-4">
                            {value.light2 === "on" ? 
                            <p className="text-[#066DCC] overflow-hidden flex text-[16px] md:text-[20px] font-bold w-auto lg:w-1/2 mb-[8px]">
                            Bật{" "}
                            </p> : <p className="text-red-500 overflow-hidden flex italic text-[16px] md:text-[20px] font-bold w-auto lg:w-1/2 mb-[8px]">
                                Tắt{" "}
                            </p>}

                            <div className="switch flex items-center justify-end ">
                                <ReactSwitch onChange={setLight1(value.light2 === "on" ? "off" : "on")} checked={value.light2 === "on"}/>
                            </div>
                        </div>
                        {/* Row 2 of light 2 */}
                        <div className={`flex flex-row justify-center items-center gap-6 lg:gap-12 w-full mt-4`}>
                            <LightIcon />
                            <span className={`text-black text-lg lg:text-2xl font-semibold flex items-center justify-center w-auto lg:w-1/2`}>Đèn 2</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        {/* Temp - Humid - Gas block */}
        {!isFold && 
        <div className={`w-full flex flex-row gap-3 lg:h-full lg:flex-col lg:gap-6 px-4 justify-between lg:justify-normal`}>
            <div className={`w-full h-auto lg:w-[260px] pt-2 rounded-3xl flex flex-col justify items-center gap-2 lg:gap-4 bg-[#F7F1FF]`}>
                <div className={`font-medium`}>Temperature</div>
                {firstLoad ? <div className={`text-[#555555] text-2xl lg:text-4xl font-extrabold`}>...Loading</div>:
                <div className={`text-[#555555] text-2xl lg:text-4xl font-extrabold`}>{value.temperature > 0 ? `+ ${value.temperature}`:`- ${value.temperature}`} {'\u00b0'}C</div>}
                {/* Hiển thị TemperatureIconSmall cho màn hình nhỏ hơn hoặc bằng md */}
                {isMobile && <TemperatureIconSmall />}
                {/* Hiển thị TemperatureIcon cho màn hình lớn hơn md */}
                {!isMobile && <TemperatureIcon />}  
            </div>
            <div className={`w-full h-auto lg:w-[260px] lg:h-[312px] pt-2 mb-1.5 rounded-tl-3xl rounded-tr-3xl rounded-bl-[100px] rounded-br-[100px] flex flex-col justify items-center gap-2 lg:gap-4 bg-[#F7F1FF]`}>
                <div className={`font-medium lg:mb-2`}>Humidity</div>
                <div className={`text-[#555555] text-2xl lg:text-4xl font-extrabold`}>{value.humidity} %</div>
                {isMobile && <HumidIconSmall />}
                {!isMobile && <HumidIcon />} 
            </div>
            <div className={`w-full h-auto lg:w-[260px] lg:h-[330px] pt-2 rounded-3xl flex flex-col justify items-center gap-2 lg:gap-4 bg-[#F7F1FF]`}>
                <div className={`font-medium mb-0`}>Lux</div>
                <div className={`text-[#555555] text-2xl lg:text-4xl font-extrabold`}>{value.lux} Lux</div> 
                {isMobile && <img src={GasIconSmall} alt="GasIconSmall" />}
                {!isMobile && <img src={GasIcon} alt="GasIcon" />} 
            </div>
        </div>}

        {isFold && 
        <div className={`w-full flex flex-col gap-3 px-4 justify-between`}>
            <div className={`w-full flex flex-row gap-3 justify-between`}>
                <div className={`w-full h-auto lg:w-[260px] pt-2 rounded-3xl flex flex-col justify items-center gap-2 lg:gap-4 bg-[#F7F1FF]`}>
                    <div className={`font-medium`}>Temperature</div>
                    <div className={`text-[#555555] text-2xl lg:text-4xl font-extrabold`}>{value.temperature > 0 ? `+ ${value.temperature}`:`- ${value.temperature}`} {'\u00b0'}C</div>
                    {/* Hiển thị TemperatureIconSmall cho màn hình nhỏ hơn hoặc bằng md */}
                    {isMobile && <TemperatureIconSmall />}
                    {/* Hiển thị TemperatureIcon cho màn hình lớn hơn md */}
                    {!isMobile && <TemperatureIcon />}  
                </div>
                <div className={`w-full h-auto pt-2 mb-1. rounded-tl-3xl rounded-tr-3xl rounded-bl-[100px] rounded-br-[100px] flex flex-col justify items-center gap-2 lg:gap-4 bg-[#F7F1FF]`}>
                    <div className={`font-medium lg:mb-2`}>Humidity</div>
                    <div className={`text-[#555555] text-2xl lg:text-4xl font-extrabold`}>{value.humidity} %</div>
                    {isMobile && <HumidIconSmall />}
                    {!isMobile && <HumidIcon />} 
                </div>
            </div>
            
            <div className={`w-full h-auto lg:w-[260px] lg:h-[330px] pt-2 rounded-3xl flex flex-col justify-between items-center gap-2 lg:gap-4 bg-[#F7F1FF]`}>
                <div className={`font-medium mb-0`}>Lux</div>
                <div className={`text-[#555555] text-2xl lg:text-4xl font-extrabold`}>{value.lux} Lux</div> 
                {isMobile && <img src={GasIconSmall} alt="GasIconSmall" />}
                {!isMobile && <img src={GasIcon} alt="GasIcon" />} 
            </div>
        </div>}
    </div>
    )
}