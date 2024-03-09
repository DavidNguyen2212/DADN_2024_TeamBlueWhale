import { useState } from "react";
import GasIcon from "../../Assets/images/gas.svg"
import { HumidIcon, TemperatureIcon, AirConditionerIcon, FridgeIcon, LightIcon} from "../../Assets/icons/Icon";
import ReactSwitch from "react-switch";
import { Minus, Plus } from "lucide-react";
import styles from "./LivingRoom.module.css"

export default function LivingRoom() {
    // Air Conditioner 
    const [onAC, setOnAC] = useState("on");     // sau này cần có thêm status
    const toggleState = () => {
        setOnAC((curr) => (curr === "on" ? "off" : "on"));
    }
    const [colorMinus, setColorMinus] = useState("#E7D5FF");
    const [colorPlus, setColorPlus] = useState("#E7D5FF");
    const [tempAC, setTempAC] = useState(0)
    const dashArray = 154.5 * Math.PI * 2
    const [dashOffset, setDashOffset] = useState(dashArray);

    const handleClickDown = () => {
        // Thay đổi màu nền khi nhấp vào
        setColorMinus("#C27CF9");
        // Thực hiện reset màu nền sau 1 giây
        setTimeout(() => {
          setColorMinus("#E7D5FF");
        }, 100);
        setTempAC((curr) => curr === 0 ? 0 : (curr - 1));
        setDashOffset(curr => tempAC == 0? curr : (dashArray - dashArray * (tempAC - 1) / 40))
    };
    const handleClickUp = () => {
        // Thay đổi màu nền khi nhấp vào
        setColorPlus("#C27CF9");
        // Thực hiện reset màu nền sau 1 giây
        setTimeout(() => {
          setColorPlus("#E7D5FF");
        }, 100);
        setTempAC((curr) => curr === 30 ? 30 : (curr + 1));
        setDashOffset(curr => tempAC == 30? curr : (dashArray - dashArray * (tempAC + 1) / 40))
      };


    const [temperature, setTemperature] = useState(24);
    const [humid, setHumid] = useState(30);
    const [gas, setGas] = useState(30);

    return (
    <div className={`flex flex-row gap-4 mt-4 mb-4`}>
        {/* AirCond block */}
        <div>
        <div className={`w-[56rem] h-[36rem] ml-4 pt-4 bg-[#F7F1FF] rounded-3xl`}>
            {/* AirCond Heading area */}
            <div className={`pl-4 pr-8 flex flex-row items-center justify-between`}>
                <div className={`flex flex-row items-center gap-4`}><AirConditionerIcon /><span className={`font-medium`}>Air Conditioner</span></div>      
                <div className="w-1/3 gap-2 md:gap-3">
                    <div className="flex flex-row justify-end gap-1 w-full">
                        {onAC === "on" ? 
                        <p className="text-[#066DCC] overflow-hidden flex text-[16px] md:text-[20px] font-bold w-1/2 mb-[8px]">
                        Hoạt động{" "}
                        </p> : <p className="text-red-500 overflow-hidden flex italic text-[16px] md:text-[20px] font-bold w-1/2 mb-[8px]">
                            Đang tắt{" "}
                        </p>}

                        <div className="switch flex">
                            <ReactSwitch onChange={toggleState} checked={onAC === "on"}/>
                        </div>
                    </div>
                </div>
            </div>

            {/* AirCond Number area  */}
            <div className={`flex flex-row items-center justify-center gap-6`}>
                <button onClick={handleClickDown} className={`w-[92px] h-[73px] flex items-center justify-center text-[50px] font-extrabold text-[#09006E] bg-[${colorMinus}] rounded-3xl shadow-lg`}>
                    <Minus strokeWidth={9} />
                </button>
                <span className={`text-3xl font-bold`}>10 {'\u00b0'}C</span>     
                <div className={`num_ring relative flex justify-center items-center w-[345px] h-[345px]`}>
                    <div className={`${styles.outer} w-[345px] h-[345px] p-[36px] rounded-full`}>
                        <div className={`${styles.inner} w-[273px] h-[273px] rounded-full flex items-center justify-center shadow-2xl z-50 bg-[#EFEFEF]`}>
                            <div className={`${styles.inner} flex flex-col items-center font-semibold text-black gap-`}>
                                <span className={`text-[#858585] text-2xl`}>Current</span>
                                <span className={`text-5xl font-extrabold`}>{tempAC >= 0 ? `+ ${tempAC}`:`- ${tempAC}`} {'\u00b0'}C</span>
                            </div>
                        </div>
                    </div>
            
    
                    <svg className={`${styles._svg}`} xmlns="http://www.w3.org/2000/svg" version="1.1" width="345px" height="345px">
                        <defs>
                            <linearGradient id="GradientColor" x1="0%" x2="0%" y1="100%" y2="0%">
                            {/* <stop offset="0%" stop-color="#e91e63" /> */}
                            {/* <stop offset="75%" stop-color="#673ab7" /> */}
                            <stop offset="40%" stop-color="#060CA4" />  
                            <stop offset="75%" stop-color="#0A79FB" />
                            <stop offset="94%" stop-color="#0ADEFB" />  
                            <stop offset="100%" stop-color="#FF0000" />                           
                            </linearGradient>
                        </defs>
                        <circle 
                            className={`${styles._circle}`} cx="172.5" cy="172.5" r="154.5" 
                            stroke-linecap="butt" fill="none" strokeWidth={36} stroke="url(#GradientColor)" 
                            strokeDasharray={dashArray} strokeDashoffset={dashOffset}
                            transform={`rotate(90 172.5 172.5)`}/>
                    </svg>
                </div>
                <span className={`text-3xl font-bold`}>30 {'\u00b0'}C</span>
                <button onClick={handleClickUp} className={`w-[92px] h-[73px] flex items-center justify-center text-[50px] font-extrabold text-[#09006E] bg-[${colorPlus}] rounded-3xl shadow-lg`}>
                    <Plus strokeWidth={6} size={30} />
                </button>
            </div>
            <div className={`mt-4 text-3xl font-bold flex items-center justify-center`}>0 {'\u00b0'}C</div>
        </div>

        {/* Lights block */}
        <div className={`w-[56rem] h-[36rem] mt-8 ml-4 bg-[#F7F1FF] rounded-3xl`}>
            <div className={`w-full h-1/2 rounded-3xl px-4 flex flex-row gap-20 justify-center items-center`}>
                {/* Fridge */}
                <div className={`w-[40%] h-2/3 bg-[#09006E] flex flex-col rounded-3xl pt-3 gap-8`}>
                    {/* Row 1 of fridge */}
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
                    {/* Row 2 of fridge */}
                    <div className={`flex flex-row justify-center items-center gap-12 w-full mt-4`}>
                        <FridgeIcon />
                        <span className={`text-white text-2xl font-semibold flex items-center justify-end w-1/2`}>Tủ lạnh</span>
                    </div>
                </div>

                {/* Light 1 */}
                <div className={`w-[40%] h-2/3 bg-[#E7D5FF] flex flex-col rounded-3xl pt-3 gap-8`}>
                    {/* Row 1 of light 1*/}
                    <div className="flex flex-row justify-center gap-8 w-full mt-4">
                        {onAC === "on" ? 
                        <p className="text-[#066DCC] overflow-hidden flex text-[16px] md:text-[20px] font-bold w-1/2 mb-[8px]">
                        Bật{" "}
                        </p> : <p className="text-red-500 overflow-hidden flex italic text-[16px] md:text-[20px] font-bold w-1/2 mb-[8px]">
                            Tắt{" "}
                        </p>}

                        <div className="switch flex items-center justify-end ">
                            <ReactSwitch onChange={toggleState} checked={onAC === "on"}/>
                        </div>
                    </div>
                    {/* Row 2 of light 1 */}
                    <div className={`flex flex-row justify-center items-center gap-12 w-full mt-4`}>
                        <LightIcon />
                        <span className={`text-black text-2xl font-semibold flex items-center justify-end w-1/2`}>Đèn 1</span>
                    </div>
                </div>

            </div>

            <div className={`w-full h-1/2 rounded-3xl px-4 flex flex-row gap-20 justify-center items-center`}>
                {/* Fridge */}
                <div className={`w-[40%] h-2/3 bg-[#09006E] flex flex-col rounded-3xl py-3 gap-8`}>
                    {/* Row 1 of fridge */}
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
                    {/* Row 2 of fridge */}
                    <div className={`flex flex-row justify-center items-center gap-12 w-full mt-4`}>
                        <FridgeIcon />
                        <span className={`text-white text-2xl font-semibold flex items-center justify-end w-1/2`}>Tủ lạnh</span>
                    </div>
                </div>

                {/* Light 1 */}
                <div className={`w-[40%] h-2/3 bg-[#E7D5FF] flex flex-col rounded-3xl py-3 gap-8`}>
                    {/* Row 1 of light 1*/}
                    <div className="flex flex-row justify-center gap-8 w-full mt-4">
                        {onAC === "on" ? 
                        <p className="text-[#066DCC] overflow-hidden flex text-[16px] md:text-[20px] font-bold w-1/2 mb-[8px]">
                        Bật{" "}
                        </p> : <p className="text-red-500 overflow-hidden flex italic text-[16px] md:text-[20px] font-bold w-1/2 mb-[8px]">
                            Tắt{" "}
                        </p>}

                        <div className="switch flex items-center justify-end ">
                            <ReactSwitch onChange={toggleState} checked={onAC === "on"}/>
                        </div>
                    </div>
                    {/* Row 2 of light 1 */}
                    <div className={`flex flex-row justify-center items-center gap-12 w-full mt-4`}>
                        <LightIcon />
                        <span className={`text-black text-2xl font-semibold flex items-center justify-end w-1/2`}>Đèn 1</span>
                    </div>
                </div>

            </div>
        </div>
        </div>

        {/* Temp - Humid - Gas block */}
        <div className={`flex flex-col gap-6`}>
            <div className={`w-[260px] pt-2 rounded-3xl flex flex-col justify items-center gap-4 bg-[#F7F1FF]`}>
                <div className={`font-medium`}>Temperature</div>
                <div className={`text-[#555555] text-4xl font-extrabold`}>{temperature > 0 ? `+ ${temperature}`:`- ${temperature}`} {'\u00b0'}C</div>
                <TemperatureIcon />
            </div>
            <div className={`w-[260px] h-[312px] pt-2 mb-1.5 rounded-tl-3xl rounded-tr-3xl rounded-bl-[100px] rounded-br-[100px] flex flex-col justify items-center gap-4 bg-[#F7F1FF]`}>
                <div className={`font-medium mb-2`}>Humidity</div>
                <div className={`text-[#555555] text-4xl font-extrabold`}>{humid} %</div>
                <HumidIcon />
            </div>
            <div className={`w-[260px] h-[330px] pt-2 rounded-3xl flex flex-col justify items-center gap-4 bg-[#F7F1FF]`}>
                <div className={`font-medium mb-0`}>Gas</div>
                <div className={`text-[#555555] text-4xl font-extrabold`}>{gas} %</div>
                <img src={GasIcon} alt="GasIcon" />
            </div>
        </div>
    </div>
    )
}