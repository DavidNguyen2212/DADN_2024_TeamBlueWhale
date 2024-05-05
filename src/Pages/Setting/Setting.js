import { WeatherPredictor } from "../../API/Weather/WeatherAI";
import Header from "../../Components/Header/Header";
import { useState, useEffect, useRef } from "react";
import mqtt from "mqtt";
import { CloudSun } from "lucide-react";
import MyLoader from "../../Components/Messages/Loader";
import rainy from "../../Assets/images/rainy.gif"
import sunny from "../../Assets/images/sunny.gif"
import cloudy from "../../Assets/images/cloudy.gif"
import clear from "../../Assets/images/clear.gif"


const Setting = () => {
  const effectRan = useRef(false)
  const [canMutate, setCanMutate] = useState(false)
  const [temp, setTemp] = useState(30)
  const [humi, setHumi] = useState(70)
  const [weather, setWeather] = useState("None")
  const [client, setClient] = useState(null);
  const [connectStatus, setConnectStatus] = useState();
  const [payLoad, setPayLoad] = useState();
  const mqttConnect = (host, mqttOption) => {
      setConnectStatus('Connecting');
      setClient(mqtt.connect(host, mqttOption));
  };

  const handleSubmit = async(temp, humi) => {
    const response = await WeatherPredictor(temp, humi)
    console.log(response);
    setWeather(response.data.Reply || "None");
  }

  useEffect(() => {
    let isMounted = true;
    // if (effectRan == false) {
        mqttConnect("mqtt://io.adafruit.com", {
        host: "io.adafruit.com",
        port: 443,
        username: process.env.REACT_APP_DAVID_NAME,
        password: process.env.REACT_APP_DAVID_KEY});
    // }
    
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
            client.subscribe("Giaqui14032002/feeds/temp")
            client.subscribe("Giaqui14032002/feeds/light")
            client.subscribe("Giaqui14032002/feeds/humi")
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
            console.log("Nhan du lieu", payload)
            if (topic.includes("temp"))
              setTemp(parseFloat(message));
            else if (topic.includes("humi"))
              setHumi(parseFloat(message));
        });
    }

    return () => {
        if (client) {
            client.removeAllListeners();
        }
    };
  }, [client]);

  useEffect(() => {
    handleSubmit(temp, humi)
  }, [])

//   const {data, isLoading, isError, isFetching, refetch } = useGetAllAttributesQuery({}, { refetchOnMountOrArgChange: true, forceRefetch: true });
//   useEffect(() => {
//     if (data) {
//       setTemp(data[0]);
//       setHumi(data[1])
//     }
// }, [isLoading, isFetching])

  return (
    <div className="bg-white h-full">
      <Header pageName={"Cài đặt"}></Header>

      <div className={`setting w-full h-full bg-white flex flex-col gap-4 sm:gap-8 pl-4 pr-4`}>
        <div className="mt-8 flex flex-row gap-4 items-center">
          <h2 className="text-2xl font-semibold border-b-2">Dự báo thời tiết</h2> 
          <CloudSun size={40} color="blue"/>
        </div>
        
        <div className="text-xl font-medium mb-4 flex flex-row justify-between gap-6 sm:justify-normal sm:gap-20">
          <span className="p-4 bg-red-200 rounded-xl">Nhiệt độ: {temp}</span>
          <span className="p-4 bg-blue-300 rounded-xl">Độ ẩm: {humi}</span>
          <button type="button" className="p-4 bg-green-400 rounded-xl" onClick={() => handleSubmit(temp, humi)}>Press to predict</button>
        </div>

        <div className="text-xl">Thời tiết dự báo 1 tiếng nữa: {weather}</div>

        {weather === "None"? <MyLoader /> : (
        <div className="flex justify-start">
          {weather === "RAINY" && 
          
            <div>
              <p className="italic text-lg">Bạn có thể cần mang theo dù đấy!</p>
              <img src={rainy} alt="rainy" />
            </div>}
          {weather === "CLOUDY" && 
          <div>
          <p className="italic text-lg">Trời nhiều mây và khá mát mẻ!</p>
          <img src={cloudy} alt="cloudy" />
          </div>}
          {weather === "SUNNY" && 
          <div>
            <p className="italic text-lg">Hôm nay là một ngày nắng đẹp đó!</p>
            <img src={sunny} alt="sunny" />
          </div>}
          {weather === "CLEAR" && 
          <div>
            <p className="italic text-lg">Trời thật quang đãng và không khí trong lành!</p>
            <img src={clear} alt="clear" />
            </div>}
        </div>
)}
      </div>
    </div>
  );
};
  
export default Setting;