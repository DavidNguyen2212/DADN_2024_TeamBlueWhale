import { useState, useRef, useEffect, createContext } from "react";
import FullSidebar from "../Components/Sidebar/FullSidebar";

export const OpenSidebarContext = createContext()
const AfterLogin = ({children, role}) => {
    const elementRef = useRef();
    const [showSideBar, setShowSideBar] = useState(true);
    const [paddingLeft, setPaddingLeft] = useState("pl-[66px]");

    const handleOnClickOut = (e) => {
        if (elementRef.current &&
          !elementRef.current.contains(e.target) &&
          !e.target.matches("#Header_MenuIcon") &&
          !e.target.matches("svg") &&
          !e.target.matches("path") &&
          window.innerWidth <= 1024
        ) {
          setShowSideBar(false);
        }
    };
    
    useEffect(() => {
        if (window.innerWidth > 1024) {
          setShowSideBar(true);
        } else {
          setShowSideBar(false);
        }
    
        document.addEventListener("click", handleOnClickOut);
        return () => {
          document.removeEventListener("click", handleOnClickOut);
        };
    }, []);
    
    useEffect(() => {
        setPaddingLeft("pl-[0px]");
        if (window.innerWidth > 1024 && showSideBar) {
          setPaddingLeft("pl-[108px]");
        }
      }, [showSideBar]);

    return (
      <OpenSidebarContext.Provider value={{showSideBar, setShowSideBar}}>
        <div className="w-[100vw] h-[100vh]">
          <div className="w-full h-full flex flex-row relative gap-0">
              <FullSidebar showSideBar={showSideBar}></FullSidebar>
              <div className={`Main_Container ${paddingLeft} w-full bg-[#f8f9fa]`}>
                {children}  
              </div>
          </div>
        </div>
      </OpenSidebarContext.Provider>
    );
}
export default AfterLogin;