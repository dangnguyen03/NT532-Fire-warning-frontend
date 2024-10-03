import React, {useState, useEffect} from 'react'
import axios from "axios";
import {useDispatch} from 'react-redux';
import {  getRaspUser, loginUser } from '../../redux/apiRequest';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import { loginFail, loginStart, loginSucess, logoutFail, logoutStart, logoutSucess, 
    registerFail, registerStart, registerSucess,
    getRaspSucess } from "../../redux/authSlice";
const TableTest = (props) =>
{  
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.login.currentUser);
    const rasp = useSelector((state) => state.auth.login.raspID);
    const [macRasp, setMacRasp] = useState('');
    const [esps,setESP] = useState([])
    const [espQueues,setESPQueue] = useState([])
    const [reload, setReload] = useState(false);
    const handleDeleteRasp = async(id) =>
    {
        try {
            setReload(!reload)
            const username = {username: user.username}
            await axios.get(`http://localhost:9000/api/add/deleteRasp/${id}`)
            const allNewRasp = await axios.post('http://localhost:9000/api/add/getAllRasp', username)
            dispatch(getRaspSucess(allNewRasp.data));


        } catch (error) {
            console.log(error)
        }
    }
    const handleDeleteESP = async(id) =>
    {
        try {
            await axios.get(`http://localhost:9000/api/add/deleteESP/${id}`)
            alert('Xóa thành công')
            setReload(!reload)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteESPWait = async(id) =>
    {
        try {
            await axios.get(`http://localhost:9000/api/add/deleteESPQueue/${id}`)
            alert('Xóa thành công')
        } catch (error) {
            console.log(error)
        }
    }
    const handleAccept = async(id) =>
    {
        try {
            const newMac = {
                macAddr: id?.macAddr,
                macRasp: id?.macRasp
            }
            await axios.post(`http://localhost:9000/api/add/addEsp`, newMac)
            alert('Thêm thành công')
            await axios.get(`http://localhost:9000/api/add/deleteESPQueue/${id?.macAddr}`)
            setReload(!reload)

        } catch (error) {
            console.log(error)
        }
    }
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
            const username = {username: user.username}
            console.log(newConnectRasp)
            const addMacRasp = await axios.post('http://localhost:9000/api/add/addRasp',newConnectRasp )
            const allNewRasp = await axios.post('http://localhost:9000/api/add/getAllRasp', username)
            dispatch(getRaspSucess(allNewRasp.data));
            // window.location.reload();
            alert('Thêm thành công')
            
        } catch (error) {
            alert('Có vấn đề khi thêm rasp, kiểm tra lại ID Rasp của bạn')
        }
    };
    const getAllESP = async(event) =>
    {
        try {
            let dataESP = []
            rasp.map(async(ra) => {
                const res = await axios.get(`http://localhost:9000/api/add/getAllESP/${ra?.macRasp}`);
                if (res.data.length !==0) dataESP.push(res.data)
                console.log(dataESP)
            })

            const resQueue = await axios.get('http://localhost:9000/api/add/getAllQueue');
            setESPQueue(resQueue.data)
            if (dataESP.length!==0)
                setESP(dataESP[0])
            else setESP([])
        } catch (error) {
            console.log("Error");
        }
    }
    useEffect(()=>{
        getAllESP()
        console.log(espQueues)
        console.log(esps)
    }, [reload])

    return(
        <>
        {
            props.typeTable === 1?
            <div>
                <div className="">
                      <form className=' py-2' onSubmit={handleSubmit}>
                        <label className='flex gap-6 items-center'>
                            <p className="text-[18px] font-[500]" >Kết nối với Raspberry pi để theo dõi</p>
                            <input type='text' className='px-3 py-2 border border-[#344f99  rounded-[10px]' 
                            onChange={handleChange}
                            required
                            placeholder='Nhập mã Raspberry ở đây' />
                            <button className='bg-[#344f99] px-3 py-2 text-white rounded-[10px]'
                                type='submit'> Thêm </button>
                        </label>

                      </form>
        
                    </div>
                <div className='flex flex-row justify-center bg-[#344f99] text-white font-[700]'>
                    <div className='flex justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 border border-left'>
                        <p className=''>STT</p>
                    </div> 
                    <div className='flex justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 border border-left'>
                        <p className=''> Raspberry Pi ID</p>
                    </div> 
                    <div className='flex justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 border border-left'>
                        <p className=''>Ngày tạo</p>
                    </div> 
                    <div className='flex justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 border border-left '>
                        <p className=''>Xóa</p>
                    </div> 
                </div>
                {
                    props.listRasp.map((rasp, index) => (
                        <div className='flex flex-row '>                     
                            <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 border '>
                                <p className=''>{index +1}</p>
                            </div> 
                            <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 border'>
                                <p className=''>{rasp?.macRasp}</p>
                            </div> 
                            <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 border'>
                                <p className=''>{rasp?.createdAt}</p>
                            </div> 
                            <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 flex justify-center border'>
                                <button className='bg-[#ff0000] px-2 py-1  w-1/2  rounded-[10px] text-white cursor-pointer
                                    text-[14px]
                                hover:bg-[#72292e]'
                                    onClick={() => handleDeleteRasp(rasp?.macRasp)}>Xóa</button>
                            </div> 
                        </div>
                    ))
                }

            </div>:
            props.typeTable === 2?
            <div>
                <div className='flex flex-row justify-center bg-[#344f99] text-white font-[700]'>
                    <div className='flex justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 border border-left'>
                        <p className=''>STT</p>
                    </div> 
                    <div className='flex justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 border border-left'>
                        <p className=''> Raspberry Pi ID</p>
                    </div> 
                    <div className='flex justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 border border-left'>
                        <p className=''> MAC ESP</p>
                    </div> 
                    <div className='flex justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 border border-left'>
                        <p className=''>Ngày tạo</p>
                    </div> 
                    <div className='flex justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 border border-left'>
                        <p className=''>Xóa</p>
                    </div> 
                </div>
                {
                    esps.map((esp, index) => (
                        <div className='flex flex-row '>
                            <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 border '>
                                <p className=''>{index+1}</p>
                            </div> 
                            <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 border'>
                                <p className=''>{esp?.macRasp}</p>
                            </div> 
                            <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 border'>
                                <p className=''>{esp?.macAddr}</p>
                            </div> 
                            <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 border'>
                                <p className=''>{esp?.createdAt}</p>
                            </div> 
                            <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 flex justify-center border'>
                                <button className='bg-[#ff0000] px-1 py-1 text-[14px]  w-1/2  rounded-[10px] text-white cursor-pointer hover:bg-[#72292e]'
                                    onClick={()=>handleDeleteESP(esp?.macAddr)}>Xóa</button>
                            </div> 
                        </div>
                    ))

                }
            </div>:
            <div>
                <div className='flex flex-row justify-center bg-[#344f99] text-white font-[700]'>
                    <div className='flex justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 border border-left'>
                        <p className=''> Raspberry Pi ID</p>
                    </div> 
                    <div className='flex justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 border border-left'>
                        <p className=''> MAC ESP</p>
                    </div> 
                    <div className='flex justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 border border-left'>
                        <p className=''>Ngày tạo</p>
                    </div> 
                    <div className='flex justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 border border-left'>
                        <p className=''>Chấp nhận</p>
                    </div> 
                    <div className='flex justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 border border-left'>
                        <p className=''>Xóa</p>
                    </div> 
                </div>
                {
                    espQueues.map((esp)=>(
                        <div className='flex flex-row '>
                            <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 border'>
                                <p className=''>{esp?.macRasp}</p>
                            </div> 
                            <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 border'>
                                <p className=''>{esp?.macAddr}</p>
                            </div> 
                            <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 border'>
                                <p className=''>{esp?.createdAt}</p>
                            </div> 
                            <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 flex justify-center border'>
                                <button className='bg-[#36d048] px-1 py-1 text-[14px]  w-1/2  rounded-[10px] text-white cursor-pointer hover:bg-[#277143]'
                                    onClick={()=>handleAccept(esp)}>Chấp nhận</button>
                            </div> 
                            <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 flex justify-center border'>
                                <button className='bg-[#ff0000] px-1 py-1 text-[14px]  w-1/2  rounded-[10px] text-white cursor-pointer hover:bg-[#72292e]'
                                    onClick={()=>handleDeleteESPWait(esp?.macAddr)}>Xóa</button>
                            </div> 
                        </div>

                    ))

                }
            </div>  
        }</>
    )
}
export default TableTest;