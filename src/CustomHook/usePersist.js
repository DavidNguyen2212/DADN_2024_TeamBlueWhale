import {useState, useEffect} from "react";

const usePersist = () => {
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false)
    useEffect(() => {
        console.log("CC")
        localStorage.setItem("persist", JSON.stringify(persist)) //JSON.stringify(persist)
    }, [persist])

    return [persist, setPersist]
}
export default usePersist;
