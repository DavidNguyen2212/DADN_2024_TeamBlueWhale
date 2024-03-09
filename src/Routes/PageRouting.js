import HomeNoLogin from "../Pages/Home/HomeNoLogin";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Message from "../Pages/Message/Message";
import Devices from "../Pages/Devices/Devices";
import Setting from "../Pages/Setting/Setting";
import Help from "../Pages/Help/Help";

const publicRoutes = [
    {role: "", path: "", component: HomeNoLogin, layout: "beforeLogin"},
    {role: "", path: "/", component: HomeNoLogin, layout: "beforeLogin"},
    {role: "", path: "/DADN_2024_TeamBlueWhale", component: HomeNoLogin, layout: "beforeLogin"},
    {role: "", path: "/Login", component: Login}
]

const privateRoutes = [
    {role: "family_member", path: "/Home", component: Home, layout: "afterLogin"},
    {role: "family_member", path: "/Dashboard", component: Dashboard, layout: "afterLogin"},
    {role: "family_member", path: "/Message", component: Message, layout: "afterLogin"},
    {role: "family_member", path: "/Devices", component: Devices, layout: "afterLogin"},
    {role: "family_member", path: "/Setting", component: Setting, layout: "afterLogin"},
    {role: "family_member", path: "/Help", component: Help, layout: "afterLogin"}
]

export {publicRoutes, privateRoutes};
