import { createContext, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
// import styles from "./Sidebar.module.css"
import { HomeIcon } from "../../Assets/icons/Icon";
import { ChevronFirst } from 'lucide-react'
// import { ChevronFirst, MoreVertical, ChevronLast, SidebarCloseIcon } from 'lucide-react'

const SidebarContext = createContext()
export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(false)

    return (
        <aside className="h-screen flex min-h-screen">
            <nav className="h-full flex flex-col border-r shadow-sm bg-[#09006F]">
                <div className={`p-4 pb-2 flex ${expanded?"flex-row mb-11":"flex-col mb-4"}  justify-between`}>
                    <div className={`${expanded?"ml-2":"flex justify-center"} cursor-pointer `}>
                        <NavLink to={"/Home"}>{<HomeIcon/>}</NavLink>
                    </div>
                    <span className={`overflow-hidden flex justify-center items-end text-white
                ${expanded ? "w-52 font-extrabold text-2xl" : "mt-2 text-[11px] font-semibold"}`}>SMART HOME
                        </span>
                    <button size={50} type={"button"} onClick={() => setExpanded((curr) => !curr)} className={`p-1 rounded-lg ${expanded? "bg-gray-50" : " bg-[#E4CAF9]"} ${expanded? "hover:bg-gray-200" : " hover:bg-[#8F00FF]"} `}>
                        {expanded ? <ChevronFirst size={20}/> : <></>}
                    </button>
                </div>

                <SidebarContext.Provider value={{expanded}}>
                    <ul className="flex-1 px-3">{ children }</ul>
                </SidebarContext.Provider>
            </nav>
        </aside>
    )
};

export function SidebarItem({icon, text, path, alert}) {
    const {expanded} = useContext(SidebarContext)
    return (
    <NavLink to = {path}>
        <li className={` relative flex items-center py-2 px-3 my-1 
            font-medium rounded-md cursor-pointer
            transition-colors group ${
                (window.location.pathname === path)? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" :
                "hover:bg-[#3D0099] text-gray-600"
            } ${expanded?"":"flex-col items-center"}`}>
            {icon}
            <span className={`overflow-hidden transition-all ${(window.location.pathname === path)? "text-black" : "text-white"} 
            ${expanded ? "w-52 ml-3" : "text-[12px] "}`}>
                {text}
            </span>
            {alert && (<div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 
                ${expanded ? "" : "top-2"}`} />)}
            {!expanded && (<div className={`absolute left-full rounded-md px-2 py-1 ml-6
                bg-indigo-100 text-indigo-800 text-sm invisible opacity-20
                -translate-x-3 transition-all group-hover:visible group-hover:opacity-100
                group-hover:translate-x-0`}>
                {text}
            </div>)}
        </li>
    </NavLink>
    );
}