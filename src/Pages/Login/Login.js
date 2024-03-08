import styles from './Login.module.css'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../App';
import { FaUser, FaLock } from 'react-icons/fa';


const Login = () => {
  const {role, setRole} = useContext(LoginContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setRole("family_member");
    navigate("/Home");
  }

  return (
    <div className={`${styles.wrapper} flex justify-center items-center min-h-[100vh] rounded-md`}>
      <div className={`${styles.inner_wrapper} p-5 backdrop-blur-xl rounded-xl`}>

        <form onSubmit={handleSubmit} action=''>
          <h1 className='text-[2.25rem] text-center font-bold text-white'>Login</h1>
          <div className={`${styles.input_box} relative w-full h-[50px] my-6 mx-0`}>
            <input className="w-full h-full focus:outline-none text-white font-medium bg-transparent border-2 rounded-[2.5rem] px-[2.5rem] py-[1.25rem]" type='text' placeholder='Username...' required />
            <FaUser className={`${styles.icon} text-[#8F00FF] absolute right-5 top-1/2 -translate-y-1/2`}/>
          </div>

          <div className={`${styles.input_box} relative w-full h-[50px] my-6 mx-0`}>
            <input className="w-full h-full focus:outline-none text-white font-medium bg-transparent border-2 rounded-[2.5rem] px-[2.5rem] py-[1.25rem]" type='password' placeholder='Password...' required />
            <FaLock className={`${styles.icon} text-[#8F00FF] absolute right-5 top-1/2 -translate-y-1/2`}/>
          </div>

          <div className={`${styles.remember_forgot} flex justify-between text-[14px] -mt-4 mx-0 mb-4`}>
            <label className='text-yellow-300'><input className="accent-white mr-1 " type='checkbox'/>Remember me</label>
            <a className=" text-white no-underline hover:underline" href='#!'>Forgot password?</a>
          </div>

          <button className={`${styles.submit_button} w-full h-[2.8rem] bg-[#8F00FF] text-base text-white font-bold border-none outline-none cursor-pointer rounded-[2.5rem]`} type='submit'>Đăng nhập</button>

          <div className={`${styles.register_link} mt-1`}>
            <p className='text-yellow-300 italic'>Don't have an account? <a className='text-white no-underline font-semibold hover:underline' href ='#!'>Register</a></p>
          </div>
        </form>

      </div>
    </div>
  );
};
  
export default Login;