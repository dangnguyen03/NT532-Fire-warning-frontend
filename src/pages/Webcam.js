import React from 'react';
import { UilUsersAlt} from "@iconscout/react-unicons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import {useDispatch} from 'react-redux';
import {  getRaspUser } from '../redux/apiRequest';
import { Link, Navigate, useNavigate } from 'react-router-dom';


function Webcam() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.login.currentUser);
    const rasp = useSelector((state) => state.auth.login.raspID);
    const [isRasp, setIsRasp] = useState(false)
    const [macRasp, setMacRasp] = useState('');

    useEffect(() => {
      if (rasp.length > 0)
      {
        setIsRasp(true);
      } else setIsRasp(false)
    }, [user]);


    const handleChange = (e) =>
    {
        setMacRasp(e.target.value);
    }
    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const newConnectRasp = {
                macRasp: macRasp,
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

    return (
        <div className='h-full w-full'>
            {isRasp?
                (
                <div className='h-full w-full flex items-center justify-center overflow-hidden'>
                    <iframe  src={process.env.REACT_APP_API_WEBCAM}  width="100%" height="100%"  title="OK"></iframe>
                </div>

                ):
                (
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
                )
            }

        </div>
    );
}

export default Webcam;
