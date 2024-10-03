import React, {useEffect, useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import TableTest from './TableTest'




const  TableRasp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rasps = useSelector((state) => state.auth.login.raspID);
  const user = useSelector((state) => state.auth.login.currentUser);
  const [rasp, setRasp] = useState(null)
  const [rows, setRows] = useState([])
  const [count, setCount] = useState(1)
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
      <h3 className="flex font-bold text-[26px] font-sans my-[10px]  text-[#344f99]">Các RASPBEERY PI đã kết nối</h3>
      <scroll >

        <TableTest typeTable={1} listRasp = {rasps}>

        </TableTest>
      </scroll>
      </div>
  );
}

export default TableRasp