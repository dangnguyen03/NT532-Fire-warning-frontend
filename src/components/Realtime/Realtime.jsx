import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import {LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Line} from 'recharts'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function Realtime(props) {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(1)
    const [msg, setMsg] = useState('')
    const [clear, setClear] = useState(false)
    const user = useSelector((state) => state.auth.login.currentUser);


    useEffect(() => {
        if (clear)
        {
            setData([])
            setClear(false)
        }
        const socket = socketIOClient('http://localhost:9000');
        socket.on('message', (newData) => {
            if(newData.macAddr == props.macAddr)
                setData(newData);
        });
        socket.on('status', (newData) => {
            if (newData.macAddr == props.macAddr)
            {
                setMsg(newData.msg);
                setStatus(newData.status)
            }
        });

    }, []);
    useEffect(()=>{
        console.log(msg);
    },[msg])
    return (
        <div className='mt-[30px]'>
            <div className='flex justify-center mb-[30px] text-[30px] font-[700]'>
                <div className='flex'>
                    <p className='mr-[20px]'>
                        Trạng thái: 
                    </p>
                    <p className={`
                        ${status===1? 
                            'text-[#076836]': 
                        status===2?
                            'text-[#e96000]':'text-[#e80202]'
                    
                    }`} >  {msg} </p>

                </div>
            </div>
            <div className='flex justify-center'>
                <div>
                    {/* <h1>{data}</h1> */}
                    <LineChart width={1100} height={300} data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <XAxis dataKey="name" />
                        <YAxis/>
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="humid" name="Humidity" stroke="#076836" yAxisId={0} />
                        <Line type="monotone" dataKey="temp" name="Temperature" stroke="#e96000" yAxisId={0} />
                        <Line type="monotone" dataKey="gas" name="Gas" stroke="#000000" yAxisId={0} />

                    </LineChart>
                </div>

            </div>
            <div className='flex justify-center'>
                <div className='flex items-center mx-[10px]'>
                    <div className='mx-[5px] w-[25px] h-[3px] bg-[#076836]'></div>
                    <div className='ml-[5px]'>Humidity</div>
                </div>
                <div className='flex items-center mx-[10px]'>
                    <div className='mx-[5px] w-[25px] h-[3px] bg-[#e96000]'></div>
                    <div className='ml-[5px]'>Temperature</div>
                </div>
                <div className='flex items-center mx-[10px]'>
                    <div className='mx-[5px] w-[25px] h-[3px] bg-[#000000]'></div>
                    <div className='ml-[5px]'>Gas</div>
                </div>
            </div>

        </div>
    );
}

export default Realtime;