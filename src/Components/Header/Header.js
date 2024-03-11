import UserInfoModal from "../../Modals/UserInfoModal/UserInfoModal";
import { AvartarIcon } from "../../Assets/icons/Icon";
import styles from "./Header.module.css"
import { MoreVertical } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { OpenSidebarContext } from "../../Layouts/AfterLogin";


const Header = ({pageName}) => {
    const [visibleButton, setVisibleButton] = useState(true)
    useEffect (()=>{
        if (window.innerWidth > 1024)
            setVisibleButton(false)
    }, [window.innerWidth])
    
    const {showSideBar, setShowSideBar} = useContext(OpenSidebarContext)
    console.log(showSideBar)
    return (
        // overflow-auto
        <div className={`Header_Container w-full h-[75px] md:h-[90px] bg-white flex items-center justify-between shadow-md z-50`}>
            <div className={`Page_name w-1/2 flex items center transition-all`}>
                <h1 className="w-full flex items-center justify-center text-black font-bold ml-2 text-2xl md:text-4xl lg:text-5xl bg-[#E7D5FF] h-[60px] md:h-[70px] border-r-[0.1px]  border-b-[0.1px] border-white rounded-es-3xl rounded-se-3xl">
                    {pageName}
                </h1>
            </div>

            <div className="Header_UserInfo flex items-center justify-between gap-0 mr-3 lg:mr-4">
                <UserInfoModal>
                    <div className="flex items-center justify-between gap-3 mr-2 md:mr-3 lg:mr-4 cursor-pointer">
                        {<AvartarIcon />}
                        <span className={`${styles.Header_UserName} text-black font-semibold cursor-pointer`}>
                        Docker Levis</span>
                        <MoreVertical />
                    </div>
                    
                </UserInfoModal>
             
                {visibleButton && <button id="sidebarSwitch" type="button" onClick={() => setShowSideBar((curr) => !curr)}
                    className={`px-2 bg-[#6A21A4] rounded`}>
                    <FontAwesomeIcon size="1x" icon={faBars} color="#FFFFFF"/>
                </button>}    
               
            </div>
        </div>
    );
};
export default Header;