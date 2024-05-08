import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Sidebar, { SidebarItem } from "./Sidebar";
import { useSocket } from "../../Contexts/SocketIOContext";
import { HelpCircleIcon } from 'lucide-react'
import { DashBoardIcon, DevicesIcon, MessageIcon, SettingIcon } from "../../Assets/icons/Icon";
import styles from "./FullSidebar.module.css"

const FullSidebar = ({showSideBar}) => {
    const effectRan = useRef(false)
    const UserSocket = useSocket();
    useEffect(() => {
        if (!UserSocket.socket && effectRan.current) {
            const socket = io("https://dadn-2024-backend.onrender.com");
            socket.on("connect", () => {
                console.log("Init socket IO with socketID = ", socket?.id);
            });
            UserSocket.connectSocket(socket);
        }
        return () => effectRan.current = true
    }, [UserSocket])

    return (
    <div style={{transition:"transform 0.4s ease-in-out"}} className={`fixed z-50 bottom-0 top-0 ${showSideBar ? "" : styles.SideBarHide}`}>
        <Sidebar>
            <SidebarItem icon={<DashBoardIcon size={50}/>} text="Dashboard"  path="/Dashboard"/>
            <SidebarItem icon={<DevicesIcon size={50}/>} text="Devices" path="/Devices"/>
            <SidebarItem icon={<MessageIcon size={50}/>} text="Message" alert path="/Message" />
            <SidebarItem icon={<SettingIcon size={50}/>} text="Others" path="/Setting"/>
            <hr className="my-3"/>
            <SidebarItem icon={<HelpCircleIcon size={50} color="#8F00FF"/>} text="Help" path="/Help"/>
        </Sidebar>
    </div>
    );
}
export default FullSidebar;