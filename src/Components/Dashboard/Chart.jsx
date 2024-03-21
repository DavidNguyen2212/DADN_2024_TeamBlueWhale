import { motion } from "framer-motion"
import { Line } from "react-chartjs-2"
import {Chart as ChartJS} from "chart.js/auto"
import { useEffect, useState } from "react"
import { TempChartGet } from "../../API/ChartAPI/TempAPI"

export default function Chart({chartData}) {
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        
        const fetchChartData = async() => {
            const response = await TempChartGet(); 
            console.log("Chart data: ", response)
            const value = response?.data?.data;
            setDatas(value);
        }
        fetchChartData();
    }, [])

    let drawData = {
        labels: Array.from({ length: datas.length }, (_, index) => index + 1),
        datasets: [{
          label: "Nhiệt độ",
          data: datas.map((data) => parseFloat(data[1])),
          backgroundColor: ["red"],
          borderColor: "red",
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