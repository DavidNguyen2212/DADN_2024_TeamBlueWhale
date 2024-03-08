import { useState, useRef, useEffect } from "react";
import FullSidebar from "../Components/Sidebar/FullSidebar";


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
          window.innerWidth <= 1280
        ) {
          setShowSideBar(false);
        }
    };
    
    useEffect(() => {
        if (window.innerWidth > 1280) {
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
        setPaddingLeft("pl-[66px]");
        if (window.innerWidth > 1280 && showSideBar) {
          setPaddingLeft("pl-[108px]");
        }
      }, [showSideBar]);

    return (
      <div>
        <div className="w-full flex relative">
            <FullSidebar></FullSidebar>
            <div className={`Main_Container ${paddingLeft} w-full bg-[#f8f9fa]`}>
              {children}  
            </div>
        </div>
      </div>
    );
}
export default AfterLogin;