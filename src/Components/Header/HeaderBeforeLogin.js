import { useNavigate } from "react-router-dom";
import { HomeIconNoLogin } from "../../Assets/icons/Icon";
import styles from './Header.module.css'

const HeaderBeforeLogin = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    setTimeout(() => {
      navigate("/Login");
    }, 500);
  };

  return (
    <div className="HeaderBeforeLogin_container w-[100vw] h-[66px] md:h-[55px] bg-[#8F00FF] flex items-center justify-between fixed z-50  ">
      <div className="Header_SystemName flex items-center transition-all">
        <div className="system_name hidden md:flex items-center justify-center text-white font-bold text-[20px] bg-[#8F00FF] h-[55px] w-[250px] bg-gradient-to-br from-cyan-500 to-#3C8DBC ">
          {"Smart Home Service"}
        </div>
        <div className="system_name md:hidden text-white font-bold text-[20px] bg-[#8F00FF] h-[55px] w-[100px] bg-gradient-to-br bg-transparent flex items-center justify-center ">
          {"SHS"}
        </div>
      </div>
      <div className={`${styles.Header_UserInfo} flex items-center justify-between gap-3 mr-3`}>
        {<HomeIconNoLogin />}
        <button
          onClick={handleLogin}
          className="text-white pr-5 font-semibold cursor-pointer"
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default HeaderBeforeLogin;
