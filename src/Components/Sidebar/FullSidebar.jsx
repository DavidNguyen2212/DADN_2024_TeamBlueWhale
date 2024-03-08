import Sidebar, { SidebarItem } from "./Sidebar";
import { DashBoardIcon, DevicesIcon, MessageIcon, SettingIcon } from "../../Assets/icons/Icon";
import { HelpCircleIcon } from 'lucide-react'


const FullSidebar = () => {
    return (
    <div className="fixed z-50">
        <Sidebar>
            <SidebarItem icon={<DashBoardIcon size={50}/>} text="Dashboard" alert path="/Dashboard"/>
            <SidebarItem icon={<MessageIcon size={50}/>} text="Message" active path="/Message" />
            <SidebarItem icon={<DevicesIcon size={50}/>} text="Devices" path="/Devices"/>
            <SidebarItem icon={<SettingIcon size={50}/>} text="Settings" path="/Setting"/>
            <hr className="my-3"/>
            <SidebarItem icon={<HelpCircleIcon size={50} color="#8F00FF"/>} text="Help" path="/Help"/>
        </Sidebar>
    </div>
    );
}
export default FullSidebar;