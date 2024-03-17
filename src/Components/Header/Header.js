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
    useEffect(() => {
        const handleResize = () => {
            setVisibleButton(window.innerWidth <= 1280);
        };
    
        // Gọi handleResize một lần để cập nhật giá trị ban đầu
        handleResize();
    
        // Thêm sự kiện resize listener
        window.addEventListener('resize', handleResize);
    
        // Cleanup: loại bỏ sự kiện resize listener khi component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const {showSideBar, setShowSideBar} = useContext(OpenSidebarContext)
    return (
        // overflow-auto
        <div className={`Header_Container w-full h-[75px] md:h-[90px] bg-white flex items-center justify-between shadow-md z-50`}>
            <div className={`Page_name w-1/2 flex items center transition-all`}>
                <h1 className="w-full flex items-center justify-center text-black font-bold ml-2 text-2xl md:text-4xl lg:text-[40px] bg-[#E7D5FF] h-[60px] md:h-[70px] border-r-[0.1px]  border-b-[0.1px] border-white rounded-es-3xl rounded-se-3xl">
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
             
                {/* {visibleButton && <button id="sidebarSwitch" type="button" onClick={() => setShowSideBar((curr) => !curr)}
                    className={`${visibleButton? "px-2 bg-[#6A21A4] rounded" : "hidden"}`}>
                    <FontAwesomeIcon size="1x" icon={faBars} color="#FFFFFF"/>
                </button>}     */}
                <button type="button" onClick={() => setShowSideBar((curr) => !curr)}
                    className={`${styles.sidebarSwitch}`}>
                    <FontAwesomeIcon size="1x" icon={faBars} color="#FFFFFF"/>
                </button>
               
            </div>
        </div>
    );
};
export default Header;