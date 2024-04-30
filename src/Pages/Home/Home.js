import Header from "../../Components/Header/Header"
import styles from './HomeNoLogin.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHalved,
  faGauge,
  faDesktop,
  faHandPointer,
  faSchool,
  faFileShield,
  faGaugeHigh,
} from "@fortawesome/free-solid-svg-icons";
import giathanhre from "../../Assets/images/giathanhre.jpg"
import lienkettb from "../../Assets/images/lienkettb.jpg"
import canhbaotn from "../../Assets/images/canhbaotainan.jpg"


const Home = () => {
    return (
      <div className="">
        <Header pageName={"Trang chủ"}></Header>
        <div className="Home mb-5">
      <div className={`${styles.big_cover} relative w-full min-h-[400px]`}>
        <div className={`${styles.slider__content} absolute text-center text-[#0f6cbf] left-1/2 top-[10%]`}>
          <h1 className={`${styles.slider__heading} md:tracking-widest tracking-tighter text-[14px] text-[#2196f3] mb-1 sm:text-xl md:text-2xl lg:text-3xl`}>
            TRƯỜNG ĐẠI HỌC BÁCH KHOA TP.HCM
          </h1>
        </div>
      </div>
      <div className="bg-[white] shadow-sm mt-0 max-w-[1280px] mx-auto px-[10px] md:px-[20px]">
        <h2 className="w-full text-2xl md:text-3xl pb-2 lg:text-4xl text-center font-semibold text-[#367fa9]  pt-[50px]"> 
          <span className="border-[#367fa9] border-b-4">DỊCH VỤ CỦA CHÚNG TÔI</span>
        </h2>
        <div className="max-w-[1280px] px-[70px] mx-auto flex flex-col md:flex-row items-center justify-between w-[90%] gap-3 my-[25px]">
          <div className="relative w-[300px] md:w-[30%] h-[280px] lg:h-[350px] rounded-[1.5rem] overflow-hidden shadow-lg">
            <img
              src={giathanhre}
              alt="Giá thành rẻ"
              className="w-full h-full object-cover"
            />
            <p className={`${styles.item_title} absolute font-semibold text-blue-900 text-2xl lg:text-3xl text-center drop-shadow-lg`}>
              Giá thành hợp lý
            </p>
          </div>
          <div className="relative w-[300px] md:w-[30%] h-[280px] lg:h-[350px] rounded-[1.5rem] overflow-hidden shadow-lg">
            <img
              src={lienkettb}
              alt="Liên kết các thiết bị"
              className="w-full h-full object-cover"
            />
            <p className={`${styles.item_title} absolute font-semibold text-2xl lg:text-3xl text-yellow-200 text-center drop-shadow-lg`}>
              Liên kết thiết bị
            </p>
          </div>
          <div className="relative w-[300px] md:w-[30%] h-[280px] lg:h-[350px] rounded-[1.5rem] overflow-hidden shadow-lg">
            <img
              src={canhbaotn}
              alt="Cảnh báo tai nạn"
              className="w-full h-full object-cover bg-left"
            />
            <p className={`${styles.item_title} absolute font-semibold bg-bottom text-2xl lg:text-3xl text-white text-center drop-shadow-lg`}>
              Cảnh báo tai nạn 
            </p>
          </div>
        </div>
        <div className="max-w-[1280px] w-full px-[0px] md:px-[20px] mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-semibold text-[#367fa9] mb-8 mt-[50px]">
          <span className="border-[#367fa9] border-b-4">ĐẶC ĐIỂM NỔI BẬT</span>
          </h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 px-8 md:px-16 text-[16px] md:text-[20px]">
            <div className="text-center border border-black rounded-2xl p-4 shadow-xl">
              <FontAwesomeIcon icon={faShieldHalved} size="3x" />
              <p className=" text-[18px] md:text-[24px] mt-3  font-semibold my-2">
                Bảo mật
              </p>
              <p className="font-normal">
              Xác thực tài khoản & khuôn mặt của bạn và người thân
              </p>
            </div>
            <div className="text-center border border-black rounded-2xl p-4 shadow-xl">
              <FontAwesomeIcon icon={faGauge} size="3x" />
              <p className=" text-[18px] md:text-[24px] mt-3   font-semibold my-2">
                Hiệu suất
              </p>
              <p className="font-normal">
              Hệ thống phản hồi nhanh nhờ Server Adafruit
              </p>
            </div>
            <div className="text-center border border-black rounded-2xl p-4 shadow-xl">
              <FontAwesomeIcon icon={faDesktop} size="3x" />
              <p className=" text-[18px] md:text-[24px] mt-3   font-semibold my-2">
                Tương thích
              </p>
              <p className="font-normal">
              Hiển thị tốt trên đa dạng thiết bị: điện thoại, laptop, tablet...
              </p>
            </div>
            <div className="text-center border border-black rounded-2xl p-4 shadow-xl">
              <FontAwesomeIcon icon={faHandPointer} size="3x" />
              <p className=" text-[18px] md:text-[24px] mt-3   font-semibold my-2">
                Dễ dùng
              </p>
              <p className="font-normal">
                Trải nghiệm người dùng tốt, sử dụng đơn giản
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-[1280px] px-0 md:px-[32px] lg:px-[70px] mx-auto mt-[50px] overflow-hidden">
          <div className={`${styles.content_img} mt-16 rounded-md overflow-hidden`}></div>
        </div>
        <div className="max-w-[1280px] px-[10px] md:px-[20px] mx-auto">
          <h2 className="text-2xl md:text-3xl w-[80%] mx-auto lg:text-4xl text-center font-semibold text-[#367fa9] mt-[50px] mb-8">
          VÌ SAO BẠN NÊN SỬ DỤNG SMART HOME SERVICE?
          </h2>
          <div className="w-full ">
            <div className="flex flex-col mt-3 md:flex-row items-center justify-center">
              <div className="w-[50%] md:w-[35%] flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faSchool}
                  size="6x"
                  color="#1B9B2F"
                  className="mb-2 md:w-2/5"
                />
              </div> 
              <div className="w-[100%] md:w-[65%] flex flex-col items-center justify-center  mt-4">
                <h3 className="text-[#1B9B2F] text-3xl font-semibold mb-2 text-center md:text-left">
                  Ủng hộ nhà trường
                </h3>
                <p className="text-justify mx-auto text-[16px] md:text-[20px] w-[90%] md:w-[80%]">
                  Bạn sử dụng hệ thống in ấn này đồng nghĩa với việc bạn đang
                  giúp đỡ nhà trường trong công tác quản lý và thúc đẩy chuyển
                  đổi số. Nhà trường cũng có thêm nguồn thu nhập để đầu tư vào
                  các cơ sở vật chất khác.
                </p>
              </div>
            </div>

            <div className="flex flex-col mt-3 md:flex-row items-center justify-center">
              <div className="w-[50%] md:w-[35%] flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faFileShield}
                  size="6x"
                  color="#1B9B2F"
                  className="mb-2 md:w-2/5"
                />
              </div>
              <div className="w-[100%] md:w-[65%] flex flex-col items-center justify-center  mt-4">
                <h3 className="text-[#1B9B2F] text-3xl font-semibold mb-2 text-center md:text-left">
                  Bảo mật thông tin
                </h3>
                <p className="text-justify mx-auto text-[16px] md:text-[20px] w-[90%] md:w-[80%]">
                  Đối với các sinh viên, việc in ấn bên ngoài đã trở thành điều
                  quen thuộc. Khung cảnh một tài khoản zalo bị bỏ quên chưa đăng
                  xuất trên một máy tính cũng quen thuộc không kém. Hệ thống in
                  của chúng tôi cho phép tải tệp lên trực tiếp và bảo vệ quyền
                  riêng tư của bạn.
                </p>
              </div>
            </div>

            <div className="flex flex-col mt-3 md:flex-row items-center justify-center">
              <div className="w-[50%] md:w-[35%] flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faGaugeHigh}
                  size="6x"
                  color="#1B9B2F"
                  className="mb-2 md:w-2/5"
                />
              </div>
              <div className="w-[100%] md:w-[65%] flex flex-col items-center justify-center  mt-4">
                <h3 className="text-[#1B9B2F] text-3xl font-semibold mb-2 text-center md:text-left">
                  Tối ưu thời gian
                </h3>
                <p className="text-justify mx-auto text-[16px] md:text-[20px] w-[90%] md:w-[80%]">
                  Khi tài liệu được in không cần gấp, sinh viên có thể làm việc
                  khác. Sinh viên không cần chờ đợi lượt in như trước đây. Việc
                  này giúp sinh viên tối đa hóa việc sử dụng thời gian của mình.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    )
  };
  
export default Home;