import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import TableTest from './TableTest'



const  TableQueue = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rasps = useSelector((state) => state.auth.login.raspID);
  const user = useSelector((state) => state.auth.login.currentUser);
  const [rasp, setRasp] = useState(null)

  useEffect(()=>{
    setRasp(rasps[0])
  }, [rasps])

  const handleDeleteRasp = async() =>
  {
    try {
      alert('Success')
    } catch (error) {
      
    }
  }

  return (
      <div className="Table ">
        {/* <button onClick={handleGetESP} >OKK</button> */}
      <h3 className="flex font-bold text-[26px] font-sans my-[10px]  text-[#344f99]">Các ESP đang chờ sự cấp phép</h3>
      <scroll >

        <TableTest typeTable={3} />
        
      </scroll>
      </div>
  );
}

export default TableQueue