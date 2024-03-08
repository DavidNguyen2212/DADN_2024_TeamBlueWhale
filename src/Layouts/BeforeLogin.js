import HeaderBeforeLogin from "../Components/Header/HeaderBeforeLogin"
const BeforeLogin = ({children}) => {
    return (
        <div>
            <HeaderBeforeLogin></HeaderBeforeLogin>
            <div className="w-full flex">
                <div className={`Main_Container w-full mt-[66px] md:mt-[55px] bg-[#3f8f9fa]`}>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default BeforeLogin;