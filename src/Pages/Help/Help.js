import Header from "../../Components/Header/Header";
import styles from "./Help.module.scss";
import student from "../../Assets/images/student.svg";
import manager from "../../Assets/images/manager.svg";
import staff from "../../Assets/images/employee-icon.svg";

const Help = () => {
  return (
    <div className="bg-white h-full">
      <Header pageName={"Trợ giúp"}></Header>
      
      <div className={`setting w-full h-full flex flex-col gap-4 sm:gap-8 pl-4 pr-4`}>
      <div className={`${styles.Support_lgradient} mt-4 md:mt-8 relative justify-center pt-[50%] md:pt-[50%]`}>
        <div className={`${styles.slider__content2} absolute text-center text-[#0f6cbf] left-1/2 top-[1rem] md:top-[2.5rem]`}>
          <h2 className={`${styles.slider__heading2} text-base mb-1 md:text-3xl lg:text-5xl`}>
            CHÀO MỪNG ĐẾN TRANG TRỢ GIÚP
          </h2>
        </div>
      </div>

      <div className={`${styles.guide} text-[16px] lg:text-[18px] mt-4 pb-2 md:pb-3 items-center justify-evenly w-full mx-auto`}>
        <p className="text-base md:text-xl indent-4">
          Để sử dụng được hệ thống, người nhà phải
          đăng nhập với tài khoản được cấp. Ngôi nhà hiện tại đã có 5 thành viên.
        </p>
        <p className="text-base md:text-xl mb-4 md:mb-8 indent-4">
          Sau khi đăng nhập, người dùng có thể tải xuống các tài liệu hướng dẫn
          sau và làm theo:
        </p>
        <div className="flex flex-col md:flex-row md:gap-16 gap-8 px-8 mb-4 md:mb-8 justify-between text-[16px] md:text-[20px]">
          <div className={`${styles.onlySV} text-center border rounded-2xl px-4 pt-4 pb-0 w-full md:w-1/3`}>
            <a
              href="https://drive.google.com/file/d/1VbCwMirVQQDkUVRbwgtaEUmh5tp3crrb/view?usp=drive_link"
              target="_blank"
            >
              <img
                src={student}
                alt="ICON_SV"
                className="w-[40%] h-[40%] md:w-[50%] md:h-[50%] mx-auto"
              />
              <p className=" text-[16px] md:text-[24px] mt-2 font-semibold md:pb-4 my-2">
                Dành cho sinh viên
              </p>
            </a>
          </div>

          <div className={`${styles.onlySPSO} text-center rounded-2xl px-4 pt-4 pb-0 shadow-xl w-full md:w-1/3`}>
            <a
              href="https://drive.google.com/file/d/1GuXqqYvH8oNw1lYiQbrDuXVw9CHq1G3y/view"
              target="_blank"
            >
              <img
                src={manager}
                alt="ICON_MN"
                className="w-[40%] h-[40%] md:w-[50%] md:h-[50%] mx-auto"
              />
              <p className=" text-[16px] md:text-[24px] mt-2 md:pb-4 font-semibold my-2">
                Dành cho nhà quản lý
              </p>
            </a>
          </div>

          <div className={`${styles.onlyST} text-center rounded-2xl px-4 pt-4 pb-0 shadow-xl w-full md:w-1/3`}>
            <a
              href="https://drive.google.com/file/d/1ps87hFv4aXH3TlBimgUZP4zKSZS1pJ2A/view?usp=sharing"
              target="_blank"
            >
              <img
                src={staff}
                alt="ICON_ST"
                className="w-[40%] h-[40%] md:w-[50%] md:h-[50%] mx-auto"
              />
              <p className=" text-[16px] md:text-[24px] mt-2 font-semibold md:pb-4 my-2 ">
                Dành cho nhân viên
              </p>
            </a>
          </div>
        </div>

        <p className="text-base md:text-xl indent-4">
          Nếu có thắc mắc về hướng dẫn trong tài liệu, vui lòng liên hệ
          smarthomeBlueWhale@gmail.com để được giải đáp. Chúng tôi không giải quyết
          những câu hỏi mà trong tài liệu đã được đề cập rõ ràng.
        </p>
      </div>

      <div className="faq w-full flex flex-col gap-[1.25rem] text-base md:text-xl mx-auto">
        <h2 className="text-2xl lg:text-3xl font-bold mt-4 pb-1 md:pb-2">
          CÂU HỎI THƯỜNG GẶP
        </h2>
        <ul className={`${styles.m_d} expand-list`}>
          <li data-md-content="300" className=" md:w-3/4">
            <label
              className="tab text-base md:text-xl flex flex-row items-center"
              htmlFor="tab1"
            >
              1. Giá tiền dịch vụ?
            </label>
            <input type="checkbox" id="tab1" name="tab1" className="tab1" />
            <div className={`${styles.content}`}>
              <ul>
                <li>
                  <p>
                    Hoàn toàn miễn phí nếu bạn là sinh viên bách khoa. Là sinh viên trường
                    khác giá đắt hơn chỉ khoảng 1 ly trà sữa.
                  </p>
                </li>
              </ul>
            </div>
          </li>

          <li data-md-content="300" className=" md:w-3/4">
            <label
              className="tab text-base md:text-xl flex flex-row items-center"
              htmlFor="tab2"
            >
              2. Tôi không phải người nhà có thể sử dụng?
            </label>
            <input type="checkbox" id="tab2" name="tab2" className="tab2" />
            <div className={`${styles.content}`}>
              <ul>
                <li>
                  <p>
                    Không bạn nhé. Việc đăng nhập sẽ thực hiện qua tài khoản được cung cấp.
                    Nếu bạn muốn hãy liên hệ người nhà để được xác nhận
                  </p>
                </li>
              </ul>
            </div>
          </li>

          <li data-md-content="300" className=" md:w-3/4">
            <label
              className="tab text-base md:text-xl flex flex-row items-center"
              htmlFor="tab3"
            >
              3. Các hình thức thanh toán khả dụng?
            </label>
            <input type="checkbox" id="tab3" name="tab3" className="tab3" />
            <div className={`${styles.content}`}>
              <ul>
                <li>
                  <p>
                    Hiện tại chúng tôi chỉ triển khai hình thức thanh toán thông
                    qua cổng BKPay của trường. Các hình thức khác có thể được
                    đội ngũ phát triển trong tương lai. Quý khách hàng thông cảm
                    và chờ đợi.
                  </p>
                </li>
              </ul>
            </div>
          </li>

          <li data-md-content="300" className="mb-4 md:w-3/4" >
            <label
              className="tab text-base md:text-xl flex flex-row items-center"
              htmlFor="tab4"
            >
              4. Nếu việc cài đặt hư hỏng, tôi có được trả lại
              tiền?
            </label>
            <input type="checkbox" id="tab4" name="tab4" className="tab4" />
            <div className={`${styles.content}`}>
              <ul>
                <li>
                  <p>
                    Trong thời hạn bảo hành mọi thứ là miễn phí. Tuy nhiên, sau thời gian này phí bảo
                    trì sẽ là 100 nghìn / lần.
                  </p>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      </div>
    </div>
  );
};
  
export default Help;