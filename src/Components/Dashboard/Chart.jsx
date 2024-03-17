import { animations } from "framer-motion"
import { Line } from "react-chartjs-2"
import {Chart as ChartJS} from "chartjs/auto"

export default function Chart({chartData}) {

    return (
        <Line data={chartData} options={animations}/>
    )
}