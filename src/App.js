import {Routes, Route} from "react-router-dom" 
import {privateRoutes, publicRoutes} from "./Routes/PageRouting"
import EmptyLayout from "./Layouts/EmptyLayout"
import BeforeLogin from "./Layouts/BeforeLogin"
import AfterLogin from "./Layouts/AfterLogin"
import { createContext, useState } from "react"
import { smartHomeAPI } from "./API/RTK_Query/apiSlice"
import { ApiProvider } from "@reduxjs/toolkit/query/react"
import PersistLogin from "./Pages/Login/PersistLogin"


function renderRoutes(routes, role = "") {

  return routes?.map((route, index) => {
    let Layout;
    if (!route.layout) {
      Layout = EmptyLayout;
    } else if (route.layout === "beforeLogin") {
      Layout = BeforeLogin;
    } else {
      Layout = AfterLogin;
    }
    const Page = route.component;

    if (route.role === role | route.role === "family_member") {
      return (
        <Route key={index} path={route.path} element={
          <Layout>
            <Page />
          </Layout> } > </Route>
      )
    }
    return <div>Error</div>
  })
}

export const LoginContext = createContext()

function App() {
  const [role, setRole] = useState("")
  return ( 
      // <PersistLogin>
        <ApiProvider api={smartHomeAPI}>
          <LoginContext.Provider value={{role,setRole}}>

            <Routes>
              
              {renderRoutes(publicRoutes)}
              <Route element={<PersistLogin />} >
              {renderRoutes(privateRoutes, "family_member")}
              </Route>
            </Routes>
          </LoginContext.Provider>
        </ApiProvider>
        // </PersistLogin>
  );
}
export default App;