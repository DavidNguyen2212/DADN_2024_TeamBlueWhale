import { useState, useRef, useEffect, createContext } from "react";
import FullSidebar from "../Components/Sidebar/FullSidebar";
import styles from "./AfterLogin.module.css";
import { useMediaQuery } from "react-responsive";


export const OpenSidebarContext = createContext()
const AfterLogin = ({children, role}) => {

    const [showSideBar, setShowSideBar] = useState(true);
    // const [paddingLeft, setPaddingLeft] = useState("pl-[66px]");
    const isMedium = useMediaQuery({maxWidth: 1024})
    const effectRan = useRef(false)
    useEffect(() => {
      if (effectRan.current === false)
        setShowSideBar(!isMedium)

      return () => effectRan.current = true
    }, [])
 
    return (
      <OpenSidebarContext.Provider value={{showSideBar, setShowSideBar}}>
        <div className="w-[100vw] h-[100vh]">
          <div className="w-full h-full flex flex-row relative gap-0">
              <FullSidebar showSideBar={showSideBar}></FullSidebar>
              <div className={`${styles.Main_Container} w-full bg-[#f8f9fa]`}>
                {children}  
              </div>
          </div>
        </div>
      </OpenSidebarContext.Provider>
    );
}
export default AfterLogin;