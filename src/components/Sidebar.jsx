import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import {useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logOut } from '../redux/apiRequest';

const Sidebar = ({ handleSidebarItemClick }) => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = user?.accessToken
  const id = user?._id;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleLogOut = () =>
  {
    logOut(dispatch,id,navigate,accessToken)
  }


  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true)
  const [first, setFirst] = useState(false)

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  const handleButtonClick = async (index) => {
    try {
      if (index === 1 && !first)
      {
        // axios.get('http://localhost:3300/api/detected-object-video')
        // .then(()=>
        // {

        // });
        setFirst(true)
      }
      handleSidebarItemClick(index);
      setSelected(index)

    } catch (error) {
        console.error('Error fetching video:', error);
    }
};

  console.log(window.innerWidth)
  return (
    <>
      <div className="bars cursor-pointer z-50" style={expanded?{left: '85%', top:'-1%'}:{left: '3%', top:'1%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar bg-[#344f99]  pr-[20px] text-white'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo ">
        <img src={Logo} className="fill-white text-white" alt="logo" />
        <span>
          <span>FIRE</span> warming
        </span>
      </div>

      <div className="menu ">
        {SidebarData.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => { handleButtonClick(index) }}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}
        {/* signoutIcon */}
        <div className="menuItem   z-50">
          <div className="log flex items-center gap-2 px-3 rounded-[10px] lout" onClick={handleLogOut}>
            <UilSignOutAlt />
            <span >Log out</span>
          </div>
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;
