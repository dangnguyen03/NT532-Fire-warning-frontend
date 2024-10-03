import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableESP from '../Table/TableESP'
import TableRasp from '../Table/TableRasp'
import TableQueue from "../Table/TableQueue";

const Device = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const rasp = useSelector((state) => state.auth.login.raspID);
  const navigate = useNavigate();
  const [isRasp, setIsRasp] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (rasp.length > 0)
    {
      setIsRasp(true);
    } else setIsRasp(false)
  }, [user]);
  // useEffect(() => {
  //   getRaspUser(user,dispatch, navigate);

  // }, []);
  

  return (
    <div className="w-full mr-2">
        <TableRasp/>
        <TableESP/>
        <TableQueue/>
    </div>
  );
};

export default Device;
