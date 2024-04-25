import {useState, useEffect} from "react";

const usePersist = () => {
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false)

    useEffect(() => {
        localStorage.setItem("persist", true) //JSON.stringify(persist)
    }, [persist])

    return [persist, setPersist]
}
export default usePersist;
