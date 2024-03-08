import UserInfoModal from "../../Modals/UserInfoModal/UserInfoModal";
import { AvartarIcon } from "../../Assets/icons/Icon";
import styles from "./Header.module.css"
import { MoreVertical } from "lucide-react";

const Header = ({showSidebar, setShowSidebar, pageName}) => {
    return (
        // overflow-auto
        <div className={`Header_Container w-full h-[90px]  bg-white flex items-center justify-between shadow-md z-50`}>
            <div className={`Page_name flex items center transition-all`}>
                <h1 className="flex items-center justify-center text-black font-bold ml-2 text-4xl bg-[#E7D5FF] h-[60px] md:h-[70px] w-[400px] border-r-[0.1px]  border-b-[0.1px] border-white rounded-es-3xl rounded-se-3xl">
                    {pageName}
                </h1>
            </div>

            <div className="Header_UserInfo flex items-center justify-between gap-3 mr-3 lg:mr-4">
                <UserInfoModal>
                    <div className="flex items-center justify-between gap-3 mr-3 lg:mr-4 cursor-pointer">
                        {<AvartarIcon />}
                    <span className={`${styles.Header_UserName} text-black font-semibold cursor-pointer`}>
                    Docker Levis</span>
                    <MoreVertical />
                    </div>
                    
                </UserInfoModal>
            </div>
        </div>
    );
};
export default Header;