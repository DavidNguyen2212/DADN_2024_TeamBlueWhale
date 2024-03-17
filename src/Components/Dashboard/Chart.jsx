import { motion } from "framer-motion"
import { Line } from "react-chartjs-2"
import {Chart as ChartJS} from "chart.js/auto"

export default function Chart({chartData}) {

    return (
        <motion.div
        initial={{ opacity: 0, y: -50 }} // Thuộc tính khởi tạo
        animate={{ opacity: 1, y: 0 }} // Thuộc tính animate
        transition={{ duration: 1 }} // Thời gian chuyển đổi
        >
        <Line data={chartData} />
        </motion.div>
    )
}