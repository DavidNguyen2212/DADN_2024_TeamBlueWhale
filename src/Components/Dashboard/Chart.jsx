import { motion } from "framer-motion"
import { Line } from "react-chartjs-2"
import {Chart as ChartJS} from "chart.js/auto"
import { useEffect, useState } from "react"
import { TempChartGet } from "../../API/ChartAPI/TempAPI"
import { HumidChartGet } from "../../API/ChartAPI/HumidAPI"
import { LuxChartGet } from "../../API/ChartAPI/LuxAPI"

export default function Chart({chartData}) {
    const [datas, setDatas] = useState([]);
    let backgroundColor;
    if (chartData === "Nhiệt độ") {
        backgroundColor = "red";
    }
    else if (chartData === "Độ ẩm") {
        backgroundColor = "blue";
    }
    else {
        backgroundColor = "yellow";
    }
    useEffect(() => {
        let response;
        const fetchChartData = async() => {
            if (chartData === "Nhiệt độ")
                response = await TempChartGet(); 
            else if (chartData == "Độ ẩm")
                response = await HumidChartGet(); 
            else
                response = await LuxChartGet(); 
            // console.log("Chart data: ", response)
            const value = response?.data?.data;
            setDatas(value);
        }
        fetchChartData();
        // add interval
    }, [])

    let drawData = {
        labels: Array.from({ length: datas.length }, (_, index) => index + 1),
        datasets: [{
          label: chartData,
          data: datas.map((data) => parseFloat(data[1])),
          backgroundColor: backgroundColor,
          borderColor: backgroundColor,
          borderWidth: 1,
          tension: 0.3
        }]};

        const options = {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Các lần đo gần nhất'
                    }
                },
            }
        };
    
    return (
        <motion.div
        initial={{ opacity: 0, y: -50 }} // Thuộc tính khởi tạo
        animate={{ opacity: 1, y: 0 }} // Thuộc tính animate
        transition={{ duration: 1 }} // Thời gian chuyển đổi
        >
        <Line data={drawData} options={options}/>
        </motion.div>
    )
}