import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { loginUser, getRaspUser } from '../redux/apiRequest';
import fire from '../Assets/images/fire.jpg'
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const user = useSelector((state) => state.auth.login.currentUser);
    useEffect(() => {
        if (user) {
          navigate('/');
        }
      }, [user]);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = {
            username: username,
            password: password,
        };
        loginUser(newUser,dispatch, navigate);
        getRaspUser(newUser,dispatch,navigate)
    };

    const [focused, setFocused] = useState(false);
    const [focusedPass, setFocusedPass] = useState(false);
  
    const handleFocus = () => {
      setFocused(true);
    };
    const handleFocusPass = () => {
        setFocusedPass(true);
      };
  
    const handleBlur = () => {
      if (username === "") {
        setFocused(false);
      }
    };
    const handleBlurPass = () => {
        if (password === "") {
          setFocusedPass(false);
        }
      };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    function openRegister (li) 
    {
        window.location.href = li;
    }

    return (
        <div className=" bg-[#f0f4f9]  flex justify-center items-center h-screen w-screen"> 
            <div className=' justify-center bg-white flex flex-wrap overflow-hidden w-auto h-auto shadow-2xl'>
                <div className=' w-[450px] '>
                    {/* <img src = {profile} alt='Logo' className='w-[90px] h-[100px] '/>
                    <p className='text-[35px] font-normal'>Đăng nhập</p>
                    <p>Để trải nghiệm ứng dụng tốt nhất</p> */}
                    <img src={fire} alt='ok' className='h-full w-full'></img>
                </div>
                <div className='w-[550px] h-[345px] '>
                    <form className="h-full w-full p-[30px] align-middle  border-none  shadow-md rounded " onSubmit={handleSubmit}>


                        <div className='mt-[30px]'>
                            <label className = 'relative'>
                                <input required 
                                        type='text'
                                        id='username'
                                        value={username}
                                        onChange={handleUsernameChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        className='text-[#1f1f1f] w-[470px] h-[54px] px-4 text-lg outline-none border-2 border-gray-400 rounded
                                        hover:border-gray-600 duration-200 peer focus:border-[#3b82f9] bg-inherit'></input>
                                <span className={` absolute left-0 top-[-6px] px-1  tracking-wide pointer-events-none duration-200 bg-white peer-focus:text-[#3b82f9] ml-2 text-[#9c9998]
                                                ${!focused?'focus:block text-lg  peer-focus:text-sm peer-focus:-translate-y-5 ':' -translate-y-5  text-sm ' } `}>                                                
                                                Nhập username của bạn
                                </span>
                            </label>
                        </div>
                        <div className='mt-[20px] mb-[10px]'>
                            <label className = 'relative'>
                                <input required 
                                        type={!showPassword?'password':'text'}
                                        id='password'
                                        value={password}
                                        onFocus={handleFocusPass}
                                        onBlur={handleBlurPass}
                                        onChange={handlePasswordChange}
                                        className='w-[470px] h-[54px] px-4 text-lg outline-none border-2 border-gray-400 rounded
                                        hover:border-gray-600 duration-200 peer focus:border-[#3b82f9] bg-inherit'></input>
                                <span className={` absolute left-0 top-[-6px] px-1  tracking-wide pointer-events-none duration-200 bg-white peer-focus:text-[#3b82f9] ml-2 text-[#9c9998]
                                                ${!focusedPass?'focus:block text-lg  peer-focus:text-sm peer-focus:-translate-y-5 ':' -translate-y-5  text-sm ' } `}>                                                
                                                Nhập mật khẩu của bạn
                                </span>
                                <FaEye onClick={togglePasswordVisibility} className={`top-0 left-[430px] cursor-pointer
                                        size-[25px] fill-gray-500 absolute peer-focus:fill-[#3b82f9]
                                        ${showPassword?'hidden':''}`}></FaEye>
                                <FaEyeSlash onClick={togglePasswordVisibility} className={`top-0 left-[430px] cursor-pointer
                                        size-[25px] fill-gray-500 absolute peer-focus:fill-[#3b82f9]
                                        ${!showPassword?'hidden':''}`}></FaEyeSlash>
                            </label>
                        </div>

                        <a href='dsad' className='text-[15px] italic text-[#0b57d0] font-medium mt-[20px]'>
                            Quên mật khẩu
                        </a>







                        <div className="flex float-right mt-[65px]">
                            <button
                                className="hover:bg-[#f0f4f9] rounded-[20px] mr-[20px] text-[15px] bg-white text-[#1d4ed8]  text-[#0b57d0] font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type='button'
                                onClick={()=>{navigate('/register')}}
                            >
                                Tạo tại khoản
                            </button>
                            <button
                                className="text-[15px] hover:shadow-md hover:bg-[#0b57a9] rounded-[20px] bg-[#0b57d0] text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Đăng nhập
                            </button>
                        </div>

                    </form>


                </div>
            </div>
                                
        </div>
    );
};

export default Login;