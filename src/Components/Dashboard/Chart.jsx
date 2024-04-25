import { motion } from "framer-motion"
import { Line } from "react-chartjs-2"
import {Chart as ChartJS} from "chart.js/auto"
import { useEffect, useState } from "react"
import { TempChartGet } from "../../API/ChartAPI/TempAPI"
import { HumidChartGet } from "../../API/ChartAPI/HumidAPI"
import { LuxChartGet } from "../../API/ChartAPI/LuxAPI"
import {useMediaQuery} from 'react-responsive'

export default function Chart({chartData}) {
    const isMobile = useMediaQuery({maxWidth: 430})
    const [datas, setDatas] = useState([]);
    let backgroundColor;
    if (chartData === "Nhiệt độ") {
        backgroundColor = "red";
    }
    else if (chartData === "Độ ẩm") {
        backgroundColor = "blue";
    }
    else {
        backgroundColor = "orange";
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
            const value = response?.data?.data;
            setDatas(value);
        }
        fetchChartData();
        // add interval
    }, [])

    let drawData = {
        labels: Array.from({ length: isMobile ? 8 : 10 }, (_, index) => index + 1),
        datasets: [{
          label: chartData,
          data: datas.map((data) => parseFloat(data[1])).slice(-(isMobile ? 8 : 10)),
          backgroundColor: backgroundColor,
          borderColor: backgroundColor,
          borderWidth: 1,
          tension: 0.3
        }]};

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Các lần đo gần nhất'
                    }
                },
                y: {
                    ticks: {
                        stepSize: 0.5, // Đặt kích thước bước
                        beginAtZero: false // Bắt đầu từ 0 hoặc giá trị nhỏ nhất
                    }
                }
            }
        };
    
    return (
        <motion.div className={`relative h-full w-full`}
        initial={{ opacity: 0, y: -50 }} // Thuộc tính khởi tạo
        animate={{ opacity: 1, y: 0 }} // Thuộc tính animate
        transition={{ duration: 1 }} // Thời gian chuyển đổi
        >
        <Line data={drawData} options={options}/>
        </motion.div>
    )
}