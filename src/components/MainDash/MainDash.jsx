import React from "react";
import Cards from "../Cards/Cards";
import "./MainDash.css";
import { IoIosNotifications } from "react-icons/io"; 
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Realtime from "../Realtime/Realtime";
import { UilUsersAlt} from "@iconscout/react-unicons";
import axios from "axios";
import {useDispatch} from 'react-redux';
import {  getRaspUser } from '../../redux/apiRequest';

const MainDash = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.login.currentUser);
  const rasp = useSelector((state) => state.auth.login.raspID);
  const [isRasp, setIsRasp] = useState(false)
  const [indexESP, setIndexESP] = useState(0)
  const [listEsp, setListEsp] = useState([])
  const [macAddr, setMacAddr] = useState()
  const [macRaspIndex, setMacRaspIndex] = useState(0)
  const [macRaspInput, setMacRaspInput] = useState('');
  const [time, setTime] = useState('1');
  const [isChooseRasp, setIsChooseRasp] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (rasp.length > 0)
    {
      setIsRasp(true);

    } else setIsRasp(false)
  }, [user]);


  const getListMac = async () => {
    try {
      const res = await axios.get(`http://localhost:9000/api/add/getAllESP/${rasp[macRaspIndex].macRasp}`);
      setListEsp(res.data)

      setIsChooseRasp(true)
    } catch (error) {
      console.log('Lỗi:', error); // In ra lỗi nếu có
    }
  };
  
  useEffect(() => {
    getListMac();
  }, [macRaspIndex]);

  const handleChange = (e) =>
  {
      setMacRaspInput(e.target.value);
  }
  const handleSubmit = async(event) => {
      event.preventDefault();
      try {
          const newConnectRasp = {
              macRasp: macRaspInput,
              user: user.username,
          }
          console.log(newConnectRasp)
          const addMacRasp = await axios.post('http://localhost:9000/api/add/addRasp',newConnectRasp )
          getRaspUser(user,dispatch,navigate)
          window.location.reload();
          alert('Thêm thành công')
          
      } catch (error) {
          alert('Có vấn đề khi thêm rasp, kiểm tra lại ID Rasp của bạn')
      }
  };

  const handleSelectRasp = (event) => {
    setMacRaspIndex(event.target.value);
  };
  const handleSelecTime = (event) => {
    setTime(event.target.value);
  };
  const handleSelectESP = (event) => {
    setMacAddr(event.target.value);
  };
  useEffect(() => {
    console.log(macAddr)
  }, [macAddr]);
  return (
    <div className="w-full ">
      {isRasp ? (
        <div className="MainDash w-full m-[10px] mb-[20px] p-0 mr-2">
          <div className="flex justify-between">
            <h1 className="mt-0 font-sans font-bold text-[24px] text-[#344f99]">GIÁM SÁT</h1>
            <div className="flex items-center cursor-pointer mx-[20px] ">
              <IoIosNotifications className="w-[30px] mx-[10px] h-[30px]" />
              <p className="font-medium font-sans mr-0 text-[20px]">
                <span className="font-[700] text-[#344f99]">{user ? user.lastname : ''}</span>
              </p>
            </div>
          </div>  

          <div className="flex flex-col md:flex-row">
            <div className="flex  gap-4 items-center  ">
              <div className="flex flex-wrap gap-3 justify-center items-center">
                <div><p className="font-[500]">Chọn Raspberry pi</p></div>
                {rasp.length!=0?
                    <select onChange={handleSelectRasp} className='px-4 py-1 font-[700] focus:border-[#344f99] 
                        rounded-[5px] text-[#344f99] border border-[#344f99] cursor-pointer'
                    >
                      {rasp.map((option, index) => (
                        <option key={option.macRasp}
                          value={index}
                          className="rounded-none"  >{option.macRasp}</option>
                      ))}
                    </select>:<p className="bg-[#d0d0d0] text-[#344f99] px-4 py-1">Chưa có data</p>
                }

              </div>

              <div className="flex flex-wrap gap-3 justify-center items-center">
                <div><p className="font-[500]"> Chọn ESP</p></div>
                {listEsp.length!=0?
                    <select onChange={handleSelectESP}  className='px-4 py-1 font-[700] focus:border-[#344f99] 
                        rounded-[5px] text-[#344f99] border border-[#344f99] cursor-pointer'
                    >
                      {listEsp.map((esp) => (
                        <option key={esp.macAddr}
                          value={esp}
                          className="rounded-none"  >{esp.macAddr}</option>
                      ))}
                    </select>:<p className="bg-[#d0d0d0] text-[#344f99] px-4 py-1">Chưa có data </p>
                }

              </div>
            </div>
            {listEsp.length!=0?
              <div className="flex  gap-4 items-center  ">
                <div><p className="font-[500] ml-4">Thống kê theo</p></div>

                  <select onChange={handleSelecTime} className="px-4 font-[700] focus:border-[#344f99]">
                    <option value="1">Giờ</option>
                    <option value="2">Ngày</option>
                    <option value="3">Tháng</option>

                    </select>
                </div>:<div></div>
              }
          </div>

          <Cards/>
          <Realtime macAddr={macAddr?.macAddr}/>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full pb-20 gap-5">
        <div>
          <UilUsersAlt className='size-[100px] fill-[#344f99]'/>
        </div>
        <div className="">
          <p className="text-[30px] font-[600]">Kết nối với Raspberry pi để theo dõi</p>
          <form className='px-3 py-2' onSubmit={handleSubmit}>
            <label className='flex gap-6 items-center'>
                <input type='text' className='px-3 py-2 border border-black rounded-[10px]' 
                onChange={handleChange}
                required
                placeholder='Nhập mã Raspberry ở đây' />
                <button className='bg-[#344f99] px-3 py-2 text-white rounded-[10px]'
                    type='submit'> Thêm </button>
            </label>

          </form>

        </div>
      </div>
      )}
    </div>
  );
};

export default MainDash;
